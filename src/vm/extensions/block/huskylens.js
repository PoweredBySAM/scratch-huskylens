// import BlockType from '../../extension-support/block-type';
// import ArgumentType from '../../extension-support/argument-type';
import translations from './translations.json';
// eslint-disable-next-line no-unused-vars
import Runtime from '../../engine/runtime';
import log from '../../util/log';
import Base64Util from '../../util/base64-util';

/**
 * Formatter which is used for translation.
 * This will be replaced which is used in the runtime.
 * @param {object} messageData - format-message object
 * @returns {string} - message for the locale
 */
let formatMessage = messageData => messageData.default;

/**
 * Setup format-message for this extension.
 */
const setupTranslations = () => {
    const localeSetup = formatMessage.setup();
    if (localeSetup && localeSetup.translations[localeSetup.locale]) {
        Object.assign(
            localeSetup.translations[localeSetup.locale],
            translations[localeSetup.locale]
        );
    }
};

const MM_SERVICE = {
    ID: '0b50f3e4-607f-4151-9091-7d008d6ffc5c',
    WRITE_CH: '0b500400-607f-4151-9091-7d008d6ffc5c',
    READ_CH: '0b500400-607f-4151-9091-7d008d6ffc5c',
    STATUS_CH: '0b500400-607f-4151-9091-7d008d6ffc5c'
};

const EXTENSION_ID = 'huskylens';

/**
 * Scratch 3.0 blocks
 */
class ExtensionBlocks {
    /**
     * A translation object which is used in this class.
     * @param {FormatObject} formatter - translation object
     */
    static set formatMessage (formatter) {
        formatMessage = formatter;
        if (formatMessage) setupTranslations();
    }

    /**
     * @return {string} - the name of this extension.
     */
    static get EXTENSION_NAME () {
        return formatMessage({
            id: 'huskylens.name',
            default: 'HuskyLens'
        });
    }

    /**
     * @return {string} - the ID of this extension.
     */
    static get EXTENSION_ID () {
        return EXTENSION_ID;
    }

    /**
     * URL to get this extension.
     * @type {string}
     */
    extensionURL = '';

    mbitMore = null;

    /**
     * Construct a set of blocks for SAM Labs.
     * @param {Runtime} runtime - the Scratch 3.0 runtime.
     */
    constructor (runtime) {
        /**
         * The Scratch 3.0 runtime.
         * @type {Runtime}
         */
        this.runtime = runtime;

        if (runtime.formatMessage) {
            // Replace 'formatMessage' to a formatter which is used in the runtime.
            formatMessage = runtime.formatMessage;
        }
        this.extensionId = 'huskylens';

        if (runtime.peripheralExtensions.microbitMore) {
            this.mbitMore = runtime.peripheralExtensions.microbitMore;
        } else {
            this.mbitMore = null;
            log.error('microbit-more extension not found');
        }
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo () {
        setupTranslations();
        return {
            id: ExtensionBlocks.EXTENSION_ID,
            name: ExtensionBlocks.EXTENSION_NAME,
            extensionURL: ExtensionBlocks.extensionURL,
            showStatusButton: false,
            color1: '#e7660b',
            color2: '#e7660b',
            blocks: [],
            menus: {}
        };
    }

    /**
     * Send a command to the micro:bit's I"C interface -> HuskyLens.
     * @param {Uint8Array} command Contents of the command.
     * @return {Promise} a Promise that resolves when the data was sent and after send command interval.
     */
    sendCommand (command) {
        const data = Base64Util.uint8ArrayToBase64(
            new Uint8Array([
                command.id,
                ...command.message
            ])
        );

        if (!this.mbitMore.isConnected()) return Promise.resolve();
        if (this.mbitMore.bleBusy) {
            this.mbitMore.bleAccessWaiting = true;
            setTimeout(() => this.sendCommand(command), 1);
            return; // Do not return Promise.resolve() to re-try.
        }

        this.mbitMore.bleBusy = true;
        // Clear busy and BLE access waiting flag when the scratch-link does not respond.
        this.mbitMore.bleBusyTimeoutID = window.setTimeout(() => {
            this.mbitMore.bleBusy = false;
            this.mbitMore.bleAccessWaiting = false;
        }, 1000);

        return new Promise(resolve => {
            this.mbitMore._ble.write(
                MM_SERVICE.ID,
                MM_SERVICE.WRITE_CH,
                data,
                'base64',
                false
            )
                .then(() => {
                    window.clearTimeout(this.mbitMore.bleBusyTimeoutID);
                })
                .catch(err => {
                    this.mbitMore._ble.handleDisconnectError(err);
                })
                .finally(() => {
                    this.mbitMore.bleBusy = false;
                    this.mbitMore.bleAccessWaiting = false;
                });
            setTimeout(() => resolve(), 30);
        });
    }
}

export {ExtensionBlocks as default, ExtensionBlocks as blockClass};
