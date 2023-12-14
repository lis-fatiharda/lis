import mongoose from 'mongoose';

export default async function beginTran() {
    global.sys_session = await mongoose.startSession();
    await global.sys_session.startTransaction();
} 

