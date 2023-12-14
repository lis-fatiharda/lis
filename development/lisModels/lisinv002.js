// lisinv002 - User inventory rights

import mongoose from "mongoose";

const rightsSchema = new mongoose.Schema({
  process0: { type: Boolean, label: "Belgesiz Giriş", default: false },
  process1: { type: Boolean, label: "Satınalama Girişi", default: false },
  process2: { type: Boolean, label: "Üretimden Giriş", default: false },
  process3: { type: Boolean, label: "Transfer Siparişine Bağlı Giriş", default: false },
  process4: { type: Boolean, label: "Ürün Ağacına Bağlı Giriş", default: false },
  process5: { type: Boolean, label: "Fason Giriş", default: false },
  process6: { type: Boolean, label: "Servisten Giriş", default: false },
  process7: { type: Boolean, label: "Müşteriden İade Girişi", default: false },
  process8: { type: Boolean, label: "Fasondan İade Girişi", default: false },
  process10: { type: Boolean, label: "Belgesiz Çıkış", default: false },
  process11: { type: Boolean, label: "Ürün Ağacına Bağlı Çıkış", default: false },
  process12: { type: Boolean, label: "Üretime Çıkış", default: false },
  process13: { type: Boolean, label: "Fason Çıkış", default: false },
  process14: { type: Boolean, label: "İrsaliye Çıkışı", default: false },
  process15: { type: Boolean, label: "Transfer Siparişine Bağlı Çıkış", default: false },
  process16: { type: Boolean, label: "Servise Çıkış", default: false },
  process17: { type: Boolean, label: "Fason Transferi", default: false },
  process18: { type: Boolean, label: "Tedarikçiye İade", default: false },
  process19: { type: Boolean, label: "Parti Bazında Dağıtım", default: false },
  process20: { type: Boolean, label: "Tesisler Arası Transfer", default: false },
  process21: { type: Boolean, label: "Depolar Arası Transfer", default: false },
  process22: { type: Boolean, label: "Stok Yerleri Arası Transfer", default: false },
  process23: { type: Boolean, label: "Malzemeden Malzemeye Transfer", default: false },
  process24: { type: Boolean, label: "Üretime Transfer", default: false },
  process25: { type: Boolean, label: "Satınalamaya Bağlı Transfer", default: false },
  processreverse: { type: Boolean, label: "İptal Hareketleri", default: false },
  processadjust: { type: Boolean, label: "Stok Sayımı", default: false },
});
const authorizationsSchema = new mongoose.Schema({
  invmanag: { type: String, label: "Envanter Yönetim Tipi", default: "" },
  trantype: { type: String, label: "Hareket Kodu", default: "" },
  warehouse: { type: String, label: "Depo", default: "" },
  stockplace: { type: String, label: "Stok Yeri", default: "" },
  qpostway: { type: Number, label: "Hareket Yönü", default: 0 },// 0:Giriş | 1:Çıkış
  isallowed: { type: Number, label: "İzin?", default: 0 },// 0:izin verilmiyor | 1:izin veriliyor


});

const schema = new mongoose.Schema(
  {
    company: { type: String, label: "Firma Kodu", default: "" },
    invuser: { type: String, label: "Kullanıcı Adı", default: "" },
    _deleted: { type: Boolean, label: "Silindi mi?", default: false }, // 0:silinmedi | 1:silindi

    rights: [rightsSchema],
    authorizations: [authorizationsSchema],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const lisinv002 = mongoose.model("lisinv002", schema);

export default lisinv002;
