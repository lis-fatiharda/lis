import mongoose from "mongoose";

const wsmethodsSchema = new mongoose.Schema({
    wsmethod: { type: String, label: "Web servis methodu", default: "" },
});

const schema = new mongoose.Schema(
    {
        apiKey: { type: String, label: "Api Key", default: "" },
        username: { type: String, label: "Kullanıcı Adı", default: "" },
        stext: { type: String, label: "Açıklama", default: "" },

        wsmethods: [wsmethodsSchema],

        docdate: {
            type: String,
            label: "Geçerlilik Başlangıcı",
            default: new Date(),
        },
        validuntil: {
            type: String,
            label: "Geçerlilik Bitişi",
            default: new Date(2030),
        },
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

const lisapiKeys = mongoose.model("lisapiKeys", schema);

export default lisapiKeys;
