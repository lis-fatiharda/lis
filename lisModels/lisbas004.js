// lisbas004 - The basic sector identifier collection for LisERP module Construction.

import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    sector: { type: String, label: "Sektör", default: "" },
    stext: { type: String, label: "Açıklama", default: "" },
    _deleted: { type: Boolean, label: "Silindi mi?", default: false }, // 0:silinmedi | 1:silindi
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const lisbas004 = mongoose.model("lisbas004", schema);

export default lisbas004;
