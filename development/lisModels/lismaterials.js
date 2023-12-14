// lismaterials - LisERP Material informations.

import mongoose from "mongoose";

const matNotesSchema = new mongoose.Schema({
  notetitle: { type: String, label: "Not Başlığı", default: "" },
  note: { type: String, label: "Not", default: "" },
});

const matDocsUploadedSchema = new mongoose.Schema({
  name: { type: String, label: "Yüklenen Dosya ismi", default: "" },
  serverpath: { type: String, label: "Server Dosya Yolu", default: "" },
});

const matDocsSchema = new mongoose.Schema({
  name: { type: String, label: "Döküman İsmi", default: "" },
  path: { type: Array, label: "Dosya Yolu", default: [""] },
  uploaded: [matDocsUploadedSchema],
  note: { type: String, label: "Not", default: "" },
  _deleted: { type: Boolean, label: "Silindi", default: false },
});

const matUnitsSchema = new mongoose.Schema({
  value: { type: Number, label: "Birim miktarı", default: 1 },
  unit: { type: String, label: "Birim", default: "" },
  perunit: { type: Number, label: "Stok birimi miktarı", default: 1 },
});

const matStockSchema = new mongoose.Schema({
  plant: { type: String, label: "Tesis", default: "" },
  warehouse: { type: String, label: "Depo", default: "" },
  stockplace: { type: String, label: "Stokyeri", default: "" },
  recdef: { type: Boolean, label: "Varsayılan giriş", default: false },
  issdef: { type: Boolean, label: "Varsayılan Çıkış", default: false },
});

