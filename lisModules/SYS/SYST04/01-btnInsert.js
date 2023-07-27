import { lisnumranges, LisNumParts } from "../../../lisModels/lisnumranges.js";

export default async function (dv) {
    dv.lisDialog = "SYST04D02";
    dv.modi = 0;
    dv.olisnumranges = new lisnumranges();
  dv.olisnumranges.numparts.push(new LisNumParts());
  
  dv.olisnumranges.company = dv.sc.company;
    return dv;
}
