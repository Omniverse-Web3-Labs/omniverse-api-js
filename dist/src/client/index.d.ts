import { AxiosRequestConfig } from 'axios';
import { BasicBlockInformation, BasicTokenInfo, BasicTransaction, BlockDetail, LatestInformation, NetworkParameters, PagedList, TokenDetail, TokenInfo, UTXOSet } from '../types';
import { TokenMetadata, Output, EIP712Domain } from '../types/index';
import { Signer } from '../signer';
import { TransactionDetail } from '../types/index';
import { OmniverseDeploy, OmniverseMint, OmniverseTransfer } from '../transaction';
export declare class OmniverseClient {
    private axiosInstance;
    private signer;
    eip712Domain: EIP712Domain | undefined;
    endpoint: string;
    constructor(endpoint: string, signer?: Signer, eip712Domain?: EIP712Domain);
    init(): Promise<void>;
    /**
     * Set signer of the omniverse client
     *
     * @param {Signer} signer The signer for signing omniverse transaction
     */
    setSigner(signer: Signer): Promise<void>;
    rpc(method: string, params?: object, config?: AxiosRequestConfig): Promise<any>;
    getNetworkParameters(): Promise<NetworkParameters>;
    /**
     * Pre-fetch the UTXOs associated with the mint transaction.
     *
     * @param {TokenMetadata} metadata The asset metadata
     * @param {Array<Output>} outputs Optinal, transfer fee token to `outputs`
     *
     * @returns {OmnvierseDeploy} The omniverse transaction
     */
    preDeploy(metadata: TokenMetadata, outputs?: Array<Output>): Promise<OmniverseDeploy>;
    /**
     * Pre-fetch the UTXOs associated with the mint transaction.
     *
     * @param {string} assetId The asset id
     * @param {Array<Output>} to The asset receivers
     * @param {string} sender The omniverse address of sender
     *
     * @returns {OmniverseMint} The omniverse transaction
     */
    preMint(assetId: string, to: Array<Output>, sender: string): Promise<OmniverseMint>;
    /**
     * Pre-fetch the UTXOs associated with the transfer transaction.
     *
     * @param {string} assetId The asset id
     * @param {Array<Output>} to The asset receivers
     * @param {string} sender The omniverse address of sender
     *
     * @returns {OmniverseTransfer} The omniverse transaction
     */
    preTransfer(assetId: string, to: Array<Output>, sender: string): Promise<OmniverseTransfer>;
    /**
     * Get token list
     *
     * @param {number} page The token list on `page`th, 25 tokens/page
     *
     * @returns {PagedList<TokenInfo>} The token list information
     */
    getTokenList(page?: number): Promise<PagedList<TokenInfo>>;
    /**
     * Get block
     *
     * @param {number} blockHeight The block height
     *
     * @returns {BlockDetail} The block details
     */
    getBlock(blockHeight: number): Promise<BlockDetail>;
    /**
     * Get account UTXOs
     *
     * @param {string} account The omniverse account
     *
     * @returns {PagedList<UTXOSet>} The account UTXOs
     */
    getUTXOSet(account: string): Promise<PagedList<UTXOSet>>;
    /**
     * Get token details
     *
     * @param {string} assetId The token asset id
     *
     * @returns {TokenDetail} The omniverse asset details
     */
    getTokenDetail(assetId: string): Promise<TokenDetail>;
    /**
     * Get token details
     *
     * @param {string} txid The transaction id
     *
     * @returns {TransactionDetail} The omniverse transaction details
     */
    getTransactionDetail(txid: string): Promise<TransactionDetail>;
    /**
     * Get omniverse chain latest information
     *
     * @returns {LatestInformation} The omniverse chain latest information
     */
    getLatestInformation(): Promise<LatestInformation>;
    /**
     * Get omniverse chain latest N-blocks information
     *
     * @returns {Array<BasicBlockInformation>} The omniverse chain latest N-blocks information
     */
    getLatestBlocks(): Promise<Array<BasicBlockInformation>>;
    /**
     * Get omniverse chain latest N-transaction information
     *
     * @returns {Array<BasicBlockInformation>} The omniverse chain latest N-transaction information
     */
    getLatestTransactions(): Promise<Array<BasicTransaction>>;
    /**
     * Get block list
     *
     * @param {number} page The block list on `page`th, 25 blocks/page
     *
     * @returns {PagedList<BasicBlockInformation>} The block list information
     */
    getBlockList(page?: number): Promise<PagedList<BasicBlockInformation>>;
    /**
     * Get transaction list
     *
     * @param {number} page The transaction list on `page`th, 25 transactions/page
     *
     * @returns {PagedList<BasicTransaction>} The transaction list information
     */
    getTransactionList(page?: number): Promise<PagedList<BasicTransaction>>;
    /**
     * Get user latest transaction list
     *
     * @param {string} account The user omniverse account
     * @param {number} page The user transaction list on `page`th, 25 transactions/page
     * @param {number} txType The transaction type: `deploy`, `mint` or `transfer`
     *
     * @returns {PagedList<BasicTransaction>} The user latest transaction information on `page`th
     */
    getLatestUserTransaction(account: string, page: number, txType?: string): Promise<PagedList<BasicTransaction>>;
    /**
     * Get user token list
     *
     * @param {string} account The user omniverse account
     * @param {page} page Optinal, The user transaction list on `page`th, 25 transactions/page
     *
     * @returns {PagedList<BasicTransaction>} The user token list
     */
    getAccountInfo(account: string, page?: number): Promise<Array<BasicTokenInfo>>;
    /**
     * Get user token list
     *
     * @param {string} page The UTXO list on `page`th, 25 utxo/page
     *
     * @returns {PagedList<UTXOSet>} The UTXO list
     */
    getUTXOList(page: number): Promise<PagedList<UTXOSet>>;
    /**
     * Get transaction by sequence id
     *
     * @param {number} sequenceId The transaction sequence id
     *
     * @returns {TransactionDetail} The transaction detail
     */
    getTxBySequenceId(sequenceId: number): Promise<TransactionDetail>;
    /**
     * Get the balance of asset
     *
     * @param {string} assetId The omniverse asset id
     * @param {string} account The omniverse account
     *
     * @returns {number} The balance of the asset
     */
    balanceOf(assetId: string, account: string): Promise<string>;
    /**
     * Send omniverse transaction
     *
     * @param {OmniverseDeploy | OmniverseMint | OmniverseTransfer} signedTx The signed omniverse transaction
     *
     * @returns {string} The omniverse transaction id
     */
    sendTransaction(signedTx: OmniverseDeploy | OmniverseMint | OmniverseTransfer, synchronizer_signature?: string): Promise<string>;
    /**
     * Sign for omniverse transaction
     *
     * @param {OmniverseDeploy | OmniverseMint | OmniverseTransfer} tx The omniverse transaction
     *
     * @returns {string} A signature of omniverse transaction
     */
    signTx(tx: OmniverseDeploy | OmniverseMint | OmniverseTransfer, signer?: Signer): Promise<OmniverseDeploy | OmniverseMint | OmniverseTransfer>;
}
/**
 * Create an instance of Omniverse client
 *
 * @param {string} endpoint The omniverse server endpoint
 *
 * @returns {OmniverseClient} A new instance of Omniverese Client
 */
export declare function createInstance(endpoint: string): Promise<OmniverseClient>;
//# sourceMappingURL=index.d.ts.map