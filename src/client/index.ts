import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import {
  BasicBlockInformation,
  BasicTokenInfo,
  BasicTransaction,
  BlockDetail,
  LatestInformation,
  Mint,
  NetworkParameters,
  OmniTxType,
  PagedList,
  TokenDetail,
  TokenInfo,
  UTXOSet,
} from '../types';
import {
  TokenMetadata,
  Output,
  EIP712Domain,
  Deploy,
  Transfer,
} from '../types/index';
import { Signer } from '../signer';
import { TransactionDetail } from '../types/index';
import {
  OmniverseDeploy,
  OmniverseMint,
  OmniverseTransfer,
} from '../transaction';

const { create } = axios;

export class OmniverseClient {
  private axiosInstance: AxiosInstance;
  private signer: Signer | undefined;
  public eip712Domain: EIP712Domain | undefined;
  public endpoint: string;

  constructor(endpoint: string, signer?: Signer, eip712Domain?: EIP712Domain) {
    this.endpoint = endpoint;
    this.axiosInstance = create();
    this.signer = signer;
    this.eip712Domain = eip712Domain;
  }

  public async init() {
    this.eip712Domain = (await this.getNetworkParameters()).eip712;
  }

  /**
   * Set signer of the omniverse client
   *
   * @param {Signer} signer The signer for signing omniverse transaction
   */
  public async setSigner(signer: Signer) {
    this.signer = signer;
  }

  public async rpc(
    method: string,
    params?: object,
    config?: AxiosRequestConfig,
  ): Promise<any> {
    let response = await this.axiosInstance.post(
      this.endpoint,
      {
        jsonrpc: '2.0',
        method: method,
        params,
        id: new Date().getTime(),
      },
      config,
    );
    if (response.data.error) {
      console.error('request error: ', response.data.error);
      throw Error(response.data.error.message);
    }
    return response.data.result;
  }

  public async getNetworkParameters(): Promise<NetworkParameters> {
    return this.rpc('getNetworkParameters');
  }

