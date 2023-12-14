// lisdoc002 - Doc document types

import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    company: { type: String, label: "Firma Kodu", default: "" },
    doctype: { type: String, label: "Döküman belge tipi", default: "" },
    tag: { type: String, label: "Döküman etiketi", default: "" },
    stext: { type: String, label: "Etiket Açıklaması", default: "" },
    //*** */
    _deleted: { type: Boolean, label: "Silindi mi?", default: false }, // 0:silinmedi | 1:silindi
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const lisdoc002 = mongoose.model("lisdoc002", schema);

export default lisdoc002;
