<template>
    <l-doct02d01
        :pCompany="dv.lisfindocs.company"
        :pDoctype="'SALT01'"
        :pDocnum="dv.lisfindocs.doctype + dv.lisfindocs.docnum"
        :numRange="'custDocs'"
        :modi="dv.modi"
    />
</template>

<script>
export default {
    props: ["dv", "tabInfo"],
};
</script>
