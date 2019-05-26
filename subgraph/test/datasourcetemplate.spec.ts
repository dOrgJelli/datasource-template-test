import { getOptions, getWeb3, sendQuery } from "./util";

const Reputation = require("datasource-template-test-protocol/build/contracts/Reputation.json");
const Avatar = require("datasource-template-test-protocol/build/contracts/Avatar.json");
const DAONetwork = require("datasource-template-test-protocol/build/contracts/DAONetwork.json");
const DAONetworkAddress = require("datasource-template-test-protocol/migration.json")["private"]["DAONetwork"];

describe("Data Source Template Test", () => {
  let web3;
  let daoNetwork;
  let reputation;
  let avatar;
  const orgName = "foo";
  const newOrgName = "bar";

  beforeAll(async () => {
    // deploy dao
    web3 = await getWeb3();
    const opts = await getOptions(web3);

    daoNetwork = new web3.eth.Contract(DAONetwork.abi, DAONetworkAddress, opts);

    // Deploy Reputation
    reputation = await new web3.eth.Contract(Reputation.abi, undefined, opts)
      .deploy({
        data: Reputation.bytecode,
        arguments: []
      }).send();

    // Deploy Avatar
    avatar = await new web3.eth.Contract(Avatar.abi, undefined, opts)
      .deploy({
        data: Avatar.bytecode,
        arguments: [orgName, reputation.options.address]
      }).send();

    // Transfer Ownership
    await reputation.methods.transferOwnership(DAONetworkAddress).send();
    await avatar.methods.transferOwnership(DAONetworkAddress).send();

    // Add DAO
    await daoNetwork.methods.newDAO(avatar.options.address).send();
  });

  it("Avatar.setName Updates The Graph", async () => {
    // query to verify the old name
    {
      let { dao } = await sendQuery(`{
        dao(id: "${avatar.options.address.toLowerCase()}") {
          name
        }
      }`);
      expect(dao.name).toEqual(orgName);
    }

    // set name
    await avatar.methods.setName(newOrgName).send();

    // query to verify the new name
    {
      let { dao } = await sendQuery(`{
        dao(id: "${avatar.options.address.toLowerCase()}") {
          name
        }
      }`);
      expect(dao.name).toEqual(newOrgName);
    }
  });
});
