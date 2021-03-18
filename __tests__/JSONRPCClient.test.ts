import { JSONRPCClient, JSONRPCHTTPProvider } from '@neo-one/client-core';
import { common } from '@neo-one/client-common';

describe('JSONRPCClient Tests', () => {
  const client = new JSONRPCClient(new JSONRPCHTTPProvider('https://staging.neotracker.io/rpc'));
  const address = 'NSVX6sk3z14pSSjFx6WFEGajQXEbmahvwx';
  const tx = '0x71f894214023d7f6592f9b57671d39ab4a01ba616e4e683a583b6e9d1670b6d2';

  test('getBlock', async () => {
    const block = await client.getBlock(1);

    expect(block).toBeDefined();
    expect(block.hash).toEqual('0x22b384a3a5d0c9dba641ca6c0a1e2d830342441cad6a77ad92f020858257058b');
    expect(block.nextconsensus).toEqual('NgPkjjLTNcQad99iRYeXRUuowE4gxLAnDL');
    expect(block.tx).toEqual([]);
  });

  test('getNep17Transfers', async () => {
    // Use address with known transfers
    const transfers = await client.getNep17Transfers(address, -1, 1616098466663);

    expect(transfers.address).toEqual(address);
    expect(transfers.received).toEqual([
      {
        amount: '234000000',
        assethash: '0x70e2301955bf1e74cbb31d18c2f96972abadb328',
        blockindex: 19913,
        timestamp: 1612679900495,
        transferaddress: 'NKuyBkoGdZZSLyPbJEetheRhMjeznFZszf',
        transfernotifyindex: 0,
        txhash: '0x71f894214023d7f6592f9b57671d39ab4a01ba616e4e683a583b6e9d1670b6d2',
      },
    ]);
    expect(transfers.sent).toEqual([]);
  });

  test('getBestBlockHash', async () => {
    const hash = await client.getBestBlockHash();

    expect(hash).toBeDefined();
    expect(hash.length).toBe(66);
    expect(common.isUInt256(common.stringToUInt256(hash))).toBeTruthy();
  });

  test('getBlockCount', async () => {
    const count = await client.getBlockCount();

    expect(count).toBeGreaterThan(232531);
  });

  test('getMemPool', async () => {
    const mempool = await client.getMemPool();

    expect((mempool as any).height).toBeGreaterThan(232530);
    expect((mempool as any).verified).toEqual([]);
  });

  test('getTransaction', async () => {
    // Replace this with a valid transaction hash
    const transactionHash = tx;
    const transaction = await client.getTransaction(transactionHash);

    expect(transaction.blockhash).toEqual('0xe71035f17ba11ccfe808f72fbbefad49c055e44f098c18acc1366e4bf05d6056');
  });

  test.skip('getStorage', async () => {
    // Replace address with an address that is known to use storage
    // Then replace key with a BufferString for the storage key
    // Then delete skip method
    const key = '';
    const storage = await client.getStorage(address, key);

    expect(storage).toBeDefined();
  });

  test('getAllStorage', async () => {
    // Replace address with the address of a contract that is known to have storage
    const storages = await client.getAllStorage(address);

    expect(storages).toEqual([]);
  });

  test('getTransactionReceipt', async () => {
    // Replace this with a valid transaction hash
    const transactionHash = tx;
    const receipt = await client.getTransactionReceipt(transactionHash);

    expect(receipt.blockHash).toEqual('0xe71035f17ba11ccfe808f72fbbefad49c055e44f098c18acc1366e4bf05d6056');
    expect(receipt.blockIndex).toEqual(19913);
    expect(receipt.globalIndex).toEqual('-1');
    expect(receipt.confirmations).toBeGreaterThan(212962);
    expect(receipt.blockTime).toEqual('1612679900495');
  });

  test('getTransactionHeight', async () => {
    const height = await client.getTransactionHeight(
      // Replace this with a valid transaction hash
      tx,
    );

    expect(height).toEqual(19913);
  });

  test('getBlockHash', async () => {
    const hash = await client.getBlockHash(1);

    expect(hash).toEqual('0x22b384a3a5d0c9dba641ca6c0a1e2d830342441cad6a77ad92f020858257058b');
  });

  test('getConnectionCount', async () => {
    const count = await client.getConnectionCount();

    expect(count).toBeGreaterThan(1);
  });

  test('getVersion', async () => {
    const version = await client.getVersion();

    expect(version.tcpport).toBeDefined();
    expect(version.wsport).toBeDefined();
    expect(version.nonce).toBeDefined();
    expect(version.useragent).toEqual('NEO:neo-one-js:3.0.0-preview5');
  });

  test('getConnectedPeers', async () => {
    const peers = await client.getConnectedPeers();

    expect(peers.length).toBeGreaterThan(0);
    expect(peers[0]).toBeDefined();
    expect(peers[0].port).toEqual(20333);
  });

  test('getNetworkSettings', async () => {
    const result = await client.getNetworkSettings();

    expect(result).toBeDefined();
  });
});
