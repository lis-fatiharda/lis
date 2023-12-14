export default function objectCopy(source, target) {
    Object.keys(target).forEach(function (key) {
        if (source[key] == undefined) {
            delete target[key];
        }
    });

    Object.keys(source).forEach(function (key) {
        if (key == "_id") {
            target[key] = undefined;
        } else {
            target[key] = source[key];
        }
    });
    return target;
}
