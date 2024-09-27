import { Signer } from './Signer';
import { secp256k1 } from '@noble/curves/secp256k1';

export class LocalSigner implements Signer {
  privateKey: Uint8Array;

  constructor(privateKey: Uint8Array) {
    this.privateKey = privateKey;
  }

  async sign(hash: Uint8Array): Promise<string> {
    let signature = secp256k1.sign(hash, this.privateKey);
    return (
      '0x' + signature.toCompactHex() + (signature.recovery == 0 ? '1b' : '1c')
    );
  }

  /**
   * The signer omnvierse address
   *
   * @returns {string} omniverse address
   */
  address(): string {
    return (
      '0x' +
      secp256k1.ProjectivePoint.fromPrivateKey(this.privateKey)
        .toHex(true)
        .substring(2)
    );
  }
}
