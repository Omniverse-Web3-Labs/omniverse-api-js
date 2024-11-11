"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const utils_1 = require("../utils");
const TransactionBase_1 = require("./TransactionBase");
const ethers_eip712_1 = require("ethers-eip712");
const web3_eth_abi_1 = require("web3-eth-abi");
class OmniverseDeploy extends TransactionBase_1.TransactionBase {
    constructor(tx) {
        super();
        try {
            let deploy;
            if (typeof tx === 'string') {
                let decodeData = (0, web3_eth_abi_1.decodeParameter)(types_1.ABI_DEPLOY_TYPE, tx);
                deploy = (0, utils_1.toObject)(decodeData);
            }
            else {
                deploy = tx;
            }
            this.metadata = deploy.metadata;
            this.outputs = deploy.outputs;
            this.feeInputs = deploy.feeInputs;
            this.feeOutputs = deploy.feeOutputs;
            this.signature = deploy.signature ? deploy.signature : this.signature;
            this.gasPrice = deploy.gasPrice;
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
                Deploy: [
                    { name: 'name', type: 'string' },
                    { name: 'deployer', type: 'bytes32' },
                    { name: 'mint_payee', type: 'bytes32' },
                    { name: 'mint_amount', type: 'uint128' },
                    { name: 'price', type: 'uint128' },
                    { name: 'total_supply', type: 'uint128' },
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
            primaryType: 'Deploy',
            domain: eip712Domain,
            message: {
                name: this.metadata.name,
                deployer: this.metadata.deployer,
                mint_payee: this.metadata.mintPayee,
                total_supply: this.metadata.totalSupply,
                mint_amount: this.metadata.mintAmount,
                price: this.metadata.price,
                outputs: this.outputs,
                fee_inputs: this.feeInputs,
                fee_outputs: this.feeOutputs,
                gas_price: this.gasPrice,
            },
        };
        return ethers_eip712_1.TypedDataUtils.encodeDigest(typedData);
    }
    encode() {
        return (0, web3_eth_abi_1.encodeParameter)(types_1.ABI_DEPLOY_TYPE, this);
    }
    getTxType() {
        return types_1.OmniTxType.Transfer;
    }
}
exports.default = OmniverseDeploy;
