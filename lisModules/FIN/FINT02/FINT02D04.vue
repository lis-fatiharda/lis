<template>
    <l-div-flex>
        <l-card style="width: 49%; min-width: 320px">
            <div class="text-overline q-pa-xs">
                {{ this.$gl("Referans Bilgileri", "Reference Information") }}
            </div>
            <l-separator inset />
            <l-card-section class="q-gutter-xs">
                <l-div-flex>
                    <l-input
                        label="Harici Belge Tipi"
                        v-model="dv.lisfindocs.extdoctype"
                    />
                    <l-input
                        label="Harici Belge No"
                        v-model="dv.lisfindocs.extdocnum"
                    />
                </l-div-flex>

                <l-div-flex>
                    <l-input
                        label="Satınalma Belgesi Tipi"
                        v-model="dv.lisfindocs.purdoctype"
                    />
                    <l-input
                        label="Satınalma Belgesi No"
                        v-model="dv.lisfindocs.purdocnum"
                    />
                </l-div-flex>

                <l-div-flex>
                    <l-input
                        label="Satış Belgesi Tipi"
                        v-model="dv.lisfindocs.saldoctype"
                    />
                    <l-input
                        label="Satış Belgesi No"
                        v-model="dv.lisfindocs.saldocnum"
                    />
                </l-div-flex>

                <l-div-flex>
                    <l-input
                        label="Envanter Belge Tipi"
                        v-model="dv.lisfindocs.invdoctype"
                    />
                    <l-input
                        label="Envanter Belge No"
                        v-model="dv.lisfindocs.invdocnum"
                    />
                </l-div-flex>

                <l-div-flex>
                    <l-input
                        label="Üretim Belge Tipi"
                        v-model="dv.lisfindocs.prddoctype"
                    />
                    <l-input
                        label="Üretim Belge No"
                        v-model="dv.lisfindocs.prddocnum"
                    />
                </l-div-flex>

                <l-div-flex>
                    <l-input
                        label="Demirbaş Belge Tipi"
                        v-model="dv.lisfindocs.astdoctype"
                    />
                    <l-input
                        label="Demirbaş Belge No"
                        v-model="dv.lisfindocs.astdocnum"
                    />
                </l-div-flex>

                <l-div-flex>
                    <l-input
                        label="IK Belge Tipi"
                        v-model="dv.lisfindocs.hcmdoctype"
                    />
                    <l-input
                        label="IK Belge No"
                        v-model="dv.lisfindocs.hcmdocnum"
                    />
                </l-div-flex>
            </l-card-section>
        </l-card>

        <l-card style="width: 49%; min-width: 320px">
            <l-div>
                <l-div-flex>
                    {{ this.$gl("Onay", "Approve") }}

                    <l-space />

                    <l-chip
                        v-if="dv.modi == 1"
                        :label="this.$gl(`İmza`, `Signature`)"
                        clickable
                        outline
                        icon="edit"
                        color="negative"
                        text-color="white"
                        @click="signDocument()"
                    />
                </l-div-flex>
                <l-separator inset />
                <l-table
                    v-model="dv.lisfindocs.signstat"
                    :columns="myColumnsSign"
                    :readonly="true"
                    :summary="false"
                />
            </l-div>
        </l-card>
        
        <l-card style="width: 49%; min-width: 320px">
            <div class="text-overline q-pa-xs">
                {{ this.$gl("Finans Bilgisi", "Financial Information") }}
            </div>
            <l-separator inset />
            <l-card-section class="row q-gutter-xs"> </l-card-section>
        </l-card>
        <!-- / -->
        <l-card style="width: 49%; min-width: 320px">
            <div class="text-overline q-pa-xs">
                {{ this.$gl("Müşteri Bilgisi", "Customer Information") }}
            </div>
            <l-separator inset />
            <l-card-section class="row q-gutter-xs"> </l-card-section>
        </l-card>
        
        <!-- / -->
        <!-- <l-card style="width: 49%; min-width: 320px">
      <div class="text-overline q-pa-xs"></div>
      <l-separator inset />
      <l-card-section-flex> </l-card-section-flex>
    </l-card> -->
    </l-div-flex>
</template>

<script>
export default {
    props: ["dv", "tabInfo"],
    data() {
        return {
            myColumnsSign: [
                {
                    label: this.$gl(`Kullanıcı Adı`, `User Name`),
                    value: "username",
                    type: "string",
                },

                {
                    label: this.$gl(`Kullanıcı Grubu`, `User Group`),
                    value: "stext",
                    type: "string",
                },

                {
                    label: this.$gl(`İmza Tarihi`, `Sign Date`),
                    value: "date",
                    type: "datetime",
                },
            ],
        };
    },
    methods: {
        async signDocument() {
            this.dv.lisfindocs = await this.lis.function(
                "FINT02/signDocument",
                this.dv.lisfindocs
            );
            this.lis.alert("p", "Belge İmzalandı.");
        },
    },
};
</script>
