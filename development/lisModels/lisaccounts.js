// lisaccounts - Sal document types

import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        company: { type: String, label: "Firma Kodu", default: "01" },
        accstd: { type: Number, label: "Muhasebe Standardı", default: 0 },
        busarea: { type: String, label: "İş Alanı", default: "S" },
        acctype: { type: String, label: "Hesap Tipi", default: "" },
        account: { type: String, label: "Hesap", default: "" },
        accgrp: { type: String, label: "Hesap Grubu", default: "" },
        accclass: { type: String, label: "Hesap Sınıfı", default: "" },
        acclevel: {
            type: Number,
            //label: "Hesap Seviyesi",
            enum: [0, 1, 2], // 0: Ana Hesap | 1: Üst Hesap | 2: Direct Güncellenebilir Hesap
            default: 0,
        },
        stext: { type: String, label: "Hesap Açıklaması", default: "" },
        glaccount: { type: String, label: "Tek Düzen Hesap No", default: "" },
        currency: { type: String, label: "Para birimi", default: "" },
        exchmethod: {
            type: Number,
            enum: [0, 1, 2, 3], //"Alış", "Satış", "E.Alış", "E.Satış"
            label: "Kur Metodu",
            default: 0,
        },
        //--------------------------------------------------------------------------------------------------------------------------------
        isproject: {
            type: Number,
            enum: [0, 1, 2, 3], //"Serbest", "Zorunlu", "Boş bırakılmalı"
            label: "Proje girişi",
            default: 0,
        },
        project: { type: String, label: "Proje", default: "" },
        iscostcenter: {
            type: Number,
            enum: [0, 1, 2, 3], //"Serbest", "Zorunlu", "Boş bırakılmalı"
            label: "Proje girişi",
            default: 0,
        },
        cplant: { type: String, label: "Maliyet Tesisi", default: "" },
        costcenter: { type: String, label: "Maliyet Merkezi", default: "" },
        iscostobject: {
            type: Number,
            enum: [0, 1, 2, 3], //"Serbest", "Zorunlu", "Boş bırakılmalı"
            label: "Proje girişi",
            default: 0,
        },
        costobject: { type: String, label: "Maliyet Objesi", default: "" },
        //******************* */

        _deleted: { type: Boolean, label: "Silindi mi?", default: false },
        _createdby: {
            type: String,
            label: "Oluşturan",
            default: global.sys_user,
        },
        _updatedby: {
            type: String,
            label: "Güncelleyen",
            default: global.sys_user,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

//schema.post("find", (res) => console.log("findOne****", res));

const lisaccounts = mongoose.model("lisaccounts", schema);

export default lisaccounts;
