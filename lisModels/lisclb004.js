// lisclb004 - lisCalendar team - eventtype support document

import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    email: { type: String, label: "Email", default: "" },
    username: { type: String, label: "Kullanıcı Adı", default: "" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const lisclb004 = mongoose.model("lisclb004", schema);

export default lisclb004;
