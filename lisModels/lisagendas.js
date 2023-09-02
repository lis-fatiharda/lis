// lisagendas - The basic busarea identifier collection for LisERP module Construction.

import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        company: { type: String, label: "Firma Kodu", default: "" },
        eventtype: { type: String, label: "Etkinlik Tipi", default: "" },
        eventnum: { type: String, label: "Etkinlik No", default: "" },
        groupId: { type: String, label: "Grup Etkinlik No", default: "" },

        title: { type: String, label: "Event Başlık", default: "" },
        ltext: { type: String, label: "Event Uzun Açıklama", default: "" },
        start: { type: String, label: "Event başlangıç", default: "" },
        end: { type: String, label: "Event bitiş", default: "" },
        allDay: { type: Boolean, label: "Tüm gün?", default: false },
        username: { type: String, label: "Kullanıcı ismi", default: "" },
        team: { type: String, label: "Ekip", default: "" },
        //----Participants-----
        participants: { type: Array, label: "Katılımcılar", default: [] },
        participantsopen: {
            type: Array,
            label: "Katılımcılar (Etkinlik katılımcıda açıldı)",
            default: [],
        },
        participantsconfirm: {
            type: Array,
            label: "Katılımcılar (Etkinlik katılımcıda onaylandı)",
            default: [],
        },
        participantsreject: {
            type: Array,
            label: "Katılımcılar (Etkinlik katılımcıda reddedildi)",
            default: [],
        },
        //_-----------------------

        backgroundColor: {
            type: String,
            label: "Event arkaplan rengi",
            default: "",
        },
        _textColor: { type: String, label: "Event yazı rengi", default: "" },
        borderColor: {
            type: String,
            label: "Event border rengi",
            default: "",
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
        versionkey: false,
    }
);

const lisagendas = mongoose.model("lisagendas", schema);

export default lisagendas;
