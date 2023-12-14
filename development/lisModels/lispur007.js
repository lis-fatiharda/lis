// lispur007 - Delivery Method 

import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        company: { type: String, label: "Firma Kodu", default: "" },

        station: {
            type: String,
            label: "İstasyon",
            default: "",
        },

        stext: {
            type: String,
            label: "İstasyon Açıklaması",
            default: "",
        },

        _deleted: { type: Boolean, label: "Silindi mi?", default: false }, // 0:silinmedi | 1:silindi
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const lispur007 = mongoose.model("lispur007", schema);

export default lispur007;
