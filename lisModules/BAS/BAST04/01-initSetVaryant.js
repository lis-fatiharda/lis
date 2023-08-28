export default async function (item) {
  let ovariant = await lismaterials.findOne({
    company: "01",
    material: item.material,
    _deleted: false,
  });

  const olisvariants = await lisvariants.findOne({
    company: "01",
    varkey: ovariant.varkey,
    _deleted: false,
  });
  if (olisvariants == null) {
    throw new Error(
      `${item.material}  Malzemesi İçin Varyant Bilgisi Bulunamadı!`
    );
  }
  for (let k in olisvariants.items) {
    let itemtype = await lisbas018.findOne({
      attribute: olisvariants.items[k].attribute,
    });

    if (itemtype.type == 1) {
      const olisbas018 = await lisbas018.find({
        attribute: olisvariants.items[k].attribute,
      });
      olisvariants.items[k].options = olisbas018[0].options;
    }
    if (itemtype.type == 0) {
      const olisbas018m = await lisbas018.find({
        attribute: olisvariants.items[k].attribute,
      });
      olisvariants.items[k].maxvalue = olisbas018m[0].maxvalue;
      olisvariants.items[k].minvalue = olisbas018m[0].minvalue;
      olisvariants.items[k].qunit = olisbas018m[0].qunit;
    }
  }

  return olisvariants;
}
