export default async function (dv) {
    dv.lisDialog = "BOMT01D02";
    dv.modi = 0;
    dv.lisbomdocs = new lisbomdocs(lisbomdocs.prototype.schema.tree);

  let myActivities = new activities(activities.prototype.schema.tree);
  let myComponents = new components(components.prototype.schema.tree);

  dv.lisbomdocs.operations[0].activities = myActivities;
  dv.lisbomdocs.operations[0].components = myComponents;
  

    dv.lisbomdocs.company = dv.sc.company;

    return dv;
}
