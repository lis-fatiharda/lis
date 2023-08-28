<template>
    <l-card>
        <l-div-flex>
            <l-select
                :label="this.$gl(`Belge Tipi`, `Document Type`)"
                v-model="dv.sc.doctype"
                options="lispur001"
                optValue="doctype"
                optTitle="stext"
                optCaptions="doctype"
                width="125px"
            />

            <l-input
                
                dense
                v-model="dv.sc.docnum"
                :label="this.$gl(`Belge No`, `Document No`)"
            />

            <l-date
                v-model="dv.sc.docdate1"
                :label="this.$gl(`Teslim Tarihi Başl.`, `Delivery Date Start`)"
                style="width: 140px"
            />
            <l-date
                v-model="dv.sc.docdate2"
                :label="this.$gl(`Teslim Tarihi Bitiş`, `Delivery Date End`)"
                style="width: 140px"
            />

            <l-input
                :label="this.$gl(`Malzeme Kodu`, `Material`)"
                
                dense
                v-model="dv.sc.material"
            >
                <l-chip
                    class="bg-white"
                    icon="search"
                    dense
                    clickable
                    @click="isSelectMat = !isSelectMat"
                >
                    <BAST03D01mini
                        :pComp="dv.sc.company"
                        :isShow="isSelectMat"
                        @ok="
                            dv.sc.material = $event.material;
                            isSelectMat = false;
                        "
                        @cancel="isSelectMat = false"
                    />
                </l-chip>
            </l-input>
            <l-input
                :label="this.$gl(`Parti No`, `Batch No`)"
                
                v-model="dv.sc.name1"
                style="width: 300px"
                dense
            >
            </l-input>

            <l-date
                v-model="dv.sc.docdate1"
                :label="
                    this.$gl(
                        `Belge Geçerlilik Tarihi Başl.`,
                        `Document Effective Date Start`
                    )
                "
                style="width: 140px"
            />
            <l-date
                v-model="dv.sc.docdate2"
                :label="
                    this.$gl(
                        `Belge Geçerlilik Tarihi Bitiş`,
                        `Document Effective Date End`
                    )
                "
                style="width: 140px"
            />

            <l-btn
                icon="search"
                dense
                color="teal-2"
                @click="searchOpenItems()"
            />
            <l-space/>
            <l-btn
                :label="$gl(`Kopyala`, `Copy`)"
                dense
                color="blue-4"
                @click="copyFromOpenItems()"
            />
        </l-div-flex>
     <l-table
        v-model="openitems"
        :columns="itemsColumns"
        :readonly="true"
    />
    </l-card>
</template>

