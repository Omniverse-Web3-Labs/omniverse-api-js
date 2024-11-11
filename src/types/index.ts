export type Input = {
  txid: string;
  index: number;
  amount: string;
  address: string;
};

export type Output = {
  address: string;
  amount: string;
};

export type TokenMetadata = {
  name: string;
  deployer: string;
  mintPayee: string;
  mintAmount: string;
  price: string;
  totalSupply: string;
};

export type Transfer = {
  assetId: string;
  signature: string;
  inputs: Array<Input>;
  outputs: Array<Output>;
  feeInputs: Array<Input>;
  feeOutputs: Array<Output>;
  gasPrice: string;
};

export type Deploy = {
  metadata: TokenMetadata;
  signature: string;
  outputs: Array<Output>;
  feeInputs: Array<Input>;
  feeOutputs: Array<Output>;
  gasPrice: string;
};

export type Mint = {
  assetId: string;
  signature: string;
  outputs: Array<Output>;
  feeInputs: Array<Input>;
  feeOutputs: Array<Output>;
  gasPrice: string;
};

export type EIP712Domain = {
  name: string;
  version: string;
  chainId: number;
  verifyingContract: string;
};

export type AssetsParameters = {
  decimals: number;
  price: string;
};

export type FeeParameters = {
  assetId: string;
  receiver: string;
  amount: string;
};

export type SystemParameters = {
  maxTxUTXO: number;
};

export type NetworkParameters = {
  eip712: EIP712Domain;
  assets: AssetsParameters;
  fee: FeeParameters;
  system: SystemParameters;
};

export type PreTransaction = {
  inputs: Array<Input>;
  outputs: Array<Output>;
  feeInputs: Array<Input>;
  feeOutputs: Array<Output>;
};

export type TokenInfo = {
  name: string;
  amount: string;
  assetId: string;
  mintAmount: string;
  deployTime: number;
  progress: number;
  holders: number;
};

export type BasicTokenInfo = {
  amount: string;
  assetId: string;
  deployTime: number;
  holders: number;
  mintAmount: string;
  name: string;
  progress: number;
};

export type TokenMetadataDetail = {
  name: string;
  deployer: string;
  mintPayee: string;
  mintAmount: string;
  currentSupply: string;
  price: string;
  totalSupply: string;
  timstamp: number;
  deployTxid: string;
};

export type TokenDetail = {
  assetId: string;
  metadata: TokenMetadataDetail;
  holder: number;
  txNumber: number;
};

export type BasicCommitment = {
  chainName: string;
  blockHeight: number;
  txHash: string;
};

export type BasicTransaction = {
  assetId: string;
  blockHeight: number;
  gasFee: string;
  sequenceId: string;
  txId: string;
  txStatus: string;
  txTimestamp: number;
  txType: string;
  value: string | null;
};

export type PagedList<T> = {
  data: Array<T>;
  numberPerPage: number;
  page: number;
  totalNumber: number;
};

export type BlockDetail = {
  blockHash: string;
  blockHeight: number;
  blockTimeStamp: number;
  commitments: Array<BasicCommitment>;
  txs: Array<BasicTransaction>;
};

export type UTXOSet = {
  address: string;
  assetId: string;
  amount: string;
  preTxid: string;
  preIndex: number;
  blockHeight: number;
};

export type OmniverseTx = {
  operation: Deploy | Mint | Transfer;
  from: string;
  createdAt: string;
};

export type TransactionDetail = {
  tx: OmniverseTx;
  assetId: string;
  blockHeight: number;
  success: Boolean;
  failReason: string | null;
  gasFee: string;
};

export type LatestInformation = {
  blockHash: string;
  blockHeight: number;
  totalTransactionNumber: number;
  tokenTypeNumber: number;
  latestBatchId: number;
  midGasPrice: string;
};

export type BasicBlockInformation = {
  blockHash: string;
  blockHeight: number;
  blockTimeStamp: number;
  txNumber: number;
};

export enum OmniTxType {
  Deploy,
  Mint,
  Transfer,
}

// abi encoding and decoding
export const ABI_DEPLOY_TYPE = {
  components: [
    {
      components: [
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
          internalType: 'bytes32',
          name: 'mintPayee',
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
    {
      internalType: 'uint128',
      name: 'gasPrice',
      type: 'uint128',
    },
  ],
  internalType: 'struct Types.Deploy',
  name: 'dp',
  type: 'tuple',
};

export const ABI_MINT_TYPE = {
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
    {
      internalType: 'uint128',
      name: 'gasPrice',
      type: 'uint128',
    },
  ],
  internalType: 'struct Types.Mint',
  name: 'mint',
  type: 'tuple',
};

export const ABI_TRANSFER_TYPE = {
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
    {
      internalType: 'uint128',
      name: 'gasPrice',
      type: 'uint128',
    },
  ],
  internalType: 'struct Types.Transfer',
  name: 'transfer',
  type: 'tuple',
};
