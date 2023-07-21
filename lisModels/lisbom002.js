    // lisbom002 - BOM Component Types

import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        company: { type: String, label: "Firma Kodu", default: "" },
        type: { type: String, label: "Eleman Tipi", default: "" },
        stext: { type: String, label: "Açıklama", default: "" },
        isexpstop: { type: Boolean, label: "Çözülüm Sonu", default: false },
        iscalcul: { type: Boolean, label: "Maliyet Hesapla", default: false },
        isreserve: { type: Boolean, label: "Rezerve Et", default: false },
        _deleted: { type: Boolean, label: "Silindi mi?", default: false },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const lisbom002 = mongoose.model("lisbom002", schema);

export default lisbom002;
