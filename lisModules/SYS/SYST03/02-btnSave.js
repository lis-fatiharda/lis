export default async function (dv) {
  //import lisusers from "../../../lisModels/lisusers.js";
  //****************Insert********************* */
  if (dv.modi == 0) {
    const olisusers = new lisusers(dv.olisusers[0]);

    olisusers.save().catch((e) => {throw new Error(e)}); 
  } 
  //****************Update********************* */
  if (dv.modi == 1) { 
    const olisusers = await lisusers.findOneAndUpdate(
      { username: dv.olisusers[0].username },
      dv.olisusers[0]  
    );
  }

  return dv;
}
