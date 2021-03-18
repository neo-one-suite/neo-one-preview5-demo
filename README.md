# NEO•ONE Preview5 Node Demo

To test the node RPC server using the JSONRPCClient:

- Run `npm install`
- Run `npx jest`

The `JSONRPCClient` makes the actual RPC calls to the NEO•ONE Node.
So the tests in `__tests__/JSONRPCClient.test.ts` demonstrate sample RPC calls to the currently deployed NEO•ONE Preview5 node. Note that some tests are skipped right now. They need a valid transaction hash to demonstrate fetching transaction data from various transaction-related RPC calls.

To test the NEO•ONE node you can use Postman or another application to make simple HTTP POST requests to our node at https://staging.neotracker.io/rpc

To run a NEO•ONE Node from this repo:

- Run `npm install`
- Build the `@neo-one/edge` module by running `cd node_modules/@neo-one/edge && npm install`
- Edit the config file at `config.json` if necessary
- Run `EDGE_USE_CORECLR=1 EDGE_APP_ROOT=node_modules/@neo-one/node-vm/lib/Debug/netcoreapp3.0 npx neo-one-node --config <path/to/config.json>`

To run a NEO•ONE Node from source:

- Clone NEO•ONE repo (`git clone https://github.com/neo-one-suite/neo-one.git`)
- Install RushJS
- Run `rush install`
- Run `rush build -t @neo-one/node-bin`
- From root run `node packages/neo-one-node-bin/bin/neo-one-node.js --config <path/to/config.json>`
