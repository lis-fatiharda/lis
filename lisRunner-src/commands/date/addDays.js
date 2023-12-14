import { addDays } from "date-fns";

export default function (pdate, pformat) {
    return addDays(new Date(pdate), pformat);
}
