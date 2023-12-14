
export default function objectFromJson(source) {
    if (source == undefined | source == null) return '';
    let myReturn = JSON.parse(source);
    return myReturn;
}
