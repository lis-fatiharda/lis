// lisprd003 - Failure type

import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        company: { type: String, label: "Firma Kodu", default: "" },
        plant: { type: String, label: "Tesis Kodu", default: "" },
        failurecode: { type: String, label: "Duruş Kodu", default: "" },
        stext: { type: String, label: "Açıklama", default: "" },
        _deleted: { type: Boolean, label: "Silindi mi?", default: false },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const lisprd003 = mongoose.model("lisprd003", schema);

export default lisprd003;
