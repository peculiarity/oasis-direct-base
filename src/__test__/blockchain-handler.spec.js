/**
 * @jest-environment node
 *
 * This solves the problem with `environment.setup is not a function` -
 * https://github.com/facebook/jest/issues/5119
 */

import web3 from "../web3";

// jest.mock('bluebird');
jest.mock('../web3');

import * as Blockchain from '../blockchainHandler';

test("should fetch all accounts", async () => {
  const availableAccounts = ["0x12345", "0x34567"];

  web3.eth.getAccounts.mockImplementation((cb) => cb(null, availableAccounts));

  const accounts = await Blockchain.getAccounts();

  expect(web3.eth.getAccounts).toHaveBeenCalled();
  expect(accounts).toBe(availableAccounts);
});

test("should throw error if cannot retrieve accounts", async () => {
  const error = new Error("Something went wrong!");

  web3.eth.getAccounts.mockImplementation((cb) => cb(error, null));

  await Blockchain.getAccounts().catch((issue) => {
    expect(web3.eth.getAccounts).toHaveBeenCalled();
    expect(issue).toEqual(error);
  });
});

test("should use provided account as default", () => {
  const account = "0x12345";

  Blockchain.setDefaultAccount(account);

  expect(web3.eth.defaultAccount).toBe(account);
});

test("should get the gas price", async () => {
  const expectedGasPrice = 12345;

  web3.eth.getGasPrice.mockImplementation((cb) => cb(null, expectedGasPrice));

  const gasPrice = await Blockchain.getGasPrice();

  expect(web3.eth.getGasPrice).toHaveBeenCalled();
  expect(gasPrice).toBe(expectedGasPrice);
});

test("should get the gas price", async () => {
  const expectedGasPrice = 12345;

  web3.eth.getGasPrice.mockImplementation((cb) => cb(null, expectedGasPrice));

  const gasPrice = await Blockchain.getGasPrice();

  expect(web3.eth.getGasPrice).toHaveBeenCalled();
  expect(gasPrice).toBe(expectedGasPrice);
});