
export default async function committran() {
    await global.sys_session.commitTransaction();
    await global.sys_session.endSession();
    global.sys_session = undefined;
}

