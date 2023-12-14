<template>
    <l-card style="width: 100%; min-width: 320px">
        <!-- <div class="text-overline q-pa-xs">
            {{ this.$gl("İndirimler", "Discounts") }}
        </div> -->
        <l-table
            name="SALT01D01"
            v-model="dv.lissaldocs.discount"
            :columns="myColumnsDisc"
            :width="'100%'"
            @change="calcPrice()"
        />
        <l-chip
                dense
                justify="right"
                icon="add"
                clickable
                rounded
                glossy
                color="secondary"
                text-color="white"
                @click="pushNewDiscH()"
            />
        <!-- <l-card-section class="q-gutter-xs">
            <q-markup-table @change="calcPrice()" dense separator="cell">
                <thead class="bg-grey-2">
                    <tr>
                        <th>
                            {{ this.$gl("İndirim Anahtarı", "Discount Key") }}
                        </th>
                        <th>
                            {{ this.$gl("İndirim Tipi", "Discount Type") }}
                        </th>
                        <th>
                            {{ this.$gl("İndirim Oranı", "Discount Rate") }}
                        </th>
                        <th>
                            {{ this.$gl("İndirim Tutarı", "Discount Amount") }}
                        </th>
                        <th>
                            {{
                                this.$gl(
                                    "İndirim Açıklaması",
                                    "Discount Description"
                                )
                            }}
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(disc, index) in dv.lissaldocs.discount"
                        :key="index"
                        class="q-pa-xs q-gutter-xs"
                    >
                        <td>
                            <l-select
                                v-model="dv.lissaldocs.disckey"
                                @click="fetchDiscH(index)"
                                options="lissal005"
                                optValue="disckey"
                                optTitle="stext"
                                optCaptions="disckey"
                                width="140px"
                            />
                        </td>
                        <td>
                            <l-select
                                borderless
                                dense
                                emit-value
                                map-options
                                readonly
                                v-model="disc.type"
                                width="265px"
                                :options="[
                                    {
                                        value: 0,
                                        label: this.$gl(
                                            `Net Üzerinden Yüzdesel`,
                                            `Percentage over Net`
                                        ),
                                    },
                                    {
                                        value: 1,
                                        label: this.$gl(
                                            `Brüt Üzerinden Yüzdesel`,
                                            `Percent of Gross`
                                        ),
                                    },
                                    {
                                        value: 2,
                                        label: this.$gl(`Mutlak`, `Absolute`),
                                    },
                                    {
                                        value: 3,
                                        label: this.$gl(
                                            `Birim Başına Mutlak`,
                                            `Absolute Per Unit`
                                        ),
                                    },
                                ]"
                                optValue="value"
                                optTitle="label"
                            />
                        </td>

                        <td>
                            <l-input borderless dense v-model="disc.rate" />
                        </td>
                        <td>
                            <l-input borderless dense v-model="disc.amnt" />
                        </td>
                        <td>
                            <l-input borderless dense v-model="disc.stext" />
                        </td>
                        <td>
                            <l-chip
                                icon="cancel"
                                dense
                                clickable
                                text-color="negative"
                                class="bg-white"
                                @click="removeDiscH(index)"
                            />
                        </td>
                    </tr>
                </tbody>
            </q-markup-table>

            <l-chip
                dense
                justify="right"
                icon="add"
                clickable
                rounded
                glossy
                color="secondary"
                text-color="white"
                @click="pushNewDiscH()"
            />
        </l-card-section> -->
    </l-card>
</template>

<script>
import calcPrice from "./calcPrice.js";
export default {
    props: ["dv", "tabInfo"],
    data() {
        return {
            myColumnsDisc: [
                {
                    type: "selectmenu",
                    label: this.$gl("İndirim Anahtarı", "Discount Key"),
                    value: "disckey",
                    options: "lissal005",
                    optValue: "disckey",
                    optTitles: {
                        disckey: "İndirim Anahtarı",
                        stext: "Açıklama",
                    },
                },
                {
                    label: this.$gl("İndirim Tipi", "Discount Type"),
                    value:"type",
                    type: "selectmenu",
                    options: [
                        {
                            code: 0,
                            label: this.$gl(
                                `Net Üzerinden Yüzdesel`,
                                `Percentage over Net`
                            ),
                        },
                        {
                            code: 1,
                            label: this.$gl(
                                `Brüt Üzerinden Yüzdesel`,
                                `Percent of Gross`
                            ),
                        },
                        {
                            code: 2,
                            label: this.$gl(`Mutlak`, `Absolute`),
                        },
                        {
                            code: 3,
                            label: this.$gl(
                                `Birim Başına Mutlak`,
                                `Absolute Per Unit`
                            ),
                        },
                    ],
                    
                    optTitles: {
                        disckey: "İndirim Tipi",
                        stext: "Açıklama",
                    },
                    optValue: "code",
                },

                {
                    label: this.$gl("İndirim Oranı", "Discount Rate"),
                    type: "number",
                    value: "rate",
                },
                {
                    label: this.$gl("İndirim Tutarı", "Discount Amount"),
                    type: "number",
                    value: "amnt",
                },
                {
                    label: this.$gl(
                        "İndirim Açıklaması",
                        "Discount Description"
                    ),
                    type: "string",
                    value: "stext",
                },
                // {
                //     label: this.$gl("Sil", "Delete"),
                //     value: "_deleted",
                //     type: "checkbox",
                //     click="removeDiscH(index),
                // },
            ],
        };
    },
    methods: {
        calcPrice(event) {
            this.dv.lissaldocs = calcPrice(this.dv.lissaldocs);
            console.log("burdayım");
        },
        async pushNewDiscH() {
            let myReturn = await this.lis.function(
                "SALT01/pushNewDisc",
                this.dv
            );
            this.dv.lissaldocs.discount.push(myReturn);
            // this.$Axios.post("SALT01/pushNewDisc", this.dv).then((res) => {
            //   console.log(res.data);
            //   this.dv.lissaldocs.discount.push(res.data);
            // });
            console.log("ASDASDASD");
        },
        fetchDiscH(pIndex) {
            // console.log("ASDASDASD",this.dv.lissaldocs.discount[pIndex]);
            console.log("ASDASDASD");

            var myDiscH = this.dv.discOptsH.filter((e) => {
                return (
                    (e.usage == 0) &
                    (e.disckey == this.dv.lissaldocs.discount[pIndex].disckey)
                );
            });
            this.dv.lissaldocs.discount[pIndex].type = myDiscH[0].type;
            this.dv.lissaldocs.discount[pIndex].rate = myDiscH[0].rate;
            this.dv.lissaldocs.discount[pIndex].amnt = myDiscH[0].amnt;
            this.dv.lissaldocs.discount[pIndex].stext = myDiscH[0].stext;
            this.dv.lissaldocs.discount[pIndex].isenable = myDiscH[0].isenable;
        },
        removeDiscH(index) {
            this.dv.lissaldocs.discount.splice(index, 1);
            console.log("sildim");
        },
    },
};
</script>
