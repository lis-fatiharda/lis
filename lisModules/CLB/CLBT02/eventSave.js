export default async function eventAddtoDb(dv) {
  let myEvent = dv.event;
  if (dv.modi == 0) {
    const olisagendas = new lisagendas({
      groupId: myEvent.groupId,
      title: myEvent.title,
      start: myEvent.start,
      end: myEvent.end,
      allDay: dv.allDay,
      backgroundColor: myEvent.backgroundColor,
      textColor: myEvent.textColor,
      borderColor: myEvent.borderColor,
      // extendedProps

      _id: undefined,
      eventnum: myEvent.id,
      company: myEvent.extendedProps.company,
      eventtype: myEvent.extendedProps.eventtype,
      eventnum: myEvent.extendedProps.eventnum,
      team: myEvent.extendedProps.team,
      username: myEvent.extendedProps.username,
      ltext: myEvent.extendedProps.ltext,
      participants: myEvent.extendedProps.participants,
      participantsopen: myEvent.extendedProps.participantsopen,
      participantsconfirm: myEvent.extendedProps.participantsconfirm,
      participantsreject: myEvent.extendedProps.participantsreject,
      _deleted: myEvent.extendedProps._deleted,
    });

    console.log("lisagendas");
    console.log(lisagendas);

    await olisagendas
      .save()
      .then((res) => {
        console.log("lisagendas Kaydetme başrılı.");
      })
      .catch((err) => {
        console.log("hata");
        console.log(err);
        throw new Error(err);
      });
    // Setting for Participants ***
    for (let i in myEvent.extendedProps.participants) {
      let myParticipant = myEvent.extendedProps.participants[i];
      let isExists =
        myEvent.extendedProps.participantsopen.indexOf(myParticipant);
      if (isExists == -1) {
      }
    }
  } else {
    console.log("else save event");
    const olisagendas = {
      groupId: myEvent.groupId,
      title: myEvent.title,
      start: myEvent.start,
      end: myEvent.end,
      allDay: dv.allDay,
      backgroundColor: myEvent.backgroundColor,
      textColor: myEvent.textColor,
      borderColor: myEvent.borderColor,
      // extendedProps
      eventnum: myEvent.id,
      _id: myEvent.extendedProps._id,
      company: myEvent.extendedProps.company,
      eventtype: myEvent.extendedProps.eventtype,
      team: myEvent.extendedProps.team,
      username: myEvent.extendedProps.username,
      ltext: myEvent.extendedProps.ltext,
      participants: myEvent.extendedProps.participants,
      participantsopen: myEvent.extendedProps.participantsopen,
      participantsconfirm: myEvent.extendedProps.participantsconfirm,
      participantsreject: myEvent.extendedProps.participantsreject,
      _deleted: myEvent.extendedProps._deleted,
    };

    console.log(lisagendas);
    await lisagendas
      .findOneAndUpdate({ _id: lisAgenda._id }, lisagendas)
      .catch((err) => {
        console.log(err.message);
        throw new Error(err);
      });
    // Setting for Participants ***
  }
}
