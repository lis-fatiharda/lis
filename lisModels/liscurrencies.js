// liscurrencies - Currencies

import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    company: { type: String, label: "Firma Kodu", default: "01" },
    curdate: { type: Date, label: "Kur Tarihi", default: new Date() },
    currency: { type: String, label: "Kaynak Kur", default: "" },
    tocurrency: { type: String, label: "Hedef Kur", default: "" },
    exchvalue: { type: Number, label: "Çevrim kat sayısı", default: 1 },
    exchratepur: { type: Number, label: "Alış kuru", default: 1 },
    exchratesal: { type: Number, label: "Satış kuru", default: 1 },
    effexchratepur: {
      type: Number,
      label: "Efektif Alış kuru",
      default: 1,
    },
    effexchratesal: {
      type: Number,
      label: "Efektif Satış kuru",
      default: 1,
    },
    isenable: { type: Boolean, label: "Enable ?", default: false },
    _deleted: { type: Boolean, label: "Silindi mi?", default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const liscurrencies = mongoose.model("liscurrencies", schema);

export default liscurrencies;
