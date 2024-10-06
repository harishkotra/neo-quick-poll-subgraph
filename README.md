# Neo Quick Poll Subgraph

This folder contains the subgraph for the Neo Quick Poll application. The subgraph is designed to index and query data from the Neo Quick Poll smart contract on the NeoX T4 Testnet.

## What is this Subgraph?

This subgraph fetches and stores data for all polls created on the Neo Quick Poll application. It allows for efficient querying of poll data without directly interacting with the blockchain for every request.

### Advantages of using an Infura Subgraph:

- Decentralized: Aligns with the blockchain ethos of your application.
- Real-time Updates: Automatically syncs with your smart contract events.
- Efficient Querying: Optimized for blockchain data structures.
- Scalability: Can handle large amounts of data and queries efficiently.
- No Need for Additional Backend: Reduces infrastructure complexity.

## Purpose

The main purposes of this subgraph are:
1. To index poll data from the blockchain
2. To provide fast and efficient data retrieval for the frontend application
3. To enable complex queries that would be difficult or expensive to perform directly on the blockchain

## Structure

The subgraph consists of the following key files:

- `schema.graphql`: Defines the data structure for the subgraph
- `subgraph.yaml`: Configuration file for the subgraph
- `src/mapping.ts`: Contains the logic for processing blockchain events and storing data

## How it Works

1. The subgraph listens for specific events emitted by the Neo Quick Poll smart contract.
2. When an event is detected (e.g., a new poll is created or a vote is cast), the subgraph processes this data.
3. The processed data is stored according to the schema defined in `schema.graphql`.
4. The frontend can then query this data using GraphQL, allowing for fast and complex data retrieval.

## Setting Up the Subgraph

To set up and deploy the subgraph:

1. Install the Graph CLI:
   ```
   npm install -g @graphprotocol/graph-cli
   ```

2. Initialize the subgraph (if not already done):
   ```
   graph init --studio neo-quick-poll
   ```
   Follow the prompts, inputting your contract address and network (NeoX T4 Testnet).

3. Generate code from the schema:
   ```
   graph codegen
   ```

4. Build the subgraph:
   ```
   graph build
   ```

5. Deploy the subgraph (you'll need to set up a Graph account and create a subgraph name first):
   ```
   graph deploy --studio neo-quick-poll
   ```

## Querying Data

Once deployed, you can query the subgraph using GraphQL. Here's a basic example:

```graphql
{
  polls(first: 5) {
    id
    question
    options
    votes
  }
}
```

This query would return data for the first 5 polls, including their IDs, questions, options, and vote counts.

## Updating the Subgraph

If you make changes to the smart contract or need to update the subgraph:

1. Update the relevant files (`schema.graphql`, `subgraph.yaml`, `mapping.ts`)
2. Regenerate code and rebuild:
   ```
   graph codegen
   graph build
   ```
3. Redeploy the subgraph:
   ```
   graph deploy --studio neo-quick-poll
   ```

## Notes

- Ensure that the contract address in `subgraph.yaml` matches your deployed Neo Quick Poll contract on the NeoX T4 Testnet.
- The subgraph may take some time to sync with the blockchain after deployment.

For more information on working with subgraphs, refer to [The Graph documentation](https://thegraph.com/docs/).