// liscrm002 - Action types.

import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    company: { type: String, label: "Firma Kodu", default: "" },
    actiontype: { type: String, label: "Aksiyon Tipi", default: "" },
    actiontext: { type: String, label: "Aksiyon Adı", default: "" },
    _deleted: { type: Boolean, label: "Silindi mi?", default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const liscrm002 = mongoose.model("liscrm002", schema);

export default liscrm002;
