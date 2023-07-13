// lisbas010 - Material Stats

import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    company: { type: String, label: "Firma Kodu", default: "01" },
    matstat: { type: String, label: "Malzeme Statüsü", default: "" },
    stext: { type: String, label: "Açıklama", default: "" },
    _deleted: { type: Boolean, label: "Silindi mi?", default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const lisbas010 = mongoose.model("lisbas010", schema);

export default lisbas010;
