import mongoose from "mongoose";

const schema = mongoose.Schema(
  {
    company: { type: String, label: "Firma Kodu", default: "" },
    postway: {
      type: Number,
      enum: [0, 1],
      label: "Hareket Yönü",
      default: 1,
    },

    //---ednt01-hProcessInt-parts
    edoctype: {
      type: Number,
      enum: [1, 2, 3],
      label: "1:E-Fatura|2:E-Arşiv|3:E-İrsaliye",
      default: 2,
    },
    qpostway: {
      type: Boolean,
      label: "0:Gelen|1:Giden",
      default: 1,
    },
    edocstat: {
      type: Number,
      enum: [1, 2, 3, 4], //hProcessInt:1,2,3,4
      label: "Döküman Statüsü",
      default: 0,
    },
    //---

    einvonumber: { type: String, label: "E-Belge No", default: "" },
    einvouuid: { type: String, label: "UUID", defaut: "" },
    taxnum: { type: String, label: "Alıcı Vergi No", defaut: "" },
    alias: { type: String, label: "Alıcı Posta Kutusu", defaut: "" },
    edistr: { type: String, label: "EDI Belgesi", default: "" },

    //*** Infos from SAL-PUR */

    doctype: { type: String, label: "Döküman tipi", default: "" },
    docnum: { type: String, label: "Dökümam no", default: "" },

    customer: { type: String, label: "Müşteri no", default: "" },
    name1: { type: String, label: "Müşteri adı", default: "" },

    docdate: {
      type: Date,
      label: "Döküman Oluşma Tarihi",
      default: new Date(),
    },
    edocdate: {
      type: Date,
      label: "Kuyruğa gönderilme veya içeri alınma tarihi",
      default: new Date(),
    },
    grandtotal: { type: Number, label: "Genel toplam", default: 0 },
    currency: { type: String, label: "Para birimi", default: "" },

    //*** */

    processedby: {
      type: String,
      label: "İşlemi Yapan",
      default: "",
    },
    processedat: {
      type: Date,
      label: "İşlem Tarihi",
      default: "",
    },

    processstat: {
      type: String,
      label: "İşlem Statüsü",
      default: "",
    },
    processstatstr: {
      type: String,
      label: "İşlem Statüsü uzun Açıklaması",
      default: "",
    },

    _deleted: { type: Boolean, label: "Silindi mi?", default: false },
    createdby: {
      type: String,
      label: "Oluşturan",
      default: global.sys_user,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const lisedndocs = mongoose.model("lisedndocs", schema);
export default lisedndocs;
