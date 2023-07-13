// lisappobjects - The basic identifier collection for LisERP module Construction.

import mongoose from "mongoose";

const transactionsSchema = new mongoose.Schema({
  code: {
    type: String,
    default: "liss00",
  },
  stext: {
    type: String,
    label: "Uygulama Adı(Tr)",
    default: "",
  },
  stexte: {
    type: String,
    label: "Uygulama Adı(En)",
    default: "",
  },
  pathName: {
    type: String,
    default: "Lis Uygulama PathName",
  },
  component: {
    type: String,
  },
  icon: {
    type: String,
    default: "",
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});

const schema = new mongoose.Schema(
  {
    selected: {
      type: Boolean,
      default: false,
    },
    group: {
      type: Number,
      default: 1,
    }, // 0:temel uygulamalar, 1:süreç modulleri
    module: {
      type: String,
      unique: true,
      required: [true, "Lütfen modul kodu giriniz!"],
      default: "lis",
    },
    stext: {
      type: String,
      required: true,
      default: "Modul Açıklama(Tr)",
    },
    stexte: {
      type: String,
      required: true,
      default: "Modul Açıklama(En)",
    },
    moduleColor: {
      type: String,
      default: "primary",
    },
    transactions: [transactionsSchema],
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

const lisappobjects = mongoose.model("lisappobjects", schema);

export default lisappobjects;
