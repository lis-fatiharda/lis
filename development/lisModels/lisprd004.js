// lisprd004 - Shifts

import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        company: { type: String, label: "Firma Kodu", default: "" },
        plant: { type: String, label: "Tesis Kodu", default: "" },
        shift: { type: String, label: "Vardiya", default: "" },
        starttime: {type: String, label: "Başlangıç Tarihi", default: new Date()},
        finishtime: {type: String, label: "Bitiş Tarihi", default: new Date()},
        stext: { type: String, label: "Açıklama", default: "" },
        _deleted: { type: Boolean, label: "Silindi mi?", default: false },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const lisprd004 = mongoose.model("lisprd004", schema);

export default lisprd004;
