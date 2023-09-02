// lisfindocs - Sales Documents.

import mongoose from "mongoose";


const itemsSchema = new mongoose.Schema({
    itemnum: { type: Number, label: "Kalem no", default: 10 },
    acctype: { type: String, label: "Hesap Tipi", default: "" },
    glaccount: { type: String, label: "T.D.Hesap", default: "" },
    gltext: { type: String, label: "T/D Hesap Açıklaması", default: "" },
    account: { type: String, label: "Hesap", default: "" },
    atext: { type: String, label: "Hesap Açıklaması", default: "" },
    stext: { type: String, label: "Kalem Açıklaması", default: "" },

    postkey: { type: String, label: "Kayıt Anahtarı", default: "" },

    currency: { type: String, label: "Para Birimi", default: "" },
    curdate: { type: Date, label: "Kur Tarihi", default: new Date() },
    currate: { type: Number, label: "Kur", default: 1 },
    //-
    hdebit: { type: Number, label: "Tutar (Firma P.Br.)", default: 0 },
    hcredit: { type: Number, label: "Tutar (Belge P.Br.)", default: 0 },
    ddebit: { type: Number, label: "Tutar (Firma P.Br.)", default: 0 },
    dcredit: { type: Number, label: "Tutar (Belge P.Br.)", default: 0 },

    hmatched: {
        type: Number,
        label: "Eşlenmiş Tutar (Firma P.Br.)",
        default: 0,
    },
    dmatched: {
        type: Number,
        label: "Eşlenmiş Tutar (Belge P.Br.)",
        default: 0,
    },

    hbalance: { type: Number, label: "Bakiye (Firma P.Br.)", default: 0 },
    dbalance: { type: Number, label: "Bakiye (Belge P.Br.)", default: 0 },
    //-


    ischeck: { type:Boolean, label: "Çek mi?", default: false },
    checknumber: { type:String, label: "Çek No", default: ""},

    //******************* */
    createdby: {
        type: String,
        label: "Oluşturan",
        default: global.sys_user,
    },
});

const notesSchema = new mongoose.Schema({
    notetitle: { type: String, label: "Not Başlığı", default: "" },
    note: { type: String, label: "Not", default: "" },
    isenote: { type: Boolean, label: "E-Belge Notu", default: false },
});

const docsSchema = new mongoose.Schema({
    name: { type: String, label: "Yüklenen Dosya ismi", default: "" },
    serverpath: { type: String, label: "Server Dosya Yolu", default: "" },
});

//******************************************************************************************************************** */
//*******************************************************HEAD********************************************************* */

const schema = new mongoose.Schema(
    {
        company: { type: String, label: "Firma Kodu", default: "01" },
        busarea: { type: String, label: "İş Alanı", default: "S" },
        doctype: { type: String, label: "Döküman tipi", default: "" },
        docnum: { type: String, label: "Döküman no", default: "" },
        accstd: { type: Number, label: "Muhasebe Standardı", default: 1 },
        stext: { type: String, label: "Belge Açıklaması", default: "" },

        docdate: { type: Date, label: "Kayıt Tarihi", default: new Date() },

        postnum: { type: String, label: "Yevmiye no", default: "" },
        postdate: { type: Date, label: "Yevmiye Tarihi", default: new Date() },

        itemcount: { type: Number, label: "Kalem Sayısı", default: 0 },
        finperiod: { type: Number, label: "Periyot", default: 0 },

        //*************************** */
        items: [itemsSchema],
        notes: [notesSchema],
        docs: [docsSchema],

        //******************* */
        purdoctype: {
            type: String,
            label: "Referans Alış Döküman Tipi",
            default: "",
        },
        purdocnum: {
            type: String,
            label: "Referans Alış Döküman no",
            default: "",
        },
        prddoctype: {
            type: String,
            label: "Referans Üretim Döküman Tipi",
            default: "",
        },
        prddocnum: {
            type: String,
            label: "Referans Üretim Döküman no",
            default: "",
        },
        invdoctype: {
            type: String,
            label: "Referans Envanter Döküman Tipi",
            default: "",
        },
        invdocnum: {
            type: String,
            label: "Referans Envanter Döküman no",
            default: "",
        },
        saldoctype: {
            type: String,
            label: "Referans Satış Döküman Tipi",
            default: "",
        },
        saldocnum: {
            type: String,
            label: "Referans Satış Döküman no",
            default: "",
        },
        hcmdoctype: {
            type: String,
            label: "Referans IK Döküman Tipi",
            default: "",
        },
        hcmdocnum: {
            type: String,
            label: "Referans IK Döküman no",
            default: "",
        },
        astdoctype: {
            type: String,
            label: "Referans Demirbaş Döküman Tipi",
            default: "",
        },
        astdocnum: {
            type: String,
            label: "Referans Demirbaş Döküman no",
            default: "",
        },
        //******************* */

        hdebit: { type: Number, label: "Borç (Firma P.Br.)", default: 0 },
        hcredit: { type: Number, label: "Alacak (Firma P.Br.)", default: 0 },
        ddebit: { type: Number, label: "Borç (Belge P.Br.)", default: 0 },
        dcredit: { type: Number, label: "Alacak (Belge P.Br.)", default: 0 },
        ddiff: { type: Number, label: "Fark (Belge P.Br.)", default: 0 },

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

const lisfindocs = mongoose.model("lisfindocs", schema);


export default lisfindocs;
