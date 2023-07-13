// lisdoc001 - Doc document types

import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    company: { type: String, label: "Firma Kodu", default: "" },
    doctype: { type: String, label: "Döküman belge tipi", default: "" },
    docnum: { type: String, label: "Döküman belge numaratörü", default: "" },
    stext: { type: String, label: "Açıklama", default: "" },
    //*** */
    _deleted: { type: Boolean, label: "Silindi mi?", default: false }, // 0:silinmedi | 1:silindi
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const lisdoc001 = mongoose.model("lisdoc001", schema);

export default lisdoc001;
