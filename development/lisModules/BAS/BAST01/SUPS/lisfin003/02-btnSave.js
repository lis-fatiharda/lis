export default async function (mv) {
  if (mv.modi == 0) {

    // Save the Document*********************
    const olisfin003 = new lisfin003(mv.lisfin003);
    await olisfin003
      .save()
      .then((res) => {
        console.log("Kaydetme başarılı.");
      })
      .catch((err) => {
      throw new Error(err.message);
      });

  } else {

    // Update the Document*********************
    await lisfin003
      .findOneAndUpdate(
        { _id: mv.lisfin003._id },
        mv.lisfin003,
        {

          new: true,
          upsert: true,
        }
      )
      .catch((err) => {
      throw new Error(err.message);
      });



  }

  mv.lisfin003 = {};

  return mv;
}
