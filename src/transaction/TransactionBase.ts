import { OmniTxType, Input, Output, EIP712Domain } from '../types';

export interface OmniverseTx {
  /**
   * @notice Returns the EIP712 hash of the omniverse transaction
   */
  getEIP712Hash(eip712Domain: EIP712Domain): Uint8Array;

  /**
   * @notice Returns the omniverse transaction type
   */
  getTxType(): OmniTxType;

  /**
   * @notice Returns the data of abi encode omniverse transaction
   */
  encode(): string;
}

export abstract class TransactionBase implements OmniverseTx {
  feeInputs: Array<Input> = [];
  feeOutputs: Array<Output> = [];
  signature: string = '0x';
  gasPrice: string = '0';

  abstract getEIP712Hash(eip712Domain: EIP712Domain): Uint8Array;
  abstract getTxType(): OmniTxType;
  abstract encode(): string;
}
