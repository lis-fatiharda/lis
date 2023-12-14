// This function is logout

export default async function btnLogout(dv) {
    await lisuserlogins.deleteMany({
        token: dv.token,
    });
    await lislocks.deleteMany({
        createdby: dv.username,
    });

    return dv;
}
