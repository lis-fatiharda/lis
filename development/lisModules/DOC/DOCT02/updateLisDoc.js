export default async function (doc) {
    console.log("updateLisDoc");
    console.log(doc);

    if (doc._id == undefined) {
        console.log("savesavesave");
        const lisdocdocs = new lisdocdocs(doc);
        await lisdocdocs
            .save()
            .then((res) => {
                return res;
            })
            .catch((err) => {
                console.log(err);
              throw new Error("lisdocdocs Güncellenemedi!", err);
            });
    } else {
        await lisdocdocs
            .findOneAndUpdate({ _id: doc._id }, doc, {
                new: true,
                upsert: true,
            })
            .then((res) => {
                return res;
            })
            .catch((err) => {
              throw new Error("lisdocdocs Güncellenemedi!", err);
            });
    }
}
