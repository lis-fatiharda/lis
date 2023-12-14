// Purchase class includes functions about purchase
import saveRec from "./save.js";
import ctrlRefDocumentRec from "./ctrlRefDocument.js";
import updRefDocumentRec from "./updRefDocument.js";
import setStatusRec from "./setStatus.js";
import ctrlChildDocForDelRec from "./ctrlChildDocForDel.js";
import removeDeletedItemsRec from "./removeDeletedItems.js";
import ctrlAuthorizationRec from "./ctrlAuthorization.js";

import removeInvalidItemsRec from "./removeInvalidItems.js";

const purchase = class {
    save = saveRec;
    ctrlRefDocument = ctrlRefDocumentRec;
    updRefDocument = updRefDocumentRec;
    setStatus = setStatusRec;
    ctrlChildDocForDel = ctrlChildDocForDelRec;
    removeDeletedItems = removeDeletedItemsRec;
    ctrlAuthorization = ctrlAuthorizationRec;
    removeInvalidItems = removeInvalidItemsRec;
};

export default purchase;
