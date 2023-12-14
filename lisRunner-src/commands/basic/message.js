import { Dialog } from "quasar";

const conf = (pTitle, pMessage) => {
    return new Promise((resolve, reject) => {
        Dialog.create({
            title: pTitle,
            message: pMessage,
            ok: {
                label: "Evet",
                color: "white",
                textColor: "primary",
                flat: true,
            },
            cancel: {
                label: "Hayır",
                color: "white",
                textColor: "negative",
                flat: true,
            },
            persistent: true,
            focus: "none",
        })
            .onOk(() => {
                resolve(true);
            })
            .onCancel(() => {
                resolve(false);
            });
    });
};

function alert(pTitle, pMessage) {
    return new Promise((resolve, reject) => {
        Dialog.create({
            title: pTitle,
            message: pMessage,
            ok: {
                label: "Evet",
                color: "white",
                textColor: "primary",
                flat: true,
            },
            persistent: true,
            focus: "ok",
        }).onOk(() => {
            resolve(true);
        });
        //.onCancel(() => {
        //    // console.log('Cancel')
        //})
        //.onDismiss(() => {
        //    // console.log('I am triggered on both OK and Cancel')
        //});
    });
}

export default async function message(pType, pTitle, pMessage) {
    switch (pType) {
        case "e":
            return await alert(pTitle, pMessage);
        case "E":
            return await alert(pTitle, pMessage);
        case "c":
            return await conf(pTitle, pMessage);
        case "C":
            return await conf(pTitle, pMessage);
        case "p": //prompt
            break;

        case "o": //options
            break;

        default:
            break;
    }
}
