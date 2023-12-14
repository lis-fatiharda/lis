// lisinv007 - Sal document types

import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        company: { type: String, label: "Firma Kodu", default: "" },
        doctype: { type: String, label: "Envanter belge tipi", default: "" },
        stext: { type: String, label: "Açıklama", default: "" },
        numrange: { type: String, label: "Numaratör", default: "" },
        //----
        _deleted: { type: Boolean, label: "Silindi mi?", default: false }, // 0:silinmedi | 1:silindi
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const lisinv007 = mongoose.model("lisinv007", schema);

export default lisinv007;
