// lissal001 - Sal document item types

import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    company: { type: String, label: "Firma Kodu", default: "" },
    doctype: { type: String, label: "Satış belge tipi", default: "" },
    itemtype: { type: String, label: "Kalem tipi", default: "" },
    stext: { type: String, label: "Açıklama", default: "" },
    postkey: {
      type: String,
      label: "Kayıt Anahtarı",
      default: "",
    },
    _deleted: { type: Boolean, label: "Silindi mi?", default: false }, // 0:silinmedi | 1:silindi
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const lissal002 = mongoose.model("lissal002", schema);

export default lissal002;
