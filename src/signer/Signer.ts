export interface Signer {
  /**
   * @notice Signs a 32-bytes message
   * @return {Uint8Array} 32-bytes-length message hash
   */
  sign(hash: Uint8Array): Promise<string>;

  /**
   * The signer omnvierse address
   *
   * @returns {string} Omniverse address
   */
  address(): string;
}
