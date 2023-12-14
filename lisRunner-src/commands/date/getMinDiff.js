import { differenceInMinutes } from "date-fns";

export default function (pdate1, pdate2) {
    return differenceInMinutes(new Date(pdate1), new Date(pdate2));
}
