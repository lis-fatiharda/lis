// lisfin005 - Account groups

import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    company: { type: String, label: "Firma", default: "" },
    group: { type: String, label: "Hesap Grubu", default: "" },
    stext: { type: String, label: "Açıklama", default: "" },
    _deleted: { type: Boolean, label: "Silindi mi?", default: false }, // 0:silinmedi | 1:silindi
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const lisfin005 = mongoose.model("lisfin005", schema);

export default lisfin005;
