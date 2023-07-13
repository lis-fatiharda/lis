// lisbomdocs - Bill Of Materials

import mongoose from "mongoose";

const prodsSchema = new mongoose.Schema({
    type: { type: String, label: "Giriş Tipi", default: 0 }, // 0: Ürün | 1: Eş değer yanürün | 2: yanürün | 3: fire
    operation: { type: Number, label: "Operasyon No", default: 10 },
    material: { type: String, label: "Malzeme Kodu", default: "" },
    quantity: { type: Number, label: "Temel Miktar", default: 1 },
    qunit: { type: String, label: "Birim", default: "" },

    warehouse: { type: String, label: "Giriş Depo", default: "" },
    stockplace: { type: String, label: "Giriş Stokyeri", default: "" },
    stext: { type: String, label: "Açıklama", default: "" },
});

const operationsSchema = new mongoose.Schema({
    operation: { type: Number, label: "Operasyon No", default: 10 },
    oprcontrol: { type: String, label: "Operasyon Kontrol Tipi", default: "S" },
    workcenter: { type: String, label: "İş Merkezi", default: "" },
    costcenter: { type: String, label: "Maliyet Merkezi", default: "" },
    capgrp: { type: String, label: "İş Merkezi Kapasite Grubu", default: "" },
    activities: [activitiesSchema],
    stext: { type: String, label: "Açıklama", default: "" },
});

const activitiesSchema = new mongoose.Schema({
    type: { type: String, label: "Aktivite Tİpi", default: "" },
    value: { type: Number, label: "Tahmini operasyon süresi", default: 0 },
    unit: { type: String, label: "Birimi", default: "" },

    iscost: { type: Boolean, label: "Maliyete ekle", default: false },
});

const componentsSchema = new mongoose.Schema({
    operation: { type: Number, label: "Operasyon No", default: 10 },
    material: { type: String, label: "Malzeme Kodu", default: "" },
    quantity: { type: Number, label: "Tüketilecek Miktar", default: 1 },
    qunit: { type: String, label: "Birim", default: "" },

    warehouse: { type: String, label: "Tüketim Depo", default: "" },
    stockplace: { type: String, label: "Tüketim Stokyeri", default: "" },
    stext: { type: String, label: "Açıklama", default: "" },
    isexpstop: { type: Boolean, label: "Çözülüm Sonu", default: false },
});



const schema = new mongoose.Schema(
    {
        company: { type: String, label: "Firma Kodu", default: "" },
        plant: { type: String, label: "Tesis", default: "01" },
        type: { type: Number, label: "Ürün Ağacı Tipi", default: 0 }, //0: Operasyon, 1: Set Elemanı
        category: { type: String, label: "Ürün Ağacı Kategorisi", default: "" },
        bomnumber: { type: String, label: "Ürün Ağacı No", default: "" },
        alternum: { type: Number, label: "Alternatif No", default: 0 },
        prods: [prodsSchema], // Materials will be produced
        operations: [operationsSchema],
        components: [componentsSchema],
        note: {
            type: String,
            label: "Reçete Notu",
            default: "",
        },

        validfrom: {
            type: Date,
            label: "Başlangıç Tarihi",
            default: new Date(1970),
        },
        validuntil: {
            type: Date,
            label: "Bitiş Tarihi",
            default: new Date(2100),
        },

        //************** */
        createdby: { type: String, label: "Oluşturan", default: "" },
        _deleted: { type: Boolean, label: "Silindi mi?", default: false }, // 0:silinmedi | 1:silindi
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export const activities = mongoose.model("activitiesSchema", schema);
export const components = mongoose.model("componentsSchema", schema);

const lisbomdocs = mongoose.model("lisbomdocs", schema);

export default lisbomdocs;
