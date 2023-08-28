<template>
    <l-dialog-small v-model="pIsShow" persistent>
        <l-div>
            <!--Tittle Layer-->
            <l-card0>
                <l-toolbar class="bg-amber-2">
                    <l-toolbar-title>Cari Kartlar</l-toolbar-title>

                    <l-btn
                        flat
                        round
                        icon="done"
                        color="teal"
                        @click="selectCustomer()"
                    >
                        <l-tooltip>
                            Seçilen Müşteri Bilgilerini Getir
                        </l-tooltip>
                    </l-btn>
                    <l-btn
                        flat
                        round
                        icon="cancel"
                        color="negative"
                        @click="cancel()"
                    />
                </l-toolbar>

                <!--Searching Criterias Layer------>
                <l-div-flex>
                    <l-select
                        :label="this.$gl(`Firma`, `Company`)"
                        v-model="dv.sc.company"
                        options="lisbas001"
                       
                        optValue="company"
            optTitle="stext"
            optCaptions="company"
                        width="120px"
                    />

                    <l-select
                        :label="this.$gl(`İş Alanı`, `Business Area`)"
                        v-model="dv.sc.busarea"
                        options="lisbas003"
                        optValue="busarea"
                        optTitle="stext"
                        optCaptions="busarea"
                        width="120px"
                    />

                    <l-input
                        label="Cari Kodu"
                        
                        v-model="dv.sc.customer"
                    >
                    </l-input>
                    <l-input
                        label="Cari Adı"
                        
                        v-model="dv.sc.name1"
                        style="width: 300px"
                    >
                    </l-input>
                    <l-select
            v-model="dv.sc.custOrVend"
            :options="[
              {label: this.$gl('Aday', `Applicant`), value: 0},
              {label: this.$gl('Müşteri', `Customer`), value: 1},
              {label: this.$gl('Tedarikçi', `Vendor`), value: 2},
              {label: this.$gl('Tümü', `All`), value: 99},
            ]"
            optValue="value"
            map-options
            :label="this.$gl(`Cari Tipi`, `Current Type`)"
            style="width: 150px"
          ></l-select>
          <l-select
            :label="this.$gl(`Sektör`, `Sector`)"
            v-model="dv.sc.sector"
            options="lisbas004"
            optValue="sector"
            optTitle="stext"
            optCaptions="sector"
            width="120px"
          />
          <l-select
            :label="this.$gl(`Ülke`, `Country`)"
            v-model="dv.sc.country"
            options="lisbas005"
            optValue="country"
            optTitle="stext"
            optCaptions="country"
            width="130px"
          />
          <l-select
            :label="this.$gl(`Şehir`, `City`)"
            v-model="dv.sc.city"
            options="lisbas006"
            optValue="city"
            optTitle="stext"
            optCaptions="city"
            width="130px"
          />

                    <l-btn
                        color="warning"
                        icon="search"
                        @click="btnSearch(dv)"
                    >
                        <l-tooltip> Ara </l-tooltip></l-btn
                    >
                </l-div-flex>

                <!--------------------------------->
            </l-card0>
            <!--Table Layer---------------------------->
            <q-markup-table flat bordered dense class="cursor-pointer">
                <thead>
                    <tr class="bg-blue-grey-2">
                        <th class="text-left"></th>
                        <th class="text-left">Cari Kodu</th>
                        <th class="text-left">Cari Adı</th>
                        <th class="text-left">Cari Tipi</th>
                        <th class="text-left">Sektör</th>
                        <th class="text-left">Ülke</th>
                        <th class="text-left">Şehir</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(item, index) in dv.lisCustomerList"
                        :key="item.id"
                        @click="dv.selectedRow = item._id"
                        :class="
                            dv.selectedRow == item._id
                                ? 'bg-light-blue-1'
                                : 'bg-white'
                        "
                        @dblclick="selectCustomer()"
                    >
                        <td>
                            <l-chip dense :label="index + 1" rounded glossy />
                        </td>
                        <td class="text-left">{{ item.customer }}</td>
                        <td class="text-left">{{ item.name1 }}</td>
                        <td class="text-left">{{ item.custorvend }}</td>
                        <td class="text-left">{{ item.sector }}</td>
                        <td class="text-left">{{ item.country }}</td>
                        <td class="text-left">{{ item.city }}</td>
                    </tr>
                </tbody>
            </q-markup-table>
        </l-div>
    </l-dialog-small>
</template>

<script>
export default {
    props: ["isShow", "pComp"],

    data() {
        return {
            pIsShow: this.isShow,
            dv: {
                sc: {
                    company: "01",
                    busarea: "S",
                    sector: "",
                    country: "",
                    city: "",
                    customer: "",
                    name1: "",
                    taxDept: "",
                    taxNum: "",
                    custOrVend: 99,
                },

                lisCustomerList: [],
                lisCustomer: {},
                selectedRow: "",
            },
        };
    },

    watch: {
        isShow(newValue) {
            this.pIsShow = newValue;
        },
    },

    methods: {
        async btnSearch(prop) {
            this.dv = await this.lis.function("BAST02/01-btnSearch", prop);
        },
        async selectCustomer() {
            this.dv.lisCustomerList = this.dv.lisCustomerList.filter(
                (e) => e._id == this.dv.selectedRow
            );
            if (this.dv.lisCustomerList.length == 1) {
                this.dv.lisCustomer = this.dv.lisCustomerList[0];
                this.$emit("ok", this.dv.lisCustomer);
            } else {
                this.lis.alert("e", "Bir Cari Kart Seçilmedi!");
                this.$emit("ok", undefined);
            }
        },
        cancel() {
            this.$emit("cancel", false);
        },
    },

    async mounted() {
        await this.$Axios
            .post("BAST02/01-init", this.dv)
            .then((res) => {
                this.dv = res.data;
            })
            .catch(function (err) {
                console.log(err);
            });
    },
};
</script>
