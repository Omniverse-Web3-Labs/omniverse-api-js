"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ABI_TRANSFER_TYPE = exports.ABI_MINT_TYPE = exports.ABI_DEPLOY_TYPE = exports.OmniTxType = void 0;
var OmniTxType;
(function (OmniTxType) {
    OmniTxType[OmniTxType["Deploy"] = 0] = "Deploy";
    OmniTxType[OmniTxType["Mint"] = 1] = "Mint";
    OmniTxType[OmniTxType["Transfer"] = 2] = "Transfer";
})(OmniTxType || (exports.OmniTxType = OmniTxType = {}));
// abi encoding and decoding
exports.ABI_DEPLOY_TYPE = {
    components: [
        {
            components: [
                {
                    internalType: 'bytes8',
                    name: 'salt',
                    type: 'bytes8',
                },
                {
                    internalType: 'string',
                    name: 'name',
                    type: 'string',
                },
                {
                    internalType: 'bytes32',
                    name: 'deployer',
                    type: 'bytes32',
                },
                {
                    internalType: 'uint128',
                    name: 'totalSupply',
                    type: 'uint128',
                },
                {
                    internalType: 'uint128',
                    name: 'mintAmount',
                    type: 'uint128',
                },
                {
                    internalType: 'uint128',
                    name: 'price',
                    type: 'uint128',
                },
            ],
            internalType: 'struct Types.Metadata',
            name: 'metadata',
            type: 'tuple',
        },
        {
            internalType: 'bytes',
            name: 'signature',
            type: 'bytes',
        },
        {
            components: [
                {
                    internalType: 'bytes32',
                    name: 'txid',
                    type: 'bytes32',
                },
                {
                    internalType: 'uint64',
                    name: 'index',
                    type: 'uint64',
                },
                {
                    internalType: 'uint128',
                    name: 'amount',
                    type: 'uint128',
                },
                {
                    internalType: 'bytes32',
                    name: 'address',
                    type: 'bytes32',
                },
            ],
            internalType: 'struct Types.Input[]',
            name: 'feeInputs',
            type: 'tuple[]',
        },
        {
            components: [
                {
                    internalType: 'bytes32',
                    name: 'address',
                    type: 'bytes32',
                },
                {
                    internalType: 'uint128',
                    name: 'amount',
                    type: 'uint128',
                },
            ],
            internalType: 'struct Types.Output[]',
            name: 'feeOutputs',
            type: 'tuple[]',
        },
    ],
    internalType: 'struct Types.Deploy',
    name: 'dp',
    type: 'tuple',
};
exports.ABI_MINT_TYPE = {
    components: [
        {
            internalType: 'bytes32',
            name: 'assetId',
            type: 'bytes32',
        },
        {
            internalType: 'bytes',
            name: 'signature',
            type: 'bytes',
        },
        {
            components: [
                {
                    internalType: 'bytes32',
                    name: 'address',
                    type: 'bytes32',
                },
                {
                    internalType: 'uint128',
                    name: 'amount',
                    type: 'uint128',
                },
            ],
            internalType: 'struct Types.Output[]',
            name: 'outputs',
            type: 'tuple[]',
        },
        {
            components: [
                {
                    internalType: 'bytes32',
                    name: 'txid',
                    type: 'bytes32',
                },
                {
                    internalType: 'uint64',
                    name: 'index',
                    type: 'uint64',
                },
                {
                    internalType: 'uint128',
                    name: 'amount',
                    type: 'uint128',
                },
                {
                    internalType: 'bytes32',
                    name: 'address',
                    type: 'bytes32',
                },
            ],
            internalType: 'struct Types.Input[]',
            name: 'feeInputs',
            type: 'tuple[]',
        },
        {
            components: [
                {
                    internalType: 'bytes32',
                    name: 'address',
                    type: 'bytes32',
                },
                {
                    internalType: 'uint128',
                    name: 'amount',
                    type: 'uint128',
                },
            ],
            internalType: 'struct Types.Output[]',
            name: 'feeOutputs',
            type: 'tuple[]',
        },
    ],
    internalType: 'struct Types.Mint',
    name: 'mint',
    type: 'tuple',
};
exports.ABI_TRANSFER_TYPE = {
    components: [
        {
            internalType: 'bytes32',
            name: 'assetId',
            type: 'bytes32',
        },
        {
            internalType: 'bytes',
            name: 'signature',
            type: 'bytes',
        },
        {
            components: [
                {
                    internalType: 'bytes32',
                    name: 'txid',
                    type: 'bytes32',
                },
                {
                    internalType: 'uint64',
                    name: 'index',
                    type: 'uint64',
                },
                {
                    internalType: 'uint128',
                    name: 'amount',
                    type: 'uint128',
                },
                {
                    internalType: 'bytes32',
                    name: 'address',
                    type: 'bytes32',
                },
            ],
            internalType: 'struct Types.Input[]',
            name: 'inputs',
            type: 'tuple[]',
        },
        {
            components: [
                {
                    internalType: 'bytes32',
                    name: 'address',
                    type: 'bytes32',
                },
                {
                    internalType: 'uint128',
                    name: 'amount',
                    type: 'uint128',
                },
            ],
            internalType: 'struct Types.Output[]',
            name: 'outputs',
            type: 'tuple[]',
        },
        {
            components: [
                {
                    internalType: 'bytes32',
                    name: 'txid',
                    type: 'bytes32',
                },
                {
                    internalType: 'uint64',
                    name: 'index',
                    type: 'uint64',
                },
                {
                    internalType: 'uint128',
                    name: 'amount',
                    type: 'uint128',
                },
                {
                    internalType: 'bytes32',
                    name: 'address',
                    type: 'bytes32',
                },
            ],
            internalType: 'struct Types.Input[]',
            name: 'feeInputs',
            type: 'tuple[]',
        },
        {
            components: [
                {
                    internalType: 'bytes32',
                    name: 'address',
                    type: 'bytes32',
                },
                {
                    internalType: 'uint128',
                    name: 'amount',
                    type: 'uint128',
                },
            ],
            internalType: 'struct Types.Output[]',
            name: 'feeOutputs',
            type: 'tuple[]',
        },
    ],
    internalType: 'struct Types.Transfer',
    name: 'transfer',
    type: 'tuple',
};
