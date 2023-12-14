// lisbas019 - Languages

import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        company: { type: String, label: "Firma Kodu", default: "" },
        langu: { type: String, label: "Dil", default: "" },
        stext: { type: String, label: "Açıklaması", default: "" },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const lisbas019 = mongoose.model("lisbas019", schema);

export default lisbas019;
