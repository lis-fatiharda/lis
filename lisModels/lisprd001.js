// lisprd001 - Order type

import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        company: { type: String, label: "Firma Kodu", default: "" },
        plant: { type: String, label: "Tesis Kodu", default: "" },
        type: { type: String, label: "Tip", default: "" },
        stext: { type: String, label: "Açıklama", default: "" },
        _deleted: { type: Boolean, label: "Silindi mi?", default: false },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const lisprd001 = mongoose.model("lisprd001", schema);

export default lisprd001;
