// lisbas009 - Material Types

import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        company: { type: String, label: "Firma Kodu", default: "01" },
        mattype: { type: String, label: "Malzeme Tipi", default: "" },
        stext: { type: String, label: "Açıklama", default: "" },
        invmanag: { type: String, label: "Envanter Yönetim Tipi", default: "" },
        accgrp: { type: String, label: "Hesap Grubu", default: "" },
        _deleted: { type: Boolean, label: "Silindi mi?", default: false },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const lisbas009 = mongoose.model("lisbas009", schema);

export default lisbas009;
