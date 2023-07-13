// lisbas007 - The basic Units identifier collection for LisERP module Construction.

import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        company: { type: String, label: "Firma Kodu", default: "01"},
        unittype: {
            type: Number,
            enum: [0, 1, 2],
            label: "Birim Tipi",
            options: [
                { value: 0, stext: "Ölçü" },
                { value: 1, stext: "Para" },
                { value: 2, stext: "Zaman" },
            ],
            default: 0,
        },
        unit: { type: String, label: "Birim", default: "" },
        unitcode: { type: String, label: "Birim Kodu(E-Fatura)", default: "" },
        stext: { type: String, label: "Açıklama", default: "" },
        _deleted: { type: Boolean, label: "Silindi mi?", default: false }, // 0:silinmedi | 1:silindi
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const lisbas007 = mongoose.model("lisbas007", schema);

export default lisbas007;
