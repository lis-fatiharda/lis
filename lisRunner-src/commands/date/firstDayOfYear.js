import { startOfYear } from "date-fns";

export default function (pdate) {
    if (pdate == undefined) {
        pdate = new Date();
    }
    return startOfYear(new Date(pdate));
}
