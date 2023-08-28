<template>
  <div>
    <l-div v-if="mv.lisDialog == 'LISBAS018'">
      <!--Tittle Layer-->
      <l-card0>
        <q-bar class="bg-blue-grey-3"> Destek Tablosu - lisbas018 </q-bar>
        <q-bar :class="`bg-${tabInfo.moduleColor}`">
          <l-toolbar-title>{{
            this.$gl("Malzeme Seçenekleri", "Material Options")
          }}</l-toolbar-title>
          <l-btn
            v-if="isChild != undefined"
            flat
            round
            dense
            icon="done"
            color="teal"
            @click="okC()"
          ></l-btn>
          <l-btn
            v-if="isChild != undefined"
            icon="cancel"
            flat
            round
            dense
            color="negative"
            @click="cancelC()"
          />
          <l-btn
            v-if="isChild == undefined"
            icon="cancel"
            flat
            round
            dense
            color="negative"
            @click="cancel()"
          />
        </q-bar>

        <l-div-flex>
          <l-select
            :label="this.$gl(`Firma`, `Company`)"
            v-model="mv.sc.company"
            options="lisbas001"
            optValue="company"
            optTitle="stext"
            optCaptions="company"
            width="120px"
          />
          <l-input
            :label="this.$gl(`Özellik`, `Attribute`)"
            dense
            v-model="mv.sc.attribute"
          ></l-input>

          <!-- <l-input
            :label="this.$gl(`Açıklama`, `Description`)"
            dense
            v-model="mv.sc.stext"
          ></l-input> -->
          <l-select
            v-model="mv.sc.type"
            :label="this.$gl(`Tip`, `Type`)"
            :options="[
              { label: this.$gl(`Manuel`, `Manuel`), value: 0 },
              { label: this.$gl(`Seçenek`, `Options`), value: 1 },
            ]"
            optValue="value"
            map-options
            style="width: 200px"
          />
        </l-div-flex>
      </l-card0>

      <l-btn-group>
        <l-btn color="warning" icon="search" @click="btnSearch(mv)" />
        <l-btn
          color="primary"
          icon="edit"
          @click="btnEdit(mv)"
          v-if="isChild == undefined"
        />
        <l-btn
          color="info"
          icon="visibility"
          @click="btnShow(mv)"
          v-if="isChild == undefined"
        />
        <l-btn
          color="secondary"
          icon="add"
          @click="btnInsert(mv)"
          v-if="isChild == undefined"
        />
        <l-btn
          color="negative"
          icon="delete"
          @click="btnDelete(mv)"
          v-if="isChild == undefined"
        />
      </l-btn-group>
      <!-- 
      <q-markup-table flat bordered dense class="cursor-pointer">
        <thead>
          <tr class="bg-blue-grey-2">
            <th>Özellik</th>
          </tr>
          
        </thead>
        <tbody>
          <tr v-for="item in mv.lisbas018List" :key="item"
          @click="mv.selectedRow = item._id"
                        :class="
                            mv.selectedRow == item._id
                                ? 'bg-light-blue-1'
                                : 'bg-white'
                        "
                        @dblclick="okC()">
            <td>{{ item.attribute }}</td>
          </tr>
        </tbody>
      </q-markup-table> -->

      <l-table
        name="LISBAS018"
        v-model="mv.lisbas018List"
        :columns="myColumnsBas018"
        :context="contextMenu"
        :height="'70vh'"
        :width="'100%'"
        :readonly="true"
      />
    </l-div>
    <LISBAS018D002
      :mv="mv"
      :dv="dv"
      :lv="lv"
      :tabInfo="tabInfo"
      v-if="mv.lisDialog == 'LISBAS018D002'"
    />
  </div>
</template>

<script>
import LISBAS018D002 from "./LISBAS018D002.vue";

export default {
  props: ["lv", "dv", "goToTransaction", "tabInfo", "isChild"],
  components: {
    LISBAS018D002,
  },

  inheritAttrs: false,

  data() {
    return {
      mv: {
        sc: {
          company: "01",
          attribute: "",
          type: null,
          stext: "",
          qunit: "",
          _deleted: false,
        },
        selectedRow: null,
        lisDialog: "LISBAS018",
        modi: 2,
        lisbas018List: [],
        lisbas018: {},
        myColumnsbas18items: [],
      },
      myColumnsBas018: [
        {
          label: this.$gl(`Özellik`, `Attribute`),
          value: "attribute",
          type: "string",
        },
      ],
    };
  },

  methods: {
    async btnSearch(prop) {
      this.mv = await this.lis.function(
        "BAST01/SUPS/lisbas018/01-btnSearch",
        prop
      );
    },
    async btnEdit(prop) {
      this.mv = await this.lis.function(
        "BAST01/SUPS/lisbas018/01-btnEdit",
        prop
      );
    },
    async btnShow(prop) {
      this.mv = await this.lis.function(
        "BAST01/SUPS/lisbas018/01-btnShow",
        prop
      );
    },
    async btnInsert(prop) {
      this.mv = await this.lis.function(
        "BAST01/SUPS/lisbas018/01-btnInsert",
        prop
      );
    },
    async btnDelete(prop) {
      this.mv = await this.lis.function(
        "BAST01/SUPS/lisbas018/01-btnDelete",
        prop
      );
      this.btnSearch(prop);
    },

    okC() {
      let slct = this.mv.lisbas018List.filter(
        (e) => e._id == this.mv.selectedRow
      );
      console.log("slct", slct);
      if (slct.length == 1) {
        console.log("içerdeyim");
        this.$emit("ok", slct[0]);
        console.log("slct[0]", slct[0]);
        //this.isChild = false;
      } else {
        this.lis.alert("e", "Bir Varyant Seçilmedi!");
      }
    },
    cancelC() {
      this.$emit("cancel", false);
    },

    cancel() {
      this.dv.lisDialog = "BAST01D01";
    },
  },
  mounted() {
    this.btnSearch(this.mv);
  },

  async beforeUnmount() {
    if (this.isChild == undefined) {
      await this.lis.function("cls-system.unlock", {
        company: "01",
        lid: "BAST01",
        lockkey: this.dv.olismodels[0].model,
      });
      this.tabInfo.blockGoToTransaction = false;
    }
  },
};
</script>
