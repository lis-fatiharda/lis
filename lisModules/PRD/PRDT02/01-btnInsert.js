export default async function (dv) {
    dv.lisDialog = "PRDT02D02";
    dv.modi = 0;
    dv.lisprddocs = new lisprddocs(lisprddocs.prototype.schema.tree);
    dv.lisprddocs.company = dv.sc.company;

    return dv;
}
