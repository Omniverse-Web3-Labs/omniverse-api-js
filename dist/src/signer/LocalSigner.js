"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalSigner = void 0;
const secp256k1_1 = require("@noble/curves/secp256k1");
class LocalSigner {
    constructor(privateKey) {
        this.privateKey = privateKey;
    }
    sign(hash) {
        return __awaiter(this, void 0, void 0, function* () {
            let signature = secp256k1_1.secp256k1.sign(hash, this.privateKey);
            return ('0x' + signature.toCompactHex() + (signature.recovery == 0 ? '1b' : '1c'));
        });
    }
    /**
     * The signer omnvierse address
     *
     * @returns {string} omniverse address
     */
    address() {
        return ('0x' +
            secp256k1_1.secp256k1.ProjectivePoint.fromPrivateKey(this.privateKey)
                .toHex(true)
                .substring(2));
    }
}
exports.LocalSigner = LocalSigner;
