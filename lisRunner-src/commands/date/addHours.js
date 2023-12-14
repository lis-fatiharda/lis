import { addHours } from "date-fns";

export default function (pdate, pformat) {
    return addHours(new Date(pdate), pformat);
}
