import _ from "lodash";

export default function objectEqual(source, target) {
    let myReturn = _.isEqual(source, target);
    return myReturn;
}
