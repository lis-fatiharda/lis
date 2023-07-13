<template>
    <template v-for="note in dv.lispurdocs.notes" :key="note.id">
        <l-card class="q-gutter-xs q-pa-xs">
            <l-input
                :label="this.$gl(`Not Başlığı`, `Note Title`)"
                v-model="note.notetitle"
                
                dense
                class="bg-amber-1"
            />
            <l-input
                type="textarea"
                label="Not"
                v-model="note.note"
                
                dense
                autogrow
            />
            <l-chip
                dense
                justify="right"
                icon="cancel"
                clickable
                rounded
                glossy
                color="negative"
                text-color="white"
                @click="removeNote(note)"
                >{{ this.$gl("Sil", "Delete") }}</l-chip
            >
        </l-card>
    </template>
    <l-chip
        dense
        justify="right"
        icon="add"
        clickable
        rounded
        glossy
        color="secondary"
        text-color="white"
        @click="pushNewNote()"
        >{{ this.$gl("Not Ekle", "Add Note") }}</l-chip
    >
</template>

<script>
export default {
    props: ["dv", "tabInfo"],

    methods: {
        async pushNewNote() {
            let newNote = { ...this.dv.lispurdocs.notes[0] };

            for (let i in newNote) {
                newNote[i] = "";
            }

            this.dv.lispurdocs.notes.push(newNote);
        },
        async removeNote(note) {
            this.dv.lispurdocs.notes = [
                ...this.dv.lispurdocs.notes.filter(
                    (e) =>
                        !((e._id == note._id) & (e.notetitle == note.notetitle))
                ),
            ];
        },
    },
};
</script>
