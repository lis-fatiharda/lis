// lisfinmatches - Financial documents matching

import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        company: { type: String, label: "Firma", default: "01" },
        acctype: { type: String, label: "Hesap Tipi", default: "" },
        account: { type: String, label: "Hesap", default: "" },
        atext: { type: String, label: "Hesap Açıklaması", default: "" },
        //--
        debitdoctype: { type: String, label: "Döküman tipi", default: "" },
        debitdocnum: { type: String, label: "Döküman no", default: "" },
        debititemnum: { type: Number, label: "Kalem no", default: 10 },
        //--
        creditdoctype: { type: String, label: "Döküman tipi", default: "" },
        creditdocnum: { type: String, label: "Döküman no", default: "" },
        credititemnum: { type: Number, label: "Kalem no", default: 10 },

        //--

        dmatched: {
            type: Number,
            label: "Eşlenmiş Tutar (Belge P.Br.)",
            default: 0,
        },
        hmatched: {
            type: Number,
            label: "Eşlenmiş Tutar (Firma P.Br.)",
            default: 0,
        },
        debitcurrdiff: {
            type: Number,
            label: "Kur Farkı Borç",
            default: 0,
        },
        creditcurrdiff: {
            type: Number,
            label: "Kur Farkı Alacak",
            default: 0,
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

const lisfinmatches = mongoose.model("lisfinmatches", schema);

export default lisfinmatches;
