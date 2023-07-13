<template>
    <l-doct02d01
            :pCompany="dv.lispurdocs.company"
            :pDoctype="'PURT01'"
            :pDocnum="dv.lispurdocs.doctype + dv.lispurdocs.docnum"
            :numRange="'custDocs'"
            :modi="dv.modi"
          />
</template>

<script>
export default {
    props: ["dv", "tabInfo"],

    methods: {},
};
</script>
