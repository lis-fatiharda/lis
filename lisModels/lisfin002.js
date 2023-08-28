// lisfin002 - Record Keys

import mongoose from "mongoose";

const itemsSchema = new mongoose.Schema({
    itemnum: { type: Number, label: "Kalem no", default: 10 },
    postway: { type: Number, label: "Hareket yönü", default: 0 }, // false:Borç|true:Alacak
    acctype: { type: String, label: "Hesap Tipi", default: "" },
    account: { type: String, label: "Hesap", default: "" },
    glaccount: { type: String, label: "Tek Düzen Hesap No", default: "" },
    valuefield: { type: String, label: "Değer Alanı", default: "" },
    stext: { type: String, label: "Açıklama", default: "" },
    currency: { type: String, label: "Para birimi", default: "" },
    runcode: { type: String, label: "Runcode", default: "" },
});

const schema = new mongoose.Schema(
    {
        company: { type: String, label: "Firma", default: "" },
        postkey: { type: String, label: "Kayıt Anahtarı", default: "" },
        stext: { type: String, label: "Açıklama", default: "" },
        //
        isintegration: {
            type: Boolean,
            label: "Entegrasyonlu Fiş",
            default: false,
        },
        //
        iscustomer: {
            type: Boolean,
            label: "Cari Kart",
            default: false,
        },
        isbankDebit: {
            type: Boolean,
            label: "Banka Borç",
            default: false,
        },
        isbankCredit: {
            type: Boolean,
            label: "Banka Alacak",
            default: false,
        },
        //
        items: [itemsSchema],
        //
        _deleted: { type: Boolean, label: "Silindi mi?", default: false },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);
export const items = mongoose.model("itemsSchema", schema);
const lisfin002 = mongoose.model("lisfin002", schema);

export default lisfin002;
