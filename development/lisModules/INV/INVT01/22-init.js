export default async function (dv) {
    dv.lisinvdocs = await new lisinvdocs(lisinvdocs.prototype.schema.tree);

    return dv;
}
