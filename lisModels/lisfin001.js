// lisfin001 - Accounting standarts

import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    accstd: { type: String, label: "Muhasebe Standardı", default: "" },
    stext: { type: String, label: "Açıklama", default: "" },
    currency: { type: String, label: "Para Birimi", default: "" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const lisfin001 = mongoose.model("lisfin001", schema);

export default lisfin001;
