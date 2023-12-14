import { getYear } from "date-fns";

export default function (pdate) {
    if (pdate == undefined) {
        pdate = new Date();
    }
    return getYear(new Date(pdate));
}
