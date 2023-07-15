// lisprddocs - Bill Of Materials

import mongoose from "mongoose";

const prodsSchema = new mongoose.Schema({
    type: { type: String, label: "Giriş Tipi", default: "" }, // 0: Ürün | 1: Eş değer yanürün | 2: yanürün | 3: fire
    operation: { type: Number, label: "Operasyon No", default: 10 },
    material: { type: String, label: "Malzeme Kodu", default: "" },
    quantity: { type: Number, label: "Temel Miktar", default: 1 },
    qunit: { type: String, label: "Birim", default: "" },

    warehouse: { type: String, label: "Giriş Depo", default: "" },
    stockplace: { type: String, label: "Giriş Stokyeri", default: "" },
    stext: { type: String, label: "Açıklama", default: "" },
});


const activitiesSchema = new mongoose.Schema({
    operation: { type: Number, label: "Operasyon No", default: 10 },
    type: { type: String, label: "Aktivite Tipi", default: "" },
    value: { type: Number, label: "Tahmini operasyon süresi", default: 0 },
    unit: { type: String, label: "Birimi", default: "" },

    iscost: { type: Boolean, label: "Maliyete ekle", default: false },
});

const operationsSchema = new mongoose.Schema({
    operation: { type: Number, label: "Operasyon No", default: 10 },
    oprcontrol: { type: String, label: "Operasyon Kontrol Tipi", default: "S" },
    workcenter: { type: String, label: "İş Merkezi", default: "" },
    costcenter: { type: String, label: "Maliyet Merkezi", default: "" },
    capgrp: { type: String, label: "İş Merkezi Kapasite Grubu", default: "" },
    stext: { type: String, label: "Açıklama", default: "" },
});

const equipmentsSchema = new mongoose.Schema({
    operation: { type: Number, label: "Operasyon No", default: 10 },
    type: { type: String, label: "Aktivite Tipi", default: "" },
    value: { type: Number, label: "Tahmini operasyon süresi", default: 0 },
    unit: { type: String, label: "Birimi", default: "" },
    material: { type: String, label: "Malzeme Kodu", default: "" },
    stext: { type: String, label: "Açıklama", default: "" },

    iscost: { type: Boolean, label: "Maliyete ekle", default: false },
});



const componentsSchema = new mongoose.Schema({
    type: { type: String, label: "Ürün Tipi", default: "" },
    operation: { type: Number, label: "Operasyon No", default: 10 },
    material: { type: String, label: "Malzeme Kodu", default: "" },
    quantity: { type: Number, label: "Tüketilecek Miktar", default: 1 },
    qunit: { type: String, label: "Birim", default: "" },

    warehouse: { type: String, label: "Tüketim Depo", default: "" },
    stockplace: { type: String, label: "Tüketim Stokyeri", default: "" },
    stext: { type: String, label: "Açıklama", default: "" },
});

const schema = new mongoose.Schema(
    {
        company: { type: String, label: "Firma Kodu", default: "" },
        plant: { type: String, label: "Tesis", default: "01" },
        doctype: { type: String, label: "İş Emri Tipi", default: "" },
        docnum: { type: String, label: "İş Emri No", default: "" },
        alternum: { type: Number, label: "Alternatif No", default: 0 },
        prods: [prodsSchema], // Materials will be produced by opeartions
        components: [componentsSchema], // Materials will be consumed by opeartions
        operations: [operationsSchema], // Production Opeartions
        activities: [activitiesSchema], // Activities of operations
        equipments: [equipmentsSchema], // Equipment will be used by operations
        note: {
            type: String,
            label: "İş Emri Notu",
            default: "",
        },

        docdate: {
            type: Date,
            label: "İş Emri Tarihi",
            default: new Date(),
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

const lisprddocs = mongoose.model("lisprddocs", schema);

export default lisprddocs;
