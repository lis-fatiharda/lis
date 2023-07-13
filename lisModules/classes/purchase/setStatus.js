export default async function updRefDocument(plispurdocs) {
  console.log("**********************set statussss****");

  // Set item status
  for (let i in plispurdocs.items) {
    if (plispurdocs.items[i].pquantity == 0) {
      plispurdocs.items[i].stat = 0;
    } else {
      if (plispurdocs.items[i].pquantity < plispurdocs.items[i].quantity) {
        plispurdocs.items[i].stat = 1;
      } else {
        plispurdocs.items[i].stat = 2;
      }
    }
  }

  let isOpen = 0;
  let isPartial = 0;
  let isClosed = 0;

  for (let i in plispurdocs.items) {
    // Set item status
    if (plispurdocs.items[i].stat == 0) isOpen++;
    if (plispurdocs.items[i].stat == 1) isPartial++;
    if (plispurdocs.items[i].stat == 2) isClosed++;
  }

  if ((isOpen > 0) & (isClosed == 0) & (isPartial == 0)) {
    plispurdocs.docstat = 0;
  } else {
    if ((isOpen == 0) & (isClosed > 0) & (isPartial == 0)) {
      plispurdocs.docstat = 2;
    } else {
      plispurdocs.docstat = 1;
    }
  }

  return plispurdocs;
};
