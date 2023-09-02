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
                    v-model="dv.lisapikeys.username"
                    class="bg-blue-1"
                />

                <l-input
                    label="Api Key"
                    v-model="dv.lisapikeys.apikey"
                />

                <l-date
                    label="Gereçlilik Tarih Başlangıcı"
                    v-model="dv.lisapikeys.validfrom"
                />
                <l-date
                    label="Gereçlilik Tarih Bitişi"
                    v-model="dv.lisapikeys.validuntil"
                />

                <l-checkbox
                    label="Blokeli"
                    v-model="dv.lisapikeys.isblocked"
                />
                <l-checkbox
                    label="Silindi"
                    v-model="dv.lisapikeys._deleted"
                />
            </l-div-flex>
          
        </l-card0>

        <!-- ****************************** -->

    </l-div>
</template>

<script>
export default {
    props: ["dv", "tabInfo", "isChild"],
    data() {
        return {
        
            
            lockKeyParams: {
                company: this.dv.lisapikeys.code,
                lid: "WSRT02",
                lockkey: this.dv.lisapikeys.name,
            },
        };
    },

    methods: {
        async btnSave() {
            await this.lis.function("WSRT02/02-btnSave", this.dv);

            this.cancel();
        },

        async cancel() {
            console.log("Cancel");
            this.tabInfo.blockGoToTransaction = false;
            this.dv.lisDialog = "WSRT02D01";
            this.dv.lisapikeys = [];
        },
        async pushNewBank() {
            let newBank = { ...this.dv.lisapikeys.custbanks[0] };
            console.log(newBank);
            for (let i in newBank) {
                newBank[i] = "";
            }

            this.dv.sc.isCustomer.custbanks.push(newBank);
        },
        async pushNewAddress() {
            let newAddress = { ...this.dv.lisapikeys.custaddress[0] };

            for (let i in newAddress) {
                newAddress[i] = "";
            }
            newAddress._id = undefined;
            newAddress.adrnum =
                this.dv.lisapikeys.custaddress[
                    this.dv.lisapikeys.custaddress.length - 1
                ].adrnum + 1;

            this.dv.lisapikeys.custaddress.push(newAddress);
        },

        async pushNewNote() {
            let newNote = { ...this.dv.lisapikeys.custnotes[0] };

            for (let i in newNote) {
                newNote[i] = "";
            }

            newNote._id = undefined;
            this.dv.lisapikeys.custnotes.push(newNote);
        },

        async pushNewPer() {
            let newPer = { ...this.dv.lisapikeys.custper[0] };

            for (let i in newPer) {
                newPer[i] = "";
            }

            this.dv.lisapikeys.custper.push(newPer);
        },

        async removeBank(bank) {
            this.dv.lisapikeys.custbanks = [
                ...this.dv.lisapikeys.custbanks.filter(
                    (e) => !((e._id == bank._id) & (e.banknum == bank.banknum))
                ),
            ];
        },
        async removeAddress(adr) {
            this.dv.lisapikeys.custaddress = [
                ...this.dv.lisapikeys.custaddress.filter(
                    (e) =>
                        !(
                            (e._id == adr._id) &
                            (e.addressname == adr.addressname)
                        )
                ),
            ];
        },
        async removeNote(note) {
            this.dv.lisapikeys.custnotes = [
                ...this.dv.lisapikeys.custnotes.filter(
                    (e) =>
                        !((e._id == note._id) & (e.notetitle == note.notetitle))
                ),
            ];
        },
        async removePer(per) {
            this.dv.lisapikeys.custper = [
                ...this.dv.lisapikeys.custper.filter(
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

function data() { throw new Error('Function not implemented.'); }
