import fs from "fs";
import path from "path";
const tmpModels = fs.readdirSync("C:/liserp/lisRunner/lisModels/");

//***************************************************************** */

export default async function (editorItem) {
  var strCodeinEval = "";
  tmpModels.forEach((e) => {
    strCodeinEval =
      strCodeinEval +
      "var " +
      e.replace(".js", "") +
      " = await import('C:/liserp/lisRunner/lisModels/" +
      e + ".js" +
      "'); ";

    console.log(strCodeinEval);
  });

  strCodeinEval = strCodeinEval + " " + editorItem.code;

  try {
    console.log("Çalışan Kod :");
    console.log("--------------------------------------------------------");
    console.log(strCodeinEval);
    console.log("--------------------------------------------------------");

    editorItem.data = await eval(strCodeinEval);
  } catch (error) {
    editorItem.data = "Bir Sonuç Bulunamadı..";
  }

  return editorItem;
}
