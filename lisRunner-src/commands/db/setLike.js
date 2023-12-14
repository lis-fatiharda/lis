// Set 'like' with Regex

export default function setLike(param) {
    if (param == "*") {
        return "*";
    } else {
        return {
            $regex:
                ".*" + param == null
                    ? ""
                    : param == undefined
                    ? ""
                    : param + ".*",
            $options: "i",
        };
    }
}
