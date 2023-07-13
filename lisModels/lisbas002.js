// lisbas002 - The basic Plant identifier collection for LisERP module Construction.

import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    company: { type: String, label: "Firma Kodu", default: "01" },
    plant: { type: String, label: "Tesis Kodu", default: "" },
    stext: { type: String, label: "Tesis Adı", default: "" },
    _deleted: { type: Boolean, label: "Silindi mi?", default: false }, // 0:silinmedi | 1:silindi
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const lisbas002 = mongoose.model("lisbas002", schema);

export default lisbas002;
