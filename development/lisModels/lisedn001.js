// lisedn001 - E-Document parameters.

import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        company: { type: String, label: "Firma Kodu", default: "" },
        username: { type: String, label: "Kullanıcı adı", default: "" },
        doctype: { type: String, label: "Belge Tipi", default: "" },
        customer: { type: String, label: "Müşteri", default: "" },
        einvoiceprefix: { type: String, label: "Efatura ön eki", default: "" },
        einvoicenumrange: {
            type: String,
            label: "Efatura numaratör",
            default: "",
        },
        earchiveprefix: { type: String, label: "Earşiv ön eki", default: "" },
        earchivenumrange: {
            type: String,
            label: "Earşiv numaratör",
            default: "",
        },
        edeliveryprefix: {
            type: String,
            label: "Eirsaliye ön eki",
            default: "",
        },
        edeliverynumrange: {
            type: String,
            label: "Eirsaliye numaratör",
            default: "",
        },
        xslt: { type: String, label: "XSLT", default: "" },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const lisedn001 = mongoose.model("lisedn001", schema);

export default lisedn001;
