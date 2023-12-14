<template>
    <div id="app">
        <q-layout view="hHh lpR fFf">
            <q-page-container>
                <q-page
                    :class="`window-height window-width row justify-center items-center ${
                        dv.showLogo == true ? 'bgimg' : 'bgmobile'
                    }`"
                >
                    <q-card v-if="isForgetPwd == false">
                        <q-card-section horizontal class="row">
                            <q-card-section style="min-width: 300px">
                                <q-card-section class="q-pa-md">
                                    <div class="text-h6">
                                        {{ this.$gl("Oturum aç", "Login") }}
                                    </div>
                                </q-card-section>

                                <q-form class="q-gutter-sm">
                                    <q-input
                                        v-if="dv?.product_LICENCE == 'PREMIUM'"
                                        filled
                                        v-model="dv.sys_userVmail"
                                        :label="
                                            this.$gl(
                                                'Kullanıcı Adı veya E-Posta',
                                                'Username'
                                            )
                                        "
                                        @keydown.enter="btnLogin(dv)"
                                    />

                                    <q-input
                                        v-if="localStorage?.product_LICENCE == 'EXPRESS'"
                                        filled
                                        v-model="dv.sys_email"
                                        :label="this.$gl('E-Posta', 'E-Mail')"
                                        @keydown.enter="btnLogin(dv)"
                                    />

                                    <q-input
                                        v-model="dv.password"
                                        filled
                                        :type="dv.isPwd ? 'password' : 'text'"
                                        :label="this.$gl('Şifre', 'Password')"
                                        @keydown.enter="btnLogin(dv)"
                                    >
                                        <template v-slot:append>
                                            <q-icon
                                                :name="
                                                    dv.isPwd
                                                        ? 'visibility_off'
                                                        : 'visibility'
                                                "
                                                class="cursor-pointer"
                                                @click="dv.isPwd = !dv.isPwd"
                                            />
                                        </template>
                                    </q-input>

                                    <q-input
                                        v-if="dv.isShowDatabase == true"
                                        v-model="dv.sys_dataBase"
                                        filled
                                        size="xs"
                                        :label="
                                            this.$gl('Veri Tabanı', 'Database')
                                        "
                                        @keydown.enter="btnLogin(dv)"
                                    >
                                    </q-input>
                                </q-form>
                                <q-card-actions class="q-px-md q-pa-md">
                                    <q-btn
                                        size="lg"
                                        class="full-width"
                                        color="primary"
                                        :label="this.$gl('Giriş', 'Login')"
                                        @click="btnLogin(dv)"
                                    />
                                </q-card-actions>

                                <div
                                    class="text-overline cursor-pointer text-blue-9"
                                    @click="isForgetPwd = true"
                                >
                                    Şifremi unuttum
                                </div>
                            </q-card-section>
                            <q-separator inset vertical v-if="dv.showLogo" />
                            <q-img
                                v-if="dv.showLogo"
                                class="col-5 cursor-pointer"
                                src="../../../configs/assets/liserpOrg.jpg"
                                style="min-width: 380px"
                                @click="goToWebSite()"
                            />
                        </q-card-section>
                    </q-card>

                    <q-card v-if="isForgetPwd == true">
                        <q-card-section class="row">
                            <q-card-section style="min-width: 300px">
                                <q-card-section>
                                    <div class="text-h5">Şifre Yenile</div>

                                    <div class="text-subtitle2">
                                        Lis hesabın ile ilişikilendirilen mail
                                        adresini gir.
                                    </div>
                                </q-card-section>

                                <q-form class="q-gutter-sm">
                                    <q-input
                                        filled
                                        v-model="dv.sys_email"
                                        label="E-Mail"
                                        @keydown.enter="btnSendPwd()"
                                    />
                                </q-form>
                                <q-card-actions
                                    class="row q-pa-md"
                                    align="right"
                                >
                                    <q-btn
                                        style="
                                            background-color: #e4e6eb;
                                            color: #4b4f56;
                                        "
                                        label="İptal"
                                        @click="isForgetPwd = false"
                                    />
                                    <q-btn
                                        :label="this.$gl('Gönder', 'Send')"
                                        @click="btnSendPwd()"
                                        color="primary"
                                    />
                                </q-card-actions>
                            </q-card-section>
                        </q-card-section>
                    </q-card>
                </q-page>
            </q-page-container>

            <q-footer class="row" style="background-color: #f0f2f5">
                <l-space />
                <l-chip color="#d0bfa1" square dense outline>{{
                    dv.product_LICENCE
                }}</l-chip>
            </q-footer>
        </q-layout>
    </div>
</template>

<script>

import {
    goToWebSite,
    fetchProjectUrl,
    btnSendPwd,
    btnLogin,
    mountedFunc,
} from "./erpLogin-functions";
export default {
    data() {
        return {
            dv: {
                sys_userVmail: "",
                sys_user: "",
                sys_email: "",
                password: "",

                passwordHashed: "",
                isPwd: true,
                sys_token: "",
                sys_loginDate: "",
                sys_dataBase: "lisdb",
                showLogo: true,
                url: "",
                apiurl: "",
                isShowDatabase: false,
                product_LICENCE: "",
            },
            
            
            isForgetPwd: false,
        };
    },

    async mounted() {
        this.dv = await mountedFunc(this.dv);
    },

    methods: {
        mountedFunc,
        goToWebSite,
        fetchProjectUrl,
        btnSendPwd,
        btnLogin,
    },
};
</script>
<style type="text/css">
.bgimgX {
    background-image: url("../assets/bgImage.png");
}
.bgmobileX {
    background-image: url("../assets/bgMobile.jpg");
}

.bgimg {
    background-color: #f0f2f5;
}
.bgmobile {
    background-color: #f0f2f5;
}
</style>
