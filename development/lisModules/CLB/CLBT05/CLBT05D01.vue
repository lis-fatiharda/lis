<template>
    <q-bar>
        <l-icon size="md" name="list_alt" />

        <l-toolbar-title>{{
            this.$gl("Notlarım", "My Notes")
        }}</l-toolbar-title>

        <l-btn
            icon="delete"
            flat
            round
            dense
            color="purple"
            @click="btnClearLocalStorage()"
        >
            <l-tooltip>Temizle</l-tooltip></l-btn
        >

        <l-btn icon="save" flat round dense color="positive" @click="btnSave()">
            <l-tooltip>Değişiklikleri Kaydet</l-tooltip></l-btn
        >

        <l-btn
            v-if="isDialog != true"
            icon="cancel"
            flat
            round
            dense
            color="negative"
            @click="this.$btnGoHome(tabInfo)"
        />

        <l-btn
            v-if="isDialog == true"
            icon="cancel"
            flat
            round
            dense
            color="negative"
            @click="this.$emit('cancel', true)"
        />
    </q-bar>
    <l-div>
        <l-div-flex>
            <q-card
                v-for="(note, index) in lis_notes.notes"
                :class="`cursor-pointer`"
                flat
                bordered
                style="width: 280px; max-height: 320px:"
                :key="note"
                @click="
                    isShowNote = true;
                    selectedNote = index;
                "
            >
                <q-card-section :style="`backgroundColor: ${note.color};`">
                    <div class="text-h5 text-orange-9">{{ note.title }}</div>
                    <q-scroll-area style="height: 200px; width: 270px">
                        <div class="text-caption text-grey">
                            {{ note.note }}
                        </div>
                    </q-scroll-area>
                </q-card-section>

                <q-separator />

                <q-card-actions class="q-pa-xs">
                    <div class="text-overline">
                        {{ lis.format(note.date, "dd.MM.yyyy HH:mm") }}
                    </div>

                    <q-space />

                    <q-btn
                        color="negative"
                        round
                        flat
                        dense
                        icon="delete"
                        @click="deleteNote(index)"
                    />
                </q-card-actions>
            </q-card>
        </l-div-flex>

        <l-btn flat icon="add" color="primary" @click="pushNewNote()" />
    </l-div>

    <l-dialog-small v-if="isShowNote == true" v-model="isShowNote">
        <q-bar @change="lis_notes.notes[selectedNote].date = new Date()">
            <q-input
                dense
                v-model="lis_notes.notes[selectedNote].title"
                borderless
                style="width: 90%"
                placeholder="Başlık"
                
            />
            <l-space />

            <div class="q-pa-xs">
                <q-badge
                    outline
                    :style="`backgroundColor: ${lis_notes.notes[selectedNote]?.color}`"
                    text-color="black cursor-pointer"
                    class="q-mb-sm"
                >
                    Not Rengi
                    <q-popup-proxy>
                        <q-color
                            v-model="lis_notes.notes[selectedNote].color"
                            no-header
                            no-footer
                            default-view="palette"
                            class="my-picker"
                        />
                    </q-popup-proxy>
                </q-badge>
            </div>

            <l-btn
                color="negative"
                round
                flat
                dense
                icon="cancel"
                v-close-popup
            />
        </q-bar>

        <q-card
            flat
            class="cursor-pointer"
            :style="`width: 500px; backgroundColor: ${lis_notes.notes[selectedNote]?.color}`"
        >
            <l-div
                :style="`backgroundColor: ${lis_notes.notes[selectedNote].color}`"
            >
                <q-input
                    @change="lis_notes.notes[selectedNote].date = new Date()"
                    borderless
                    placeholder="Not"
                    v-model="lis_notes.notes[selectedNote].note"
                    autogrow
                    :style="`backgroundColor: ${lis_notes.notes[selectedNote]?.color}`"
                />
            </l-div>

            <q-separator />

            <q-card-actions class="q-pa-xs">
                <div class="text-caption">
                        {{
                        lis.format(
                            lis_notes.notes[selectedNote].date,
                            "dd.MM.yyyy HH:mm"
                        )
                    }}
                    
                </div>

                <q-space />

                <q-btn
                    color="negative"
                    round
                    flat
                    dense
                    icon="delete"
                    @click="deleteNote(selectedNote)"
                />
            </q-card-actions>
        </q-card>
    </l-dialog-small>
</template>

<script>
export default {
    props: ["isDialog", "tabInfo"],
    data() {
        return {
            isShowNote: false,
            selectedNote: 0,

            lis_notes: {
                notes: [],
            },
        };
    },

    methods: {
        deleteNote(pIndex) {
            this.isShowNote = false;
            this.selectedNote = 1;
            this.lis_notes.notes.splice(pIndex, 1);
        },
        init() {
            if (localStorage?.lis_notes == undefined) {
                this.pushNewNote();
            } else {
                this.lis_notes = JSON.parse(localStorage.getItem("lis_notes"));
            }
        },
        pushNewNote() {
            console.log("pushNewNote")
            this.lis_notes.notes.push({
                title: "Başlık",
                note: "",
                date: new Date(),
                color: "#fff",
            });
        },
        btnClearLocalStorage() {
            delete localStorage.lis_notes;
            this.lis_notes.notes= [];
            this.init();
        },
        btnSave() {
            localStorage.setItem("lis_notes", JSON.stringify(this.lis_notes));
        },
    },

    mounted() {
        this.init();
    },

    beforeUnmount() {
        this.btnSave();
    },
};
</script>
