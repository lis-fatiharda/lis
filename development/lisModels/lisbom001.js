// lisbom001 - BOM Category

import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        company: { type: String, label: "Firma Kodu", default: "" },
        plant: { type: String, label: "Tesis Kodu", default: "" },
        category: { type: String, label: "Kategori Kodu", default: "" },
        stext: { type: String, label: "Açıklama", default: "" },
        _deleted: { type: Boolean, label: "Silindi mi?", default: false },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const lisbom001 = mongoose.model("lisbom001", schema);

export default lisbom001;
