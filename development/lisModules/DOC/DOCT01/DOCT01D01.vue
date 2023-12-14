:
<template>
  <div>
    <l-div>
      <l-card>
        <l-toolbar :class="`bg-${tabInfo.moduleColor}`">
          <l-icon size="md" name="assignment_ind" />

          <l-toolbar-title>{{
            this.$gl("Döküman Yönetimi", "Document Management")
          }}</l-toolbar-title>

          <l-btn
            flat
            round
            dense
            icon="cancel"
            class="bg-danger"
            color="red-9"
            @click="this.$btnGoHome(tabInfo)"
          />
        </l-toolbar>

        <l-div-flex>
          <l-select
            :label="this.$gl(`Firma`, `Company`)"
            v-model="dv.sc.company"
            options="lisbas001"
            optValue="company"
            optTitle="stext"
            optCaptions="company"
            width="120px"
          />
          <l-select
            :label="this.$gl(`Belge Tipi`, `Document Type`)"
            v-model="dv.sc.doctype"
            options="lisdoc001"
            optValue="doctype"
            optTitle="stext"
            optCaptions="doctype"
            width="180px"
          />

          <l-input
            
            dense
            v-model="dv.sc.docnum"
            :label="this.$gl(`Belge No`, `Document No`)"
          />
        </l-div-flex>
      </l-card>
      <l-div>
        <l-btn-group>
          <l-btn color="warning"  icon="search" @click="btnSearch()" />
        </l-btn-group>
      </l-div>
      <template
        v-for="doc in dv.lisdocdocsList"
        :key="doc"
        class="q-pa-md q-gutter-md"
      >
        <q-list>
          <q-expansion-item
            icon="folder"
            :label="doc.name"
            :caption="doc.doctype + '-' + doc.docnum"
            class="bg-brown-1"
          >
            <l-separator />
            <l-card>
              <template v-for="item in doc.items" :key="item">
                <l-card-section
                  @click="selectedRow = item._id"
                  :class="selectedRow == item._id ? 'bg-blue-1' : 'bg-white'"
                >
                  <l-icon name="description" color="orange" />
                  {{ item.stext }}
                  <l-chip
                    clickable
                    color="teal-3"
                    class="text-white"
                    icon="download"
                    @click="btnDownload(item)"
                  />
                </l-card-section>
              </template>
            </l-card>
          </q-expansion-item>
          <l-scroller
            :position="'bottom-right'"
            :icon="'keyboard_arrow_up'"
            :color="'accent'"
          />
        </q-list>
      </template>
    </l-div>
  </div>
</template>

<script>
export default {
  props: ["tabInfo"],
  data() {
    return {
      dv: {
        modi: 1,
        lisdocdocsList: [],
        sc: {
          company: "01",
          companyOpts: [],
          doctype: null,
          doctypeOpts: [],
          docnum: "",
        },
      },
      selectedRow: "",
    };
  },
  methods: {
    async btnDownload(item) {
      docDownload(item.stext, item.path);
    },
    async btnSearch() {
      this.dv = await this.lis.function("DOCT01/01-btnSearch", this.dv);
      // this.$Axios.post("DOCT01/01-btnSearch", this.dv).then((res) => {
      //   this.dv.lisdocdocsList = res.data;
      // });
    },
    async init() {
      this.dv = await this.lis.function("DOCT01/01-init", this.dv);
    },
  },
  async mounted() {
    this.init();
  },
};
</script>
