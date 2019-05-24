import { getOptions, getWeb3 } from "./util";

const Reputation = require("dynamic-datasource-test-protocol/build/contracts/Reputation.json");
const Avatar = require("dynamic-datasource-test-protocol/build/contracts/Avatar.json");
const DAONetwork = require("dynamic-datasource-test-protocol/build/contracts/DAONetwork.json");
const DAONetworkAddress = require("dynamic-datasource-test-protocol/migration.json")["private"]["DAONetwork"];

describe("Dynamic Data Source Test", () => {
  let web3;
  let reputation;
  let avatar;
  const orgName = "foo";

  beforeAll(async () => {
    // deploy dao
    web3 = await getWeb3();
    const opts = await getOptions(web3);

    // Deploy Reputation
    console.log("HEYHERE")
    const tx = await web3.eth.sendTransaction({
      ...opts,
      data: Avatar.bytecode
    });
    console.log(tx);
    /*reputation = await web3.eth.Contract(Reputation.abi).deploy({
      data: Reputation.bytecode,
      arguments: []
    }).send(opts);

    console.log(reputation.address);*/

    // Deploy Avatar
    /*avatar = await web3.eth.Contract(Avatar.abi).deploy({
      data: Avatar.bytecode,
      arguments: [orgName, reputation.address]
    }).send(opts);

    console.log(avatar.address);*/
  });

  it("Avatar.setName Updates The Graph", async () => {
    // query to verify the old name
    // set name
    // query to verify the new name
  });
});
