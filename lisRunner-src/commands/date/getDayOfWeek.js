import { getDay } from "date-fns";

export default function (pdate) {
    if (pdate == undefined) {
        pdate = new Date();
    }
    return getDay(new Date(pdate));
}
