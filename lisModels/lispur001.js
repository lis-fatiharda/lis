// lispur001 - Pur dokument types

import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        company: { type: String, label: "Firma Kodu", default: "" },
        doctype: { type: String, label: "Sipariş belge tipi", default: "" },
        stext: { type: String, label: "Açıklama", default: "" },
        findoctype: { type: String, label: "Muhasebe Belge tipi", default: "" },

        // Document Characteristics
        reqtype: {
            type: Number,
            label: "İstek Karakteristiği",
            options: [
                { value: 0, stext: "None" },
                { value: 1, stext: "Normal" },
            ],
            default: 0,
        },
        offtype: {
            type: Number,
            label: "Teklif Karakteristiği",
            options: [
                { value: 0, stext: "None" },
                { value: 1, stext: "Normal" },
            ],
            default: 0,
        },
        ordtype: {
            type: Number,
            label: "Sipariş Karakteristiği (None|Normal|Değer Anl.|Miktar Anl.|Termin Anl.)",
            options: [
                { value: 0, stext: "None" },
                { value: 1, stext: "Normal" },
                { value: 2, stext: "Değer Anlaşması" },
                { value: 3, stext: "Miktar Anlaşması" },
                { value: 4, stext: "Termin Anlaşması" },
            ],
            default: 0,
        },
        deltype: {
            type: Number,
            label: "İrsaliye Karakteristiği",
            options: [
                { value: 0, stext: "None" },
                { value: 1, stext: "Manuel Girişli" },
                { value: 2, stext: "Oto Girişli" },
                { value: 3, stext: "Manuel Çıkışlı İade" },
                { value: 4, stext: "Oto Çıkışlı İade" },
            ],
            default: 0,
        },
        invtype: {
            type: Number,
            label: "Fatura Karakteristiği",
            options: [
                { value: 0, stext: "None" },
                { value: 1, stext: "Normal" },
                { value: 2, stext: "İade" },
                { value: 3, stext: "Fark" },
                { value: 4, stext: "Masraf" },
                { value: 5, stext: "Fason" },
            ],
            default: 0,
        },
        isfirstinvo: {
            type: Boolean,
            label: "Ön Ödemeli mi?",
            default: false,
        },
        isonlybyref: {
            type: Boolean,
            label: "Sadece Belge Akışı",
            default: false,
        },
        movecode: {
            type: String,
            label: "Hareket Kodu",
            default: "",
        },
        numrange: {
            type: String,
            label: "Numaratör",
            default: "",
        },
        //
        issignature: {
            type: Number,
            label: "İmzalama protokolü",
            options: [
                { value: 0, stext: 'İmza Gerektirmez' }, 
                { value: 1, stext: "A veya B İmzalar" },
                { value: 1, stext: "B ve A Sırayla İmzalar" },
                { value: 2, stext: "Yalnız A İmzalar" },
            ],
            default: 0,
        },
        blimit: {
            type: Number,
            label: "B Grubu İçin Limit",
            default: 0,
        },
        //----
        _deleted: { type: Boolean, label: "Silindi mi?", default: false }, // 0:silinmedi | 1:silindi
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const lispur001 = mongoose.model("lispur001", schema);

export default lispur001;
