
export default async function (dv) {
    dv.lisDialog = "WSRT01D02";
    dv.modi = 0;

    dv.liswebservices = {};
    dv.liswebservices = new liswebservices(liswebservices.prototype.schema.tree);

    return dv;
}
