// lisfin004 - Account types

import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    company: { type: String, label: "Firma", default: "" },
    acctype: { type: String, label: "Hesap Tipi", default: "" },
    stext: { type: String, label: "Açıklama", default: "" },
    _deleted: { type: Boolean, label: "Silindi mi?", default: false }, // 0:silinmedi | 1:silindi
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const lisfin004 = mongoose.model("lisfin004", schema);

export default lisfin004;
