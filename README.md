# Datasource Template Test Project  
## Run Test  
`npm i`  
`npm run start`  
`npm run test`  
`npm run stop`  

## Test Project Explained  
- This test uses a simple DAO protocol, read more [here](./protocol/README.md).  
- The subgraph is setup to only track the [`DAONetwork` contract](./protocol/contracts/DAONetwork.sol).  
- The mapping for `DAONetwork` [adds the Avatar as a Datasource Template](./subgraph/src/mappings/DAONetwork/datasource.yaml).  
  - See the generated `subgraph.yaml` to see how this differs from a standard datasource, or read more documentation on this [here](https://thegraph.com/docs/define-a-subgraph#data-source-templates) and [here](https://github.com/graphprotocol/graph-node/blob/master/docs/subgraph-manifest.md#17-data-source-templates).  
- When a new DAO is [added to the `DAONetwork`](./protocol/contracts/DAONetwork.sol) (line #106), the subgraph [starts tracking the new `Avatar` contract](./subgraph/src/domain/dao.ts) (line #24).  
- Now that the subgraph is tracking the new `Avatar` contract, events that're emitted from it will be passed through the [`Avatar` mapping](./subgraph/src/mappings/Avatar/mapping.ts).  
- We test to verify this works by:  
  1. Deploying a new DAO under the name "foo".  
  2. Adding it to the `DAONetwork` (which creates the datasource template).  
  3. Set the `Avatar`'s name to "bar".  
  4. Verify the subgraph is updated properly.  

See test code [here](./subgraph/test/datasourcetemplate.spec.ts).  
