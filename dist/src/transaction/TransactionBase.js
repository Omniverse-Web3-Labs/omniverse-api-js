"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionBase = void 0;
class TransactionBase {
    constructor() {
        this.feeInputs = [];
        this.feeOutputs = [];
        this.signature = '0x';
        this.gasPrice = '0';
    }
}
exports.TransactionBase = TransactionBase;
