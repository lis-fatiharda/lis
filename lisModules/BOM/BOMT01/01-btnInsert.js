export default async function (dv) {
    dv.lisDialog = "BOMT01D02";
    dv.modi = 0;
    dv.lisbomdocs = new lisbomdocs(lisbomdocs.prototype.schema.tree);

  

    dv.lisbomdocs.company = dv.sc.company;

    return dv;
}
