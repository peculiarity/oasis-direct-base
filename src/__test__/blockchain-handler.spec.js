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