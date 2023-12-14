// lisbas018 - MATERIAL PROPERTIES

import mongoose from "mongoose";
const optionsSchema = new mongoose.Schema({
  //attribute: { type: String, label: "Özellik Kodu", default: "" },
  value: { type: String, label: "Değer", default: "" },
});

const schema = new mongoose.Schema(
  {
    company: { type: String, label: "Firma", default: "" },
    attribute: { type: String, label: "Özellik Kodu", default: "" },
    //stext: { type: String, label: "Firma", default: "" },
    type: { type: Number, label: "Tip", default: 0 }, // 0 : manuel , 1 : seçenek
    maxvalue: {
      type: Number,
      label: "Max Değer",
      default: 0,
    },
    minvalue: {
      type: Number,
      label: "Min Değer",
      default: 0,
    },
    qunit: { type: String, label: "Birim", default: "" },
    options: [optionsSchema],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
//export const items = mongoose.model("itemsSchema", schema);
const lisbas018 = mongoose.model("lisbas018", schema);

export default lisbas018;
