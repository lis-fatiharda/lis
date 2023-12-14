// lisgroups - LisERP Groups.

import mongoose from "mongoose";
const itemsSchema = new mongoose.Schema({
  username: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "",
  },
  surname: {
    type: String,
    default: "",
  },
});

const schema = new mongoose.Schema(
  {
    company: {
      type: String,
      default: "",
    },
    group: {
      type: String,
      label: "Grup",
      default: "",
    },
    stext: {
      type: String,
      default: "",
    },
    items: [itemsSchema],
    _deleted: {
      type: Boolean,
      label: "Silindi mi?",
      default: false,
    },
    _createdby: {
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

const lisgroups = mongoose.model("lisgroups", schema);

export default lisgroups;
