// lisworkcenters - Workcenters

import mongoose from "mongoose";

const activitiesSchema = new mongoose.Schema({
  type: { type: String, label: "Aktivite Tİpi", default: "" },
  value: { type: Number, label: "Tahmini operasyon süresi", default: 0 },
  unit: { type: String, label: "Birimi", default: "" },

  unit: { type: String, label: "Birimi", default: "" },
  iscost: { type: Boolean, label: "Maliyete ekle", default: false },
});

const workrespSchema = new mongoose.Schema({
  username: { type: String, label: "Kullanıcı Adı", default: "" },
});

const schema = new mongoose.Schema({
    company: { type: String, label: "Firma Kodu", default: "" },
    type: { type: Number, label: "Operasyon Tipi", default: 0 },
    plant: { type: String, label: "Tesis", default: "01" },
    workcenter: { type: String, label: "İş Merkezi", default: "" },
    mainworkcenter: { type: String, label: "Üst İş Merkezi", default: "" },
    costcenter: { type: String, label: "Maliyet Merkezi", default: "" },
    capgrp: { type: String, label: "İş Merkezi Kapasite Grubu", default: "" },
    activities: [activitiesSchema],
    components: [],
    workresp: [workrespSchema], // Workcenter responsibles
    stext: { type: String, label: "Açıklama", default: "" },
    oprcontrol: { type: String, label: "Operasyon Kontrol Tipi", default: "S" },
    machinestate: {
        type: String,
        label: "Makine Çalışma Durumu",
        enum: ["off", "idle", "operating"],
        default: "off",
    },
    _deleted: { type: Boolean, label: "Silindi mi?", default: false },
});

const lisworkcenters = mongoose.model("lisworkcenters", schema);

export default lisworkcenters;
