// lissal007 - Delivery Method 

import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        company: { type: String, label: "Firma Kodu", default: "" },

        freight: {
            type: String,
            label: "Nakliye Tipi",
            default: "",
        },

        stext: {
            type: String,
            label: "Nakliye Açıklaması",
            default: "",
        },

        _deleted: { type: Boolean, label: "Silindi mi?", default: false }, // 0:silinmedi | 1:silindi
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const lissal007 = mongoose.model("lissal007", schema);

export default lissal007;
