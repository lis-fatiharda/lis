
import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        email: { type: String, label: "Email", default: "" },
        password: { type: String, label: "Şifre", default: "" },
        host: { type: String, label: "Host", default: "" },
        port: { type: Number, label: "Port", default: 0 },
        secure: { type: Boolean, label: "Güvenlik (SSL)", default: false },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const lisclb003 = mongoose.model("lisclb003", schema);

export default lisclb003;