<script>
export default {
    props: ["dv", "tabInfo"],
    data() {
        return {
            isSelectMat: false,
            openitems: [],
            itemsColumns: [
                {
                    type: "string",
                    label: this.$gl("Belge Tipi", "Document Type"),
                    value: "refdoctype",
                },
                {
                    type: "string",
                    label: this.$gl("Belge No", "Document Number"),
                    value: "refdocnum",
                },
                {
                    type: "string",
                    label: this.$gl("Kalem", "Item"),
                    value: "refitemnum",
                },
                {
                    type: "selectmenu",
                    label: this.$gl("Kalem Tipi", "Item Type"),
                    value: "itemtype",
                    options: "lispur002",
                    optValue: "itemtype",
                    optTitles: {doctype: "Belge Tipi", itemtype: "Kalem Tipi", stext: "Açıklama"}
                },
                {
                    type: "zoom",
                    label: this.$gl("Malzeme Kodu", "Material"),
                    value: "material",
                },
                {
                    type: "string",
                    label: this.$gl("Malzeme Adı", "Material Name"),
                    value: "mtext",
                },
                {
                    type: "number",

                    label: this.$gl("Miktar", "Quantity"),
                    value: "quantity",
                    fraction: 3,
                },
                {
                    type: "string",
                    label: this.$gl("Miktar Br.", "Quantity Unit"),
                    value: "qunit",
                },
                {
                    type: "selectmenu",
                    label: this.$gl("Tesis", "Plant"),
                    value: "plant",
                    backgroundColor: "#fff8e1",
                    options: "lisbas002",
                    optValue: "plant",
                    optTitles: {plant: "Tesis", stext: "Açıklama"}
                },
                {
                    type: "selectmenu",
                    label: this.$gl("Depo", "Warehouse"),
                    value: "warehouse",
                    backgroundColor: "#fff8e1",
                    options: "lisinv003",
                    optValue: "warehouse",
                    optTitles: {warehouse: "Depo", stext: "Açıklama"}
                },
                {
                    type: "selectmenu",
                    label: this.$gl("Stok Yeri", "stockplace"),
                    value: "stockplace",
                    backgroundColor: "#fff8e1",
                    options: "lisinv004",
                    optValue: "stockplace",
                    optTitles: {stockplace: "Stok Yeri", stext: "Açıklama"}
                },

                {
                    type: "selectmenu",
                    label: this.$gl("Ö.St.tipi", "Special Stok"),
                    value: "specialstock",
                    options: "lisinv005",
                    optValue: "specialstock",
                    optTitles: {specialstock: "Özel Stok Tipi", stext: "Açıklama"}
                },
                {
                    type: "string",
                    label: this.$gl("Parti", "Batchnum"),
                    value: "batchnum",
                    backgroundColor: "#fff8e1",
                },

                {
                    type: "number",
                    label: this.$gl("Fiyat", "Price"),
                    value: "price",
                    _textColor: "darkblue",
                    fraction: 2,
                },
                {
                    type: "number",
                    label: this.$gl("Fiyat Br.", "Price Unt."),
                    value: "punit",
                    _textColor: "darkblue",
                },

                {
                    label: this.$gl("Brüt", "Gross"),
                    type: "number",
                    value: "gross",
                    fraction: 2,
                    backgroundColor: "#e0f2f1",
                },
                {
                    label: this.$gl("İndirim", "Discount"),
                    value: "discamnt",
                    type: "number",
                    fraction: 2,
                    backgroundColor: "#e0f2f1",
                },
                {
                    label: "Net",
                    value: "subtotal",
                    type: "number",
                    fraction: 2,
                    backgroundColor: "#e0f2f1",
                },
                {
                    label: this.$gl("KDV", "VAT"),
                    value: "vatrate",
                    type: "number",
                },
                {
                    label: this.$gl("KDV Tutarı", "VAT Amount"),
                    value: "vatamnt",
                    type: "number",
                    fraction: 2,
                    backgroundColor: "#e0f2f1",
                },
                {
                    label: this.$gl("Genel Toplam", "Grand Total"),
                    value: "grandtotal",
                    type: "number",
                    fraction: 2,
                    backgroundColor: "#e0f2f1",
                },
                {
                    label: this.$gl("Sil", "Delete"),
                    value: "_deleted",
                    type: "checkbox",
                },
            ],
        };
    },
    methods: {
        calcPrice(event) {
            this.dv.lispurdocs = calcPrice(this.dv.lispurdocs);
        },
        async searchOpenItems() {
            this.openitems = await this.lis.function(
                "PURT01/04-searchOpenItems",
                this.dv
            );
            // Clear exits openitems in the document
            for (let i in this.openitems) {
                let isexist = this.dv.lispurdocs.items.filter(
                    (e) =>
                        e.refdoctype == this.openitems[i].refdoctype &&
                        e.refdocnum == this.openitems[i].refdocnum &&
                        e.refitemnum == this.openitems[i].refitemnum
                );
                if (isexist.length > 0) {
                    this.openitems.splice(i, 1);
                }
            }
            console.log(this.openitems);
        },
        async copyFromOpenItems() {
            for (let i in this.openitems) {
                if (this.openitems[i]._selected == true) {
                    this.openitems[i].itemnum =
                        parseInt(
                            this.dv.lispurdocs.items[
                                this.dv.lispurdocs.items.length - 1
                            ].itemnum
                        ) + 10;
                    if (this.dv.lispurdocs.items[0].material == "") {
                        this.dv.lispurdocs.items[0] = this.openitems[i];
                    } else {
                        this.dv.lispurdocs.items.push(this.openitems[i]);
                    }

                    this.openitems.splice(i, 1);
                    this.calcPrice();
                }
            }
        },
    },
};
</script>
