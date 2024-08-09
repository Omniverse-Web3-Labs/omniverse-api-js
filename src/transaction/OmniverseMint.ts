import {
  OmniTxType,
  Output,
  EIP712Domain,
  ABI_MINT_TYPE,
  Mint,
} from '../types';
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
        mint = decodeParameter(ABI_MINT_TYPE, tx) as Mint;
      } else {
        mint = tx;
      }
      this.assetId = mint.assetId;
      this.outputs = mint.outputs;
      this.feeInputs = mint.feeInputs;
      this.feeOutputs = mint.feeOutputs;
      this.signature = mint.signature ? mint.signature : this.signature;
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
