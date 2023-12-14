<template>
  <l-dialog v-model="pIsShowDetail" persistent>
    <q-layout container class="bg-white" style="width: 1000px">
      <q-header>
        <l-toolbar>
          <l-toolbar-title>Etkinlik Kartı</l-toolbar-title>

          <l-btn icon="done" color="teal" @click="btnOk()" />

          <l-btn
            v-close-popup
            icon="close"
            color="negative"
            @click="btnCancel()"
          />
        </l-toolbar>
      </q-header>

      <q-page-container>
        <q-page class="q-gutter-xs q-pa-xs">
          <div class="row">
            <l-chip label="Firma : " color="pink-2">{{
              selectedEvent.id == undefined
                ? dv.sc.company
                : selectedEvent.company
            }}</l-chip>
            <l-chip label="ID : " color="amber-2">{{
              selectedEvent.id
            }}</l-chip>
            <l-chip color="teal-2">{{ selectedEvent.username }}</l-chip>
            <l-chip label="Ekip : " color="blue-2">{{
              selectedEvent.team
            }}</l-chip>
          </div>

          <div class="row q-gutter-xs">
            <l-select
              :label="this.$gl(`Etkinlik Tipi`, `Event Type`)"
              v-model="dv.sc.eventtype"
              options="lisclb002"
              optValue="eventtype"
              optTitle="stext"
              optCaptions="eventtype"
              width="120px"
              
              :readonly="selectedEvent.id == undefined ? false : true"
            />

            <l-input
              label="Başlık"
              v-model="selectedEvent.title"
              
              dense
              :readonly="selectedEvent.id == undefined ? false : true"
              class="bg-amber-2"
              style="width: 78%"
            />
          </div>

          <div class="row q-gutter-xs" v-if="selectedEvent.allDay == false">
            <l-datetime
              v-model="selectedEvent.start"
              :label="'Etkinlik Başlangıç'"
              style="width: 49%"
            />
            <l-datetime
              v-model="selectedEvent.end"
              :label="'Etkinlik Bitiş'"
              style="width: 49%"
            />
          </div>
          <div class="row q-gutter-xs" v-if="selectedEvent.allDay == true">
            <l-date
              v-model="selectedEvent.start"
              :label="'Etkinlik Başlangıç'"
              style="width: 49%"
            />
            <l-date
              v-model="selectedEvent.end"
              :label="'Etkinlik Bitiş'"
              style="width: 49%"
            />
          </div>

          <div class="row q-gutter-xs">
            <l-input
              label="Etkinlik Uzun Açıklama"
              v-model="selectedEvent.ltext"
              
              dense
              autogrow
              style="width: 100%"
            />

            <l-select
             
             :label="this.$gl(`Katılımcılar`, `Participants`)"
             v-model="selectedEvent.participants"
             :options="dv.teamUsers"
             @filter="filterFn"
             style="width: 250px"
             options-selected-class="text-deep-orange"
             optValue="username"
             optTitle=  '"name" + " " +  "surname"'
             optCaptions="username"
           />

            <!-- <q-select
             
              :label="this.$gl(`Katılımcılar`, `Participants`)"
             
              v-model="selectedEvent.participants"
              use-input
              use-chips
              multiple
              :options="dv.teamUsers"
              @filter="filterFn"
              style="width: 250px"
              options-selected-class="text-deep-orange"
              optValue="username"
              optTitle=  '"name" + " " +  "surname"'
              optCaptions="username"
            >
              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps">
                  <q-item-section>
                    <q-item-label>{{
                      scope.opt.name + " " + scope.opt.surname
                    }}</q-item-label>
                    <q-item-label caption>{{
                      scope.opt.username
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-select> -->
          </div>

          <div class="row q-gutter-xs">
            <l-input
              
              dense
              label="Arka Plan"
              :style="`background-color:${selectedEvent.backgroundColor}; width: 120px;`"
              v-model="selectedEvent.backgroundColor"
            >
              <template v-slot:append>
                <l-icon name="colorize" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-color v-model="selectedEvent.backgroundColor" />
                  </q-popup-proxy>
                </l-icon>
              </template>
            </l-input>

            <l-input
              
              dense
              label="Yazı"
              :style="`background-color:${selectedEvent.textColor}; width: 90px;`"
              v-model="selectedEvent.textColor"
            >
              <template v-slot:append>
                <l-icon name="colorize" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-color v-model="selectedEvent.textColor" />
                  </q-popup-proxy>
                </l-icon>
              </template>
            </l-input>

            <l-input
              
              dense
              label="Kenarlık"
              :style="`background-color:${selectedEvent.borderColor}; width: 120px;`"
              v-model="selectedEvent.borderColor"
            >
              <template v-slot:append>
                <l-icon name="colorize" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-color v-model="selectedEvent.borderColor" />
                  </q-popup-proxy>
                </l-icon>
              </template>
            </l-input>
          </div>

          <l-checkbox label="Tam Gün" v-model="selectedEvent.allDay" />
          <l-checkbox
            label="Silindi?"
            v-model="selectedEvent._deleted"
            color="pink"
          />
        </q-page>
      </q-page-container>
    </q-layout>
  </l-dialog>
</template>

<script>
export default {
  props: ["selectedEvent", "isShowDetail", "dv"],

  data() {
    return {
      filterParticipants: [],
      pIsShowDetail: false,
    };
  },
  watch: {
    isShowDetail(newValue) {
      this.pIsShowDetail = newValue;
    },
  },

  methods: {
    filterFn(val, update) {
      update(() => {
        if (val === "") {
          this.filterParticipants.value = this.dv.teamUsers;
        } else {
          const needle = val.toLowerCase();
          this.filterParticipants.value = this.dv.teamUsers.filter(
            (v) => v.name.toLowerCase().indexOf(needle) > -1
          );
        }
      });
    },

    btnOk() {
      console.log("btnOK**********");
      if (this.selectedEvent.eventtype == "") {
        this.$q.notify({
          type: "warning",
          message: this.$gl(
            "Lütfen Etkinlik Tipi Seçiniz!",
            "Please Select Event Type!"
          ),
          caption: this.$gl("Etkinlik Kaydedilemedi!", "Failed to Save Event!"),
          actions: [{ label: "X", color: "white", dense: true }],
        });
        console.log("return");
        return;
        console.log("!!!!!!!!!!");
      }
      if (this.selectedEvent.title == "") {
        this.$q.notify({
          type: "warning",
          message: this.$gl(
            "Lütfen Etkinlik Başlığı Giriniz!",
            "Please Enter Event Title!"
          ),
          caption: this.$gl("Etkinlik Kaydedilemedi!", "Failed to Save Event!"),
          actions: [{ label: "X", color: "white", dense: true }],
        });
        return;
      }
      if (this.selectedEvent.start > this.selectedEvent.end) {
        this.$q.notify({
          type: "warning",
          message: this.$gl(
            "Etkinlik Bitiş Saati, Başlangıç Saatinden Önce Olamaz!",
            "The Event End Time Cannot Be Before the Start Time!"
          ),
          caption: this.$gl("Etkinlik Kaydedilemedi!", "Failed to Save Event!"),
          actions: [{ label: "X", color: "white", dense: true }],
        });
        return;
      }
      this.$emit("ok", this.selectedEvent);
    },
    btnCancel() {
      this.$emit("cancel", this.selectedEvent);
    },
  },
};
</script>
