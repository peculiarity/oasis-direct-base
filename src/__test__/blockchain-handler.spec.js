/**
 * @jest-environment node
 *
 * This solves the problem with `environment.setup is not a function` -
 * https://github.com/facebook/jest/issues/5119
 */

import web3 from "../web3";

jest.mock('../web3');

import * as Blockchain from '../blockchainHandler';


test("getting available accounts", async () => {
  const availableAccounts = ["0x12345", "0x34567"];

  web3.eth.getAccounts.mockImplementation((cb) => cb(null, availableAccounts));

  const accounts = await Blockchain.getAccounts();

  expect(web3.eth.getAccounts).toHaveBeenCalled();
  expect(accounts).toBe(availableAccounts);
});

test("inability to get the available accounts", async () => {
  const error = new Error("Something went wrong!");

  web3.eth.getAccounts.mockImplementation((cb) => cb(error, null));

  await Blockchain.getAccounts().catch((issue) => {
    expect(issue).toEqual(error);
  });
});

test("setting up the default account", () => {
  const account = "0x12345";

  Blockchain.setDefaultAccount(account);

  expect(web3.eth.defaultAccount).toBe(account);
});

test("getting the gas price", async () => {
  const expectedGasPrice = 12345;

  web3.eth.getGasPrice.mockImplementation((cb) => cb(null, expectedGasPrice));

  const gasPrice = await Blockchain.getGasPrice();

  expect(web3.eth.getGasPrice).toHaveBeenCalled();
  expect(gasPrice).toBe(expectedGasPrice);
});

test("inability to get the gas price", async () => {
  const error = new Error("Any error!");

  web3.eth.getGasPrice.mockImplementation((cb) => cb(error, null));

  Blockchain.getGasPrice().catch((issue) => {
    expect(issue).toEqual(error);
  });
});

test("filters logs by address", async () => {
  const block = 1234;
  const address = "0x12345";
  const filter = {fromBlock: block, address};
  const logs = [{txHash: "1234"}, {txHash: "2345"}];

  web3.eth.filter.mockImplementation((filter, cb) => cb(null, logs));

  const filteredLogs = await Blockchain.filterLogsByAddress(block, address);

  expect(web3.eth.filter.mock.calls[0][0]).toEqual(filter);
  expect(filteredLogs).toEqual(logs);
});

test("inability to filter the logs", () => {
  const block = 1234;
  const address = "0x12345";
  const error = new Error("Couldn't get the logs");

  web3.eth.filter.mockImplementation((filter, cb) => cb(error, null));

  Blockchain.filterLogsByAddress(block, address).catch(issue => {
    expect(issue).toEqual(error);
  });
});