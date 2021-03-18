import { JSONRPCClient, JSONRPCHTTPProvider } from '@neo-one/client-core';
import { common } from '@neo-one/client-common';

describe('JSONRPCClient Tests', () => {
  const client = new JSONRPCClient(new JSONRPCHTTPProvider('https://staging.neotracker.io/rpc'));
  const address = 'NSVX6sk3z14pSSjFx6WFEGajQXEbmahvwx';

  test('getBlock', async () => {
    const block = await client.getBlock(1);

    expect(block).toBeDefined();
    expect(block.hash).toEqual('0x22b384a3a5d0c9dba641ca6c0a1e2d830342441cad6a77ad92f020858257058b');
    expect(block.nextconsensus).toEqual('NgPkjjLTNcQad99iRYeXRUuowE4gxLAnDL');
    expect(block.tx).toEqual([]);
  });

  test('getNep17Balances', async () => {
    // Use another address with known balances
    const balances = await client.getNep17Balances(address);

    expect(balances.address).toEqual(address);
    expect(balances.balance).toEqual([]);
  });

  test('getNep17Transfers', async () => {
    // Use another address with known transfers
    const transfers = await client.getNep17Transfers(address);

    expect(transfers.address).toEqual(address);
    expect(transfers.received).toEqual([]);
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

  test.skip('getTransaction', async () => {
    // Replace this with a valid transaction hash
    const transactionHash = '0x173dcbc4a88995a0cf7bdd006923d148f787f76ca75621dc4c440ca6d9afbc73';
    const transaction = await client.getTransaction(transactionHash);

    expect(transaction.hash).toEqual(transactionHash);
    expect((transaction as any).blockhash).toEqual(
      '0x22b384a3a5d0c9dba641ca6c0a1e2d830342441cad6a77ad92f020858257058b',
    );
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

  test.skip('getTransactionReceipt', async () => {
    // Replace this with a valid transaction hash
    const transactionHash = '0x173dcbc4a88995a0cf7bdd006923d148f787f76ca75621dc4c440ca6d9afbc73';
    const receipt = await client.getTransactionReceipt(transactionHash);

    expect(receipt.blockHash).toEqual('0xc359030132be10fd19cfd0a27e289fe04acb0c5c4ca5254af8a2d99498c7da45');
    expect(receipt.blockIndex).toEqual(0);
    expect(receipt.globalIndex).toEqual('-1');
    expect(receipt.transactionHash).toEqual(transactionHash);
    expect(receipt.confirmations).toBeGreaterThan(345557);
    expect(receipt.blockTime).toEqual('1468595301000');
  });

  test.skip('getTransactionHeight', async () => {
    const height = await client.getTransactionHeight(
      // Replace this with a valid transaction hash
      '0x173dcbc4a88995a0cf7bdd006923d148f787f76ca75621dc4c440ca6d9afbc73',
    );

    expect(height).toEqual(0);
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
