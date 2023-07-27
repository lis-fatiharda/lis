export default async function (params) {
    const lisbas017List = await lisbas017
    .findOne({
      company: params.company,
      paymcond: params.event,
      
    })
    return lisbas017List;
}
