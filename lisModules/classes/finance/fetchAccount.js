import lismaterials from "../../../lisModels/lismaterials.js";
import lisbas009 from "../../../lisModels/lisbas009.js";
import lisbas015 from "../../../lisModels/lisbas015.js";


export default async function (pItem, pAccount, pDocument) {

    if (pAccount.indexOf("T") > -1) {
        let olismaterials = (
            await lismaterials.findOne({
                company: pDocument.company,
                material: pItem.material,
            })
        )
        let olisbas009 = (
            await lisbas009.findOne({
                company: pDocument.company,
                mattype: olismaterials.mattype,
            })
        )

        for (let index = 0; index < olisbas009.accgrp.length; index++) {
            let myChar = olisbas009.accgrp.substring(index, (index + 1));
            pAccount = pAccount.replace("T", myChar);

        }
    }
    
    if (pAccount.indexOf("X") > -1) {
        let olismaterials = (
            await lismaterials
                .findOne({
                    company: pDocument.company,
                    material: pItem.material,
                })
                .catch((err) => console.log(err))
        )
        for (let index = 0; index < olismaterials.mataccgrp.length; index++) {
            let myChar = olismaterials.mataccgrp.substring(index, (index + 1));
            pAccount = pAccount.replace("X", myChar);
            
        }
    }

    if (pAccount.indexOf("Y") > -1) {
        let myVatKey = pItem.vatrate.toString();
        if (myVatKey.length < 2) {
            myVatKey = "0" + myVatKey;
        }
        pAccount = pAccount.replace("YY", myVatKey);
    }

    if (pAccount.indexOf("Z") > -1) {


        pAccount = await lisbas015.findOne({ company: pDocument.company, baccount: pItem.bank });

        pAccount = pAccount.account;
        
    }

    return pAccount;
}
