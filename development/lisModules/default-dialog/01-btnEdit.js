
export default async function (dv) {

    // Lock the document
    let isLocked = await System.lock(
        dv.lisCrmHead.company,
        "LIST01",
        dv.lisCrmHead.acttype + dv.lisCrmHead.actnum,
        global.sys_user
    );
    if (isLocked == true) {
        dv.lisDialog = "list01d02";
        dv.modi = 1;
    } else {
        dv.lisCustomer = [];
      throw new Error("Kilitli Belge!");
    }

    return dv;
};
