<template>
  <div>
    <q-layout class="q-gutter-xs">
      <q-header class="bg-amber-1 text-black">
        <l-toolbar class="q-gutter-xs">
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
            :label="this.$gl(`Takım`, `Team`)"
            v-model="dv.sc.team"
            options="lisclb001"
            optValue="team"
            optTitle="stext"
            optCaptions="team"
            width="120px"
            
            :readonly="!dv.lisclb001.isselectteam"
          />
          <l-select
            :label="this.$gl(`Etkinlik Tipi`, `Event Type`)"
            v-model="dv.sc.eventtype"
            options="lisclb002"
            optValue="eventtype"
            optTitle="stext"
            optCaptions="eventtype"
            width="120px"
           
          />

          <l-space />

          <l-checkbox
            type="checkbox"
            :label="this.$gl(`Takım Ajandası`, `Team Agenda`)"
            dense
            :checked="dv.isShowTeam"
            v-model="dv.isShowTeam"
            @click="init(dv)"
          />
          <l-checkbox
            type="checkbox"
            :label="this.$gl(`Hafta Sonları`, `Weekends`)"
            dense
            :checked="options.weekends"
            v-model="options.weekends"
          />
          <l-btn
            color="negative"
            flat
            dense
            round
            icon="cancel"
            @click="this.$btnGoHome(tabInfo)"
          />
        </l-toolbar>
      </q-header>
      <q-page-container>
        <div id="calendar-container" style="height: 100%">
          <FullCalendar ref="fullCalendar" :options="options">
            <template v-slot:eventContent="arg">
              <b>{{ arg.event.extendedProps.username }}</b>
              <i>{{ arg.event.title }}</i>
            </template>
          </FullCalendar>
        </div>
        <CLBT02D02
          :selectedEvent="selectedEvent"
          :isShowDetail="isShowDetail"
          :dv="dv"
          @ok="btnOk($event)"
          @cancel="btnCancel()"
        />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import "@fullcalendar/core/vdom"; // solves problem with Vite
import "@fullcalendar/core";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import timelinePlugin from "@fullcalendar/timeline";
import CLBT02D02 from "./CLBT02D02.vue";

