// System class includes functions about system
import saveMovement from "./saveMovement.js";
import ctrlMaterialForMove from "./ctrlMaterialForMove.js";
import updLisinvStocks from "./updLisinvStocks.js";
import createInvFromPur from "./createInvFromPur.js";
import createInvFromSal from "./createInvFromSal.js";
import ctrlMoveCode from "./ctrlMoveCode.js";

const inventory = class {
    saveMovement = saveMovement;
    ctrlMaterialForMove = ctrlMaterialForMove;
    updLisinvStocks = updLisinvStocks;
    createInvFromPur = createInvFromPur;
    createInvFromSal = createInvFromSal;
    ctrlMoveCode = ctrlMoveCode;
};

export default inventory;
