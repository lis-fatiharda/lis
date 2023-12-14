// System class includes functions about finance
import createFinFromPur from "./createFinFromPur.js";
import createFinFromSal from "./createFinFromSal.js";
import fetchAccount from "./fetchAccount.js";
import save from "./save.js";
import calcBalanceOfDoc from "./calcBalanceOfDoc.js";
import ctrlAccounts from "./ctrlAccounts.js";
import createFinFromPostkey from "./createFinFromPostkey.js";
import ctrlAuthorization from "./ctrlAuthorization.js";

const finance = class {
  createFinFromPur = createFinFromPur;
  createFinFromSal = createFinFromSal;
  fetchAccount = fetchAccount;
  save = save;
  calcBalanceOfDoc = calcBalanceOfDoc;
  ctrlAccounts = ctrlAccounts;
  createFinFromPostkey = createFinFromPostkey;
  ctrlAuthorization = ctrlAuthorization;
};

export default finance;
