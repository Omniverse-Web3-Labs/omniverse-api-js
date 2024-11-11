"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const utils_1 = require("../utils");
const TransactionBase_1 = require("./TransactionBase");
const ethers_eip712_1 = require("ethers-eip712");
const web3_eth_abi_1 = require("web3-eth-abi");
class OmniverseTransfer extends TransactionBase_1.TransactionBase {
    constructor(tx) {
        super();
        try {
            let transfer;
            if (typeof tx == 'string') {
                let decodeData = (0, web3_eth_abi_1.decodeParameter)(types_1.ABI_TRANSFER_TYPE, tx);
                transfer = (0, utils_1.toObject)(decodeData);
            }
            else {
                transfer = tx;
            }
            this.assetId = transfer.assetId;
            this.inputs = transfer.inputs;
            this.outputs = transfer.outputs;
            this.feeInputs = transfer.feeInputs;
            this.feeOutputs = transfer.feeOutputs;
            this.signature = transfer.signature;
            this.gasPrice = transfer.gasPrice;
        }
        catch (e) {
            throw new Error('Transfer transaction data error');
        }
    }
    getEIP712Hash(eip712Domain) {
        let typedData = {
            types: {
                EIP712Domain: [
                    { name: 'name', type: 'string' },
                    { name: 'version', type: 'string' },
                    { name: 'chainId', type: 'uint256' },
                    { name: 'verifyingContract', type: 'address' },
                ],
                Transfer: [
                    { name: 'asset_id', type: 'bytes32' },
                    { name: 'inputs', type: 'Input[]' },
                    { name: 'outputs', type: 'Output[]' },
                    { name: 'fee_inputs', type: 'Input[]' },
                    { name: 'fee_outputs', type: 'Output[]' },
                    { name: 'gas_price', type: 'uint128' },
                ],
                Input: [
                    { name: 'txid', type: 'bytes32' },
                    { name: 'index', type: 'uint32' },
                    { name: 'amount', type: 'uint128' },
                    { name: 'address', type: 'bytes32' },
                ],
                Output: [
                    { name: 'amount', type: 'uint128' },
                    { name: 'address', type: 'bytes32' },
                ],
            },
            primaryType: 'Transfer',
            domain: eip712Domain,
            message: {
                asset_id: this.assetId,
                inputs: this.inputs,
                outputs: this.outputs,
                fee_inputs: this.feeInputs,
                fee_outputs: this.feeOutputs,
                gas_price: this.gasPrice,
            },
        };
        return ethers_eip712_1.TypedDataUtils.encodeDigest(typedData);
    }
    encode() {
        return (0, web3_eth_abi_1.encodeParameter)(types_1.ABI_TRANSFER_TYPE, this);
    }
    getTxType() {
        return types_1.OmniTxType.Transfer;
    }
}
exports.default = OmniverseTransfer;
