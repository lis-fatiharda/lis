export default async function (mv) {

  if (mv.modi == 0) {

    // Save the Document*********************
    const olisbas017 = new lisbas017(mv.lisbas017);
    await olisbas017
      .save()
      .then((res) => {
        console.log("Kaydetme başarılı.");
      })
      .catch((err) => {
        throw new Error(err.message);
      });

  } else {

    // Update the Document*********************
    await lisbas017
      .findOneAndUpdate(
        { _id: mv.lisbas017._id },
        mv.lisbas017,
        {

          new: true,
          upsert: true,
        }
      )
      .catch((err) => {
        throw new Error(err.message);
      });



  }

  mv.lisbas017 = {};

  return mv;
}
