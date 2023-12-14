// lisbas008 - Customer - Vendor - Candidate groups

import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    company: { type: String, label: "Firma Kodu", default: "01" },
    custgrp: { type: String, label: "Cari Grubu", default: "" },
    stext: { type: String, label: "Açıklama", default: "" },
    _deleted: { type: Boolean, label: "Silindi mi?", default: false }, // 0:silinmedi | 1:silindi
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const lisbas008 = mongoose.model("lisbas008", schema);

export default lisbas008;
