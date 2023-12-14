<template>
    <l-div>
        <!--Tittle Layer-->

        <l-card0>
            <l-toolbar :class="`bg-${tabInfo.moduleColor}`">
                <l-toolbar>
                    <l-icon size="md" name="assignment_ind" />

                    <l-toolbar-title>Proje Detayı</l-toolbar-title>

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
                    label="WS Metodu"
                    v-model="dv.liswebservices.wsmethod"
                    class="bg-blue-1"
                />

                <l-input
                    label="Lis Fonksiyonu"
                    v-model="dv.liswebservices.lisfunction"
                />

                <l-input
                    label="IP Sınırla"
                    v-model="dv.liswebservices.ip"
                />

                <l-checkbox
                    label="Blokeli"
                    v-model="dv.liswebservices.isblocked"
                />
                <l-checkbox
                    label="Silindi"
                    v-model="dv.liswebservices._deleted"
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
                company: this.dv.liswebservices.code,
                lid: "WSRT01",
                lockkey: this.dv.liswebservices.name,
            },
        };
    },

    methods: {
        async btnSave() {
            await this.lis.function("WSRT01/02-btnSave", this.dv);

            this.cancel();
        },

        async cancel() {
            console.log("Cancel");
            this.tabInfo.blockGoToTransaction = false;
            this.dv.lisDialog = "WSRT01D01";
            this.dv.liswebservices = [];
        },
        async pushNewBank() {
            let newBank = { ...this.dv.liswebservices.custbanks[0] };
            console.log(newBank);
            for (let i in newBank) {
                newBank[i] = "";
            }

            this.dv.sc.isCustomer.custbanks.push(newBank);
        },
        async pushNewAddress() {
            let newAddress = { ...this.dv.liswebservices.custaddress[0] };

            for (let i in newAddress) {
                newAddress[i] = "";
            }
            newAddress._id = undefined;
            newAddress.adrnum =
                this.dv.liswebservices.custaddress[
                    this.dv.liswebservices.custaddress.length - 1
                ].adrnum + 1;

            this.dv.liswebservices.custaddress.push(newAddress);
        },

        async pushNewNote() {
            let newNote = { ...this.dv.liswebservices.custnotes[0] };

            for (let i in newNote) {
                newNote[i] = "";
            }

            newNote._id = undefined;
            this.dv.liswebservices.custnotes.push(newNote);
        },

        async pushNewPer() {
            let newPer = { ...this.dv.liswebservices.custper[0] };

            for (let i in newPer) {
                newPer[i] = "";
            }

            this.dv.liswebservices.custper.push(newPer);
        },

        async removeBank(bank) {
            this.dv.liswebservices.custbanks = [
                ...this.dv.liswebservices.custbanks.filter(
                    (e) => !((e._id == bank._id) & (e.banknum == bank.banknum))
                ),
            ];
        },
        async removeAddress(adr) {
            this.dv.liswebservices.custaddress = [
                ...this.dv.liswebservices.custaddress.filter(
                    (e) =>
                        !(
                            (e._id == adr._id) &
                            (e.addressname == adr.addressname)
                        )
                ),
            ];
        },
        async removeNote(note) {
            this.dv.liswebservices.custnotes = [
                ...this.dv.liswebservices.custnotes.filter(
                    (e) =>
                        !((e._id == note._id) & (e.notetitle == note.notetitle))
                ),
            ];
        },
        async removePer(per) {
            this.dv.liswebservices.custper = [
                ...this.dv.liswebservices.custper.filter(
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
