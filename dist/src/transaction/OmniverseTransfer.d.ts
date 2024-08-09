import { OmniTxType, Input, Output, EIP712Domain, Transfer } from '../types';
import { TransactionBase } from './TransactionBase';
export default class OmniverseTransfer extends TransactionBase {
    assetId: string;
    inputs: Array<Input>;
    outputs: Array<Output>;
    constructor(tx: string | Transfer);
    getEIP712Hash(eip712Domain: EIP712Domain): Uint8Array;
    encode(): string;
    getTxType(): OmniTxType;
}
//# sourceMappingURL=OmniverseTransfer.d.ts.map