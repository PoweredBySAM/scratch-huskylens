/* eslint-disable camelcase */
import BlockType from '../../extension-support/block-type';
import ArgumentType from '../../extension-support/argument-type';
import {HuskylensProtocol, HUSKYLENSResultType_t, Content3, protocolAlgorithm} from './protocol.ts';

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
                },
                {
                    opcode: 'requestDataOnce',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'huskylens.requestDataOnce',
                        default: 'request data from device'
                    })
                },
                {
                    opcode: 'getLearnedIDCount',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'huskylens.getLearnedIDCount',
                        default: 'number of learned IDs'
                    })
                },
                {
                    opcode: 'isObjectOnScreen',
                    blockType: BlockType.BOOLEAN,
                    text: formatMessage({
                        id: 'huskylens.isObjectOnScreen',
                        default: '[objectType] is on screen?'
                    }),
                    arguments: {
                        objectType: {
                            type: ArgumentType.STRING,
                            menu: 'resultTypeMenu',
                            defaultValue: 'frame'
                        }
                    }
                },
                {
                    opcode: 'getBoxNearCenter',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'huskylens.getBoxNearCenter',
                        default: '[parameter] of box closest to screen center'
                    }),
                    arguments: {
                        parameter: {
                            type: ArgumentType.STRING,
                            menu: 'parameterMenu',
                            defaultValue: 'ID'
                        }
                    }
                // },
                // {
                //     opcode: 'getArrowNearCenter',
                //     blockType: BlockType.REPORTER,
                //     text: formatMessage({
                //         id: 'huskylens.getArrowNearCenter',
                //         default: '[parameter] of arrow closest to screen center'
                //     }),
                //     arguments: {
                //         parameter: {
                //             type: ArgumentType.STRING,
                //             menu: 'parameterMenu',
                //             defaultValue: 'x'
                //         }
                //     }
                // },
                // {
                //     opcode: 'isIDLearned',
                //     blockType: BlockType.BOOLEAN,
                //     text: formatMessage({
                //         id: 'huskylens.isIDLearned',
                //         default: 'is ID [id] learned?'
                //     }),
                //     arguments: {
                //         id: {
                //             type: ArgumentType.NUMBER,
                //             defaultValue: 1
                //         }
                //     }
                // },
                // {
                //     opcode: 'isIDObjectOnScreen',
                //     blockType: BlockType.BOOLEAN,
                //     text: formatMessage({
                //         id: 'huskylens.isIDObjectOnScreen',
                //         default: 'is ID [id] [objectType] on the screen?'
                //     }),
                //     arguments: {
                //         id: {type: ArgumentType.NUMBER, defaultValue: 1},
                //         objectType: {type: ArgumentType.STRING, menu: 'resultTypeMenu', defaultValue: 'frame'}
                //     }
                // },
                // {
                //     opcode: 'getBoxParamByID',
                //     blockType: BlockType.REPORTER,
                //     text: formatMessage({
                //         id: 'huskylens.getBoxParamByID',
                //         default: '[parameter] of ID [id] box'
                //     }),
                //     arguments: {
                //         parameter: {type: ArgumentType.STRING, menu: 'parameterMenu', defaultValue: 'x'},
                //         id: {type: ArgumentType.NUMBER, defaultValue: 1}
                //     }
                // },
                // {
                //     opcode: 'getArrowParamByID',
                //     blockType: BlockType.REPORTER,
                //     text: formatMessage({
                //         id: 'huskylens.getArrowParamByID',
                //         default: '[parameter] of ID [id] arrow'
                //     }),
                //     arguments: {
                //         parameter: {type: ArgumentType.STRING, menu: 'parameterMenu', defaultValue: 'x'},
                //         id: {type: ArgumentType.NUMBER, defaultValue: 1}
                //     }
                // },
                // {
                //     opcode: 'getTotalCount',
                //     blockType: BlockType.REPORTER,
                //     text: formatMessage({
                //         id: 'huskylens.getTotalCount',
                //         default: 'number of [objectType]'
                //     }),
                //     arguments: {
                //         objectType: {type: ArgumentType.STRING, menu: 'resultTypeMenu', defaultValue: 'frame'}
                //     }
                // },
                // {
                //     opcode: 'getNthBoxParam',
                //     blockType: BlockType.REPORTER,
                //     text: formatMessage({
                //         id: 'huskylens.getNthBoxParam',
                //         default: '[parameter] of No. [index] box'
                //     }),
                //     arguments: {
                //         parameter: {type: ArgumentType.STRING, menu: 'parameterMenu', defaultValue: 'x'},
                //         index: {type: ArgumentType.NUMBER, defaultValue: 1}
                //     }
                // },
                // {
                //     opcode: 'getNthArrowParam',
                //     blockType: BlockType.REPORTER,
                //     text: formatMessage({
                //         id: 'huskylens.getNthArrowParam',
                //         default: '[parameter] of No. [index] arrow'
                //     }),
                //     arguments: {
                //         parameter: {type: ArgumentType.STRING, menu: 'parameterMenu', defaultValue: 'x'},
                //         index: {type: ArgumentType.NUMBER, defaultValue: 1}
                //     }
                // },
                // {
                //     opcode: 'getTotalByID',
                //     blockType: BlockType.REPORTER,
                //     text: formatMessage({
                //         id: 'huskylens.getTotalByID',
                //         default: 'number of ID [id] [objectType]'
                //     }),
                //     arguments: {
                //         id: {type: ArgumentType.NUMBER, defaultValue: 1},
                //         objectType: {type: ArgumentType.STRING, menu: 'resultTypeMenu', defaultValue: 'frame'}
                //     }
                // },
                // {
                //     opcode: 'getNthBoxParamByID',
                //     blockType: BlockType.REPORTER,
                //     text: formatMessage({
                //         id: 'huskylens.getNthBoxParamByID',
                //         default: '[parameter] of ID [id] No. [index] box'
                //     }),
                //     arguments: {
                //         parameter: {type: ArgumentType.STRING, menu: 'parameterMenu', defaultValue: 'x'},
                //         id: {type: ArgumentType.NUMBER, defaultValue: 1},
                //         index: {type: ArgumentType.NUMBER, defaultValue: 1}
                //     }
                // },
                // {
                //     opcode: 'getNthArrowParamByID',
                //     blockType: BlockType.REPORTER,
                //     text: formatMessage({
                //         id: 'huskylens.getNthArrowParamByID',
                //         default: '[parameter] of ID [id] No. [index] arrow'
                //     }),
                //     arguments: {
                //         parameter: {type: ArgumentType.STRING, menu: 'parameterMenu', defaultValue: 'x'},
                //         id: {type: ArgumentType.NUMBER, defaultValue: 1},
                //         index: {type: ArgumentType.NUMBER, defaultValue: 1}
                //     }
                // },
                // {
                //     opcode: 'learnIDAuto',
                //     blockType: BlockType.COMMAND,
                //     text: formatMessage({id: 'huskylens.learnIDAuto', default: 'learn ID [id] automatically'}),
                //     arguments: {
                //         id: {type: ArgumentType.NUMBER, defaultValue: 1}
                //     }
                // },
                // {
                //     opcode: 'forgetAll',
                //     blockType: BlockType.COMMAND,
                //     text: formatMessage({
                //         id: 'huskylens.forgetAll',
                //         default: 'forget all learning data of the current algorithm'
                //     })
                // },
                // {
                //     opcode: 'setIDName',
                //     blockType: BlockType.COMMAND,
                //     text: formatMessage({id: 'huskylens.setIDName', default: 'set name of ID [id] as [name]'}),
                //     arguments: {
                //         id: {type: ArgumentType.NUMBER, defaultValue: 1},
                //         name: {type: ArgumentType.STRING, defaultValue: 'DFRobot'}
                //     }
                // },
                // {
                //     opcode: 'showTextOnScreen',
                //     blockType: BlockType.COMMAND,
                //     text: formatMessage({
                //         id: 'huskylens.showTextOnScreen',
                //         default: 'show text [text] at x [x] y [y] on screen'
                //     }),
                //     arguments: {
                //         text: {type: ArgumentType.STRING, defaultValue: 'DFRobot'},
                //         x: {type: ArgumentType.NUMBER, defaultValue: 150},
                //         y: {type: ArgumentType.NUMBER, defaultValue: 30}
                //     }
                // },
                // {
                //     opcode: 'clearText',
                //     blockType: BlockType.COMMAND,
                //     text: formatMessage({id: 'huskylens.clearText', default: 'clear all custom texts on screen'})
                // },
                // {
                //     opcode: 'takePhoto',
                //     blockType: BlockType.COMMAND,
                //     text: formatMessage({id: 'huskylens.takePhoto', default: 'take a [type] and save to SD card'}),
                //     arguments: {
                //         type: {type: ArgumentType.STRING, defaultValue: 'photo'}
                //     }
                // },
                // {
                //     opcode: 'saveModelToSD',
                //     blockType: BlockType.COMMAND,
                //     text: formatMessage({
                //         id: 'huskylens.saveModelToSD',
                //         default: '[command] current algorithm data as model No. [data] on SD card'
                //     }),
                //     arguments: {
                //         command: {type: ArgumentType.STRING, defaultValue: 'save'},
                //         data: {type: ArgumentType.NUMBER, defaultValue: 0}
                //     }
                }
            ],
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
                                id: 'huskylens.menu.algorithm.line_trac',
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
                },
                resultTypeMenu: {
                    acceptReporters: false,
                    items: [
                        {
                            text: formatMessage({
                                id: 'huskylens.menu.resultTypeMenu.frame',
                                default: 'frame'
                            }),
                            value: HUSKYLENSResultType_t.HUSKYLENSResultBlock.toString()
                        },
                        {
                            text: formatMessage({
                                id: 'huskylens.menu.resultTypeMenu.arrow',
                                default: 'arrow'
                            }),
                            value: HUSKYLENSResultType_t.HUSKYLENSResultArrow.toString()
                        }
                    ]
                },
                parameterMenu: {
                    acceptReporters: false,
                    items: [
                        {
                            text: formatMessage({
                                id: 'huskylens.menu.parameterMenu.id',
                                default: 'ID'
                            }),
                            value: Content3.ID.toString()
                        },
                        {
                            text: formatMessage({
                                id: 'huskylens.menu.parameterMenu.xCenter',
                                default: 'X center'
                            }),
                            value: Content3.xCenter.toString()
                        },
                        {
                            text: formatMessage({
                                id: 'huskylens.menu.parameterMenu.yCenter',
                                default: 'Y center'
                            }),
                            value: Content3.yCenter.toString()
                        },
                        {
                            text: formatMessage({
                                id: 'huskylens.menu.parameterMenu.width',
                                default: 'width'
                            }),
                            value: Content3.width.toString()
                        },
                        {
                            text: formatMessage({
                                id: 'huskylens.menu.parameterMenu.height',
                                default: 'height'
                            }),
                            value: Content3.height.toString()
                        }
                    ]
                }
            }
        };
    }

    async selectAlgorithm (args) {
        await this.initMode(Number(args.algorithm));
    }

    async requestDataOnce () {
        await this.request();
    }

    getLearnedIDCount () {
        return this.getIds();
    }

    isObjectOnScreen (args) {
        this.isAppear_s(Number(args.Ht));
    }

    getBoxNearCenter (args) {
        this.readBox_s(args.data);
    }
}

export {ExtensionBlocks as default, ExtensionBlocks as blockClass};
