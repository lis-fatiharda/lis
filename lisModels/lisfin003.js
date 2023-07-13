// lisfin003 - Doc Types

import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        company: { type: String, label: "Firma", default: "" },
        accstd: { type: String, label: "Muhasebe Standardı", default: "" },
        doctype: { type: String, label: "Belge Tipi", default: "" },
        stext: { type: String, label: "Açıklama", default: "" },
        numrange: { type: String, label: "Numara Aralığı", default: "" },
        postkeys: { type: Array, label: "Kayıt Anahtarları", default: [{postkey: "", stext: ""}] },


        _deleted: { type: Boolean, label: "Silindi mi?", default: false }, // 0:silinmedi | 1:silindi
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const lisfin003 = mongoose.model("lisfin003", schema);

export default lisfin003;
