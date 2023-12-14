
export default function objectToJson(source) {
    if (source == undefined | source == null) return '';
    let myReturn = JSON.stringify(source);
    return myReturn;
}
