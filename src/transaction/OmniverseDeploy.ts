import {
  OmniTxType,
  EIP712Domain,
  ABI_DEPLOY_TYPE,
  Deploy,
  TokenMetadata,
} from '../types';
import { toObject } from '../utils';
import { TransactionBase } from './TransactionBase';
import { TypedDataUtils } from 'ethers-eip712';
import { decodeParameter, encodeParameter } from 'web3-eth-abi';

export default class OmniverseDeploy extends TransactionBase {
  metadata: TokenMetadata;

  constructor(tx: string | Deploy) {
    super();
    try {
      let deploy;
      if (typeof tx === 'string') {
        let decodeData = decodeParameter(ABI_DEPLOY_TYPE, tx);
        deploy = toObject(decodeData) as Deploy;
      } else {
        deploy = tx;
      }
      this.metadata = deploy.metadata;
      this.feeInputs = deploy.feeInputs;
      this.feeOutputs = deploy.feeOutputs;
      this.signature = deploy.signature ? deploy.signature : this.signature;
    } catch (e) {
      throw new Error('Transfer transaction data error');
    }
  }

  getEIP712Hash(eip712Domain: EIP712Domain): Uint8Array {
    let typedData = {
      types: {
        EIP712Domain: [
          { name: 'name', type: 'string' },
          { name: 'version', type: 'string' },
          { name: 'chainId', type: 'uint256' },
          { name: 'verifyingContract', type: 'address' },
        ],
        Deploy: [
          { name: 'salt', type: 'bytes8' },
          { name: 'name', type: 'string' },
          { name: 'deployer', type: 'bytes32' },
          { name: 'mint_amount', type: 'uint128' },
          { name: 'price', type: 'uint128' },
          { name: 'total_supply', type: 'uint128' },
          { name: 'fee_inputs', type: 'Input[]' },
          { name: 'fee_outputs', type: 'Output[]' },
        ],
        Input: [
          { name: 'txid', type: 'bytes32' },
          { name: 'index', type: 'uint32' },
          { name: 'amount', type: 'uint128' },
          { name: 'address', type: 'bytes32' },
        ],
        Output: [
          { name: 'amount', type: 'uint128' },
          { name: 'address', type: 'bytes32' },
        ],
      },
      primaryType: 'Deploy' as const,
      domain: eip712Domain,
      message: {
        salt: this.metadata.salt,
        name: this.metadata.name,
        deployer: this.metadata.deployer,
        total_supply: this.metadata.totalSupply,
        mint_amount: this.metadata.mintAmount,
        price: this.metadata.price,
        fee_inputs: this.feeInputs,
        fee_outputs: this.feeOutputs,
      },
    };
    return TypedDataUtils.encodeDigest(typedData);
  }

  encode(): string {
    return encodeParameter(ABI_DEPLOY_TYPE, this);
  }

  getTxType(): OmniTxType {
    return OmniTxType.Transfer;
  }
}
