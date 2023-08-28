// System class includes functions about system
import saveMovement from "./saveMovement.js";
import ctrlMaterialForMove from "./ctrlMaterialForMove.js";
import updLisinvStocks from "./updLisinvStocks.js";
import createInvFromPur from "./createInvFromPur.js";
import createInvFromSal from "./createInvFromSal.js";
import ctrlMoveCode from "./ctrlMoveCode.js";
import ctrlInvFromSal from "./ctrlInvFromSal.js";
import ctrlInvFromPur from "./ctrlInvFromPur.js";
import createTransfer from "./createTransfer.js";
import checkAvailibility from "./checkAvailibility.js";

import calcSkquantity from "./calcSkquantity.js";



const inventory = class {
    saveMovement = saveMovement;
    ctrlMaterialForMove = ctrlMaterialForMove;
    updLisinvStocks = updLisinvStocks;
    createInvFromPur = createInvFromPur;
    createInvFromSal = createInvFromSal;
    ctrlMoveCode = ctrlMoveCode;
    ctrlInvFromSal = ctrlInvFromSal;
    ctrlInvFromPur = ctrlInvFromPur;
    createTransfer = createTransfer;
    checkAvailibility = checkAvailibility;
    calcSkquantity = calcSkquantity;
};

export default inventory;
