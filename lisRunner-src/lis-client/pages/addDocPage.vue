<template>
    <div class="q-gutter-xs">
        <template v-for="(doc,docIndex) in documents" :key="doc.id">
            <q-card class="q-gutter-xs q-pa-xs">
                <q-input
                    label="Döküman İsmi"
                    v-model="doc.name"
                    outlined
                    dense
                    class="bg-amber-1"
                />
                <template class="row">
                    <q-file
                        label="Döküman Ekle"
                        use-chips
                        multiple
                        filled
                        outlined
                        dense
                        v-model="doc.path"
                        style="max-width: 300px"
                    >
                        <template v-slot:prepend>
                            <q-icon name="attach_file" />
                        </template>
                    </q-file>
                    <q-btn
                        icon="upload"
                        dense
                        rounded
                        @click="uploadDoc(Pcompany,numRange,path,doc)"
                    />

                    <template v-for="(upl,index) in doc.uploaded" :key="upl.id">
                        <q-chip
                            :label="upl.name"
                            rounded
                            glossy
                            clickable
                            class="bg-blue-3"
                            @dblclick="downloadDoc(upl)"
                        >
                            <q-badge
                                color="red"
                                rounded
                                dense
                                floating
                                @click="deleteDoc(upl,docIndex,index)"
                            />
                        </q-chip>
                    </template>
                </template>

                <q-input
                    type="textarea"
                    label="Dosya Notu"
                    v-model="doc.note"
                    outlined
                    dense
                    autogrow
                />
                <q-checkbox
                    v-model="doc.isdelete"
                    dense
                    label="Sil"
                    clickable
                    rounded
                    glossy
                    color="negative"
                    text-color="white"
                    @click="removeDoc(doc)"
                />
            </q-card>
        </template>
        <q-chip
            dense
            justify="right"
            icon="add"
            clickable
            rounded
            glossy
            color="secondary"
            text-color="white"
            @click="pushNewDoc()"
            >Döküman Ekle</q-chip
        >
    </div>
</template>

<script>
import docDownload from "../../../lisModules/classes/composables/docDownload";
import docUpload from "../../lisModules/classes/composables/docUpload";
export default {
    props: ["documents", "path", "numRange", "Pcompany"],
    data() {
        return {
        };
    },
    methods: {
        async pushNewDoc() {
            let newDoc = { ...this.documents[0] };

            for (let i in newDoc) {
                console.log(i)
                console.log(typeof newDoc[i])

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

            this.documents.push(newDoc);
        },

        async uploadDoc(company,numRange,path,doc) {
            console.log("888")
            doc = docUpload(company,numRange,path,doc);
        },

        async downloadDoc(upl) {
            console.log(upl.name);
            console.log(upl.serverpath);
            docDownload(upl.name, upl.serverpath);
            console.log("indi");
        },

        async deleteDoc(upl,docIndex,index) {
            this.$Axios.post("cmd-system.docDelete", upl).then((res) => {
                this.documents[docIndex].uploaded.splice(index, 1);
                this.$q.notify({
                    type: "positive",
                    message: "Döküman Kaldırıldı."
                })
            }).catch((err) => {
                console.log(err)
                this.$q.notify({
                    type: "negative",
                    message: "Döküman Sunucuda Bulunamadı!"
                })
            })
        },
    },
};
</script>
