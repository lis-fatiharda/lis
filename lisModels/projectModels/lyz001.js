// lyz001 - The basic busarea identifier collection for LisERP module Construction.

import { Schema, model } from "mongoose";

const schema = new Schema(
    {
        company: { type: String, label: "Firma Kodu", default: "" },
        code: { type: String, label: "Danışman Kodu", default: "" }, // İş alanı kodu
        name: { type: String, label: "Danışman Adı", default: "" }, // İş alanı adı
        surname: { type: String, label: "Danışman Soyadı", default: "" }, // İş alanı adı
        isdelete: { type: Boolean, label: "Silindi mi?", default: false }, // 0:silinmedi | 1:silindi
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const lyz001 = model("lyz001", schema);

export default lyz001;
