"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OmniverseClient = void 0;
exports.createInstance = createInstance;
const axios_1 = __importDefault(require("axios"));
const types_1 = require("../types");
const transaction_1 = require("../transaction");
const { create } = axios_1.default;
class OmniverseClient {
    constructor(endpoint, signer, eip712Domain) {
        this.endpoint = endpoint;
        this.axiosInstance = create();
        this.signer = signer;
        this.eip712Domain = eip712Domain;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.eip712Domain = (yield this.getNetworkParameters()).eip712;
        });
    }
    /**
     * Set signer of the omniverse client
     *
     * @param {Signer} signer The signer for signing omniverse transaction
     */
    setSigner(signer) {
        return __awaiter(this, void 0, void 0, function* () {
            this.signer = signer;
        });
    }
    rpc(method, params, config) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield this.axiosInstance.post(this.endpoint, {
                jsonrpc: '2.0',
                method: method,
                params,
                id: new Date().getTime(),
            }, config);
            if (response.data.error) {
                console.error('request error: ', response.data.error);
                throw Error(response.data.error.message);
            }
            return response.data.result;
        });
    }
    getNetworkParameters() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.rpc('getNetworkParameters');
        });
    }
    /**
     * Pre-fetch the UTXOs associated with the mint transaction.
     *
     * @param {TokenMetadata} metadata The asset metadata
     *
     * @returns {OmnvierseDeploy} The omniverse transaction
     */
    preDeploy(metadata) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = (yield this.rpc('preDeploy', [metadata]));
            result.metadata = metadata;
            return new transaction_1.OmniverseDeploy(result);
        });
    }
    /**
     * Pre-fetch the UTXOs associated with the mint transaction.
     *
     * @param {string} assetId The asset id
     * @param {Array<Output>} to The asset receivers
     * @param {string} sender The omniverse address of sender
     *
     * @returns {OmniverseMint} The omniverse transaction
     */
    preMint(assetId, to, sender) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = (yield this.rpc('preMint', [
                { assetId, outputs: to, address: sender },
            ]));
            result.assetId = assetId;
            result.outputs = to;
            return new transaction_1.OmniverseMint(result);
        });
    }
    /**
     * Pre-fetch the UTXOs associated with the transfer transaction.
     *
     * @param {string} assetId The asset id
     * @param {Array<Output>} to The asset receivers
     * @param {string} sender The omniverse address of sender
     *
     * @returns {OmniverseTransfer} The omniverse transaction
     */
    preTransfer(assetId, to, sender) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.rpc('preTransfer', [
                { assetId, outputs: to, address: sender },
            ]);
            result.assetId = assetId;
            return new transaction_1.OmniverseTransfer(result);
        });
    }
    /**
     * Get token list
     *
     * @param {number} page The token list on `page`th, 25 tokens/page
     *
     * @returns {PagedList<TokenInfo>} The token list information
     */
    getTokenList(page) {
        return __awaiter(this, void 0, void 0, function* () {
            if (page == undefined || page < 1) {
                page = 1;
            }
            return this.rpc('getTokenList', [page]);
        });
    }
    /**
     * Get block
     *
     * @param {number} blockHeight The block height
     *
     * @returns {BlockDetail} The block details
     */
    getBlock(blockHeight) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.rpc('getBlock', [blockHeight]);
        });
    }
    /**
     * Get account UTXOs
     *
     * @param {string} account The omniverse account
     *
     * @returns {PagedList<UTXOSet>} The account UTXOs
     */
    getUTXOSet(account) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.rpc('getUTXOSet', [account]);
        });
    }
    /**
     * Get token details
     *
     * @param {string} assetId The token asset id
     *
     * @returns {TokenDetail} The omniverse asset details
     */
    getTokenDetail(assetId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.rpc('getTokenDetail', [assetId]);
        });
    }
    /**
     * Get token details
     *
     * @param {string} txid The transaction id
     *
     * @returns {TransactionDetail} The omniverse transaction details
     */
    getTransactionDetail(txid) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.rpc('getTransactionDetail', [txid]);
        });
    }
    /**
     * Get omniverse chain latest information
     *
     * @returns {LatestInformation} The omniverse chain latest information
     */
    getLatestInformation() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.rpc('getLatestInformation');
        });
    }
    /**
     * Get omniverse chain latest N-blocks information
     *
     * @returns {Array<BasicBlockInformation>} The omniverse chain latest N-blocks information
     */
    getLatestBlocks() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.rpc('getLatestBlocks');
        });
    }
    /**
     * Get omniverse chain latest N-transaction information
     *
     * @returns {Array<BasicBlockInformation>} The omniverse chain latest N-transaction information
     */
    getLatestTransactions() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.rpc('getLatestTransactions');
        });
    }
    /**
     * Get block list
     *
     * @param {number} page The block list on `page`th, 25 blocks/page
     *
     * @returns {PagedList<BasicBlockInformation>} The block list information
     */
    getBlockList(page) {
        return __awaiter(this, void 0, void 0, function* () {
            if (page == undefined || page < 1) {
                page = 1;
            }
            return this.rpc('getBlockList', [page]);
        });
    }
    /**
     * Get transaction list
     *
     * @param {number} page The transaction list on `page`th, 25 transactions/page
     *
     * @returns {PagedList<BasicTransaction>} The transaction list information
     */
    getTransactionList(page) {
        return __awaiter(this, void 0, void 0, function* () {
            if (page == undefined || page < 1) {
                page = 1;
            }
            return this.rpc('getTransactionList', [page]);
        });
    }
    /**
     * Get user latest transaction list
     *
     * @param {string} account The user omniverse account
     * @param {number} page The user transaction list on `page`th, 25 transactions/page
     *
     * @returns {PagedList<BasicTransaction>} The user latest transaction information on `page`th
     */
    getLatestUserTransaction(account, page) {
        return __awaiter(this, void 0, void 0, function* () {
            if (page == undefined || page < 1) {
                page = 1;
            }
            return this.rpc('getLatestUserTransactions', [account, page]);
        });
    }
    /**
     * Get user token list
     *
     * @param {string} account The user omniverse account
     *
     * @returns {PagedList<BasicTransaction>} The user token list
     */
    getAccountInfo(account) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.rpc('getAccountInfo', [account]);
        });
    }
    /**
     * Get user token list
     *
     * @param {string} page The UTXO list on `page`th, 25 utxo/page
     *
     * @returns {PagedList<UTXOSet>} The UTXO list
     */
    getUTXOList(page) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.rpc('getUTXOList', [page]);
        });
    }
    /**
     * Get transaction by sequence id
     *
     * @param {number} sequenceId The transaction sequence id
     *
     * @returns {TransactionDetail} The transaction detail
     */
    getTxBySequenceId(sequenceId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.rpc('getTxBySequenceId', [sequenceId]);
        });
    }
    /**
     * Get the balance of asset
     *
     * @param {string} assetId The omniverse asset id
     * @param {string} account The omniverse account
     *
     * @returns {number} The balance of the asset
     */
    balanceOf(assetId, account) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.rpc('balanceOf', [assetId, account]);
        });
    }
    /**
     * Send omniverse transaction
     *
     * @param {OmniverseDeploy | OmniverseMint | OmniverseTransfer} signedTx The signed omniverse transaction
     *
     * @returns {string} The omniverse transaction id
     */
    sendTransaction(signedTx, synchronizer_signature) {
        return __awaiter(this, void 0, void 0, function* () {
            let tx;
            if (signedTx.getTxType() == types_1.OmniTxType.Deploy) {
                let transfer = signedTx;
                tx = Object.assign(Object.assign({}, transfer), { type: 'Deploy' });
            }
            else if (signedTx.getTxType() == types_1.OmniTxType.Mint) {
                let mint = signedTx;
                tx = Object.assign(Object.assign({}, mint), { type: 'Mint' });
            }
            else if (signedTx.getTxType() == types_1.OmniTxType.Transfer) {
                let mint = signedTx;
                tx = Object.assign(Object.assign({}, mint), { type: 'Transfer' });
            }
            let args = synchronizer_signature ? [tx, synchronizer_signature] : [tx];
            return yield this.rpc('sendTransaction', args);
        });
    }
    /**
     * Sign for omniverse transaction
     *
     * @param {OmniverseDeploy | OmniverseMint | OmniverseTransfer} tx The omniverse transaction
     *
     * @returns {string} A signature of omniverse transaction
     */
    signTx(tx, signer) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.eip712Domain) {
                throw Error('The eip712Domain is not configured.');
            }
            let hash = tx.getEIP712Hash(this.eip712Domain);
            if (signer) {
                tx.signature = yield signer.sign(hash);
            }
            else {
                if (!this.signer) {
                    throw Error('The signer is not configured.');
                }
                tx.signature = yield this.signer.sign(hash);
            }
            return tx;
        });
    }
}
exports.OmniverseClient = OmniverseClient;
/**
 * Create an instance of Omniverse client
 *
 * @param {string} endpoint The omniverse server endpoint
 *
 * @returns {OmniverseClient} A new instance of Omniverese Client
 */
function createInstance(endpoint) {
    return __awaiter(this, void 0, void 0, function* () {
        const instance = new OmniverseClient(endpoint);
        yield instance.init();
        // console.log(instance);
        return instance;
    });
}
