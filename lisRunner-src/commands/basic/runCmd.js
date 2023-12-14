import util from 'util';
import { exec } from 'child_process';
const asyncExec = util.promisify(exec);

export default async function runCmd(Args) {

    const { stdout, stderr } = await asyncExec(Args);

    if (stderr.length > 0) {
        return stderr;
    } else {
        return stdout;
    }
}
