<template>
  <l-div>
    <l-input
      type="textarea"
      v-model="dv.lisbomdocs.note"
      label="Ürün Ağacı Notu"
      dense
      style="width: 1250px"
      autogrow
    />
  </l-div>
</template>

<script>
export default {
  props: ["dv", "tabInfo"],
  data() {
    return {};
  },
};
</script>

function data() { new Error('Function not implemented.'); }
