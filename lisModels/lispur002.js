// lispur002 - Pur document item types

import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    company: { type: String, label: "Firma Kodu", default: "" },
    doctype: { type: String, label: "Sipariş belge tipi", default: "" },
    itemtype: { type: String, label: "Kalem tipi", default: "" },
    stext: { type: String, label: "Açıklama", default: "" },
    postkey: {
      type: String,
      label: "Kayıt Anahtarı",
      default: "",
    },
    //******************* */
    _deleted: { type: Boolean, label: "Silindi mi?", default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const lispur002 = mongoose.model("lispur002", schema);

export default lispur002;
