export default async function (dv) {

    // if (dv.prdListConf.filter((e) => e._selected == true).length > 0) {
    //     let selectedRow = dv.prdListConf.filter((e) => e._selected == true)[0];
    
    //     dv.lisprddocs = await lisprddocs.findById(selectedRow._id);
    //   } else {
    //     throw new Error("Lütfen Bir Satır Seçiniz");
    //   }

    dv.lisDialog = "PRDT02D02";
    dv.modi = 0;
    dv.lisprddocs = new lisprddocs(lisprddocs.prototype.schema.tree);
    dv.lisprddocs.company = dv.sc.company;

    return dv;
}
