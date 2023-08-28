<template>
    
    

</template>

<script>
export default {
    props: ["isDialog", "tabInfo"],
    data() {
        return {
            isShowNote: false,
            selectedNote: -1,

            lNotes: {
                notes: [],
            },
        };
    },

    methods: {
        deleteNote(pIndex) {
            this.lNotes.notes.splice(pIndex, 1);
        },
        init() {
            if (localStorage?.lNotes == undefined) {
                this.pushNewNote();
            } else {
                //this.lNotes = localStorage.lNotes;
                this.lNotes = JSON.parse(localStorage.getItem("lNotes"));
            }
        },
        pushNewNote() {
            this.lNotes.notes.push({
                title: "",
                note: "",
                date: new Date(),
            });
        },
        btnClearLocalStorage() {
            delete localStorage.lNotes;
            this.lNotes = {};
            this.init();
        },
        btnSave() {
            localStorage.setItem("lNotes", JSON.stringify(this.lNotes));
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
