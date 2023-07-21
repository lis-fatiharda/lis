// lisfinmatches - Financial documents matching

import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        company: { type: String, label: "Firma", default: "01" },
        
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
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const lisfinmatches = mongoose.model("lisfinmatches", schema);

export default lisfinmatches;
