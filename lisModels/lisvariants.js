// lisvariants - Material Variants.

import mongoose from "mongoose";
const itemsSchema = new mongoose.Schema({
  attribute: { type: String, label: "Özellik Kodu", default: "" },
  type: { type: Number, label: "Tip", default: 0 }, // 0 : manuel , 1 : seçenek
  options: { type: String, label: "Seçenek", default: "" },

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
  //value: { type: String, label: "Değer", default: "" },
});
const schema = new mongoose.Schema(
    {
        company: { type: String, label: "Firma Kodu", default: "01" },
        varkey: {
            type: String,
            unique: true,
            label: "Variant Anahtarı",
            required: [true, "Lütfen Varyant Kodu giriniz!"],
            default: "",
        },
        stext: {
            type: String,
            label: "Variant Anahtarı Açıklaması",
            default: "",
        },
        items: [itemsSchema],

        //******************* */

        _deleted: { type: Boolean, label: "Silindi mi?", default: false },
        _createdby: {
            type: String,
            label: "Oluşturan",
            default: global.sys_user,
        },
        _updatedby: {
            type: String,
            label: "Güncelleyen",
            default: global.sys_user,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const lisvariants = mongoose.model("lisvariants", schema);

export default lisvariants;
