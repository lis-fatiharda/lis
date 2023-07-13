// liscrm001 - Activity types.

import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    company: { type: String, label: "Firma Kodu", default: "" },
    acttype: { type: String, label: "Aktivite Tipi", default: "" },
    acttext: { type: String, label: "Aktivite Adı", default: "" },
    _deleted: { type: Boolean, label: "Silindi mi?", default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const liscrm001 = mongoose.model("liscrm001", schema);

export default liscrm001;
