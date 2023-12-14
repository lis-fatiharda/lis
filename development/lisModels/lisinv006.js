// lisinv006 - Movement Codes

import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        company: { type: String, label: "Firma Kodu", default: "" },
        movecode: { type: String, label: "Hareket kodu", default: "" },
        stext: { type: String, label: "Açıklama", default: "" },
        invmanag: { type: String, label: "Env.Yön.Tipi", default: "" },
        ordertype: { type: String, label: "Sipariş.Tipi", default: "" },
        specialstock: { type: String, label: "Ö.S.Tipi", default: "S" },
        //******************************* */
        doctype: { type: String, label: "Belge Tipi", default: "" },
        postway: {
            type: Number,
            label: "Hareket Yönü",
            default: 0,
            options: [
                { value: 0, stext: "Giriş" },
                { value: 1, stext: "Çıkış" },
                { value: 2, stext: "Transfer" },
            ],
        },
        fromstocktype: {
            type: Number,
            label: "Stoktan",
            options: [
                { value: -1, stext: "Hiçbiri" },
                { value: 0, stext: "Kullanılabilir" },
                { value: 1, stext: "Kalite" },
                { value: 2, stext: "Bloke" },
                { value: 3, stext: "rezerve" },
            ],
            default: -1,
        },
        tostocktype: {
            type: Number,
            label: "Stok'a",
            options: [
                { value: -1, stext: "Hiçbiri" },
                { value: 0, stext: "Kullanılabilir" },
                { value: 1, stext: "Kalite" },
                { value: 2, stext: "Bloke" },
                { value: 3, stext: "rezerve" },
            ],
            default: -1,
        },

        //******************************* */
        postkeyf: { type: String, label: "Muhasebe Kayıt Tipi", default: "" },
        ispricing: {
            type: Boolean,
            label: "Tutarlandırılacak",
            default: false,
        },
        isaccdiffnote: {
            type: Number,
            label: "Muhasebeleştirme Statüsü",
            options: [
                { value: 0, stext: "Muhasebe yok" },
                { value: 1, stext: "Anlık" },
                { value: 2, stext: "Dönem kapanışları ile" },
            ],
            default: 0,
        },

        isnegstock: {
            type: Boolean,
            label: "Eksi Stok İmkanı",
            default: false,
        },

        //******************************* */
        _deleted: { type: Boolean, label: "Silindi mi?", default: false }, // 0:silinmedi | 1:silindi
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const lisinv006 = mongoose.model("lisinv006", schema);

export default lisinv006;
