// lisbas017 - Terms of payment

import mongoose from "mongoose";

const itemsSchema = new mongoose.Schema({
  paytype: { type: String, label: "Ödeme tipi", default: "" },
  paydate: { type: Date, label: "Ödeme tarihi", default: new Date() },
  paypercent: { type: Number, label: "Ödeme oranı", default: 100 },
  payamount: { type: String, label: "Ödeme miktarı", default: "" },
  payday: { type: Number, label: "Ödeme gün", default: 0 },
  ltext: { type: String, label: "Ödeme açıklaması", default: "" },

});

const schema = new mongoose.Schema(
    {
        company: { type: String, label: "Firma", default: "" },
        paymcond: { type: String, label: "Ödeme Koşulları", default: "" },
        stext: { type: String, label: "Açıklama", default: "" },
       
        items: [itemsSchema],

        _deleted: { type: Boolean, label: "Silindi mi?", default: false },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);
//export const items = mongoose.model("itemsSchema", schema);
const lisbas017 = mongoose.model("lisbas017", schema);

export default lisbas017;
