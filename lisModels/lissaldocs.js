// lissaldocs - Sales Documents.

import mongoose from "mongoose";

const headVatSchema = new mongoose.Schema({
  subtotal: { type: Number, label: "Vergilendirilebilir Tutar", default: 0 },
  vatrate: { type: Number, label: "KDV oranı", default: 0 },
  vatamnt: { type: Number, label: "KDV Tutarı", default: 0 },
  novatcode: { type: String, label: "Vergi istisna kodu", default: "" },
  novattxt: {
    type: String,
    label: "Vergi istisna sebebi açıklaması",
    default: "",
  },
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

const salItemsSchema = new mongoose.Schema({
    itemtype: { type: String, label: "Kalem tipi", default: "" },
    itemnum: { type: Number, label: "Kalem no", default: 10 },
    material: { type: String, label: "Malzeme Kodu", default: "" },
    mtext: { type: String, label: "Malzeme Adı", default: "" },
    mattype: { type: String, label: "Malzeme Tipi", default: "" },
    //** Inventory */
    plant: { type: String, label: "Tesis", default: "" },
    warehouse: { type: String, label: "Depo", default: "" },
    stockplace: { type: String, label: "Stokyeri", default: "" },
    specialstock: { type: String, label: "Özel stok tipi", default: "" },
    batchnum: { type: String, label: "Parti no", default: "" },

    quantity: { type: Number, label: "Miktar", default: 0 },
    qunit: { type: String, label: "Miktar br", default: "" },
    pquantity: { type: Number, label: "İşlem Gören Miktar", default: 0 },
    //** Tolerance */
    istolerance: { type: Boolean, label: "Tölerans varmı?", default: false },
    lowertol: { type: Number, label: "Alt tolerans", default: 0 },
    uppertol: { type: Number, label: "Üst Tolerans", default: 0 },
    //** Refdoc */
    refdoctype: { type: String, label: "Referans belge tipi", default: "" },
    refdocnum: { type: String, label: "Referans belge no", default: "" },
    refitemnum: { type: Number, label: "Referans kalem no", default: 0 },

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
    isenote: { type: Boolean, label: "E-Belge Notu", default: false },
});

//******************************************************************************************************************** */
//*******************************************************HEAD********************************************************* */

const schema = new mongoose.Schema(
    {
        company: { type: String, label: "Firma Kodu", default: "01" },
        busarea: { type: String, label: "İş Alanı", default: "S" },
        doctype: { type: String, label: "Döküman tipi", default: "" },
        docnum: { type: String, label: "Dökümam no", default: "" },
        extdoctype: { type: String, label: "Harici Döküman tipi", default: "" },
        extdocnum: { type: String, label: "Harici Dökümam no", default: "" },

        saldept: { type: String, label: "Satış bölümü", default: "" },
        project: { type: String, label: "Proje", default: "" },
        paymtype: { type: String, label: "Ödeme tipi", default: "" },
        isapprove: {
            type: Number,
            enum: [0, 1, 2], //"Yok", "Eksik", "Tamam"
            label: "Onay",
            default: 0,
        },
        iscrmoffer: {
            type: Boolean,
            label: "CRM Teklifi mi?",
            default: false,
        },
        isfinance: {
            type: Boolean,
            label: "Muhasebeleştrilmiş?",
            default: false,
        },
        validfrom: { type: Date, label: "Başlama tarihi", default: new Date() },
        validuntil: {
            type: Date,
            label: "Bitiş tarihi",
            default: new Date("2030", 11, 31),
        },
        // Document Characteristics
        offtype: {
            type: Number,
            label: "Teklif Karakteristiği",
            options: [
                { value: 0, stext: "None" },
                { value: 1, stext: "Şablon" },
                { value: 2, stext: "Normal" },
            ],
            default: 0,
        },
        ordtype: {
            type: Number,
            label: "Sipariş Karakteristiği",
            options: [
                { value: 0, stext: "None" },
                { value: 1, stext: "Şablon" },
                { value: 2, stext: "Normal" },
                { value: 3, stext: "Değer Anlaşması" },
                { value: 4, stext: "Miktar Anlaşması" },
                { value: 5, stext: "Termin Anlaşması" },
            ],
            default: 0,
        },
        deltype: {
            type: Number,
            label: "İrsaliye Karakteristiği",
            options: [
                { value: 0, stext: "None" },
                { value: 1, stext: "Manuel Çıkışlı" },
                { value: 2, stext: "Oto Çıkışlı" },
                { value: 3, stext: "Manuel Girişli İade" },
                { value: 4, stext: "Oto Girişli İade" },
            ],
            default: 0,
        },
        invtype: {
            type: Number,
            label: "Fatura Karakteristiği",
            options: [
                { value: 0, stext: "None" },
                { value: 1, stext: "Normal" },
                { value: 2, stext: "Miktar İade" },
                { value: 3, stext: "Değer İade" },
                { value: 4, stext: "İptal faturası" },
                { value: 5, stext: "Kur Farkı Faturası" },
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
        customer: { type: String, label: "Müşteri no", default: "" },
        name1: { type: String, label: "Müşteri adı", default: "" },
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
        items: [salItemsSchema],
        payplan: [payPlanSchema],
        notes: [notesSchema],

        //*********shipment************* */

        drivername: { type: String, label: "Şoför adı", default: "" },
        driversurname: { type: String, label: "Şoför soyadı", default: "" },
        driverid: { type: String, label: "Şoför TC no", default: "" },
        driverplate: { type: String, label: "Plaka", default: "" },

        //*********DEL-INV ADRESSES********** */
        isgrcrecv: {
            type: Boolean,
            label: "Malı alan aynı firma",
            default: false,
        },
        grcadrnum: { type: Number, label: "Malı alan adres no", default: 0 },
        grcrecv: { type: String, label: "Malı alan Firma", default: "" },
        grctitle: { type: String, label: "Ünvan", default: "" },
        grcname1: { type: String, label: "İsim", default: "" },
        grcaddress: { type: String, label: "Adres", default: "" },
        grccity: { type: String, label: "Şehir", default: "" },
        grcpostcode: { type: String, label: "Posta kodu", default: "" },
        grccountry: { type: String, label: "ülke", default: "" },
        grclangu: { type: String, label: "dil", default: "" },
        grctelnum: { type: String, label: "telefon", default: "" },
        grcfaxnum: { type: String, label: "fax", default: "" },
        grcwebsite: { type: String, label: "Web Site", default: "" },
        grcemail: { type: String, label: "E-Mail", default: "" },
        grcsaldept: { type: String, label: "satınalma bölümü", default: "" },
        grctaxdept: { type: String, label: "vergi dairesi", default: "" },
        grctaxnum: { type: String, label: "vergi no", default: "" },

        isircrecv: {
            type: Boolean,
            label: "Faturayı alan aynı firma",
            default: false,
        },
        ircadrnum: {
            type: Number,
            label: "Faturayı alan adres no",
            default: 0,
        },
        ircrecv: { type: String, label: "Faturayı alan Firma", default: "" },
        irctitle: { type: String, label: "Ünvan", default: "" },
        ircname1: { type: String, label: "İsim", default: "" },
        ircaddress: { type: String, label: "Adres", default: "" },
        irccity: { type: String, label: "Şehir", default: "" },
        ircpostcode: { type: String, label: "Posta kodu", default: "" },
        irccountry: { type: String, label: "ülke", default: "" },
        irclangu: { type: String, label: "dil", default: "" },
        irctelnum: { type: String, label: "telefon", default: "" },
        ircfaxnum: { type: String, label: "Fax", default: "" },
        ircwebsite: { type: String, label: "Web Site", default: "" },
        ircemail: { type: String, label: "E-Mail", default: "" },
        ircsaldept: { type: String, label: "satınalma bölümü", default: "" },
        irctaxdept: { type: String, label: "vergi dairesi", default: "" },
        irctaxnum: { type: String, label: "vergi no", default: "" },

        //*************************************** */
        freighter: { type: String, label: "Nakliyeci", default: "" },
        shipping: { type: String, label: "Teslimat Şekli", default: "" },
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
            label: "0:Hiçbiri|1:E-Fatura|2:E-Arşiv|3:E-İrsaliye",
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
        postway: {
            type: Boolean,
            enum: [0, 1],
            label: "Hareket Yönü",
            default: false,
        }, //belge yönü
        //*********SUBTOTAL-GRANDTOTAL********** */
        gross: { type: Number, label: "Brüt", default: 0 },
        discount: [discountSchema],
        discamnt: {
            type: Number,
            label: "Toplam İndirim/Artırım miktarı",
            default: 0,
        },
        subtotal: { type: Number, label: "Net toplam", default: 0 },
        vats: [headVatSchema],
        vatamnt: { type: Number, label: "KDV Tutarı", default: 0 },
        grandtotal: { type: Number, label: "Genel toplam", default: 0 },

        //******************* */
        isvatinclude: { type: Boolean, label: "KDV dahil mi?", default: false },
        _deleted: { type: Boolean, label: "Silindi mi?", default: false },
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

const lissaldocs = mongoose.model("lissaldocs", schema);

export default lissaldocs;
