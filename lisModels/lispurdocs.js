// lispurdocs - Pures Documents.
import mongoose from "mongoose";

const headVatSchema = new mongoose.Schema({
  vatrate: { type: Number, label: "KDV oranı", default: 0 },
  vatamnt: { type: Number, label: "KDV Tutarı", default: 0 },
});
const discountSchema = new mongoose.Schema({
  disckey: {
    type: String,
    label: "İndirim Anahtarı",
    default: "",
  },
  type: {
    type: Number,
    enum: [0, 1, 2, 3], // "Net üzerinden Yüzdesel", "Brüt üzerinden Yüzdesel", "Mutlak", "Birim Başına Mutlak"
    label: "İndirim Anahtarı",
    default: 0,
  },
  rate: {
    type: Number,
    label: "İndirim oranı",
    default: 0,
  },
  amnt: {
    type: Number,
    label: "İndirim tutarı",
    default: 0,
  },
  isenable: {
    type: Boolean,
    label: "Belge üzerinde değiştirilebilir?",
    default: false,
  },
  stext: {
    type: String,
    label: "İndirim Açıklaması",
    default: "",
  },
});

const purItemsSchema = new mongoose.Schema({
    itemtype: { type: String, label: "Kalem tipi", default: "" },
    itemnum: { type: Number, label: "Kalem no", default: 10 },
    material: { type: String, label: "Malzeme Kodu", default: "" },
    variant: { type: Object, label: "Varyant", default: {} },
    mtext: { type: String, label: "Malzeme Adı", default: "" },
    mattype: { type: String, label: "Malzeme Tipi", default: "" },
    //** Inventory */
    plant: { type: String, label: "Depo", default: "" },
    warehouse: { type: String, label: "Depo", default: "" },
    stockplace: { type: String, label: "Stokyeri", default: "" },
    specialstock: { type: String, label: "Özel stok tipi", default: "" },
    batchnum: { type: String, label: "Parti no", default: "" },

    quantity: { type: Number, label: "Miktar", default: 0 },
    qunit: { type: String, label: "Miktar br", default: "" },
    pquantity: { type: Number, label: "İşlem Gören Miktar", default: 0 },
    //** Tolerance */
    istolerance: {
        type: Boolean,
        label: "Tölerans varmı?",
        default: false,
    },
    lowertol: { type: Number, label: "Alt tolerans", default: 0 },
    uppertol: { type: Number, label: "Üst Tolerans", default: 0 },
    //** Refdoc */

    refdoctype: {
        type: String,
        label: "Referans belge tipi",
        default: "",
    },
    refdocnum: {
        type: String,
        label: "Referans belge no",
        default: "",
    },
    refitemnum: {
        type: Number,
        label: "Referans kalem no",
        default: 0,
    },

    //** Price - Total */
    price: { type: Number, label: "Fiyat", default: 0 },
    punit: { type: Number, label: "Fiyat br", default: 1 },
    pprice: {
        type: Number,
        label: "İşlem Gören Tutar(Tutar Anlaşması)",
        defult: 0,
    },
    gross: { type: Number, label: "Brüt", default: 0 },
    discount: [discountSchema],
    discamnthead: {
        type: Number,
        label: "Başlıktan Gelen İndirim/Artırım Tutarı",
        default: 0,
    },
    discamnt: { type: Number, label: "İndirim/Artırım Tutarı", default: 0 },
    subtotal: { type: Number, label: "Net toplam", default: 0 },
    vatrate: { type: Number, label: "KDV oranı", default: 0 },
    vatamnt: { type: Number, label: "KDV Tutarı", default: 0 },
    grandtotal: { type: Number, label: "Genel toplam", default: 0 },
    stat: {
        type: Number,
        enum: [0, 1, 2], //"Açık", "Kısmi", "Kapalı"
        label: "Kalem statüsü",
        default: 0,
    },
    //******************* */
    _deleted: { type: Boolean, label: "Silindi mi?", default: false },
    createdby: {
        type: String,
        label: "Oluşturan",
        default: global.sys_user,
    },
});

const payPlanSchema = new mongoose.Schema({
  paytype: { type: String, label: "Ödeme tipi", default: "" },
  paydate: { type: Date, label: "Ödeme tarihi", default: new Date() },
  paypercent: { type: Number, label: "Ödeme oranı", default: 100 },
  payamount: { type: String, label: "Ödeme miktarı", default: "" },
  payday: { type: Number, label: "Ödeme gün", default: 0 },
  paystat: { type: String, label: "Ödeme statüsü", default: "" },
  ltext: { type: String, label: "Ödeme açıklaması", default: "" },
});

