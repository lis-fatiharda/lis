// lisprd002 - Scrapkey type

import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        company: { type: String, label: "Firma Kodu", default: "" },
        plant: { type: String, label: "Tesis Kodu", default: "" },
        scrapkey: { type: String, label: "Fire Tipi", default: "" },
        stext: { type: String, label: "Açıklama", default: "" },
        _deleted: { type: Boolean, label: "Silindi mi?", default: false },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const lisprd002 = mongoose.model("lisprd002", schema);

export default lisprd002;
