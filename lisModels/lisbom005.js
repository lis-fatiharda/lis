// lisbom005 - Operation Control Type

import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    company: { type: String, label: "Firma Kodu", default: "" },
    oprcontrol: { type: String, label: "Operasyon Kontrol Tipi", default: "" },
    stext: { type: String, label: "Açıklaması", default: "" },

    _deleted: { type: Boolean, label: "Silindi mi?", default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const lisbom005 = mongoose.model("lisbom005", schema);

export default lisbom005;
