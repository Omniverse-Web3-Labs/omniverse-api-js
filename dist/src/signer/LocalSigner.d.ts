import { Signer } from './Signer';
export declare class LocalSigner implements Signer {
    privateKey: Uint8Array;
    constructor(privateKey: Uint8Array);
    sign(hash: Uint8Array): Promise<string>;
    /**
     * The signer omnvierse address
     *
     * @returns {string} omniverse address
     */
    address(): string;
}
//# sourceMappingURL=LocalSigner.d.ts.map