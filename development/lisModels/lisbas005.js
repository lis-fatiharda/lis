// lisbas005 - The basic COUNTRY identifier collection for LisERP module Construction.

import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    country: { type: String, label: "Ülke", default: "" },
    currency: { type: String, label: "Para Br.", default: "" },
    stext: { type: String, label: "Açıklama", default: "" },
    _deleted: { type: Boolean, label: "Silindi mi?", default: false }, // 0:silinmedi | 1:silindi
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const lisbas005 = mongoose.model("lisbas005", schema);

export default lisbas005;
