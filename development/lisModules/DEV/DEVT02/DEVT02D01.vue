<template>
  <div>
    <l-div>
      <!--Tittle Layer-->
      <l-card>
        <l-toolbar :class="`bg-${tabInfo.moduleColor}`">
          <l-icon size="md" name="assignment_ind" />

          <l-toolbar-title>Execute NoSQL</l-toolbar-title>

          <l-btn
            icon="cancel"
            flat
            round
            dense
            class="bg-danger"
            @click="this.$btnGoHome(tabInfo)"
          />
        </l-toolbar>
        <!--Editors Layer------>
        <div
          class="row q-pa-xs"
          v-for="editorItem in dv.editor"
          :key="editorItem.id"
        >
          <div class="col-11">
            <l-input v-model="editorItem.code" filled type="textarea" />
          </div>
          <div class="col-1 q-pa-xs">
            <l-btn
              color="negative"
              icon-right="send"
              label="Execute"
              @click="executeNoSQL(editorItem)"
            />
            <l-btn
              flat
              style="color: goldenrod"
              label="Clear"
              @click="editorItem.code = ''"
            />
            <l-btn
              flat
              style="color: #ff0080"
              icon="delete"
              @click="deleteEditor(editorItem)"
            />
          </div>

          <div>{{ editorItem.data }}</div>

          <hr />
        </div>
        <div class="row">
          <div class="col-11"></div>
          <div class="col-1">
            <l-btn
              class=""
              round
              color="secondary"
              icon="add"
              @click="pushNewEditor"
            ></l-btn>
          </div>
        </div>
      </l-card>

      <!--Table Layer---------------------------->
    </l-div>
  </div>
</template>

<script>
export default {
  props: ["tabInfo"],
  data() {
    return {
      dv: {
        editor: [{ code: "", data: [] }],
      },
    };
  },

  methods: {
    async init(prop) {
      this.dv = await this.lis.function("DEVT02/init", prop);
      // await this.$Axios
      //   .post("DEVT02/init", prop)
      //   .then((res) => {
      //     this.dv = res.data;
      //   })
      //   .catch(function (err) {
      //     console.log(err);
      //   });
    },
    async pushNewEditor() {
      this.dv.editor.push({ code: "", data: [] });
    },
    deleteEditor(prop) {
      console.log(this.dv.editor.indexOf(prop));
      this.dv.editor.splice(prop, 1);
    },
    async executeNoSQL(editorItem) {
      let myReturn = await this.lis.function("DEVT02/executeNoSQL", editorItem);
      console.log(editorItem);
      const indexOfData = this.dv.editor.indexOf(editorItem);
      this.dv.editor[indexOfData].data = [];
      this.dv.editor[indexOfData].data = myReturn.data;
      // await this.$Axios
      //   .post("DEVT02/executeNoSQL", editorItem)
      //   .then((res) => {
      //     console.log(res.data);
      //     const indexOfData = this.dv.editor.indexOf(editorItem);
      //     this.dv.editor[indexOfData].data = [];
      //     this.dv.editor[indexOfData].data = res.data.data;
      //   })
      //   .catch(function (err) {
      //     console.log(err);
      //   });
    },
  },
  mounted() {
    this.init(this.dv);
    console.log("mounted worked");
  },
};
</script>
