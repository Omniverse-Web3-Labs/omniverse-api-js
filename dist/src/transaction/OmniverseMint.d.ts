import { OmniTxType, Output, EIP712Domain, Mint } from '../types';
import { TransactionBase } from './TransactionBase';
export default class OmniverseMint extends TransactionBase {
    assetId: string;
    outputs: Array<Output>;
    constructor(tx: string | Mint);
    getEIP712Hash(eip712Domain: EIP712Domain): Uint8Array;
    encode(): string;
    getTxType(): OmniTxType;
}
//# sourceMappingURL=OmniverseMint.d.ts.map