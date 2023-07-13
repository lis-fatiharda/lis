<template>
  <l-div-flex>
    <l-input label="Firma Kodu" />
    <l-input label="Müşteri Kodu" />
    <l-input label="Para Birimi" />
    <l-input label="Fatura Tipi" />
    <l-input label="Fatura No" />
  </l-div-flex>
  <l-div-flex>
    <l-btn label="Ara"/> 
  </l-div-flex>
</template>

<script>
export default {
  props: ["tabInfo"],
  components: {},

  data() {
    return {};
  },

  methods: {
    async btnSearch(prop) {
      this.dv = await this.lis.function("SALT04/01-btnSearch", prop);
    },
  },

  mounted() {},
};
</script>
