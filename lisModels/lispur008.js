

import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        company: { type: String, label: "Firma Kodu", default: "" },
        doctype: { type: String, label: "Belge Tipi", default: "" },
        username: { type: String, label: "Kullanıcı Adı", default: "" },
        purdept: { type: String, label: "Satınalma Bölümü", default: "" },
        stext: { type: String, label: "Açıklama", default: "" },
        //
        usergrp: {
            type: Number,
            label: "Bölüm Hiyerarşisinde Yeri",
            options: [
                { value: 0, stext: "Satınalma Müdürü" },
                { value: 1, stext: "Bölüm Şefi" },
                { value: 2, stext: "Satınalma Elemanı" },
            ],
            default: 2,
        },
        //
        notinsert: { type: String, label: "Oluşturamaz", default: "" },
        notupdate: { type: String, label: "Değiştiremez", default: "" },
        notdelete: { type: String, label: "Silemez", default: "" },

        _deleted: { type: Boolean, label: "Silindi mi?", default: false }, // 0:silinmedi | 1:silindi
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const lispur008 = mongoose.model("lispur008", schema);

export default lispur008;
