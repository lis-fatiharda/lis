<template>
    <l-div>
        <!--Tittle Layer-->

        <l-card0>
            <l-toolbar :class="`bg-${tabInfo.moduleColor}`">
                <l-toolbar>
                    <l-icon size="md" name="assignment_ind" />

                    <l-toolbar-title>Api Key Tanımlama</l-toolbar-title>

                    <l-div-flex>
                        <l-btn
                            v-if="dv.modi != 2"
                            icon="save"
                            color="teal"
                            @click="btnSave()"
                        />
                        <l-btn
                            icon="cancel"
                            color="negative"
                            @click="cancel()"
                        />
                    </l-div-flex>
                </l-toolbar>
            </l-toolbar>

            <l-div-flex>
                <!-- Detail Part-->

                <l-input
                    label="Kullanıcı Adı"
                    v-model="dv.lisapiKeys.username"
                    class="bg-blue-1"
                />

                <l-input label="Api Key" v-model="dv.lisapiKeys.apiKey" />

                <l-date
                    label="Gereçlilik Tarih Başlangıcı"
                    v-model="dv.lisapiKeys.docdate"
                />
                <l-date
                    label="Gereçlilik Tarih Bitişi"
                    v-model="dv.lisapiKeys.validuntil"
                />

                <l-checkbox label="Blokeli" v-model="dv.lisapiKeys.isblocked" />
                <l-checkbox label="Silindi" v-model="dv.lisapiKeys._deleted" />
            </l-div-flex>

            <l-table
                v-model="dv.lisapiKeys.wsmethods"
                :columns="myColumns"
                :summary="false"
                @keydown="if ($event.key == 'Insert') this.pushNewItem($event);"
            />
        </l-card0>

        <!-- ****************************** -->
    </l-div>
</template>

<script>
export default {
    props: ["dv", "tabInfo", "isChild"],
    data() {
        return {
            myColumns: [
                {
                    type: "string",
                    label: "Yetkili Olunan WS Metodları",
                    value: "wsmethod",
                },
            ],

            lockKeyParams: {
                company: this.dv.lisapiKeys.code,
                lid: "WSRT02",
                lockkey: this.dv.lisapiKeys.name,
            },
        };
    },

    methods: {
        async pushNewItem() {
            this.dv.lisapiKeys.wsmethods.push({wsmethod: ""});
        },
        async btnSave() {
            await this.lis.function("WSRT02/02-btnSave", this.dv);

            this.cancel();
        },

        async cancel() {
            console.log("Cancel");
            this.tabInfo.blockGoToTransaction = false;
            this.dv.lisDialog = "WSRT02D01";
            this.dv.lisapiKeys = [];
        },
        async pushNewBank() {
            let newBank = { ...this.dv.lisapiKeys.custbanks[0] };
            console.log(newBank);
            for (let i in newBank) {
                newBank[i] = "";
            }

            this.dv.sc.isCustomer.custbanks.push(newBank);
        },
        async pushNewAddress() {
            let newAddress = { ...this.dv.lisapiKeys.custaddress[0] };

            for (let i in newAddress) {
                newAddress[i] = "";
            }
            newAddress._id = undefined;
            newAddress.adrnum =
                this.dv.lisapiKeys.custaddress[
                    this.dv.lisapiKeys.custaddress.length - 1
                ].adrnum + 1;

            this.dv.lisapiKeys.custaddress.push(newAddress);
        },

        async pushNewNote() {
            let newNote = { ...this.dv.lisapiKeys.custnotes[0] };

            for (let i in newNote) {
                newNote[i] = "";
            }

            newNote._id = undefined;
            this.dv.lisapiKeys.custnotes.push(newNote);
        },

        async pushNewPer() {
            let newPer = { ...this.dv.lisapiKeys.custper[0] };

            for (let i in newPer) {
                newPer[i] = "";
            }

            this.dv.lisapiKeys.custper.push(newPer);
        },

        async removeBank(bank) {
            this.dv.lisapiKeys.custbanks = [
                ...this.dv.lisapiKeys.custbanks.filter(
                    (e) => !((e._id == bank._id) & (e.banknum == bank.banknum))
                ),
            ];
        },
        async removeAddress(adr) {
            this.dv.lisapiKeys.custaddress = [
                ...this.dv.lisapiKeys.custaddress.filter(
                    (e) =>
                        !(
                            (e._id == adr._id) &
                            (e.addressname == adr.addressname)
                        )
                ),
            ];
        },
        async removeNote(note) {
            this.dv.lisapiKeys.custnotes = [
                ...this.dv.lisapiKeys.custnotes.filter(
                    (e) =>
                        !((e._id == note._id) & (e.notetitle == note.notetitle))
                ),
            ];
        },
        async removePer(per) {
            this.dv.lisapiKeys.custper = [
                ...this.dv.lisapiKeys.custper.filter(
                    (e) =>
                        !(
                            (e._id == per._id) &
                            (e.name == per.name) &
                            (e.surname == per.surname)
                        )
                ),
            ];
        },
    },

    async beforeUnmount() {
        await this.lis.function("cls-system.unlock", this.lockKeyParams);
    },
};
</script>

function data() { new Error('Function not implemented.'); }
