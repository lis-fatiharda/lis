export default async function (dv) {
    var reportListSelected = dv.reportList.filter((k) => k._selected == true);
    for (let z in reportListSelected) {
        let myCurrDiff = reportListSelected[z];
        let olissal001 = await lissal001.findOne({
            company: myCurrDiff.company,
            doctype: dv.sc.salDocType,
        });

        dv.lissaldocs = new lissaldocs(lissaldocs.prototype.schema.tree);

        dv.lissaldocs.company = myCurrDiff.company;
        dv.lissaldocs.doctype = dv.sc.salDocType;
        dv.lissaldocs.busarea = "S";
        dv.lissaldocs.saldept = "S";
        dv.lissaldocs.validfrom = new Date();

        dv.lissaldocs.currency = "TRY";
        dv.lissaldocs.currate = 1;
        dv.lissaldocs.curdate = new Date();

        dv.lissaldocs.customer = myCurrDiff.account;

        let oliscustomers = await liscustomers.findOne({
            company: myCurrDiff.company,
            customer: dv.lissaldocs.customer,
            _deleted: false,
        });

        dv.lissaldocs.name1 = oliscustomers.name1;

        dv.lissaldocs.invtype = 1;
        dv.lissaldocs.isfinance = false;

        //---

        dv.lissaldocs.items[0].itemtype = "S";
        dv.lissaldocs.items[0].material = olissal001.currdiffmaterial;
        let olismaterials = await lismaterials.findOne({
            company: myCurrDiff.company,
            material: dv.lissaldocs.items[0].material,
            _deleted: false,
        });
        dv.lissaldocs.items[0].mtext = olismaterials.mtext;
        dv.lissaldocs.items[0].mattype = olismaterials.mattype;

        dv.lissaldocs.items[0].quantity = 1;
        dv.lissaldocs.items[0].qunit = "AD";
    }

    return dv;
}
