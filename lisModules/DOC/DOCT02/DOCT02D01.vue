<template>
  <div class="q-gutter-xs row">
    <l-card
      v-for="(doc, docIndex) in documents"
      :key="doc.id"
      class="row q-gutter-xs q-pa-xs"
      style="min-with: 320px; width: 30%"
    >
      <l-input
        :label="this.$gl(`Klasör İsmi`, `Folder Name`)"
        v-model="doc.name"
        
        dense
        class="bg-amber-1"
        style="width: 60%"
      />

      <q-file
        :label="this.$gl(`Ekle`, `Add`)"
        use-chips
        multiple
        filled
        
        dense
        v-model="doc.path"
        style="width: 25%"
      >
        <template v-slot:prepend>
          <l-icon name="attach_file" />
        </template>
      </q-file>
      <l-btn
        icon="upload"
        dense
        rounded
        color="primary"
        :disable="modi == 2 ? true : false"
        @click="uploadDoc(pCompany, numRange, path, doc)"
      />

      <template v-for="(item, index) in doc.items" :key="item.id" class="row">
        <l-chip
          :label="item.stext"
          rounded
          glossy
          clickable
          class="bg-blue-3"
          @dblclick="downloadDoc(item)"
        >
          <q-badge
            v-if="modi == 2 ? false : true"
            color="red"
            rounded
            dense
            floating
            @click="deleteDoc(doc, docIndex, item, index)"
          />
        </l-chip>
      </template>

      <l-input
        type="textarea"
        :label="this.$gl(`Klasör Notu`, `Folder Note`)"
        v-model="doc.note"
        
        dense
        autogrow
        style="width: 90%"
      />
      <l-checkbox
        v-model="doc._deleted"
        dense
        :label="this.$gl(`Sil`, `Delete`)"
        clickable
        rounded
        
        color="negative"
        text-color="white"
        @click="removeDoc(doc)"
        style="width: 100%"
      />
    </l-card>
  </div>
  <l-chip
    dense
    justify="right"
    icon="add"
    clickable
    rounded
    
    color="secondary"
    text-color="white"
    @click="pushNewDoc()"
    >{{ this.$gl("Klasör Ekle", "Add Folder") }}</l-chip
  >
</template>

<script>
export default {
  props: ["pCompany", "pDoctype", "pDocnum", "numRange", "modi"],
  data() {
    return {
      documents: [], 
      path: "",
    };
  },
  methods: {
    async pushNewDoc() {
      let newDoc = { ...this.documents[0] };

      for (let i in newDoc) {
        console.log(i);
        console.log(typeof newDoc[i]);

        if (typeof newDoc[i] == "string") {
          newDoc[i] = "";
        }

        if (typeof newDoc[i] == "boolean") {
          newDoc[i] = false;
        }

        if (typeof newDoc[i] == "object") {
          newDoc[i] = [];
        }
      }
      newDoc._id = undefined;
      newDoc.company = this.pCompany;
      newDoc.doctype = this.pDoctype;
      newDoc.docnum = this.pDocnum;

      this.documents.push(newDoc);
    },

    async uploadDoc(pCompany, numRange, path, doc) {
      console.log("888");
      doc = await docUpload(pCompany, numRange, path, doc);
      this.updateLisDoc(doc);
    },

    async downloadDoc(item) {
      console.log(item.stext);
      console.log(item.path);
      docDownload(item.stext, item.path);
      console.log("indi");
    },

    async updateLisDoc(doc) {
      doc = await this.lis.function("DOCT02/updateLisDoc", doc);
      
    },

    async deleteDoc(doc, docIndex, item, index) {
      this.$q
        .dialog({
          title: "LIS Digital Company",
          message: this.$gl(
            "Seçilen Dökümanı Silmek İstediğinize Emin misiniz?",
            "Are you sure you want to delete the selected document?"
          ),
          persistent: true,
          cancel: {
            label: this.$gl("Hayır", "No"),
            push: true,
            color: "negative",
          },
          ok: { label: this.$gl("Evet", "Yes"), push: true },
          focus: "none",
        })
        .onOk(async () => {
          await this.lis.function("DOCT02/docDelete", { doc, item, index });
          
        })
        .onCancel(() => {
          console.log("false");
        });
    },
  },
  async mounted() {
    this.path =
      "./docman/" +
      this.pCompany +
      "/" +
      this.pDoctype +
      "/" +
      this.pDocnum +
      "/";
    console.log("mounted");
    console.log(this.path);
    this.documents = await this.lis.function("DOCT02/init", {
      pCompany: this.pCompany,
      pDoctype: this.pDoctype,
      pDocnum: this.pDocnum,
    });
   
    if (this.documents[0].items.length == 0) {
      this.documents[0]._id = undefined;
    }

    console.log(this.documents);
   
  },
};
</script>
