import { format } from "date-fns";
import addHours from "./addHours.js"

export default function (pdate, pformat) {
    return format(addHours(new Date(pdate),3), pformat);
}
 