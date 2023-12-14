<template>
    <card id="BAST02D01PDF" style="padding: 0">
        <l-div-flex>


            <l-div>
                <div class="text-h6 row">CARİ KARTLAR RAPORU</div>
                <div class="text-caption">Firma: {{ dv.sc.company }}</div>
                <div class="text-caption">Tarih: {{ lis.format(new Date(), "dd.MM.yyyy") }}</div>

            </l-div>

            <l-space />
            <q-img src="../../../../configs/assets/lisOrg.jpg" style="width: 100px" />
        </l-div-flex>

        <div style="padding: 0">
            <q-markup-table dense flat bordered>
                <thead>
                    <tr>
                        <th></th>
                        <th>Cari Kodu</th>
                        <th>Cari Adı</th>
                        <th>Cari Tipi</th>
                        <th>Sektör</th>
                        <th>Ülke</th>
                        <th>Şehir</th>
                        <th>Vergi Dairesi</th>
                        <th>Vergi Numarası</th>
                        <th>Tel.Num.</th>
                        <th>Fax.Num.</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in dv.lisCustomerList" :key="index">
                        <div v-if="index == 31" id="page_break"></div>

                        <td style="font-size: 10px">
                            {{ index + 1 }}
                        </td>

                        <td style="font-size: 10px">
                            {{ item.customer }}
                        </td>
                        <td style="font-size: 10px">
                            {{ item.name1 }}
                        </td>
                        <td style="font-size: 10px">
                            {{ item.custorvend == 0 ? "Aday" : item.custorvend == 1 ? "Müşteri" : "Tedarikçi" }}
                        </td>
                        <td style="font-size: 10px">
                            {{ item.sector }}
                        </td>
                        <td style="font-size: 10px">
                            {{ item.country }}
                        </td>
                        <td style="font-size: 10px">
                            {{ item.city }}
                        </td>
                        <td style="font-size: 10px">
                            {{ item.taxdept }}
                        </td>
                        <td style="font-size: 10px">
                            {{ item.taxnum }}
                        </td>
                        <td style="font-size: 10px">
                            {{ item.telnum }}
                        </td>
                        <td style="font-size: 10px">
                            {{ item.faxnum }}
                        </td>

                    </tr>
                </tbody>
            </q-markup-table>
        </div>

        <template class="footer">
            <div>
                footer
                <l-chip dense outline>Tarih:
                    {{ lis.format(new Date(), "dd.MM.yyyy HH:ss") }}</l-chip>
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

form>h2 {
    color: #0094ff;
}

form>p:first-child {
    font-size: xx-small;
}
</style>
