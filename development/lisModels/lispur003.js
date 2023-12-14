// lispur003 - Pur Departments

import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    company: { type: String, label: "Firma Kodu", default: "" },
    purdept: { type: String, label: "Satınalma Bölümü Kodu", default: "" },
    stext: { type: String, label: "Departman Adı", default: "" },
    contactnum: {
      type: String,
      label: "Adres Defteri Kişi No",
      default: "",
    },
    telnum: {
      type: String,
      label: "Telefon No",
      default: "",
    },
    faxnum: {
      type: String,
      label: "Fax no",
      default: "",
    },
    email: {
      type: String,
      label: "E-Mail",
      default: "",
    },

    _deleted: { type: Boolean, label: "Silindi mi?", default: false }, // 0:silinmedi | 1:silindi
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const lispur003 = mongoose.model("lispur003", schema);

export default lispur003;
