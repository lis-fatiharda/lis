// lisbas015 - Banks

import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        company: { type: String, label: "Firma Kodu", default: "" },
        baccount: { type: String, label: "Banka Hesap No", default: "" },
        iban: { type: String, label: "IBAN", default: "" },

        stext: { type: String, label: "Banka İsmi", default: "" },
        address: { type: String, label: "Adres", default: "" },

        country: { type: String, label: "Ülke", default: "" },

        currency: { type: String, label: "Para Birimi", default: "" },
        bnumber: { type: String, label: "Şube Kodu", default: "" },
        name: { type: String, label: "Şube Adı", default: "" },
        swift: { type: String, label: "Swift Kodu", default: "" },

        acctype: { type: String, label: "İlişkili Hesap Tipi", default: "" },
        account: { type: String, label: "İlişkili Hesap No", default: "" },
        writeonedoc: { type: Boolean, label: "E-Faturada Yaz?", default: false },

        _deleted: { type: Boolean, label: "Silindi mi?", default: false },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const lisbas015 = mongoose.model("lisbas015", schema);

export default lisbas015;
