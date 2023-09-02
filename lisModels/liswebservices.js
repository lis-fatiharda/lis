
import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        wsmethod: { type: String, label: "Web servis methodu", default: "" },
        lisfunction: { type: String, label: "Lis Fonksiyonu", default: "" },
        ip: { type: String, label: "IP kısıtı", default: "" },
        isblocked: {
            type: Boolean,
            label: "Blokeli (Devre dışı)",
            default: false,
        },

        //******************* */

        _deleted: { type: Boolean, label: "Silindi mi?", default: false },
        _createdby: {
            type: String,
            label: "Oluşturan",
            default: global.sys_user,
        },
        _updatedby: {
            type: String,
            label: "Güncelleyen",
            default: global.sys_user,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const liswebservices = mongoose.model("liswebservices", schema);

export default liswebservices;
