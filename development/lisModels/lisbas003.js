// lisbas003 - The basic busarea identifier collection for LisERP module Construction.

import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    company: { type: String, label: "Firma Kodu", default: "01" },
    busarea: { type: String, label: "İş Alanı", default: "" },
    stext: { type: String, label: "Açıklama", default: "" },
    _deleted: { type: Boolean, label: "Silindi mi?", default: false }, // 0:silinmedi | 1:silindi
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


const lisbas003 = mongoose.model("lisbas003", schema);

export default lisbas003;
