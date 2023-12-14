// lisbas011 - Payment Types

import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    company: { type: String, label: "Firma Kodu", default: "01" },
    paytype: { type: String, label: "Ödeme Tipi", default: "" },
    stext: { type: String, label: "Açıklama", default: "" },
    _deleted: { type: Boolean, label: "Silindi mi?", default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const lisbas011 = mongoose.model("lisbas011", schema);

export default lisbas011;
