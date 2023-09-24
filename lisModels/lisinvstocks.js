// lisinvstocks - Inventory stock.

import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        company: { type: String, label: "Firma Kodu", default: "" },
        plant: { type: String, label: "Tesis Kodu", default: "" },
        material: { type: String, label: "Malzeme Kodu", default: "" },
        mtext: { type: String, label: "Malzeme Adı", default: "" },
        variant: { type: String, label: "Varyant", default: '' },  
        //*************************** */
        warehouse: { type: String, label: "Depo", default: "" },
        stockplace: { type: String, label: "Stokyeri", default: "" },
        specialstock: { type: String, label: "Özel stok tipi", default: "" },
        batchnum: { type: String, label: "Parti no", default: "" },
        //*************************** */
        quantity: { type: Number, label: "Toplam Miktar", default: 0 },
        aquantity: { type: Number, label: "Kullanılabilir Miktar", default: 0 },
        qquantity: { type: Number, label: "Kalite Miktar", default: 0 },
        bquantity: { type: Number, label: "Bloke Miktar", default: 0 },
        rquantity: { type: Number, label: "Rezerve Miktar", default: 0 },
        //-
        qunit: { type: String, label: "Miktar Birimi", default: "" },
        //*************************** */
        entrydate: { type: Date, label: "Giriş Tarihi", default: new Date() },
        expirydate: {
            type: Date,
            label: "Son Kullanma Tarihi",
            default: new Date(),
        },
        //*************************** */
        price: { type: Number, label: "Fiyat", default: 0 },
        punit: { type: Number, label: "Fiyat Birimi", default: 0 },
        amount: { type: Number, label: "Toplam Tutar", default: 0 },
        //******************* */

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

const lisinvstocks = mongoose.model("lisinvstocks", schema);

export default lisinvstocks;
