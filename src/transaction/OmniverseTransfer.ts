import {
  OmniTxType,
  Input,
  Output,
  EIP712Domain,
  ABI_TRANSFER_TYPE,
  Transfer,
} from '../types';
import { toObject } from '../utils';
import { TransactionBase } from './TransactionBase';
import { TypedDataUtils } from 'ethers-eip712';
import { decodeParameter, encodeParameter } from 'web3-eth-abi';

export default class OmniverseTransfer extends TransactionBase {
  assetId: string;
  inputs: Array<Input>;
  outputs: Array<Output>;

  constructor(tx: string | Transfer) {
    super();
    try {
      let transfer;
      if (typeof tx == 'string') {
        let decodeData = decodeParameter(ABI_TRANSFER_TYPE, tx);
        transfer = toObject(decodeData) as Transfer;
      } else {
        transfer = tx;
      }
      this.assetId = transfer.assetId;
      this.inputs = transfer.inputs;
      this.outputs = transfer.outputs;
      this.feeInputs = transfer.feeInputs;
      this.feeOutputs = transfer.feeOutputs;
      this.signature = transfer.signature;
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
        Transfer: [
          { name: 'asset_id', type: 'bytes32' },
          { name: 'inputs', type: 'Input[]' },
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
      primaryType: 'Transfer' as const,
      domain: eip712Domain,
      message: {
        asset_id: this.assetId,
        inputs: this.inputs,
        outputs: this.outputs,
        fee_inputs: this.feeInputs,
        fee_outputs: this.feeOutputs,
      },
    };
    return TypedDataUtils.encodeDigest(typedData);
  }

  encode(): string {
    return encodeParameter(ABI_TRANSFER_TYPE, this);
  }
  getTxType(): OmniTxType {
    return OmniTxType.Transfer;
  }
}
