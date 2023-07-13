// lisclb002 - lisCalendar team - eventtype support document

import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    company: { type: String, label: "Firma Kodu", default: "" },
    team: { type: String, label: "Takım kodu", default: "" },
    eventtype: { type: String, label: "Etkinlik tipi", default: "" },
    stext: { type: String, label: "Etkinlik açıklaması", default: "" },
    _deleted: { type: Boolean, label: "Silindi mi?", default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const lisclb002 = mongoose.model("lisclb002", schema);

export default lisclb002;
