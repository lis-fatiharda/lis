export default async function updRefDocument(plissaldocs) {
  console.log("**********************set statussss****");

  // Set item status
  for (let i in plissaldocs.items) {
    if (plissaldocs.items[i].pquantity == 0) {
      plissaldocs.items[i].stat = 0;
    } else {
      if (plissaldocs.items[i].pquantity < plissaldocs.items[i].quantity) {
        plissaldocs.items[i].stat = 1;
      } else {
        plissaldocs.items[i].stat = 2;
      }
    }
  }

  let isOpen = 0;
  let isPartial = 0;
  let isClosed = 0;

  for (let i in plissaldocs.items) {
    // Set item status
    if (plissaldocs.items[i].stat == 0) isOpen++;
    if (plissaldocs.items[i].stat == 1) isPartial++;
    if (plissaldocs.items[i].stat == 2) isClosed++;
  }

  if ((isOpen > 0) & (isClosed == 0) & (isPartial == 0)) {
    plissaldocs.docstat = 0;
  } else {
    if ((isOpen == 0) & (isClosed > 0) & (isPartial == 0)) {
      plissaldocs.docstat = 2;
    } else {
      plissaldocs.docstat = 1;
    }
  }

  return plissaldocs;
};
