// lismodels - The basic identifier collection for LisERP module Construction.

import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        model: {
            type: String,
            default: "",
            required: [true, "Lütfen model kodu giriniz!"],
        },
        stext: {
            type: String,
            default: "",
        },
        module: {
            type: String,
            default: "",
        },
        type: {
            type: Boolean,
            default: false,
            // false: data collection | true: support collection
        },
        //***************** */
        _deleted: {
            type: Boolean,
            label: "Silindi mi?",
            default: false,
            // false:silinmedi | true:silindi
        },
        createdby: {
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

const lismodels = mongoose.model("lismodels", schema);

export default lismodels;
