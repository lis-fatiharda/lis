export default function gl(pTR, pEN) {
    if (document.documentElement.getAttribute("lang") == "en") {
        return pEN;
    } else {
        return pTR;
    }
}
