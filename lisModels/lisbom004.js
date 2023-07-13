// lisbom004 - Work center responsibles

import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    company: { type: String, label: "Firma Kodu", default: "" },
    responsible: { type: String, label: "Sorumlu Kodu", default: "" },
    stext: { type: String, label: "Sorumlu ismi", default: "" },
    username: { type: String, label: "Kullanıcı adı", default: "" },

    _deleted: { type: Boolean, label: "Silindi mi?", default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const lisbom004 = mongoose.model("lisbom004", schema);

export default lisbom004;
