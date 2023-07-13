// lyzplans -

import { Schema, model } from "mongoose";

const plansSchema = new Schema({
  project: { type: String, label: "Proje kodu", default: "" },
  stext: { type: String, label: "Açıklama", default: "" },
});
const actSchema = new Schema({
    project: { type: String, label: "Proje kodu", default: "" },
    stext: { type: String, label: "Açıklama", default: "" },
    workhour: { type: Number, label: "Çalışma Saati", default: 0 },
    isinvoice: { type: Boolean, label: "Faturalanacak mı?", default: false },
    isfinance: { type: Boolean, label: "Faturalandı", default: false },
    islunch: { type: Boolean, label: "Öğle Yemeği?", default: false },
    isit: { type: Boolean, label: "IT aktivitesimi?", default: false },
    workprice: { type: Number, label: "IT hizmet ücreti", default: 0 },
    trcost: { type: Number, label: "Yol Masrafı", default: 0 },
});

const schema = new Schema(
  {
    company: { type: String, label: "Firma Kodu", default: "01" },
    date: { type: Date, label: "Tarih", default: new Date() },
    year: { type: Number, label: "Yıl", default: "2022" },
    month: { type: Number, label: "Ay", default: 0 },
    week: { type: Number, label: "Hafta", default: 1 },
    day: { type: Number, label: "Gün", default: 0 },
    type: { type: String, label: "Tip", default: "Plan" }, //plan,act
    consultant: { type: String, label: "Danışman kodu", default: "" },
    consultantname: { type: String, label: "Danışman Adı", default: "" },
    plan: [plansSchema],
    act: [actSchema],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const lyzplans = model("lyzplans", schema);

export default lyzplans;
