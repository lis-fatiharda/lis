
export default async function printDirect(pData, pPrinter) {
    var myReturn = {};
    var isError = false;
    this.callWebService("http://localhost:3034/printDirect", {
        data: pData,
        printer: pPrinter,
    },
        {
        
    }).catch((err) => {
            this.$q.notify({
                type: "negative",
                message: err.response.data,
                actions: [{ label: "X", color: "white", dense: true }],
            });
            isError = true;
        });

    if (isError == false) {
        return myReturn.data;
    } else {
      throw new Error("Error occurred");
    }
}
