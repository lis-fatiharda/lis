export default async function (Args) {

  if (Args.modi == 0) {

    if (Args.material != "") {
      var lismaterial = await lismaterials.findOne({
        company: Args.company,
        material: Args.material,
      });

      lismaterial._id = undefined;
      lismaterial.material = '';

      let liscusmat = await lis.objectNew('liscusmats');
      liscusmat.company = Args.company;
      liscusmat = [liscusmat];
    } else {

      var lismaterial = await lis.objectNew('lismaterials');
      lismaterial.company = Args.company;
      var liscusmat = await lis.objectNew('liscusmats');
      liscusmat.company = Args.company;
      liscusmat = [liscusmat];
    }

  } else {
    var lismaterial = await lismaterials.findOne({
      company: Args.company,
      material: Args.material,
    });

    var liscusmat = await liscusmats.find({
      company: Args.company,
      material: Args.material
    });
  }




  return { lismaterial, liscusmat };
}
