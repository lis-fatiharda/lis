// lissal001 - Sal document types

import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        company: { type: String, label: "Firma Kodu", default: "" },
        doctype: { type: String, label: "Satış belge tipi", default: "" },
        stext: { type: String, label: "Açıklama", default: "" },
        findoctype: { type: String, label: "Muhasebe Belge tipi", default: "" },

        // Document Characteristics
        offtype: {
            type: Number,
            label: "Teklif Karakteristiği",
            options: [
                { value: 0, stext: "None" },
                { value: 1, stext: "Şablon" },
                { value: 2, stext: "Normal" },
            ],
            default: 0,
        },
        ordtype: {
            type: Number,
            label: "Sipariş Karakteristiği",
            options: [
                { value: 0, stext: "None" },
                { value: 1, stext: "Şablon" },
                { value: 2, stext: "Normal" },
                { value: 3, stext: "Değer Anlaşması" },
                { value: 4, stext: "Miktar Anlaşması" },
                { value: 5, stext: "Termin Anlaşması" },
            ],
            default: 0,
        },
        deltype: {
            type: Number,
            label: "İrsaliye Karakteristiği",
            options: [
                { value: 0, stext: "None" },
                { value: 1, stext: "Manuel Çıkışlı" },
                { value: 2, stext: "Oto Çıkışlı" },
                { value: 3, stext: "Manuel Girişli İade" },
                { value: 4, stext: "Oto Girişli İade" },
            ],
            default: 0,
        },
        invtype: {
            type: Number,
            label: "Fatura Karakteristiği",
            options: [
                { value: 0, stext: "None" },
                { value: 1, stext: "Normal" },
                { value: 2, stext: "Miktar İade" },
                { value: 3, stext: "Değer İade" },
                { value: 4, stext: "İptal faturası" },
            ],
            default: 0,
        },
        signprotocol: {
            type: Number,
            label: "İmzalama protokolü",
            options: [
                { value: 0, stext: 'İmza Gerektirmez' }, 
                { value: 1, stext: "A veya B İmzalar" },
                { value: 2, stext: "B ve A Sırayla İmzalar" },
                { value: 3, stext: "Yalnız A İmzalar" },
            ],
            default: 0,
        },
        blimit: {
            type: Number,
            label: "B Grubu İçin Limit",
            default: 0,
        },

        iscurrdiffinv: {
            type: Boolean,
            label: "Kur Farkı Faturası",
            default: false,
        },
        currdiffmaterial: {
            type: String,
            label: "Kur Farkı Malzemesi",
            default: "",
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
        //----
        _deleted: { type: Boolean, label: "Silindi mi?", default: false }, // 0:silinmedi | 1:silindi
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const lissal001 = mongoose.model("lissal001", schema);

export default lissal001;
