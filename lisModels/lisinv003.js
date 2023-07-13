// lisinv003 - Warehouses

import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    company: { type: String, label: "Firma Kodu", default: "" },
    plant: { type: String, label: "Tesis Kodu", default: "" },
    warehouse: { type: String, label: "Depo Kodu", default: "" },
    stext: { type: String, label: "Açıklama", default: "" },

    //******************************* */
    _deleted: { type: Boolean, label: "Silindi mi?", default: false }, // 0:silinmedi | 1:silindi
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const lisinv003 = mongoose.model("lisinv003", schema);

export default lisinv003;
