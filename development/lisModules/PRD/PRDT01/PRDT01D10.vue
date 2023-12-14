<template>
    <l-doct02d01
        :pCompany="dv.lisprddocs.company"
        :pDoctype="'SALT01'"
        :pDocnum="dv.lisprddocs.doctype + dv.lisprddocs.docnum"
        :numRange="'custDocs'"
        :modi="dv.modi"
    />
</template>

<script>
export default {
    props: ["dv", "tabInfo"],
};
</script>
