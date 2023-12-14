import lismaterials from "../../../lisModels/lismaterials.js";
import lisbas009 from "../../../lisModels/lisbas009.js";
import lisbas015 from "../../../lisModels/lisbas015.js";


export default async function (pItem, plisfin002_item, pDocument) {

    if (plisfin002_item.account.indexOf("T") > -1) {
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
            plisfin002_item.account = plisfin002_item.account.replace("T", myChar);

        }
    }
    
    if (plisfin002_item.account.indexOf("X") > -1) {
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
            plisfin002_item.account = plisfin002_item.account.replace("X", myChar);
            
        }
    }

    if (plisfin002_item.account.indexOf("Y") > -1) {
        let myVatKey = pItem.vatrate.toString();
        if (myVatKey.length < 2) {
            myVatKey = "0" + myVatKey;
        }
        plisfin002_item.account = plisfin002_item.account.replace("YY", myVatKey);
    }

    if (plisfin002_item.account.indexOf("Z") > -1) {


        let olisbas015 = undefined;
        if (plisfin002_item.postway == 0) {
            olisbas015 = await lisbas015.findOne({
                company: pDocument.company,
                baccount: pItem.bankDebit,
            });
        } else {
            olisbas015 = await lisbas015.findOne({
                company: pDocument.company,
                baccount: pItem.bankCredit,
            });
        }
        

        plisfin002_item.account = olisbas015.account;
        
    }

    return plisfin002_item.account;
}
