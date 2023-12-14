import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    company: { type: String, label: "Firma Kodu", default: "" },
    doctype: { type: String, label: "Belge Tipi", default: "" },
    username: { type: String, label: "Kullanıcı Adı", default: "" },
    saldept: { type: String, label: "Satış Bölümü", default: "" },
    stext: { type: String, label: "Açıklama", default: "" },
    //
    usergrp: {
      type: Number,
      label: "Bölüm Hiyerarşisinde Yeri",
      options: [
        { value: 0, stext: "Satış Müdürü" },
        { value: 1, stext: "Bölüm Şefi" },
        { value: 2, stext: "Satış Elemanı" },
      ],
     
    },
    //
    notinsert: { type: Boolean, label: "Oluşturamaz", default: false },
    notupdate: { type: Boolean, label: "Değiştiremez", default: false },
    notdelete: { type: Boolean, label: "Silemez", default: false },

    _deleted: { type: Boolean, label: "Silindi mi?", default: false }, // 0:silinmedi | 1:silindi
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const lissal008 = mongoose.model("lissal008", schema);

export default lissal008;
