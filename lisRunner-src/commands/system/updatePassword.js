// This function is logout

export default async function updatePassword(Args) {
    
    await lisusers.updateOne(
        {
            username: Args.email,
        },
        {
            $set: {
                password: Args.password,
            },
        }
    );

    return dv;
}
