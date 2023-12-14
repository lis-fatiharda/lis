export default async function removeDeletedItems(plissaldocs) {
  
  plissaldocs.items = plissaldocs.items.filter((e) => {
    return e._deleted == false;
  });

  if (plissaldocs.items.length == 0) plissaldocs._deleted = true;

  return plissaldocs;
};
