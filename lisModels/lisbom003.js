// lisbom003 - BOM Product Types

import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        company: { type: String, label: "Firma Kodu", default: "" },
        type: { type: String, label: "Eleman Tipi", default: "" },
        stext: { type: String, label: "Açıklama", default: "" },
        isprice: { type: Boolean, label: "Tutarla", default: false },
        prodtype: {
            type: Number,
            label: "Ürün Tipi",
            options: [
                { value: 0, stext: "Standart Ürün" },
                { value: 1, stext: "Üründen Farklı Değerde Yanürün" },
                { value: 2, stext: "Hurda" },
                { value: 3, stext: "Fire" },
            ],
            default: 0,
        },

        _deleted: { type: Boolean, label: "Silindi mi?", default: false },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const lisbom003 = mongoose.model("lisbom003", schema);

export default lisbom003;
