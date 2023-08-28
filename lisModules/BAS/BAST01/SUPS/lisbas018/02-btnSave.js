export default async function (mv) {
  if (mv.lisbas018.type == 0) {
    mv.lisbas018.options = [];
  } else {
    mv.lisbas018.options.maxvalue = 0;
    mv.lisbas018.options.minvalue = 0;
    mv.lisbas018.options.qunit = "";
  }
  if (mv.modi == 0) {
    // Save the Document*********************
    const olisbas018 = new lisbas018(mv.lisbas018);
    await olisbas018
      .save()
      .then((res) => {
        console.log("Kaydetme başarılı.");
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  } else {
    // Update the Document*********************
    await lisbas018
      .findOneAndUpdate({ _id: mv.lisbas018._id }, mv.lisbas018, {
        new: true,
        upsert: true,
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }

  mv.lisbas018 = {};

  return mv;
}
