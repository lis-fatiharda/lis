
export default async function (dv) {
    dv.lisDialog = "SALT01D02";
    dv.modi = 0;

    dv.lissaldocs = await new lissaldocs(lissaldocs.prototype.schema.tree);
    dv.lissaldocs.company = dv.sc.company;
    dv.lissaldocs.validfrom = new Date().toLocaleString();
    return dv;
}
