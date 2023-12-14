import { differenceInHours } from "date-fns";

export default function (pdate1, pdate2) {
    return differenceInHours(new Date(pdate1), new Date(pdate2));
}
