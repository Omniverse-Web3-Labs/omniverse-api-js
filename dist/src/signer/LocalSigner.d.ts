import { Signer } from './Signer';
import * as fs from 'fs';
export declare class LocalSigner implements Signer {
    privateKey: Uint8Array;
    constructor(secretFile: fs.PathLike);
    sign(hash: Uint8Array): Promise<string>;
    /**
     * The signer omnvierse address
     *
     * @returns {string} omniverse address
     */
    address(): string;
}
//# sourceMappingURL=LocalSigner.d.ts.map