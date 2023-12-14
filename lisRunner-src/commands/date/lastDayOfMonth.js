import { lastDayOfMonth } from "date-fns";

export default function (pdate) {
    if (pdate == undefined) {
        pdate = new Date();
    }
    return lastDayOfMonth(new Date(pdate));
}