const notesSchema = new mongoose.Schema({
  notetitle: { type: String, label: "Not Başlığı", default: "" },
  note: { type: String, label: "Not", default: "" },
});

//******************************************************************************************************************** */
//*******************************************************HEAD********************************************************* */

const schema = new mongoose.Schema(
    {
        company: { type: String, label: "Firma Kodu", default: "01" },
        busarea: { type: String, label: "İş Alanı", default: "S" },
        doctype: { type: String, label: "Döküman tipi", default: "" },
        docnum: { type: String, label: "Dökümam no", default: "" },
        extdoctype: {
            type: String,
            label: "Harici Döküman tipi",
            default: "",
        },
        extdocnum: {
            type: String,
            label: "Harici Dökümam no",
            default: "",
        },

        purdept: { type: String, label: "Satış bölümü", default: "" },
        project: { type: String, label: "Proje", default: "" },
        paymtype: { type: String, label: "Ödeme tipi", default: "" },
        isapprove: {
            type: Number,
            enum: [0, 1, 2], //"Yok", "Eksik", "Tamam"
            label: "Onay",
            default: 0,
        },
        isfinance: {
            type: Boolean,
            label: "Muhasebeleştrilmiş?",
            default: false,
        },
        validfrom: {
            type: Date,
            label: "Başlama tarihi",
            default: new Date(),
        },
        validuntil: {
            type: Date,
            label: "Bitiş tarihi",
            default: new Date("2030", 11, 31),
        },
        // Document Characteristics
        reqtype: {
            type: Number,
            label: "İstek Karakteristiği",
            options: [
                { value: 0, stext: "None" },
                { value: 1, stext: "Normal" },
            ],
            default: 0,
        },
        offtype: {
            type: Number,
            label: "Teklif Karakteristiği",
            options: [
                { value: 0, stext: "None" },
                { value: 1, stext: "Normal" },
            ],
            default: 0,
        },
        ordtype: {
            type: Number,
            label: "Sipariş Karakteristiği (None|Normal|Değer Anl.|Miktar Anl.|Termin Anl.)",
            options: [
                { value: 0, stext: "None" },
                { value: 1, stext: "Normal" },
                { value: 2, stext: "Değer Anlaşması" },
                { value: 3, stext: "Miktar Anlaşması" },
                { value: 4, stext: "Termin Anlaşması" },
            ],
            default: 0,
        },
        deltype: {
            type: Number,
            label: "İrsaliye Karakteristiği",
            options: [
                { value: 0, stext: "None" },
                { value: 1, stext: "Manuel Girişli" },
                { value: 2, stext: "Oto Girişli" },
                { value: 3, stext: "Manuel Çıkışlı İade" },
                { value: 4, stext: "Oto Çıkışlı İade" },
            ],
            default: 0,
        },
        invtype: {
            type: Number,
            label: "Fatura Karakteristiği",
            options: [
                { value: 0, stext: "None" },
                { value: 1, stext: "Normal" },
                { value: 2, stext: "İade" },
                { value: 3, stext: "Fark" },
                { value: 4, stext: "Masraf" },
                { value: 5, stext: "Fason" },
            ],
            default: 0,
        },
        docstat: {
            type: Number,
            enum: [0, 1, 2], //"Açık", "Kısmi", "Kapalı"
            label: "Belge statüsü",
            default: 0,
        },
        docstatdetail: {
            type: String,
            label: "Belge statü detayı",
            default: "",
        },
        //*********CUSTOMER********** */
        vendor: { type: String, label: "Tedarikçi no", default: "" },
        name1: { type: String, label: "Tedarikçi adı", default: "" },
        contactname1: { type: String, label: "İlgili Kişi", default: "" },
        country: { type: String, label: "Ülke", default: "" },
        city: { type: String, label: "Müşteri grubu", default: "" },
        address: { type: String, label: "Müşteri grubu", default: "" },
        telnum: { type: String, label: "Müşteri grubu", default: "" },
        email: { type: String, label: "Müşteri grubu", default: "" },
        //*********CURRENCY********** */
        currency: { type: String, label: "Para birimi", default: "" },
        curdate: { type: Date, label: "Kur Tarihi", default: new Date() },
        currate: { type: Number, label: "Kur", default: 1 },
        manexchrate: {
            type: Number,
            enum: [0, 1, 2, 3], //"Sip.Tarihi", "İrs.Tarihi", "Fat.Tarihi", "Sabit kur"
            label: "Kur Tarihi",
            default: 0,
        },
        exchmethod: {
            type: Number,
            enum: [0, 1, 2, 3], //"Alış", "Satış", "E.Alış", "E.Satış"
            label: "Kur Metodu",
            default: 0,
        },
        langu: { type: String, label: "Dil", default: "T" },
        //*************************** */
        items: [purItemsSchema],
        payplan: [payPlanSchema],
        notes: [notesSchema],
        //*********DEL-INV ADRESSES********** */
        isgrcsend: {
            type: Boolean,
            label: "Malı Gönderen aynı firma",
            default: false,
        },
        grcadrnum: {
            type: Number,
            label: "Malı gönderen adres no",
            default: 0,
        },
        grcsend: {
            type: String,
            label: "Malı gönderen Firma",
            default: "",
        },
        grctitle: { type: String, label: "Ünvan", default: "" },
        grcname1: { type: String, label: "İsim", default: "" },
        grcaddress: { type: String, label: "Adres", default: "" },
        grccity: { type: String, label: "Şehir", default: "" },
        grcdistrict: { type: String, label: "Semt", default: "" },
        grcbuilding: { type: String, label: "Bina No", default: "" },
        grcpostcode: { type: String, label: "Posta kodu", default: "" },
        grccountry: { type: String, label: "ülke", default: "" },
        grclangu: { type: String, label: "dil", default: "" },
        grctelnum: { type: String, label: "telefon", default: "" },
        grcfaxnum: { type: String, label: "fax", default: "" },
        grcpurdept: { type: String, label: "satış bölümü", default: "" },
        grctaxdept: { type: String, label: "vergi dairesi", default: "" },
        grctaxnum: { type: String, label: "vergi no", default: "" },

        isircsend: {
            type: Boolean,
            label: "Faturayı gönderen aynı firma",
            default: false,
        },
        ircadrnum: {
            type: Number,
            label: "Faturayı gönderen adres no",
            default: 0,
        },
        ircsend: {
            type: String,
            label: "Faturayı gönderen Firma",
            default: "",
        },
        irctitle: { type: String, label: "Ünvan", default: "" },
        ircname1: { type: String, label: "İsim", default: "" },
        ircaddress: { type: String, label: "Adres", default: "" },
        irccity: { type: String, label: "Şehir", default: "" },
        ircdistrict: { type: String, label: "Semt", default: "" },
        ircbuilding: { type: String, label: "Bina No", default: "" },
        ircpostcode: { type: String, label: "Posta kodu", default: "" },
        irccountry: { type: String, label: "ülke", default: "" },
        irclangu: { type: String, label: "dil", default: "" },
        irctelnum: { type: String, label: "telefon", default: "" },
        ircfaxnum: { type: String, label: "fax", default: "" },
        ircpurdept: { type: String, label: "satış bölümü", default: "" },
        irctaxdept: { type: String, label: "vergi dairesi", default: "" },
        irctaxnum: { type: String, label: "vergi no", default: "" },

        //*************************************** */
        freighter: { type: String, label: "Nakliyeci", default: "" },
        shipping: { type: String, label: "Teslim Tipi", default: "" },
        station: { type: String, label: "İstasyon", default: "" },
        paymcond: { type: String, label: "Ödeme Koşulları", default: "" },

        //*********E-DELIVERY E-INVOICE********** */
        isprinted: {
            type: Boolean,
            label: "Kuyruğa gönderildi",
            default: false,
        },
        edoctype: {
            type: Number,
            enum: [0, 1, 2, 3],
            label: "0:Hiçbiri|1:E-İrsaliye|2:E-Fatura|3:E-Arşiv",
            default: 0,
        },
        einvotype: {
            type: Number,
            enum: [0, 1],
            label: "0:Temel Fatura|1:Ticari Fatura",
            default: 1,
        },
        einvonumber: { type: String, label: "E-Belge No", default: "" },
        einvouuid: { type: String, label: "UUID", defaut: "" },
        //*********SUBTOTAL-GRANDTOTAL********** */
        gross: { type: Number, label: "Brüt", default: 0 },
        discount: [discountSchema],
        discamnt: {
            type: Number,
            label: "İndirim/Artırım miktarı",
            default: 0,
        },
        subtotal: { type: Number, label: "Net toplam", default: 0 },
        vats: [headVatSchema],
        vatamnt: { type: Number, label: "KDV Tutarı", default: 0 },
        grandtotal: { type: Number, label: "Genel toplam", default: 0 },

        //******************* */
        isvatinclude: { type: Boolean, label: "KDV dahil mi?", default: false },
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

const lispurdocs = mongoose.model("lispurdocs", schema);
export default lispurdocs;
