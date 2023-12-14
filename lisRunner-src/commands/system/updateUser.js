export default async function (dv) {


    let olyzprojects = await lyzprojects.findOne({
        project: dv.project_CODE,
        _deleted: false,
    });

    if (dv.modi == 0) {

        let ctrlForEmail = await lyzprojects.findOne({
            "users.email": dv.olisusers[0].email,
            _deleted: false,
        });

        console.log("ctrlForEmail", ctrlForEmail)
        if (ctrlForEmail != null) new Error("Bu Mail Adresi Kullanılmaktadır. Lütfen Farklı Bir Mail Giriniz!")

        olyzprojects.users.push({
            name: dv.olisusers[0].name,
            surname: dv.olisusers[0].surname,
            username: dv.olisusers[0].username,
            email: dv.olisusers[0].email,
            isblocked: dv.olisusers[0].isblocked,
            _deleted: dv.olisusers[0]._deleted,
        })
    }
    //****************Update********************* */
    if (dv.modi == 1) {

        let myIndex = olyzprojects.users.findIndex((e) => e.email == dv.olisusers[0].email)

        console.log("myIndex", myIndex)

        olyzprojects.users[myIndex].name = dv.olisusers[0].name
        olyzprojects.users[myIndex].surname = dv.olisusers[0].surname
        olyzprojects.users[myIndex].username = dv.olisusers[0].username
        olyzprojects.users[myIndex].email = dv.olisusers[0].email
        olyzprojects.users[myIndex].isblocked = dv.olisusers[0].isblocked
        olyzprojects.users[myIndex]._deleted = dv.olisusers[0]._deleted
        console.log("dv.modi == 1", olyzprojects)
    }

    await lyzprojects.findOneAndUpdate({ _id: olyzprojects._id }, olyzprojects);


    return dv;
}
