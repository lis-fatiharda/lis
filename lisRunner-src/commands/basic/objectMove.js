export default function objectMove(source, target) {
    Object.keys(target).forEach(function (key) {
        if (
            source.hasOwnProperty(key) &
            (key != "_id") &
            (key != "__children") &
            (typeof source[key] != "object")
        ) {
            target[key] = source[key];
        } else {
            target[key] = target[key];
        }
    });

    return target;
}
