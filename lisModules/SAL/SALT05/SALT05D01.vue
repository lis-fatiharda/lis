<template>
  <div>
    <l-div-flex>
      <l-input label="Ara" />
      <l-btn label="ara" icon="search" color="red" />
    </l-div-flex>
    <l-card-flex>
      <l-input label="Ara" />
      <l-btn label="ara" icon="search" color="red" />
    </l-card-flex>
  </div>
  <l-table name="SALT03D01" tableData="" :columns="myColumns"/>
</template>

<script>

export default {
  props: ["tabInfo","lv"],
  components: {
  },

  data() {
    return {

    }
  },

  methods: {
    async btnSearch(prop) {
      this.dv = await this.lis.function("SALT05/01-btnSearch", prop);
    },

  },

  mounted() {
  },
};
</script>
