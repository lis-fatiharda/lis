import { differenceInDays } from "date-fns";

export default function (pdate1, pdate2) {
    return differenceInDays(new Date(pdate1), new Date(pdate2));
}
