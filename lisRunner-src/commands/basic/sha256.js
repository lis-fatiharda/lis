import Crypto from "crypto-js";

export default function sha256(text) {
    return Crypto.HmacSHA256(text, "lisinfo2021").toString();
}

