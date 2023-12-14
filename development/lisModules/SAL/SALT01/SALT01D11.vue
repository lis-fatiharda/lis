<template>
    <l-doct02d01
        :pCompany="dv.lissaldocs.company"
        :pDoctype="'SALT01'"
        :pDocnum="dv.lissaldocs.doctype + dv.lissaldocs.docnum"
        :numRange="'custDocs'"
        :modi="dv.modi"
    />
</template>

<script>
export default {
    props: ["dv", "tabInfo"],
};
</script>
