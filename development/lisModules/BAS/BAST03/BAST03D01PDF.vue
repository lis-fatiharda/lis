<template>
    <card id="BAST03D01PDF" style="padding: 0">
        <l-div-flex>
            

            <l-div>
                <div class="text-h6 row">MALZEME KARTLARI RAPORU</div>
                <div class="text-caption">Firma: {{ dv.sc.company }}</div>
                <div class="text-caption">Tarih: {{ lis.format(new Date(), "dd.MM.yyyy") }}</div>
                
            </l-div>

            <l-space />
            <q-img
                src="../../../../configs/assets/lisOrg.jpg"
                style="width: 100px"
            />
        </l-div-flex>

        <div style="padding: 0">
            <q-markup-table dense flat bordered>
                <thead>
                    <tr>
                        <th></th>
                        <th>Malzeme</th>
                        <th>Tipi</th>
                        <th>Açıklaması</th>
                        <th>Sektör</th>
                        <th>Malzeme Grubu</th>
                        <th>Stok Birimi</th>
                        <th>Çıkış Birimi</th>
                        
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in dv.materialList" :key="index">
                        <div v-if="index == 31" id="page_break"></div>

                        <td style="font-size: 10px">
                            {{ index + 1 }}
                        </td>
                        <td style="font-size: 10px">
                            {{ item.material }}
                        </td>
                        <td style="font-size: 10px">
                            {{ item.mattype }}
                        </td>
                        <td style="font-size: 10px">
                            {{ item.stext }}
                        </td>
                        
                        <td style="font-size: 10px">
                            {{ item.sector }}
                        </td>
                        <td style="font-size: 10px">
                            {{ item.matgrp }}
                        </td>
                        <td style="font-size: 10px">
                            {{ item.skunit }}
                        </td>
                        <td style="font-size: 10px">
                            {{ item.salunit }}
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
