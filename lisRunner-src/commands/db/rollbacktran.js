export default async function rollbacktran() {
    await global.sys_session.abortTransaction();
    await global.sys_session.endSession();
    global.sys_session = undefined;
}

