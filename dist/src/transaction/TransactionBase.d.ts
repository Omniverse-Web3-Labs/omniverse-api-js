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
export declare abstract class TransactionBase implements OmniverseTx {
    feeInputs: Array<Input>;
    feeOutputs: Array<Output>;
    signature: string;
    gasPrice: string;
    abstract getEIP712Hash(eip712Domain: EIP712Domain): Uint8Array;
    abstract getTxType(): OmniTxType;
    abstract encode(): string;
}
//# sourceMappingURL=TransactionBase.d.ts.map