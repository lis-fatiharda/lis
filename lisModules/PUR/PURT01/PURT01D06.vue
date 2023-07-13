<template>
    <l-card style="width: 100%; min-width: 320px">
        <div class="text-overline q-pa-xs">
            {{ this.$gl("İndirimler", "Discounts") }}
        </div>
        <l-card-section class="q-gutter-xs">
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
                        v-for="(disc, index) in dv.lispurdocs.discount"
                        :key="index"
                        class="q-pa-xs q-gutter-xs"
                    >
                        <td>
                            <l-select
                                v-model="dv.lispurdocs.disckey"
                                @click="fetchDiscH(index)"
                                options="lispur005"
                                optValue="disckey"
                                optTitle="stext"
                                optCaptions="disckey"
                                width="170px"
                            />
                        </td>
                        <td>
                            <l-select
                                borderless
                                width="265px"
                                map-options
                                readonly
                                v-model="disc.type"
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
        </l-card-section>
    </l-card>

    <!-- <l-card style="width: 70%; min-width: 320px">
        <l-card-section class="row q-gutter-xs"> </l-card-section>
    </l-card>
    <l-card style="width: 29%; min-width: 320px">
        <l-card-section class="row q-gutter-xs"> </l-card-section>
    </l-card> -->
</template>

<script>
import calcPrice from "./calcPrice.js";
export default {
    props: ["dv", "tabInfo"],

    methods: {
        calcPrice(event) {
            this.dv.lispurdocs = calcPrice(this.dv.lispurdocs);
        },
        async pushNewDiscH() {
            let myReturn = await this.lis.function(
                "PURT01/pushNewDisc",
                this.dv
            );
            this.dv.lispurdocs.discount.push(myReturn);
            // this.$Axios.post("PURT01/pushNewDisc", this.dv).then((res) => {
            //   console.log(res.data);
            //   this.dv.lispurdocs.discount.push(res.data);
            // });
        },
        fetchDiscH(pIndex) {
            console.log(this.dv.lispurdocs.discount[pIndex]);

            var myDiscH = this.dv.discOptsH.filter((e) => {
                return (
                    (e.usage == 0) &
                    (e.disckey == this.dv.lispurdocs.discount[pIndex].disckey)
                );
            });
            this.dv.lispurdocs.discount[pIndex].type = myDiscH[0].type;
            this.dv.lispurdocs.discount[pIndex].rate = myDiscH[0].rate;
            this.dv.lispurdocs.discount[pIndex].amnt = myDiscH[0].amnt;
            this.dv.lispurdocs.discount[pIndex].stext = myDiscH[0].stext;
            this.dv.lispurdocs.discount[pIndex].isenable = myDiscH[0].isenable;
        },
        removeDiscH(index) {
            this.dv.lispurdocs.discount.splice(index, 1);
        },
    },
};
</script>
