
import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    username: {
      type: String,
      default: "",
    },
    token: {
      type: String,
      default: "",
    },
    logindate: {
      type: Date,
      default: new Date(),
    },
    latitude: {
      type: String,
      default: "",
    },
    longitude: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const lisuserlogins = model("lisuserlogins", schema);

export default lisuserlogins;
