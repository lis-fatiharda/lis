// lisbas013 - The basic Plant identifier collection for LisERP module Construction.

import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        taxcode: { type: String, label: "Vergi Kodu", default: "" },
        taxname: { type: String, label: "Vergi Adı", default: "" },
        taxtype: {
            type: Number,
            label: "Vergi İstisna Tipi",
            options: [
                { value: 0, stext: "Kısmi istisna" },
                { value: 1, stext: "Tam istisna" },
            ],
            default: 0,
        },
        _deleted: { type: Boolean, label: "Silindi mi?", default: false }, // 0:silinmedi | 1:silindi
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const lisbas013 = mongoose.model("lisbas013", schema);

export default lisbas013;
