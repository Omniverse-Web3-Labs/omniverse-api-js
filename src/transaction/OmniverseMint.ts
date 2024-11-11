import {
  OmniTxType,
  Output,
  EIP712Domain,
  ABI_MINT_TYPE,
  Mint,
} from '../types';
import { toObject } from '../utils';
import { TransactionBase } from './TransactionBase';
import { TypedDataUtils } from 'ethers-eip712';
import { decodeParameter, encodeParameter } from 'web3-eth-abi';

export default class OmniverseMint extends TransactionBase {
  assetId: string;
  outputs: Array<Output>;

  constructor(tx: string | Mint) {
    super();
    try {
      let mint;
      if (typeof tx == 'string') {
        let decodeData = decodeParameter(ABI_MINT_TYPE, tx);
        mint = toObject(decodeData) as Mint;
      } else {
        mint = tx;
      }
      this.assetId = mint.assetId;
      this.outputs = mint.outputs;
      this.feeInputs = mint.feeInputs;
      this.feeOutputs = mint.feeOutputs;
      this.signature = mint.signature ? mint.signature : this.signature;
      this.gasPrice = mint.gasPrice;
    } catch (e) {
      throw new Error('Mint transaction data error');
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
        Mint: [
          { name: 'asset_id', type: 'bytes32' },
          { name: 'outputs', type: 'Output[]' },
          { name: 'fee_inputs', type: 'Input[]' },
          { name: 'fee_outputs', type: 'Output[]' },
          { name: 'gas_price', type: 'uint128' },
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
      primaryType: 'Mint' as const,
      domain: eip712Domain,
      message: {
        asset_id: this.assetId,
        outputs: this.outputs,
        fee_inputs: this.feeInputs,
        fee_outputs: this.feeOutputs,
        gas_price: this.gasPrice,
      },
    };
    return TypedDataUtils.encodeDigest(typedData);
  }

  encode(): string {
    return encodeParameter(ABI_MINT_TYPE, this);
  }
  getTxType(): OmniTxType {
    return OmniTxType.Mint;
  }
}
