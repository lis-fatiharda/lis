// System class includes functions about finance
import createFinFromSal from "./createFinFromSal.js";
import fetchAccount from "./fetchAccount.js";
import save from "./save.js";
import calcBalanceOfDoc from "./calcBalanceOfDoc.js";
import ctrlAccounts from "./ctrlAccounts.js";
import createFinFromPostkey from "./createFinFromPostkey.js";




const finance = class {
    createFinFromSal = createFinFromSal;
    fetchAccount = fetchAccount;
    save = save;
    calcBalanceOfDoc = calcBalanceOfDoc;
    ctrlAccounts = ctrlAccounts;
    createFinFromPostkey = createFinFromPostkey;
};

export default finance;
