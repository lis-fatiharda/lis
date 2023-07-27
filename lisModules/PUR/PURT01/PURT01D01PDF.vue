<template>
    <card id="PURT01D01PDF" style="padding: 0">
        <l-div-flex>
            

            <l-div>
                <div class="text-h6 row">SATIN ALMA BELGELERİ RAPORU</div>
                <div class="text-caption">Firma: {{ dv.sc.company }}</div>
                <div class="text-caption">Tarih Aralığı: {{ lis.format(dv.sc.docdate1, "dd.MM.yyyy") }} - {{ lis.format(dv.sc.docdate2, "dd.MM.yyyy") }}</div>
                
            </l-div>

            <l-space />
            <q-img
                src="../../../lisRunner/assets/lisOrg.jpg"
                style="width: 100px"
            />
        </l-div-flex>

        <div style="padding: 0">
            <q-markup-table dense flat bordered>
                <thead>
                    <tr>
                        <th></th>
                        <th>Belge Tipi</th>
                        <th>Belge No</th>
                        <th>İ.A.</th>
                        <th>Tarih</th>
                        <th>Tedarikçi Kodu</th>
                        <th>Tedarikçi Adı</th>
                        <th>Brüt</th>
                        <th>Net</th>
                        <th>Genel Toplam</th>
                        <th>P.Br.</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in dv.purDocList" :key="index">
                        <div v-if="index == 31" id="page_break"></div>

                        <td style="font-size: 10px">
                            {{ index + 1 }}
                        </td>
                        <td style="font-size: 10px">
                            {{ item.doctype }}
                        </td>
                        <td style="font-size: 10px">
                            {{ item.docnum }}
                        </td>
                        <td style="font-size: 10px">
                            {{ item.busarea }}
                        </td>
                        <td style="font-size: 10px">
                            {{
                                lis.format(
                                    new Date(item.validfrom),
                                    "dd.MM.yyyy HH:mm"
                                )
                            }}
                        </td>
                        <td style="font-size: 10px">
                            {{ item.vendor }}
                        </td>
                        <td style="font-size: 10px">
                            {{ item.name1 }}
                        </td>
                        <td style="font-size: 10px; text-align: right">
                            {{ getLocaleString(item.gross) }}
                        </td>
                        <td style="font-size: 10px; text-align: right">
                            {{ getLocaleString(item.subtotal) }}
                        </td>
                        <td style="font-size: 10px; text-align: right">
                            {{ getLocaleString(item.grandtotal) }}
                        </td>
                        <td style="font-size: 10px">
                            {{ item.currency }}
                        </td>
                    </tr>
                </tbody>
            </q-markup-table>
        </div>

        <template class="footer">
            <div>
                footer
                <l-chip dense outline
                    >Tarih:
                    {{ lis.format(new Date(), "dd.MM.yyyy HH:ss") }}</l-chip
                >
            </div>
        </template>
    </card>
</template>
<script>
export default {
    props: ["dv"],
    data() {
        return {
            dem: "deneme",
        };
    },
    methods: {
        getLocaleString(item) {
            return item.toLocaleString("tr-TR", {
                minimumFractionDigits: 2,
            });
        },
    },
};
</script>

<style lang="scss" scoped>
table {
    font-family: arial, sans-serif;

    border-collapse: collapse;
    width: 100%;
}

td,
th {
    border: 0.4px solid #dddddd;
    text-align: center;
    font-size: xx-small;
    padding: 4px;
}

tr:nth-child(even) {
    background-color: #dddddd;
}
form > h2 {
    color: #0094ff;
}
form > p:first-child {
    font-size: xx-small;
}
</style>
