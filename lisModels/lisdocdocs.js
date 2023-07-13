// lisdocdocs - Document management

import mongoose from "mongoose";

const itemsSchema = new mongoose.Schema({
  path: { type: String, label: "Dosya yolu", default: "" },
  stext: { type: String, label: "Açıklama", default: "" },
});

const schema = new mongoose.Schema(
  {
    company: { type: String, label: "Firma Kodu", default: "" },
    doctype: { type: String, label: "Döküman tipi", default: "" },
    docnum: {
      type: String,
      label: "Döküman-İlişkili kayıt No",
      default: "",
    },
    name: { type: String, label: "Klasör İsmi", default: "" },
    path: { type: Array, label: "Döküman Ekle", default: [] },
    items: [itemsSchema],
    note: {
      type: String,
      label: "Klasör Notu",
      default: "",
    },

    //************** */
    createdby: { type: String, label: "Oluşturan", default: "" },
    _deleted: { type: Boolean, label: "Silindi mi?", default: false }, // 0:silinmedi | 1:silindi
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const lisdocdocs = mongoose.model("lisdocdocs", schema);

export default lisdocdocs;
