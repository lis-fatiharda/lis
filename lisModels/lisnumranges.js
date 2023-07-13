// lismodels - The basic identifier collection for LisERP module Construction.

import mongoose from "mongoose";

const numPartsSchema = new mongoose.Schema({
  partno: Number,
  parttype: { type: String, default: "Otomatik" },
  partlength: { type: Number, default: 0 },
  preffix: { type: String, default: "" },
  suffix: { type: String, default: "" },
  valstart: { type: Number, default: 1 },
  valend: { type: Number, default: 999999 },
  valincrease: { type: Number, default: 1 },
  valcurrent: { type: Number, default: 0 },
});

//**************** */
const schema = new mongoose.Schema(
  {
    company: {
      type: String,
      default: "",
    },
    numrange: {
      type: String,
      default: "",
    },
    stext: {
      type: String,
      default: "",
    },
    ismanuel: {
      type: Boolean,
      default: false,
    },
    isintegrator: {
      type: Boolean,
      label: "Entegratör numaratörü mü?",
      default: false,
    },
    numparts: [numPartsSchema],
    valcurrent: { type: String, default: "0" },
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

const lisnumranges = mongoose.model("lisnumranges", schema);
const LisNumParts = mongoose.model("lisNumParts", numPartsSchema);

export { lisnumranges, LisNumParts };
