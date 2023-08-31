
import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    email: { type: String, label: "Email", default: "" },
    password: { type: String, label: "Şifre", default: "" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const lisclb003 = mongoose.model("lisclb003", schema);

export default lisclb003;
