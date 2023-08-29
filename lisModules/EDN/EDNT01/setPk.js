
export default async function btnChangePk(Args) {
    
    await lisedndocs.updateOne({_id: Args._id}, { $set: {alias: Args.pk}})
}