const schema = new mongoose.Schema(
  {
    company: { type: String, label: "Firma Kodu", default: "01" },
    material: {
      type: String,
      unique: true,
      required: [true, "Lütfen Malzeme kodu giriniz!"],
      default: "",
    },
    mtext: {
      type: String,
      label: "Malzeme İsmi",
      required: [true, "Lütfen Malzeme Açıklaması giriniz!"],
      default: "",
    },
    varkey: { type: String, label: "Varyant Anahtarı", default: "" },
    mattype: {
      type: String,
      label: "Malzeme Tipi",
      required: [true, "Lütfen Malzeme Tipi Seçiniz!"],
      default: "",
    },

    ltext: {
      type: String,
      label: "Malzeme Uzun Açıklaması",
      default: "",
    },
    matstat: {
      type: String,
      label: "Malzeme Statüsü",
      required: [true, "Lütfen Malzeme Statüsü giriniz!"],
      default: "A",
    },

    specialstock: {
      type: String,
      label: "Varsayılan Özel Stok Tipi",
      required: [true, "Lütfen Özel Stok Tipi giriniz!"],
      default: "S",
    },

    skunit: {
      type: String,
      label: "Stok Birimi",
      required: [true, "Lütfen Stok Birimi giriniz!"],
      default: "",
    },
    matgrp: {
      type: String,
      label: "Malzeme Grubu",
      default: "",
    },
    spprokey: {
      type: String,
      label: "Tedarik Tipi",
      default: "",
    },
    sector: {
      type: String,
      label: "Sektör",
      default: "",
    },
    purdept: {
      type: String,
      label: "Satınalma departmanı",
      default: "",
    },
    purunit: {
      type: String,
      label: "Satınalma birimi",
      default: "",
    },
    purminlot: {
      type: Number,
      label: "Min. S.A. sipariş seviyesi",
      default: 0,
    },
    purmaxlot: {
      type: Number,
      label: "Max. S.A. sipariş seviyesi",
      default: 0,
    },
    purordertype: {
      type: String,
      label: "S.A. Sipariş tipi",
      default: "",
    },
    puritemtype: {
      type: String,
      label: "S.A. Sipariş kalem tipi",
      default: "",
    },
    purvatkey: {
      type: String,
      label: "S.A. kdv",
      default: "",
    },
    ispurtolerance: {
      type: Boolean,
      label: "S.A. Tolerans Kullan",
      default: false,
    },
    purlowertol: {
      type: Number,
      label: "S.A. Alt tolerans",
      default: 0,
    },
    puruppertol: {
      type: Number,
      label: "S.A. Üst tolerans",
      default: 0,
    },
    //*** */
    saldept: {
      type: String,
      label: "Satış departmanı",
      default: "",
    },
    salunit: {
      type: String,
      label: "Satış birimi",
      default: "",
    },
    salminlot: {
      type: Number,
      label: "Min. Satış sipariş seviyesi",
      default: 0,
    },
    salmaxlot: {
      type: Number,
      label: "Max. Satış sipariş seviyesi",
      default: 0,
    },
    saldoctype: {
      type: String,
      label: "Satış Sipariş tipi",
      default: "",
    },
    salitemtype: {
      type: String,
      label: "Satış Sipariş kalem tipi",
      default: "",
    },
    salvatkey: {
      type: String,
      label: "Satış kdv",
      default: "",
    },
    issaltolerance: {
      type: Boolean,
      label: "Satış Tolerans Kullan",
      default: false,
    },
    sallowertol: {
      type: Number,
      label: "Satış Alt tolerans",
      default: 0,
    },
    saluppertol: {
      type: Number,
      label: "Satış Üst tolerans",
      default: 0,
    },
    salcurrency: {
      type: String,
      label: "Satış Para Br.",
      default: "",
    },
    salprice: {
      type: Number,
      label: "Satış Fiyatı",
      default: 0,
    },
    salpunit: {
      type: Number,
      label: "Satış Fiyat birimi",
      default: 1,
    },

    //*** */

    prodtext: {
      type: String,
      label: "Üretim Notu",
      default: "",
    },
    gtip: {
      type: String,
      label: "GTIP No",
      default: "",
    },
    extmaterial: {
      type: String,
      label: "Harici Malzeme Kodu",
      default: "",
    },
    isbom: {
      type: Boolean,
      label: "Ürün Ağacı Oluşturuldu?",
      default: false,
    },

    dimension: {
      type: Number,
      label: "Boyut",
      default: 0,
    },
    brutweight: {
      type: Number,
      label: "Brüt Ağırlık",
      default: 0,
    },
    bwunit: {
      type: String,
      label: "Brüt Ağırlık Br",
      default: "",
    },
    netweight: {
      type: Number,
      label: "Net Ağırlık",
      default: 0,
    },
    nwunit: {
      type: String,
      label: "Net Ağırlık Br",
      default: "",
    },
    length: {
      type: Number,
      label: "Uzunluk",
      default: 0,
    },
    lengthunit: {
      type: String,
      label: "Uzunluk Br",
      default: "",
    },
    height: {
      type: Number,
      label: "Yükseklik",
      default: 0,
    },
    heightunit: {
      type: String,
      label: "Yükseklik Br",
      default: "",
    },
    width: {
      type: Number,
      label: "Genişlik",
      default: 0,
    },
    widthunit: {
      type: String,
      label: "Genişlik Br",
      default: "",
    },
    volume: {
      type: Number,
      label: "Hacim",
      default: 0,
    },
    volumeunit: {
      type: String,
      label: "Hacim Br",
      default: "",
    },
    surface: {
      type: Number,
      label: "Yüzey",
      default: 0,
    },
    surfaceunit: {
      type: String,
      label: "Yüzey Br",
      default: "",
    },

    //*** */

    acctype: {
      type: Number,
      label: "Muhasebeleşme tipi",
      default: 0,
    },

    lpurprice: {
      type: Number,
      label: "Son satınalma fiyatı",
      default: 0,
    },
    lpurpricedate: {
      type: Date,
      label: "Son satınalma fiyatı Tarihi",
      default: new Date(0),
    },

    lowprice: {
      type: Number,
      label: "En düşük satınalma fiyatı",
      default: 0,
    },
    lowpricedate: {
      type: Date,
      label: "En düşük satınalma fiyatı Tarihi",
      default: new Date(0),
    },

    lmoveprice: {
      type: Number,
      label: "Son hareket fiyatı",
      default: 0,
    },
    lmovepricedate: {
      type: Date,
      label: "Son hareket fiyatı Tarihi",
      default: new Date(0),
    },
    lrevprice: {
      type: Number,
      label: "Yeniden değerleme fiyatı",
      default: 0,
    },
    lrevpricedate: {
      type: Date,
      label: "Yeniden değerleme Tarihi",
      default: new Date(0),
    },

    //*** */

    mataccgrp: {
      type: String,
      label: "Hesap Grubu",
      default: "",
    },
    matsalaccgrp: {
      type: String,
      label: "Satış Hesap Grubu",
      default: "",
    },

    matcurrency: {
      type: String,
      label: "Malzeme Para Birimi",
      default: "",
    },
    matpunit: {
      type: String,
      label: "Malzeme Maliyet Fiyat Birimi",
      default: "",
    },

    calcprice: {
      type: Number,
      label: "Standart Maliyet Sonucu",
      default: "",
    },
    calcpricedate: {
      type: Date,
      label: "Standart Maliyet Sonucu Tarihi",
      default: new Date(0),
    },
    actualprice: {
      type: Number,
      label: "Fiili Maliyet Sonucu",
      default: "",
    },
    actualpricedate: {
      type: Date,
      label: "Fiili Maliyet Sonucu Tarihi",
      default: new Date(0),
    },

    //*** */

    matnotes: [matNotesSchema],
    matdocs: [matDocsSchema],
    matunits: [matUnitsSchema],
    matstock: [matStockSchema],

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

const lismaterials = mongoose.model("lismaterials", schema);

export default lismaterials;
