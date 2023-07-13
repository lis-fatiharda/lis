export default async function removeDeletedItems(plispurdocs) {
  console.log("removeDeletedItems", plispurdocs);
  plispurdocs.items = plispurdocs.items.filter((e) => {
    return e._deleted == false;
  });

  if (plispurdocs.items.length == 0) plispurdocs._deleted = true;

  return plispurdocs;
};
