// lissal001 - Sal departments

import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    company: { type: String, label: "Firma Kodu", default: "" },
    saldept: { type: String, label: "Satış Bölümü Kodu", default: "" },
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
    username: {
      type: String,
      label: "Kullanıcı adı",
      default: "",
    },
    crmassignauth: {
      type: Boolean,
      label: "Aktivite atama yetkisi",
      default: false,
    },

    crmofferauth: {
      type: Boolean,
      label: "CRM teklif açma yetkisi",
      default: false,
    },
    crmmaterialauth: {
      type: Boolean,
      label: "CRM malzeme açma yetkisi",
      default: false,
    },

    crmcrew: {
      type: String,
      label: "CRM Ekibi",
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

const lissal003 = mongoose.model("lissal003", schema);

export default lissal003;
