// lispur005 - Sal document Copy

import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        company: { type: String, label: "Firma Kodu", default: "" },
        disckey: {
            type: String,
            label: "İndirim Anahtarı",
            default: "",
        },
        usage: {
            type: Number,
            enum: [0, 1], // "Belgede", "Kalemde"
            label: "Belgede - Kalemde",
            default: 0,
        },
        type: {
            type: Number,
            enum: [0, 1, 2, 3],
            label: "İndirim / Artırım Tipi",
            options: [
                { value: 0, stext: "Net üzerinden Yüzdesel" },
                { value: 1, stext: "Brüt üzerinden Yüzdesel" },
                { value: 2, stext: "Mutlak" },
                { value: 3, stext: "Birim Başına Mutlak" },
            ],
            default: 0,
        },
        rate: {
            type: Number,
            label: "İndirim oranı",
            default: 0,
        },
        amnt: {
            type: Number,
            label: "İndirim tutarı",
            default: 0,
        },
        isenable: {
            type: Boolean,
            label: "Belge üzerinde değiştirilebilir?",
            default: false,
        },
        stext: {
            type: String,
            label: "İndirim Açıklaması",
            default: "",
        },

        _deleted: { type: Boolean, label: "Silindi mi?", default: false }, // 0:silinmedi | 1:silindi
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const lispur005 = mongoose.model("lispur005", schema);

export default lispur005;
