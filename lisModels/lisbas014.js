// lisbas014 - Material Groups

import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        company: { type: String, label: "Firma Kodu", default: "" },
        matgrp: { type: String, label: "Malzeme Grubu", default: "" },
        mainmatgrp: { type: String, label: "Ana Malzeme Grubu", default: "" },
        stext: { type: String, label: "Açıklama", default: "" },
        _deleted: { type: Boolean, label: "Silindi mi?", default: false },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const lisbas014 = mongoose.model("lisbas014", schema);

export default lisbas014;
