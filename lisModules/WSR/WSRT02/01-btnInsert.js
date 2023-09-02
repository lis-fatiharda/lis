
export default async function (dv) {
    dv.lisDialog = "WSRT02D02";
    dv.modi = 0;

    dv.lisapikeys = {};
    dv.lisapikeys = new lisapikeys(lisapikeys.prototype.schema.tree);

    return dv;
}
