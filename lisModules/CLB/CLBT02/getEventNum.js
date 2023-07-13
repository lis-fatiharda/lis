export default async function (event) {
  console.log("numarator");
  console.log(event);
  // Get Document Number**************
  event.id = await NumRange.getNewNumber({
    company: event.company,
    numrange: "CLBT02",
    manuelNumber: "",
  });
  event.eventnum = event.id;
  console.log("event.id");
  console.log(event.id);
  return event;
}
