export default async function (lisinvdocs) {
  let lisinvdocsSave = new lisinvdocs(lisinvdocs);
  console.log("lisinvdocsSave", lisinvdocsSave);
  await lisinvdocsSave
    .save()
    .then((res) => {
      console.log("**********", res);
    })
    .catch((err) => {
      console.error(err);
    });

  return lisinvdocsSave;
}
