<template>
    <q-bar>
        <l-icon size="md" name="list_alt" />

        <l-toolbar-title>Kullanıcı Profili</l-toolbar-title>

        <l-btn
            icon="delete"
            flat
            round
            dense
            color="purple"
            @click="btnClearLocalStorage()"
        >
            <l-tooltip>Temizle</l-tooltip></l-btn
        >

        <l-btn icon="save" flat round dense color="positive" @click="btnSave()">
            <l-tooltip>Değişiklikleri Kaydet</l-tooltip></l-btn
        >

        <l-btn
            v-if="isDialog != true"
            icon="cancel"
            flat
            round
            dense
            color="negative"
            @click="this.$btnGoHome(tabInfo)"
        />

        <l-btn
            v-if="isDialog == true"
            icon="cancel"
            flat
            round
            dense
            color="negative"
            @click="this.$emit('cancel', true)"
        />
    </q-bar>

    <l-div-flex>
        <l-input label="Kullanıcı Adı" readonly></l-input>
      
        
        <l-input label="E-Mail"></l-input>
        <l-btn
            label="Şifre Değiştir"
            color="primary"
            outline
            @click="isPwdChange = true"
        ></l-btn>
    </l-div-flex>

    <l-card>
        <l-tabs v-model="tab">
            <l-tab name="Genel" label="Genel" />
            <l-tab name="Tercihler" label="Tercihler" />
        </l-tabs>
    </l-card>

    <l-dialog-small v-if="isPwdChange == true" v-model="isPwdChange" persistent>
        <q-bar>
            <l-icon size="md" name="list_alt" />

            <l-toolbar-title>Şifre Değiştir</l-toolbar-title>

        </q-bar>
        <l-card class="q-pa-md">
            <l-input label="Eski Şifre" v-model="dv.oldPassword1"/>
            <l-input label="Eski Şifre Tekrarı" v-model="dv.oldPassword2"/>
            <l-input label="Yeni Şifre" v-model="dv.newPassword"
            @keydown.enter="btnChangePwd()"/>

            <q-card-actions class="row q-pa-md" align="right">
                <q-btn
                    style="background-color: #e4e6eb; color: #4b4f56"
                    label="İptal"
                    @click="changeCancel()"
                />
                <q-btn
                    :label="this.$gl('Kaydet', 'Save')"
                    @click="btnChangePwd()"
                    color="primary"
                    
                />
            </q-card-actions>
        </l-card>
    </l-dialog-small>
</template>

<script>
export default {
    props: ["isDialog", "tabInfo"],
    data() {
        return {
            tab: "Genel",
            isPwdChange: false,
            dv: {
                userName: "",
                oldPassword1: "",
                oldPassword2: "",
                newPassword: ""
            }
        };
    },

    methods: {
        changeCancel() {
            this.isPwdChange = false;
            this.dv.oldPassword1 = "";
            this.dv.oldPassword2 = "";
            this.dv.newPassword = "";  
        },
        async btnChangePwd() {
            await this.lis.function("CLBT07/btnChangePwd", this.dv)
            this.lis.alert("p", "Şifre Değiştirildi.")
            this.isPwdChange = false
            this.dv.oldPassword1 = "";
            this.dv.oldPassword2 = "";
            this.dv.newPassword = "";
            
        },
        init() {
            if (localStorage?.lis_notes == undefined) {
                this.pushNewNote();
            } else {
                this.lis_notes = JSON.parse(localStorage.getItem("lis_notes"));
            }
        },
        btnClearLocalStorage() {
            delete localStorage.lis_notes;
            this.lis_notes.notes = [];
            this.init();
        },
        btnSave() {
            localStorage.setItem("lis_notes", JSON.stringify(this.lis_notes));
        },
    },

    mounted() {
        this.init();

        this.dv.userName = localStorage.sys_user

    },

    beforeUnmount() {
        this.btnSave();
    },
};
</script>
