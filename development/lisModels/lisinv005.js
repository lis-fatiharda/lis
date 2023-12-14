// lisinv005 - Special stock types

import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    company: { type: String, label: "Firma Kodu", default: "" },
    specialstock: { type: String, label: "Özel Stok Tipi", default: "" },
    stext: { type: String, label: "Açıklama", default: "" },

    //******************************* */
    _deleted: { type: Boolean, label: "Silindi mi?", default: false }, // 0:silinmedi | 1:silindi
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const lisinv005 = mongoose.model("lisinv005", schema);

export default lisinv005;
