<template>
    <l-card style="width: 100%; min-width: 320px">
        <!-- <div class="text-overline q-pa-xs">
            {{ this.$gl("İndirimler", "Discounts") }}
        </div> -->
        <l-card-section class="q-gutter-xs">
            <l-table
            name="PURT01D01"
            :tableData="dv.lispurdocs.discount"
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
        </l-card-section>
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
