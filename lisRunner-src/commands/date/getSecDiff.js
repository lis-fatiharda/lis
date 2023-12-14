import { differenceInSeconds } from "date-fns";

export default function (pdate1, pdate2) {
    return differenceInSeconds(new Date(pdate1), new Date(pdate2));
}
