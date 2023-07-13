// lisbas016 - Supply Type

import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        company: { type: String, label: "Firma Kodu", default: "" },
        spprokey: { type: String, label: "Tedarik Tipi", default: "" },
        stext: { type: String, label: "Açıklaması", default: "" },
        _deleted: { type: Boolean, label: "Silindi mi?", default: false },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const lisbas016 = mongoose.model("lisbas016", schema);

export default lisbas016;
