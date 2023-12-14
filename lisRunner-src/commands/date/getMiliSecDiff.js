import { differenceInMilliseconds } from "date-fns";

export default function (pdate1, pdate2) {
    return differenceInMilliseconds(new Date(pdate1), new Date(pdate2));
}