export default {
  props: ["lv", "tabInfo"],
  components: {
    FullCalendar,
    CLBT02D02,
  },
  data() {
    return {
      dv: {
        sc: {
          company: "01",
       
          eventType: "",
          
        },
        events: [],
        modi: 1,
        userTeam: "",
        isShowTeam: false,
        lisclb001: {},
        
        teamUsers: [],
        lisusers: [],
      },
      selectedEvent: {},
      isShowDetail: false,

      calendarApi: undefined,

      options: {
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
          listPlugin,
          timelinePlugin,
        ],
        initialDate: new Date(),
        events: this.events,
        headerToolbar: {
          left: "prev,next today",
          center: window.screen.width > 500 ? "title" : "",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
          //",listWeek,timelineWeek"
        },

        initialView: "dayGridMonth",

        windowResize: true,
        //initialEvents: this.events, // alternatively, use the `events` setting to fetch from a feed
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: false,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
        /* you can update a remote database when these fire:*/
        eventAdd: this.eventAddtoDb,
        eventChange: this.eventChangetoDb,
        eventRemove: this.eventRemovetoDb,
      },
    };
  },

  methods: {
    handleDateSelect(selectInfo) {
      console.log("handleDateSelect");
      this.selectedEvent = {
        groupId: undefined,
        id: undefined,
        title: "",
        start: selectInfo.start,
        end: selectInfo.end,
        allDay: selectInfo.allDay,
        //-Keys below are saved in extendedProps object
        company: this.scCompany,
        eventtype: this.scEventType,
        eventnum: "",
        team: this.dv.userTeam,
        username: localStorage.sys_user,
        ltext: "",
        _deleted: false,
        backgroundColor: "#99ccff",
        textColor: "#00005c",
        borderColor: "#99ccff",
        participants: [],
        participantsopen: [],
        participantsconfirm: [],
        participantsreject: [],
      };
      //-
      this.isShowDetail = !this.isShowDetail;
      //-
    },
    handleEventClick(clickInfo) {
      console.log("handleEventClick");
      this.selectedEvent.groupId = clickInfo.event.groupId;
      this.selectedEvent.id = clickInfo.event.id;
      this.selectedEvent.title = clickInfo.event.title;
      this.selectedEvent.start = clickInfo.event.start;
      this.selectedEvent.end = clickInfo.event.end;
      this.selectedEvent.allDay = clickInfo.event.allDay;

      this.selectedEvent.backgroundColor = clickInfo.event.backgroundColor;
      this.selectedEvent.textColor = clickInfo.event.textColor;
      this.selectedEvent.borderColor = clickInfo.event.borderColor;
      //- ExtendedProps
      this.selectedEvent.eventtype = clickInfo.event.extendedProps.eventtype;
      this.selectedEvent.eventnum = clickInfo.event.extendedProps.eventnum;
      this.selectedEvent.company = clickInfo.event.extendedProps.company;
      this.selectedEvent.team = clickInfo.event.extendedProps.team;
      this.selectedEvent.username = clickInfo.event.extendedProps.username;
      this.selectedEvent.ltext = clickInfo.event.extendedProps.ltext;
      this.selectedEvent._deleted = clickInfo.event.extendedProps._deleted;
      //-
      this.selectedEvent.participants =
        clickInfo.event.extendedProps.participants;
      this.selectedEvent.participantsopen =
        clickInfo.event.extendedProps.participantsopen;
      this.selectedEvent.participantsconfirm =
        clickInfo.event.extendedProps.participantsconfirm;
      this.selectedEvent.participantsreject =
        clickInfo.event.extendedProps.participantsreject;
      //-
      this.isShowDetail = !this.isShowDetail;
    },
    async btnOk(myEvent) {
      console.log("*****OK*************", myEvent);
      if (myEvent.id == undefined) {
        console.log("IFFFFFFF");
        myEvent.company = this.dv.sc.company;
        this.dv.modi = 0;
        //Get event number
        myEvent = await this.lis.function("CLBT02/getEventNum", myEvent);
        this.calendarApi.unselect();
        this.calendarApi.addEvent(myEvent); //clear date selection
        //     this.calendarApi.addEvent(myEvent);
        // await this.$Axios
        //   .post("CLBT02/getEventNum", myEvent)
        //   .then((res) => {
        //     console.log("*****res*************", res);
        //     myEvent = res.data;
        //     this.calendarApi.unselect();  clear date selection
        //     this.calendarApi.addEvent(myEvent);
        //   })
        //   .catch((err) => {
        //     console.log("*****catch*************", myEvent);
        //     this.$q.notify({
        //       type: "negative",
        //       message: this.$gl(
        //         "Etkinlik Numarası Alınamadı!",
        //         "Failed to Retrieve Event Number!"
        //       ),
        //       caption: this.$gl(
        //         "Etkinlik Kaydedilemedi!",
        //         "Failed to Save Event!"
        //       ),
        //       actions: [{ label: "X", color: "white", dense: true }],
        //     });
        //   });
      } else {
        console.log("elseeeeeeeeeee");
        this.dv.modi = 1;
        //update current event
        let eventObj = this.calendarApi.getEventById(myEvent.id);
        eventObj.setStart(new Date(myEvent.start));
        eventObj.setEnd(
          new Date(
            myEvent.end == undefined ? this.selectedEvent.end : myEvent.end
          )
        );

        eventObj.setAllDay(
          myEvent.allDay == undefined
            ? this.selectedEvent.allDay
            : myEvent.allDay
        );

        eventObj.setProp("backgroundColor", myEvent.backgroundColor);
        eventObj.setProp("textColor", myEvent.textColor);
        eventObj.setProp("borderColor", myEvent.borderColor);
        eventObj.setExtendedProp("eventtype", myEvent.eventtype);
        eventObj.setExtendedProp("_deleted", myEvent._deleted);
        eventObj.setExtendedProp("ltext", myEvent.ltext);
        eventObj.setExtendedProp("participants", myEvent.participants);
        if (myEvent._deleted == true) {
          eventObj.remove();
        }
        //eventObj.setEnd(myEvent.end);
      }
      this.isShowDetail = false;
    },
    btnCancel() {
      this.isShowDetail = false;
    },
    handleEvents(events) {
      this.currentEvents = events;
    },

    // Save To DB **** STARTS
    async eventAddtoDb(event) {
      console.log("eventAddtoDb");
      console.log(event.event);
      let myParameters = {
        event: event.event,
        modi: 0,
      };
      //***---***--- */
      myParameters.allDay =
        event.event.allDay == undefined
          ? this.selectedEvent.allDay
          : event.event.allDay;
      myParameters.end =
        event.event.end == undefined ? this.selectedEvent.end : event.event.end;
      //***---***--- */
      console.log(myParameters);
      await this.lis.function("CLBT02/eventSave", myParameters);
      // await this.$Axios.post("CLBT02/eventSave", myParameters).catch((err) => {
      //   alert(err.response.message);
      // });
    },
    async eventChangetoDb(event) {
      console.log("süperrrr");
      console.log(event);
      let myParameters = {
        event: event.event,
        modi: 1,
      };
      //***---***--- */
      myParameters.allDay =
        event.event.allDay == undefined
          ? this.selectedEvent.allDay
          : event.event.allDay;
      myParameters.end =
        event.event.end == undefined ? this.selectedEvent.end : event.event.end;
      //***---***--- */
      console.log(myParameters);
      await this.lis.function("CLBT02/eventSave", myParameters);
      // await this.$Axios.post("CLBT02/eventSave", myParameters).catch((err) => {
      //   alert(err.response.message);
      // });
    },
    async init() {
      this.dv = await this.lis.function("CLBT02/init", this.dv);
      this.options.events = this.dv.events;

      for (let i in this.dv.teamUsers) {
        console.log("e.username");
        console.log(this.dv.teamUsers[i].username);
        let myUser = this.dv.lisusers.filter(
          (k) => k.username == this.dv.teamUsers[i].username
        );
        console.log(myUser);
        this.dv.teamUsers[i].name = myUser[0].name;
        this.dv.teamUsers[i].surname = myUser[0].surname;
        this.dv.teamUsers[i].value = this.dv.teamUsers[i].username;
      }
    },
  },
  mounted() {
    this.init();
    this.calendarApi = this.$refs.fullCalendar.getApi();
    this.calendarApi.updateSize("100%");
    this.calendarApi.setOption("locale", "tr");
  },
};
</script>

<style lang="css">
#calendar-container {
  padding-top: 0em;
  padding-left: 0.5em;
  padding-right: 0.5em;
}

.fc-header-toolbar {
  /*
  the calendar will be butting up against the edges,
  but let's scoot in the header's buttons
  */
  padding-top: 0em;
  padding-left: 0.5em;
  padding-right: 0.5em;
}

@media screen and (max-width: 960px) {
  ::v-deep(.fc-header-toolbar) {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
