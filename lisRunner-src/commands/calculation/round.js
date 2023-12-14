export default async function round(number, fractionDigits) {
    return Math.round(number * (10 * fractionDigits)) / (10 * fractionDigits);
}
 