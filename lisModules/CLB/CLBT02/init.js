export default async function getEvents(dv) {
  dv.sc.companyOpts = await lisbas001.find({ _deleted: false });

  dv.lisclb001 = await lisclb001.findOne({
    username: global.sys_user,
    _deleted: false,
  });
  if (dv.lisclb001.isselectteam == false) {
    dv.userTeam = dv.lisclb001.team;
  }
  dv.sc.eventTypeOpts = await lisclb002
    .find({
      team: dv.userTeam,
      _deleted: false,
    })
    .sort({ eventtype: 1 });
  dv.teamUsers = await lisclb001.find({ _deleted: false });

  dv.lisusers = await lisusers.find(
    {
      _deleted: false,
    },
    { username: 1, name: 1, surname: 1 }
  );

  dv.teamOpts = await lisclb001.aggregate([
    { $match: { _deleted: false } },
    {
      $group: {
        _id: "$team",
        team: { $first: "$team" },
        stext: { $first: "$stext" },
      },
    },
  ]);

  dv.events = await lisagendas.find({
    company: lis.like(dv.sc.company),
    eventtype: lis.like(dv.sc.eventType),
    username: lis.like(dv.isShowTeam),
    team: lis.like(dv.isShowTeam),
    _deleted: false,
  });
  return dv;
}
