
// lisbas001 - The basic Company identifier collection for LisERP module Construction.

import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        client: { type: String, label: "Holding Kodu", default: "00" },
        company: { type: String, label: "Firma Kodu", default: "01" },
        stext: { type: String, label: "Firma Adı", default: "" },
        title: { type: String, label: "Ünvan", default: "" },
        taxdept: { type: String, label: "Vergi Dairesi", default: "" },
        taxnum: { type: String, label: "Vergi No", default: "" },
        nacecode: { type: String, label: "Faliyet Kodu", default: "" },
        eorinum: { type: String, label: "EORI No", default: "" },
        country: { type: String, label: "Ülke", default: "" },
        city: { type: String, label: "Şehir", default: "" },
        postcode: { type: String, label: "Posta Kodu", default: "" },
        address: { type: String, label: "Adress", default: "" },
        state: { type: String, label: "İlçe", default: "" },
        building: { type: String, label: "Bina No", default: "" },
        telnum: { type: String, label: "Telefon", default: "" },
        faxnum: { type: String, label: "Fax", default: "" },
        email: { type: String, label: "E-Mail", default: "" },
        website: { type: String, label: "Web Sitesi", default: "" },
        //**** */
        cusnumrange: {
            type: String,
            label: "Müşteri Numara Aralığı",
            default: "",
        },
        vennumrange: {
            type: String,
            label: "Tedarikçi Numara Aralığı",
            default: "",
        },
        candnumrange: {
            type: String,
            label: "Aday Numara Aralığı",
            default: "",
        },
        //****** */
        isebookmember: {
            type: Boolean,
            label: "E-Defter Mükellefi mi?",
            default: false,
        },
        iseinvmember: {
            type: Boolean,
            label: "E-Fatura Mükellefi mi?",
            default: false,
        },
        isedelmember: {
            type: Boolean,
            label: "E-İrsaliye Mükellefi mi?",
            default: false,
        },

        _deleted: { type: Boolean, label: "Silindi mi?", default: false }, // 0:silinmedi | 1:silindi
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const lisbas001 = mongoose.model("lisbas001", schema);

export default lisbas001;
