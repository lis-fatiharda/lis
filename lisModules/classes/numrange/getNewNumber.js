// getNewNumber function give you a new number acording to syst04 numarators
// parameters in dv object :
// dv: {
// company,
// numrange,
// manuelNumber,
// } return newnumber
import { lisnumranges } from "../../../lisModels/lisnumranges.js";

export default async function getNewNumber(dv) {
    let lengthDiff = 0;
    let newnumber = "";
    const olisnumranges = await lisnumranges.findOne({
        company: dv.company,
        numrange: dv.numrange,
    });

    if (olisnumranges == null) throw new Error("Numaratör Bulunamadı!");
    if (olisnumranges?.ismanuel == true) {
        let getNumLength = olisnumranges.numparts[0].partlength;
        if (getNumLength < dv.manuelNumber.length) {
            console.log("if");
            throw new Error(
                `Cari kod en fazla ${getNumLength} karakter olabilir!`
            );
        } else if (getNumLength > dv.manuelNumber.length) {
            console.log("elseif");
            lengthDiff = getNumLength - dv.manuelNumber.length;
            console.log(lengthDiff);
            for (let index = 0; index < lengthDiff; index++) {
                newnumber = newnumber + "0";
                console.log(newnumber);
            }
            newnumber =
                olisnumranges.numparts[0].preffix +
                newnumber +
                dv.manuelNumber +
                olisnumranges.numparts[0].suffix;
        } else {
            newnumber =
                olisnumranges.numparts[0].preffix +
                dv.manuelNumber +
                olisnumranges.numparts[0].suffix;
        }
    } else {
        olisnumranges.numparts = olisnumranges.numparts.sort((a, b) => {
            return a.partno - b.partno;
        });

        olisnumranges.numparts.forEach((e) => {
            switch (e.parttype) {
                case "Otomatik": {
                    e.valcurrent = e.valcurrent + e.valincrease;
                    lengthDiff =
                        e.valend.toString().length -
                        e.valcurrent.toString().length;

                    for (let index = 0; index < lengthDiff; index++) {
                        newnumber = newnumber + "0";
                    }
                    newnumber = newnumber + e.valcurrent;
                    newnumber = e.preffix + newnumber + e.suffix;

                    break;
                }

                case "Yıl": {
                    let currnumber = new Date().getFullYear();
                    newnumber =
                        e.preffix +
                        currnumber.toString().slice(2, 4) +
                        e.suffix;

                    break;
                }

                case "Ay": {
                    let currmonth = (new Date().getMonth() + 1).toString();
                    currmonth.length == 1
                        ? (currmonth = "0" + currmonth)
                        : currmonth;
                    newnumber += e.preffix + currmonth + e.suffix;
                    break;
                }
                case "Gün": {
                    let currday = new Date().getDate().toString();
                    currday.length == 1 ? (currday = "0" + currday) : currday;
                    newnumber += e.preffix + currday + e.suffix;
                    break;
                }

                default:
                    break;
            }
        });
    }
    olisnumranges.valcurrent = newnumber;
    olisnumranges.save();
    return newnumber;
}
