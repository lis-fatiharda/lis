export default async function removeDeletedItems(plissaldocs) {
  
  plissaldocs.items = plissaldocs.items.filter((e) => {
    return e.material != '' & e.material != null & e.material != undefined;
  });

  return plissaldocs;
};
