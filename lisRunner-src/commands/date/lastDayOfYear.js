import { startOfMonth } from "date-fns";

export default function (pdate) {
    if (pdate == undefined) {
        pdate = new Date();
    }
    return startOfMonth(new Date(pdate));
}
