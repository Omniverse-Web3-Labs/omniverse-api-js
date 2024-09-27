import { createInstance, OmniverseClient } from '../src/client';
// import { OmniverseTransfer } from '../src/transaction';
// import { Output, TokenMetadata } from '../src/types/index';
// import { Signer } from '../src/signer/Signer';
import { LocalSigner } from '../src/signer';
// import { OmniverseDeploy } from '../src/transaction';
import { Deploy, Output } from '../src/types';
import * as ethers from 'ethers';

// const SEVER_ENDPOINT = 'http://3.236.195.117:6358';
const SEVER_ENDPOINT = 'http://127.0.0.1:6358';
const GASS_ASSET_ID =
  '0x0000000000000000000000000000000000000000000000000000000000000000';
describe('Omniverse beacon', async () => {
  let client: OmniverseClient;
  // await client.init();
  // console.log(client);

  before(async () => {
    client = await createInstance(SEVER_ENDPOINT);
  });

  // it('Test get network parameters', async () => {
  //   let networkParams = await client.getNetworkParameters();
  //   console.log(networkParams);
  // });

  // it('Test pre deploy', async () => {
  //   let metadata: TokenMetadata = {
  //     name: 'MyTest',
  //     salt: '0x0000000000000000',
  //     deployer:
  //       '0x3d35faaaedf7506cfe7d6dba324cc339d271b5aca056e093e6dfd2a114ade93b',
  //     totalSupply: '2100000000000000000000',
  //     price: '1000000000000',
  //     mintAmount: '10000000000000',
  //   };
  //   let preDeployData = await client.preDeploy(metadata);
  //   console.log(preDeployData);
  // });

  // it('Test pre transfer', async () => {
  //   let assetId = '0x0000000000000000000000000000000000000000000000000000000000000000'
  //   let to: Array<Output> = [
  //     {
  //       address: "0x9508a08ca89918b734de0e5e91c1004a92c1f56a6120edfdcf9dd2ba2d7c70b9",
  //       amount: "100000000000000"
  //     },
  //     {
  //       address: "0xad3afa98a63e6dcf629bdb8b3a49ad32d2774a36fb28d9ed5f1e6bd9ae9e8574",
  //       amount: "300000000000000"
  //     }
  //   ]
  //   let sender = '0x3d35faaaedf7506cfe7d6dba324cc339d271b5aca056e093e6dfd2a114ade93b';
  //   let transferData = await client.preTransfer(assetId, to, sender);
  //   // let networkParams = await client.getNetworkParameters(doma)
  //   let OmniTx = new OmniverseTransfer(transferData)
  //   console.log(transferData)
  // });

  // it('Test get token list', async () => {
  //   let tokenList = await client.getTokenList();
  //   console.log(tokenList);
  // });

  // it('Test get token details', async () => {
  //   let assetId =
  //     '0x0000000000000000000000000000000000000000000000000000000000000000';
  //   let tokenDetail = await client.getTokenDetail(assetId);
  //   console.log(tokenDetail);
  // });

  // it('Test get block details', async () => {
  //   let blockNumber = 1;
  //   let blockDetail = await client.getBlock(blockNumber);
  //   console.log(blockDetail);
  // });

  // it('Test get utxo set', async () => {
  //   let account = '0xbf094f49774fad091e1ffd7d0d65676b495ec9c656509b47358dcfe76ee03491';
  //   let utxoSet = await client.getUTXOSet(account);
  //   console.log(utxoSet);
  // });

  // it('Test get token detail', async () => {
  //   const gasAssetDetail = await client.getTokenDetail(GASS_ASSET_ID);
  //   console.log(gasAssetDetail);
  // });

  // it('Test get transaction detail', async () => {
  //   const txid = '0x38c91b5d6bcb12100a3961aa6e03c9e15dbf51429dc512b38cf68cbcfd286e68';
  //   const transactionDetail = await client.getTransactionDetail(txid);
  //   console.log(transactionDetail);
  // });

  // it('Test get latest transactions', async () => {
  //   const latestTransacitons = await client.getLatestInformation();
  //   console.log(latestTransacitons)
  // });

  // it('Test get latest blocks', async () => {
  //   const latestBlocks = await client.getLatestBlocks();
  //   console.log(latestBlocks)
  // });

  // it('Test get latest transactions', async () => {
  //   const latestTransactions = await client.getLatestTransactions();
  //   console.log(latestTransactions);
  // });

  // it('Test get block list', async () => {
  //   const blockList = await client.getBlockList(1);
  //   console.log(blockList);
  // });

  // it('Test get transaction list', async () => {
  //   const transactionList = await client.getTransactionList(1);
  //   console.log(transactionList);
  // });

  // it('Test get latest user transaction', async () => {
  //   const account =
  //     '0xbf094f49774fad091e1ffd7d0d65676b495ec9c656509b47358dcfe76ee03491';
  //   const latestTransaction = await client.getLatestUserTransaction(account, 1);
  //   console.log(latestTransaction);
  // });

  // it('Test get user account information', async () => {
  //   const account =
  //     '0xbf094f49774fad091e1ffd7d0d65676b495ec9c656509b47358dcfe76ee03491';
  //   const accountInformation = await client.getAccountInfo(account);
  //   console.log(accountInformation);
  // });

  // it('Test get transaction by sequence id', async () => {
  //   const sequenceId = 1;
  //   const transaction = await client.getTxBySequenceId(sequenceId);
  //   console.log(transaction)
  // })

  // it('Test balance of', async () => {
  //   const account = '0xbf094f49774fad091e1ffd7d0d65676b495ec9c656509b47358dcfe76ee03491';
  //   const balance = await client.balanceOf(GASS_ASSET_ID, account);
  //   console.log(balance);
  // })

  // it('Test send transaction', async () => {
  //   const account = '0xbf094f49774fad091e1ffd7d0d65676b495ec9c656509b47358dcfe76ee03491';
  // })

  // it('Test Signer', async () => {
  //   let assetId =
  //     '0x35ca0c8ae3163486d6b47bcedb407f41b1e9208a7434e5ebfde834f748bf7f96';
  //   // console.log(await client.getNetworkParameters());
  //   const signer_1 = new LocalSigner('./.secret');
  //   const signer_2 = new LocalSigner('./.secret_2');
  //   // const balance = await client.balanceOf(GASS_ASSET_ID, signer.address());
  //   // console.log(balance);
  //   const outputs_1: Array<Output> = [
  //     {
  //       address:
  //         '0xad3afa98a63e6dcf629bdb8b3a49ad32d2774a36fb28d9ed5f1e6bd9ae9e8574',
  //       amount: '30',
  //     },
  //     {
  //       address:
  //         '0x9508a08ca89918b734de0e5e91c1004a92c1f56a6120edfdcf9dd2ba2d7c70b9',
  //       amount: '30',
  //     },
  //   ];
  //   const outputs_2: Array<Output> = [
  //     {
  //       address:
  //         '0xd768e745a78f12463d3757a7fc82acad9c83a94e464e2b5887ff856d0a323940',
  //       amount: '30',
  //     },
  //     {
  //       address:
  //         '0xa921d8a41f31ceaa75ec911d7a825e520fb674850b5ee74eae486c030b09a335',
  //       amount: '30',
  //     },
  //   ];
  //   const preTransfer_1 = await client.preMint(
  //     assetId,
  //     outputs_1,
  //     signer_1.address()
  //   );
  //   const preTransfer_2 = await client.preMint(
  //     assetId,
  //     outputs_2,
  //     signer_2.address()
  //   );
  //   // console.log(preTransfer_1, preTransfer_2);
  //   // console.log(preTransfer);
  //   // // console.log(client.eip712Domain)
  //   // // console.log(preTransfer)
  //   const signedTx_1 = await client.signTx(preTransfer_1, signer_1);
  //   const signedTx_2 = await client.signTx(preTransfer_2, signer_2);
  //   // const result = await client.sendTransaction(signedTx);
  //   console.log(signedTx_1, signedTx_2);
  //   let result = await Promise.all([
  //     client.sendTransaction(signedTx_1),
  //     client.sendTransaction(signedTx_2),
  //   ]);
  //   console.log(result);
  //   // console.log(signedTx);
  //   // console.log(result);
  //   // console.log(balance)
  //   // // const to = ['0xaa537343867bab482247c26d1a0947edc61f0523561d94dad034587431a1458f', '0xbf094f49774fad091e1ffd7d0d65676b495ec9c656509b47358dcfe76ee03491'];
  //   // let txData = '0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000180000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000002a0a31786df9376bfc800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c03d35faaaedf7506cfe7d6dba324cc339d271b5aca056e093e6dfd2a114ade93b00000000000000000000000000000000000000000000000000000000002dc6c000000000000000000000000000000000000000000000000000000000000000640000000000000000000000000000000000000000000000000000000000000064000000000000000000000000000000000000000000000000000000000000000274310000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000041aa9bc8a76407b5b5034f89e85d6f1fed771c50ebee999b3586930ff7fa5fcfc62bdc9ef32a439d7d47de81dc9dff56aa6ae75f4fcf069fc7957d0814808a59001c000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003a4965bf58a400003d35faaaedf7506cfe7d6dba324cc339d271b5aca056e093e6dfd2a114ade93b0000000000000000000000000000000000000000000000000000000000000002153d3d01cee4cde656ac9cef65c205ea435a2163484d7a8e92b60b6b6de35f8000000000000000000000000000000000000000000000000000000000000000013d35faaaedf7506cfe7d6dba324cc339d271b5aca056e093e6dfd2a114ade93b0000000000000000000000000000000000000000000000003a4965bf58a3ffff';
  //   // let deploy = new OmniverseDeploy(txData) as Deploy;
  //   // // console.log(deploy)
  //   // const data = new OmniverseDeploy(deploy);
  //   // console.log(data.encode())
  //   // console.log()
  //   // const preTransaction = await client.preTransfer(GASS_ASSET_ID,)
  //   // console.log(signer.address());
  // });

  // it('Test Signer', async () => {
  //   const signer = new LocalSigner('./.secret');
  //   client.setSigner(signer);
  //   const balance = await client.balanceOf(GASS_ASSET_ID, signer.address());
  //   console.log(balance);
  //   const outputs: Array<Output> = [
  //     {
  //       address:
  //         '0xad3afa98a63e6dcf629bdb8b3a49ad32d2774a36fb28d9ed5f1e6bd9ae9e8574',
  //       amount: '100000000000000',
  //     },
  //     {
  //       address:
  //         '0x9508a08ca89918b734de0e5e91c1004a92c1f56a6120edfdcf9dd2ba2d7c70b9',
  //       amount: '100000000000000',
  //     },
  //   ];
  //   const preTransfer = await client.preTransfer(
  //     GASS_ASSET_ID,
  //     outputs,
  //     signer.address()
  //   );
  //   // console.log(preTransfer);
  //   console.log(client.eip712Domain)
  //   console.log(preTransfer)
  //   const signedTx = await client.signTx(preTransfer, signer);
  //   console.log(signedTx);
  //   const result = await client.sendTransaction(signedTx);
  //   console.log(result);
  // });

  it('Test get UTXO', async () => {
    const pagedList = await client.getUTXOList(1);
    const pagedList2 = await client.getUTXOList(2);
    let data = pagedList.data.concat(pagedList2.data);
    console.log(pagedList.totalNumber);
    for (let utxo of data) {
      let data = Buffer.concat([
        Buffer.from(utxo.assetId.substring(2), 'hex'),
        Buffer.from(utxo.preTxid.substring(2), 'hex'),
        Buffer.from(utxo.preIndex.toString(16).padStart(16, '0'), 'hex'),
        Buffer.from(utxo.address.substring(2), 'hex'),
        Buffer.from(BigInt(utxo.amount).toString(16).padStart(32, '0'), 'hex'),
      ]);
      // console.log(data.toString('hex'));
      let result = ethers.ethers.utils.keccak256(data);
      console.log(result);
    }
  });
});
