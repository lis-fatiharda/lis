export default async function (mv) {

  if (mv.modi == 0) {

    // Save the Document*********************
    const olisfin002 = new lisfin002(mv.lisfin002);
    await olisfin002
      .save()
      .then((res) => {
        console.log("Kaydetme başarılı.");
      })
      .catch((err) => {
        throw new Error(err.message);
      });

  } else {

    // Update the Document*********************
    await lisfin002
      .findOneAndUpdate(
        { _id: mv.lisfin002._id },
        mv.lisfin002,
        {

          new: true,
          upsert: true,
        }
      )
      .catch((err) => {
        throw new Error(err.message);
      });



  }

  mv.lisfin002 = {};

  return mv;
}
