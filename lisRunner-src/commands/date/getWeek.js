import { getWeek } from "date-fns";

export default function (pdate) {
    if (pdate == undefined) {
        pdate = new Date();
    }
    return getWeek(new Date(pdate), {
        weekStartsOn: 1,
        firstWeekContainsDate: 4,
    });
}
