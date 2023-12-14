// lisprddocs - Bill Of Materials

import mongoose from "mongoose";

const prodsSchema = new mongoose.Schema({
    type: { type: String, label: "Giriş Tipi", default: "" }, // 0: Ürün | 1: Eş değer yanürün | 2: yanürün | 3: fire
    operation: { type: String, label: "Operasyon No", default: "" },
    material: { type: String, label: "Malzeme Kodu", default: "" },
    variant: { type: Object, label: "Varyant", default: '' },
    quantity: { type: Number, label: "Temel Miktar", default: 1 },
    qunit: { type: String, label: "Birim", default: "" },

    warehouse: { type: String, label: "Giriş Depo", default: "" },
    stockplace: { type: String, label: "Giriş Stokyeri", default: "" },
    stext: { type: String, label: "Açıklama", default: "" },
});


const activitiesSchema = new mongoose.Schema({
    operation: { type: String, label: "Operasyon No", default: "" },
    confirmpos: { type: Number, label: "Onay Sırası", default: 1 }, // Gerçekleşen aktiviteler için
    type: { type: String, label: "Aktivite Tipi", default: "" },
    value: { type: Number, label: "Tahmini operasyon süresi", default: 0 },
    unit: { type: String, label: "Birimi", default: "" },

    iscost: { type: Boolean, label: "Maliyete ekle", default: false },

    stat: { type: Boolean, label: "Aktivite statüsü", default: false }, // false: Planlanan | true: Gerçekleşen
    price: { type: Number, label: "Birim çalışma süresi tutarı", default: 0 },
});

const operationsSchema = new mongoose.Schema({
    operation: { type: String, label: "Operasyon No", default: "" },
    oprcontrol: { type: String, label: "Operasyon Kontrol Tipi", default: "S" },
    workcenter: { type: String, label: "İş Merkezi", default: "" },
    costcenter: { type: String, label: "Maliyet Merkezi", default: "" },
    capgrp: { type: String, label: "İş Merkezi Kapasite Grubu", default: "" },
    stext: { type: String, label: "Açıklama", default: "" },
});

const equipmentsSchema = new mongoose.Schema({
    operation: { type: String, label: "Operasyon No", default: "" },
    type: { type: String, label: "Aktivite Tipi", default: "" },
    value: { type: Number, label: "Tahmini operasyon süresi", default: 0 },
    unit: { type: String, label: "Birimi", default: "" },
    material: { type: String, label: "Malzeme Kodu", default: "" },
    variant: { type: Object, label: "Varyant", default: '' },
    stext: { type: String, label: "Açıklama", default: "" },

    iscost: { type: Boolean, label: "Maliyete ekle", default: false },
});



const componentsSchema = new mongoose.Schema({
    type: { type: String, label: "Ürün Tipi", default: "" },
    operation: { type: String, label: "Operasyon No", default: "" },
    material: { type: String, label: "Malzeme Kodu", default: "" },
    variant: { type: Object, label: "Varyant", default: '' },
    quantity: { type: Number, label: "Tüketilecek Miktar", default: 1 },
    qunit: { type: String, label: "Birim", default: "" },

    warehouse: { type: String, label: "Tüketim Depo", default: "" },
    stockplace: { type: String, label: "Tüketim Stokyeri", default: "" },
    stext: { type: String, label: "Açıklama", default: "" },
});


const confirmationsSchema = new mongoose.Schema({
    operation: { type: String, label: "Opearasyon No", default: "" },
    confirmpos: { type: Number, label: "Onay Sırası", default: 1 },
    workstart: { type: Date, label: "Başlangıç Tarihi", default: new Date() },
    workend: { type: Date, label: "Bitiş Tarihi", default: new Date() },
    workingtime: { type: Number, label: "Onay Toplam Çalışma Süresi", default: 0 },

    workcenter: { type: String, label: "İş Merkezi", default: "" },
    costcenter: { type: String, label: "Maliyet Merkezi", default: "" },

    invdoctype: { type: String, label: "Envanter Belgesi Tipi", default: "" },
    invdocnum: { type: String, label: "Envanter Belgesi No", default: "" },
});

const schema = new mongoose.Schema(
    {
        company: { type: String, label: "Firma Kodu", default: "01" },
        plant: { type: String, label: "Tesis", default: "01" },
        doctype: { type: String, label: "İş Emri Tipi", default: "" },
        docnum: { type: String, label: "İş Emri No", default: "" },
        alternum: { type: Number, label: "Alternatif No", default: 0 },
        products: [prodsSchema], // Materials will be produced by opeartions
        components: [componentsSchema], // Materials will be consumed by opeartions
        operations: [operationsSchema], // Production Opeartions
        activities: [activitiesSchema], // Activities of operations
        equipments: [equipmentsSchema], // Equipment will be used by operations
        confirmations: [confirmationsSchema], // Production order confirmations
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

const lisprddocs = mongoose.model("lisprddocs", schema);

export default lisprddocs;
