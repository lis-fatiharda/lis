// lisfin006 - Accounting Settings

import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    company: { type: String, label: "Firma", default: "" },
    name1: { type: String, label: "Firma Adı", default: "" },
    accformat: { type: String, label: "Hesap Formatı", default: "" },
    _deleted: { type: Boolean, label: "Silindi mi?", default: false }, // 0:silinmedi | 1:silindi
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const lisfin006 = mongoose.model("lisfin006", schema);

export default lisfin006;
