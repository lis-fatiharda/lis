// liscrmdocs - CRM Activities
import mongoose from "mongoose";

  const crmNotesSchema = new mongoose.Schema({
    notetitle: { type: String, label: "Not Başlığı", default: "" },
    note: { type: String, label: "Not", default: "" },
  });

  const crmDocsUploadedSchema = new mongoose.Schema(
    {
      name: { type: String, label: "Yüklenen Dosya ismi", default: "" },
      serverpath: {
        type: String,
        label: "Server Dosya Yolu",
        default: "",
      },
    },
    {
      timestamps: true,
      versionKey: false,
    }
  );

  const crmDocsSchema = new mongoose.Schema({
    name: { type: String, label: "Döküman İsmi", default: "" },
    path: { type: Array, label: "Dosya Yolu", default: [""] },
    uploaded: [crmDocsUploadedSchema],
    note: { type: String, label: "Not", default: "" },
    _deleted: { type: Boolean, label: "Silindi", default: false },
  });

  const actionsSchema = new mongoose.Schema({
    type: { type: String, label: "Aksiyon tipi", default: "" },
    actnum: { type: String, label: "Aksiyon No", default: "" },
    stext: { type: String, label: "Aksiyon kısa açıklama", default: "" },
    ltext: { type: String, label: "Aksiyon uzun açıklama", default: "" },
    actstat: {
      type: String,
      label: "Aksiyon statüsü",
      default: "Açık",
    },
    actdate: {
      type: Date,
      label: "Aksiyon Tarihi",
      default: new Date(),
    },
    doctype: {
      type: String,
      label: "Aksiyonda açılan teklif tipi",
      default: "",
    },
    docnum: {
      type: String,
      label: "Aksiyonda açılan teklif No",
      default: "",
    },
  });

  const offerItemsSchema = new mongoose.Schema({
    type: { type: String, label: "Kalem tipi", default: "" },
    material: { type: String, label: "Malzeme Kodu", default: "" },
    variant: { type: Object, label: "Varyant", default: {} },
    mtext: { type: String, label: "Malzeme Adı", default: "" },
    quantity: { type: Number, label: "Miktar", default: 0 },
    qunit: { type: String, label: "Birim", default: "" },
    price: { type: Number, label: "Fiyat", default: 0 },
    punit: { type: Number, label: "Fiyat Birimi", default: 1 },
    //** Price - Total */
    price: { type: Number, label: "Fiyat", default: 0 },
    punit: { type: Number, label: "Fiyat br", default: 1 },
    gross: { type: Number, label: "Brüt", default: 0 },
    discount: [],
    discamnt: {
      type: Number,
      label: "İndirim/Artırım miktarı",
      default: 0,
    },
    subtotal: { type: Number, label: "Net toplam", default: 0 },
    vatrate: { type: Number, label: "KDV oranı", default: 0 },
    vatamnt: { type: Number, label: "KDV Tutarı", default: 0 },
    grandtotal: { type: Number, label: "Genel toplam", default: 0 },
  });

  const offersSchema = new mongoose.Schema({
    type: { type: String, label: "Teklif tipi", default: "" },
    offnum: { type: Number, label: "Teklif No", default: 0 },
    stext: { type: String, label: "Teklif kısa açıklama", default: "" },
    ltext: { type: String, label: "Teklif uzun açıklama", default: "" },
    currency: { type: String, label: "Para Birimi", default: "" },
    offeritems: [offerItemsSchema],
    isoffered: {
      type: Boolean,
      label: "Teklif Oluşturuldu",
      default: false,
    },
    actionId: { type: String, label: "Aksiyon id", default: "" },
    offdate: {
      type: Date,
      label: "Teklif Tarihi",
      default: new Date(),
    },
  });

  const materialsSchema = new mongoose.Schema({
    company: { type: String, label: "Firma Kodu", default: "" },
    material: { type: String, label: "Malzeme Kodu", default: "" },
    variant: { type: Object, label: "Varyant", default: {} },
    mattype: {
      type: String,
      label: "Malzeme Tipi",
      default: "",
    },

    stext: {
      type: String,
      label: "Malzeme İsmi",
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
      default: "A",
    },

    defspecial: {
      type: String,
      label: "Varsayılan Özel Stok Tipi",
      default: "S",
    },

    skunit: {
      type: String,
      label: "Stok Birimi",
      default: "",
    },
    matgrp: {
      type: String,
      label: "Malzeme Grubu",
      default: "",
    },
    isopened: {
      type: Boolean,
      label: "Malzeme kartı açıldı",
      default: false,
    },

    _createdby: {
      type: String,
      label: "Oluşturan",
      default: global.sys_user,
    },
  });

  const schema = new mongoose.Schema(
    {
      company: { type: String, label: "Firma", default: "" },
      acttype: { type: String, label: "Aktivite Tipi", default: "" },
      actnum: { type: String, label: "Aktivite No", default: "" },
      stext: { type: String, label: "Açıklama", default: "" },
      ltext: { type: String, label: "Uzun Açıklama", default: "" },
      project: { type: String, label: "Proje Kodu", default: "" },

      saldept: { type: String, label: "Aktivite Sorumlusu", default: "" },
      //*** Customer Informations */
      busarea: { type: String, label: "İş Alanı", default: "S" },
      customer: { type: String, label: "Müşteri Kodu", default: "" },
      name1: { type: String, label: "Müşteri Adı", default: "" },

      taxdept: { type: String, label: "Vergi Dairesi", default: "" },
      taxnum: { type: String, label: "Vergi no", default: "" },
      sector: { type: String, label: "Sektör", default: "" },
      country: { type: String, label: "Ülke", default: "" },
      city: { type: String, label: "Şehir", default: "" },
      address: { type: String, label: "Adres", default: "" },
      telnum: { type: String, label: "Telefon No", default: "" },
      email: { type: String, label: "E-Mail", default: "" },

      //*** Customer Personel Informations */
      cpgender: {
        type: String,
        label: "Müşteri İlgili Hitap",
        default: "",
      },
      cpname: { type: String, label: "Müşteri İlgili isim", default: "" },
      cpsecondname: {
        type: String,
        label: "Müşteri İlgili ikinci isim",
        default: "",
      },
      cpsurname: {
        type: String,
        label: "Müşteri İlgili soyisim",
        default: "",
      },
      cpdepartment: {
        type: String,
        label: "Müşteri İlgili departman",
        default: "",
      },
      cpposition: {
        type: String,
        label: "Müşteri İlgili pozisyon",
        default: "",
      },
      cpphone: {
        type: String,
        label: "Müşteri İlgili Telefon",
        default: "",
      },
      cpemail: {
        type: String,
        label: "Müşteri İlgili e-mail",
        default: "",
      },

      actions: [actionsSchema],
      offers: [],
      materials: [materialsSchema],
      crmnotes: [crmNotesSchema],
      crmdocs: [crmDocsSchema],

      actstat: {
        type: String,
        label: "Aktivite statüsü",
        default: "Açık",
      },
      actdate: {
        type: Date,
        label: "Aktivite Tarihi",
        default: new Date(),
      },
      //******************* */
      _deleted: { type: Boolean, label: "Silindi mi?", default: false }, // 0:silinmedi | 1:silindi
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


const liscrmdocs = mongoose.model("liscrmdocs", schema);

export default liscrmdocs;
