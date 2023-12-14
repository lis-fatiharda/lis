<template>
    <l-doct02d01
        :pCompany="lisfindoc.company"
        :pDoctype="'SALT01'"
        :pDocnum="lisfindoc.doctype + lisfindoc.docnum"
        :numRange="'custDocs'"
        :modi="modi"
    />
</template>

<script>
export default {
    props: ["lisfindoc", "tabInfo", "modi"],
};
</script>
