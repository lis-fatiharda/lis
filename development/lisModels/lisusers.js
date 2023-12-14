// lisusers - LisERP user informations.

import mongoose from "mongoose";

const schema = new mongoose.Schema( 
    {
        username: {
            type: String,
            unique: true,
            required: [true, "Lütfen Kullanıcı adı giriniz!"],
            default: "",
        },
        password: {
            type: String,
            required: [true, "Lütfen password giriniz!"],
            default: "",
        },
        email: {
            type: String,
            unique: true,
            label: "E-Mail",
            default: "",
        },
        contactbook: Object,
        issuperuser: {
            type: Boolean,
            label: "Süper kullanıcı",
            default: false,
        },
        isblocked: {
            type: Boolean,
            label: "Blokeli",
            default: false,
        },
        trights: { type: Array, default: "", label: "Transaction Kodu" },
        scrights: { type: Array, default: "", label: "Destek Koleksiyon Kodu" },
        favpages: {
            type: Array,
            default: "",
            label: "Favori ekranları kodları",
        },
        //***************** */
        name: {
            type: String,
            label: "Adres defteri ismi",
            default: "",
        },
        surname: {
            type: String,
            label: "Adres defteri soy ismi",
            default: "",
        },
        //***************** */
        loginright: {
            type: Number,
            label: "Login right",
            default: 1,
        },
        _deleted: {
            type: Boolean,
            label: "Silindi mi?",
            default: false,
            // 0:silinmedi | 1:silindi
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

const lisusers = mongoose.model("lisusers", schema);

export default lisusers;
