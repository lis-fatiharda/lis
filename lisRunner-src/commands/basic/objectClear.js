export default function objectClear(source) {
    Object.keys(source).forEach(function (key) {
        if (key == "_id") {
            source[key] = undefined;
        } else {
            if (typeof source[key] === "string") source[key] = "";
            if (typeof source[key] === "number") source[key] = 0;
            if (typeof source[key] === "date") source[key] = new Date(1975);
        }
    });

    return source;
}
