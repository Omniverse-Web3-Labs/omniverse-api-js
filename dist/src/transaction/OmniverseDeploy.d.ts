import { OmniTxType, EIP712Domain, Deploy, TokenMetadata } from '../types';
import { TransactionBase } from './TransactionBase';
export default class OmniverseDeploy extends TransactionBase {
    metadata: TokenMetadata;
    constructor(tx: string | Deploy);
    getEIP712Hash(eip712Domain: EIP712Domain): Uint8Array;
    encode(): string;
    getTxType(): OmniTxType;
}
//# sourceMappingURL=OmniverseDeploy.d.ts.map