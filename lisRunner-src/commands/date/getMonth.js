import { getMonth } from "date-fns";

export default function (pdate) {
    if (pdate == undefined) {
        pdate = new Date();
    }
    return getMonth(new Date(pdate)) + 1;
}