  /**
   * Pre-fetch the UTXOs associated with the mint transaction.
   *
   * @param {TokenMetadata} metadata The asset metadata
   * @param {Array<Output>} outputs Optinal, transfer fee token to `outputs`
   *
   * @returns {OmnvierseDeploy} The omniverse transaction
   */
  public async preDeploy(
    metadata: TokenMetadata,
    outputs?: Array<Output>,
  ): Promise<OmniverseDeploy> {
    let result = (await this.rpc('preDeploy', [metadata, outputs])) as Deploy;
    result.metadata = metadata;
    return new OmniverseDeploy(result);
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
  public async preMint(
    assetId: string,
    to: Array<Output>,
    sender: string,
  ): Promise<OmniverseMint> {
    let result = (await this.rpc('preMint', [
      { assetId, outputs: to, address: sender },
    ])) as Mint;
    result.assetId = assetId;
    result.outputs = to;
    return new OmniverseMint(result);
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
  public async preTransfer(
    assetId: string,
    to: Array<Output>,
    sender: string,
  ): Promise<OmniverseTransfer> {
    let result = await this.rpc('preTransfer', [
      { assetId, outputs: to, address: sender },
    ]);
    result.assetId = assetId;
    return new OmniverseTransfer(result);
  }

  /**
   * Get token list
   *
   * @param {number} page The token list on `page`th, 25 tokens/page
   *
   * @returns {PagedList<TokenInfo>} The token list information
   */
  public async getTokenList(page?: number): Promise<PagedList<TokenInfo>> {
    if (page == undefined || page < 1) {
      page = 1;
    }
    return this.rpc('getTokenList', [page]);
  }

  /**
   * Get block
   *
   * @param {number} blockHeight The block height
   *
   * @returns {BlockDetail} The block details
   */
  public async getBlock(blockHeight: number): Promise<BlockDetail> {
    return this.rpc('getBlock', [blockHeight]);
  }

  /**
   * Get account UTXOs
   *
   * @param {string} account The omniverse account
   *
   * @returns {PagedList<UTXOSet>} The account UTXOs
   */
  public async getUTXOSet(account: string): Promise<PagedList<UTXOSet>> {
    return this.rpc('getUTXOSet', [account]);
  }

  /**
   * Get token details
   *
   * @param {string} assetId The token asset id
   *
   * @returns {TokenDetail} The omniverse asset details
   */
  public async getTokenDetail(assetId: string): Promise<TokenDetail> {
    return this.rpc('getTokenDetail', [assetId]);
  }

  /**
   * Get token details
   *
   * @param {string} txid The transaction id
   *
   * @returns {TransactionDetail} The omniverse transaction details
   */
  public async getTransactionDetail(txid: string): Promise<TransactionDetail> {
    return this.rpc('getTransactionDetail', [txid]);
  }

  /**
   * Get omniverse chain latest information
   *
   * @returns {LatestInformation} The omniverse chain latest information
   */
  public async getLatestInformation(): Promise<LatestInformation> {
    return this.rpc('getLatestInformation');
  }

  /**
   * Get omniverse chain latest N-blocks information
   *
   * @returns {Array<BasicBlockInformation>} The omniverse chain latest N-blocks information
   */
  public async getLatestBlocks(): Promise<Array<BasicBlockInformation>> {
    return this.rpc('getLatestBlocks');
  }

  /**
   * Get omniverse chain latest N-transaction information
   *
   * @returns {Array<BasicBlockInformation>} The omniverse chain latest N-transaction information
   */
  public async getLatestTransactions(): Promise<Array<BasicTransaction>> {
    return this.rpc('getLatestTransactions');
  }

  /**
   * Get block list
   *
   * @param {number} page The block list on `page`th, 25 blocks/page
   *
   * @returns {PagedList<BasicBlockInformation>} The block list information
   */
  public async getBlockList(
    page?: number,
  ): Promise<PagedList<BasicBlockInformation>> {
    if (page == undefined || page < 1) {
      page = 1;
    }
    return this.rpc('getBlockList', [page]);
  }

  /**
   * Get transaction list
   *
   * @param {number} page The transaction list on `page`th, 25 transactions/page
   *
   * @returns {PagedList<BasicTransaction>} The transaction list information
   */
  public async getTransactionList(
    page?: number,
  ): Promise<PagedList<BasicTransaction>> {
    if (page == undefined || page < 1) {
      page = 1;
    }
    return this.rpc('getTransactionList', [page]);
  }

  /**
   * Get user latest transaction list
   *
   * @param {string} account The user omniverse account
   * @param {number} page The user transaction list on `page`th, 25 transactions/page
   * @param {number} txType The transaction type: `deploy`, `mint` or `transfer`
   *
   * @returns {PagedList<BasicTransaction>} The user latest transaction information on `page`th
   */
  public async getLatestUserTransaction(
    account: string,
    page: number,
    txType?: string,
  ): Promise<PagedList<BasicTransaction>> {
    if (page == undefined || page < 1) {
      page = 1;
    }
    return this.rpc('getLatestUserTransactions', [account, page, txType]);
  }

  /**
   * Get user token list
   *
   * @param {string} account The user omniverse account
   * @param {page} page Optinal, The user transaction list on `page`th, 25 transactions/page
   *
   * @returns {PagedList<BasicTransaction>} The user token list
   */
  public async getAccountInfo(
    account: string,
    page?: number,
  ): Promise<PagedList<BasicTokenInfo>> {
    return this.rpc('getAccountInfo', [account, page]);
  }

  /**
   * Get user token list
   *
   * @param {string} page The UTXO list on `page`th, 25 utxo/page
   *
   * @returns {PagedList<UTXOSet>} The UTXO list
   */
  public async getUTXOList(page: number): Promise<PagedList<UTXOSet>> {
    return this.rpc('getUTXOList', [page]);
  }

  /**
   * Get transaction by sequence id
   *
   * @param {number} sequenceId The transaction sequence id
   *
   * @returns {TransactionDetail} The transaction detail
   */
  public async getTxBySequenceId(
    sequenceId: number,
  ): Promise<TransactionDetail> {
    return this.rpc('getTxBySequenceId', [sequenceId]);
  }

  /**
   * Get the balance of asset
   *
   * @param {string} assetId The omniverse asset id
   * @param {string} account The omniverse account
   *
   * @returns {number} The balance of the asset
   */
  public async balanceOf(assetId: string, account: string): Promise<string> {
    return this.rpc('balanceOf', [assetId, account]);
  }
  /**
   * Send omniverse transaction
   *
   * @param {OmniverseDeploy | OmniverseMint | OmniverseTransfer} signedTx The signed omniverse transaction
   *
   * @returns {string} The omniverse transaction id
   */
  public async sendTransaction(
    signedTx: OmniverseDeploy | OmniverseMint | OmniverseTransfer,
    synchronizer_signature?: string,
  ): Promise<string> {
    let tx;
    if (signedTx.getTxType() == OmniTxType.Deploy) {
      let transfer = signedTx as Deploy;
      tx = {
        ...transfer,
        type: 'Deploy',
      };
    } else if (signedTx.getTxType() == OmniTxType.Mint) {
      let mint = signedTx as Mint;
      tx = {
        ...mint,
        type: 'Mint',
      };
    } else if (signedTx.getTxType() == OmniTxType.Transfer) {
      let mint = signedTx as Transfer;
      tx = {
        ...mint,
        type: 'Transfer',
      };
    }
    let args = synchronizer_signature ? [tx, synchronizer_signature] : [tx];
    return await this.rpc('sendTransaction', args);
  }

  /**
   * Sign for omniverse transaction
   *
   * @param {OmniverseDeploy | OmniverseMint | OmniverseTransfer} tx The omniverse transaction
   *
   * @returns {string} A signature of omniverse transaction
   */
  public async signTx(
    tx: OmniverseDeploy | OmniverseMint | OmniverseTransfer,
    signer?: Signer,
  ): Promise<OmniverseDeploy | OmniverseMint | OmniverseTransfer> {
    if (!this.eip712Domain) {
      throw Error('The eip712Domain is not configured.');
    }
    let hash = tx.getEIP712Hash(this.eip712Domain);
    if (signer) {
      tx.signature = await signer.sign(hash);
    } else {
      if (!this.signer) {
        throw Error('The signer is not configured.');
      }
      tx.signature = await this.signer.sign(hash);
    }
    return tx;
  }
}

/**
 * Create an instance of Omniverse client
 *
 * @param {string} endpoint The omniverse server endpoint
 *
 * @returns {OmniverseClient} A new instance of Omniverese Client
 */
export async function createInstance(
  endpoint: string,
): Promise<OmniverseClient> {
  const instance = new OmniverseClient(endpoint);
  await instance.init();
  // console.log(instance);
  return instance;
}
