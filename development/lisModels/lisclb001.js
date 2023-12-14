// lisclb001 - lisCalendar Team - username support table

import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    company: { type: String, label: "Firma Kodu", default: "" },
    team: { type: String, label: "Takım kodu", default: "" },
    stext: { type: String, label: "Takım ismi", default: "" },
    username: { type: String, label: "Kullanıcı ismi", default: "" },
    isselectteam: {
      type: Boolean,
      label: "Takım seçebilme yetkisi",
      default: false,
    },
    _deleted: { type: Boolean, label: "Silindi mi?", default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const lisclb001 = mongoose.model("lisclb001", schema);

export default lisclb001;
