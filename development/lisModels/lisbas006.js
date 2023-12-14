// lisbas006 - The basic CITY identifier collection for LisERP module Construction.

import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    country: { type: String, label: "Ülke", default: "" },
    city: { type: String, label: "Şehir", default: "" },
    stext: { type: String, label: "Açıklama", default: "" },
    _deleted: { type: Boolean, label: "Silindi mi?", default: false }, // 0:silinmedi | 1:silindi
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const lisbas006 = mongoose.model("lisbas006", schema);

export default lisbas006;
