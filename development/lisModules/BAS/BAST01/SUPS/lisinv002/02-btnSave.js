export default async function (mv) {
  if (mv.modi == 0) {

    // Save the Document*********************
    const olisinv002 = new lisinv002(mv.lisinv002);
    await olisinv002
      .save()
      .then((res) => {
        console.log("Kaydetme başarılı.");
      })
      .catch((err) => {
      throw new Error(err.message);
      });

  } else {

    // Update the Document*********************
    await lisinv002
      .findOneAndUpdate(
        { _id: mv.lisinv002._id },
        mv.lisinv002,
        {

          new: true,
          upsert: true,
        }
      )
      .catch((err) => {
      throw new Error(err.message);
      });



  }

  mv.lisinv002 = {};

  return mv;
}
