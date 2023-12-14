export default async function removeDeletedItems(plispurdocs) {
  
  plispurdocs.items = plispurdocs.items.filter((e) => {
    return e.material != '';
  });

  return plispurdocs;
};
