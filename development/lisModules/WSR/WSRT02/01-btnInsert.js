
export default async function (dv) {
    dv.lisDialog = "WSRT02D02";
    dv.modi = 0;

    dv.lisapiKeys = {};
    dv.lisapiKeys = new lisapiKeys(lisapiKeys.prototype.schema.tree);

    return dv;
}
