import { getDate } from "date-fns";

export default function (pdate) {
    if (pdate == undefined) {
        pdate = new Date();
    }
    return getDate(new Date(pdate));
}
