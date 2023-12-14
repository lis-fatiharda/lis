
export default async function messageBackend(pType, pTitle, pMessage) {
    switch (pType) {
        case "e":
          throw new Error(pTitle);
        case "E":
          throw new Error(pTitle);
        case "i":
        case "I":
        default:
            break;
    }
}
