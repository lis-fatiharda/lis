export default async function (olisinvdocs) {
  console.log("****olisinvdocs", olisinvdocs)  
    let lisinvdocsSave = new lisinvdocs(olisinvdocs);
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
