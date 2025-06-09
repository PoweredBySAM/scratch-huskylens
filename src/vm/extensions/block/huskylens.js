import BlockType from '../../extension-support/block-type';
import ArgumentType from '../../extension-support/argument-type';
import {HuskylensProtocol, protocolAlgorithm} from './protocol.ts';

import en from './translations/en.json';

const translations = {
    en: en
};

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

const EXTENSION_ID = 'huskylens';

/**
 * Scratch 3.0 blocks
 */
class ExtensionBlocks extends HuskylensProtocol {
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


    /**
     * Construct a set of blocks for SAM Labs.
     * @param {Runtime} runtime - the Scratch 3.0 runtime.
     */
    constructor (runtime) {
        super(runtime);
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
            blocks: [
                {
                    opcode: 'initI2c',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'huskylens.initI2c',
                        default: 'initialize HuskyLens'
                    }),
                    terminal: false
                },
                {
                    opcode: 'selectAlgorithm',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'huskylens.selectAlgorithm',
                        default: 'switch algorithm to [algorithm]'
                    }),
                    arguments: {
                        algorithm: {
                            type: ArgumentType.STRING,
                            menu: 'algorithmMenu',
                            defaultValue: protocolAlgorithm.ALGORITHM_OBJECT_TRACKING
                        }
                    }
                }],
            menus: {
                algorithmMenu: {
                    acceptReporters: false,
                    items: [
                        {
                            text: formatMessage({
                                id: 'huskylens.menu.algorithm.face_rec',
                                default: 'face recognition'
                            }),
                            value: protocolAlgorithm.ALGORITHM_FACE_RECOGNITION.toString()
                        },
                        {
                            text: formatMessage({
                                id: 'huskylens.menu.algorithm.obj_trac',
                                default: 'object tracking'
                            }),
                            value: protocolAlgorithm.ALGORITHM_OBJECT_TRACKING.toString()
                        },
                        {
                            text: formatMessage({
                                id: 'huskylens.menu.algorithm.obj_rec',
                                default: 'object recognition'
                            }),
                            value: protocolAlgorithm.ALGORITHM_OBJECT_RECOGNITION.toString()
                        },
                        {
                            text: formatMessage({
                                id: 'huskylens.selectAlgomenu.algorithm.line_trac',
                                default: 'line tracking'
                            }),
                            value: protocolAlgorithm.ALGORITHM_LINE_TRACKING.toString()
                        },
                        {
                            text: formatMessage({
                                id: 'huskylens.menu.algorithm.color_rec',
                                default: 'color recognition'
                            }),
                            value: protocolAlgorithm.ALGORITHM_COLOR_RECOGNITION.toString()
                        },
                        {
                            text: formatMessage({
                                id: 'huskylens.menu.algorithm.tag_rec',
                                default: 'tag recognition'
                            }),
                            value: protocolAlgorithm.ALGORITHM_TAG_RECOGNITION.toString()
                        },
                        {
                            text: formatMessage({
                                id: 'huskylens.menu.algorithm.obj_class',
                                default: 'object classification'
                            }),
                            value: protocolAlgorithm.OBJECTCLASSIFICATION.toString()
                        },
                        {
                            text: formatMessage({
                                id: 'huskylens.menu.algorithm.qr_rec',
                                default: 'QR code recogmition (EDU only)'
                            }),
                            value: protocolAlgorithm.QRRECOGMITION.toString()
                        },
                        {
                            text: formatMessage({
                                id: 'huskylens.menu.algorithm.bar_rec',
                                default: 'barcode recognition (EDU only)'
                            }),
                            value: protocolAlgorithm.BARCODERECOGNITION.toString()
                        }
                    ]
                }
            }
        };
    }

    selectAlgorithm (args) {
        this.initMode(Number(args.algorithm));
    }

    
}

export {ExtensionBlocks as default, ExtensionBlocks as blockClass};
