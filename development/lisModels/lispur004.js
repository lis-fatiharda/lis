// lispur004 - Pur document Copy

import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    company: { type: String, label: "Firma Kodu", default: "" },
    fromdoctype: { type: String, label: "Kaynak belge tipi", default: "" },
    fromstext: {
      type: String,
      label: "Kaynak belge Açıklama",
      default: "",
    },
    todoctype: { type: String, label: "Hedef belge tipi", default: "" },
    tostext: { type: String, label: "Hedef belge Açıklama", default: "" },

    _deleted: { type: Boolean, label: "Silindi mi?", default: false }, // 0:silinmedi | 1:silindi
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const lispur004 = mongoose.model("lispur004", schema);

export default lispur004;
