import lissaldocs from "../../../lisModels/lissaldocs.js";
import lisinvdocs from "../../../lisModels/lisinvdocs.js";

export default async function createInvFromPur(pLissaldocs, pMod) {
    const olisinvdocs = {};

    this.saveMovement(olisinvdocs, pMovecode, pMod);
    return olisinvdocs;
}
