// liscrm003 - CRM.

import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    company: { type: String, label: "Firma Kodu", default: "" },
    project: { type: String, label: "Proje Kodu", default: "" },
    stext: { type: String, label: "Proje Adı", default: "" },
    ltext: { type: String, label: "Proje Uzun Açıklaması", default: "" },
    _deleted: { type: Boolean, label: "Silindi mi?", default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const liscrm003 = mongoose.model("liscrm003", schema);

export default liscrm003;
