<template>
  <l-doct02d01
    :pCompany="dv.lisbomdocs.company"
    :pDoctype="'SALT01'"
    :pDocnum="dv.lisbomdocs.doctype + dv.lisbomdocs.docnum"
    :numRange="'custDocs'"
    :modi="dv.modi"
  />
</template>

<script>
export default {
  props: ["dv", "tabInfo"],
};
</script>
