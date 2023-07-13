// liscustomers - LisERP customer - vendor - candidate informations.

import mongoose from "mongoose";

const custBanksSchema = new mongoose.Schema({
    banknum: { type: String, label: "Banka No", default: "" },
    bankname: { type: String, label: "Banka Adı", default: "" },
    bankaddress: { type: String, label: "Banka Adı", default: "" },
    swift: { type: String, label: "Swift", default: "" },
    iban: { type: String, label: "I-BAN", default: "" },
    account: { type: String, label: "Hesap No", default: "" },
    country: { type: String, label: "Ülke", default: "" },
    currency: { type: String, label: "Para Birimi", default: "" },
});

const custAddressSchema = new mongoose.Schema({
    adrnum: { type: Number, label: "Adres No", default: 1 },
    addressname: { type: String, label: "Adres ismi", default: "" },
    country: { type: String, label: "Ülke", default: "" },
    city: { type: String, label: "Şehir", default: "" },
    address: { type: String, label: "Adres", default: "" },
    postcode: { type: String, label: "Posta kodu", default: "" },
    telnum: { type: String, label: "Telefon no", default: "" },
    faxnum: { type: String, label: "Fax", default: "" },
    email: { type: String, label: "E-Mail", default: "" },
    choicetype: {
        type: Number,
        enum: [0, 1, 2], //"Müşteri", "Tedarikçi", "Herikisi"
        label: "Seçim tipi",
        default: 2,
    }, // is it considered for pur or sal?
    addresstype: {
        type: Number,
        enum: [0, 1, 2], //"İrsaliye", "Fatura", "Hiçbiri"
        label: "Adres tipi",
        default: 2,
    },
    notes: { type: String, label: "Notlar", default: "" },
});

const custNotesSchema = new mongoose.Schema({
    notetitle: { type: String, label: "Not Başlığı", default: "" },
    note: { type: String, label: "Not", default: "" },
});

const custDocsUploadedSchema = new mongoose.Schema({
    name: { type: String, label: "Yüklenen Dosya ismi", default: "" },
    serverpath: { type: String, label: "Server Dosya Yolu", default: "" },
});

const custDocsSchema = new mongoose.Schema({
    name: { type: String, label: "Döküman İsmi", default: "" },
    path: { type: Array, label: "Dosya Yolu", default: [""] },
    uploaded: [custDocsUploadedSchema],
    note: { type: String, label: "Not", default: "" },
    _deleted: { type: Boolean, label: "Silindi", default: false },
});

const custPerSchema = new mongoose.Schema({
    gender: {
        type: String,
        label: "Hitap",
        default: "Bay",
    },
    name: { type: String, label: "İsim", default: "" },
    secondname: { type: String, label: "İkinci İsmi", default: "" },
    surname: { type: String, label: "Soy İsim", default: "" },
    department: { type: String, label: "Departman", default: "" },
    position: { type: String, label: "Pozisyon", default: "" },
    phone: { type: String, label: "Telefon No", default: "" },
    extphone: { type: String, label: "Dahili", default: "" },
    mobil: { type: String, label: "Cep Telefon", default: "" },
    mobils: { type: String, label: "Cep Telefon Özel", default: "" },
    email: { type: String, label: "E-Mail", default: "" },
});



const schema = new mongoose.Schema(
    {
        company: {
            type: String,
            default: "01",
        },
        busarea: {
            type: String,
            default: "S",
        },
        customer: {
            type: String,
            unique: [true, "Cari Kodu Duplicate!"],
            required: [true, "Lütfen Cari kodu giriniz!"],
            default: "",
        },
        name1: {
            type: String,
            required: [true, "Lütfen cari adı giriniz!"],
            default: "",
        },
        title: {
            type: String,
            default: "",
        },
        custorvend: {
            type: Number,
            enum: [0, 1, 2], //"Aday", "Müşteri", "Tedarikçi"
            default: 0,
        },
        taxdept: {
            type: String,
            default: "",
        },
        taxnum: {
            type: String,
            default: "",
        },
        sector: {
            type: String,
            default: "",
        },
        country: {
            type: String,
            default: "",
        },
        city: {
            type: String,
            default: "",
        },
        address: {
            type: String,
            default: "",
        },
        postcode: {
            type: String,
            default: "",
        },
        telnum: { type: String, label: "Telefon", default: "" },
        faxnum: { type: String, label: "Fax", default: "" },
        email: { type: String, label: "E-Mail", default: "" },
        website: { type: String, label: "Web Sitesi", default: "" },
        currency: { type: String, default: "" },
        islocked: {
            type: Number,
            enum: [0, 1, 2], //"Blokesiz", "Blokeli", "Ödeme Blokeli"
            default: 0,
        },
        //*****************Accounting */
        acctype: { type: String, label: "Hesap Tipi", default: "" },
        account: { type: String, label: "Muhasebe Hesap No", default: "" },
        glaccount: { type: String, label: "Müşt/Ted Hesap No", default: "" },
        exchmethod: {
            type: Number,
            enum: [0, 1, 2, 3], //"Alış", "Satış", "E.Alış", "E.Satış"
            label: "Kur Metodu",
            default: 0,
        },
        creditlimit: { type: String, label: "Kredi Limiti", default: "" },
        creditlimitcurr: {
            type: String,
            label: "Kredi Limiti Para Birimi",
            default: "",
        },
        //***************** Sales */
        saldept: { type: String, label: "Satış Bölümü", default: "" },
        custgrp: { type: String, label: "Müşteri Grubu", default: "" },
        einvotype: {
            type: Number,
            enum: [0, 1, 2], //"Belge Tipinden", "Temel Fatura", "Ticari Fatura"
            label: "E-Fatura Tipi",
            default: 1,
        },
        accesstype: {
            type: String,
            label: "Bize Ulaşma Şekli",
            default: "",
        },
        custbanks: [custBanksSchema],
        custaddress: [custAddressSchema],
        custnotes: [custNotesSchema],
        custdocs: [custDocsSchema],
        custper: [custPerSchema],
        //***************** E-Invoice E-Despatchadvice */
        einvmember: {
            type: Array,
            label: "E-fatura mükellefiyeti",
            default: [],
        },
        edelmember: {
            type: Array,
            label: "E-irsaliye mükellefiyeti",
            default: [],
        },
        einvotype: {
            type: Number,
            enum: [0, 1],
            label: "0:Temel Fatura|1:Ticari Fatura",
            default: 1,
        },
        //***************** Purchase */
        purdept: { type: String, label: "Satınalma Bölümü", default: "" },

        //***************** */
        _deleted: {
            type: Boolean,
            label: "Silindi mi?",
            default: false,
            // 0:silinmedi | 1:silindi
        },
        createdby: {
            type: String,
            label: "Oluşturan",
            default: global.sys_user,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);



const liscustomers = mongoose.model("liscustomers", schema);

export default liscustomers;
