//basic
import objectAssign from "../commands/basic/objectAssign.js";
import objectClear from "../commands/basic/objectClear.js";
import objectMove from "../commands/basic/objectMove.js";
import objectCopy from "../commands/basic/objectCopy.js";
import objectEqual from "../commands/basic/objectEqual.js";
import objectNew from "../commands/basic/objectNew.js";
import objectToJson from "../commands/basic/objectToJson.js";
import objectFromJson from "../commands/basic/objectFromJson.js";
import createUuid from "../commands/basic/createUuid.js";

import sha256 from "../commands/basic/sha256.js";
import encrypt from "../commands/basic/encrypt.js";
import decrypt from "../commands/basic/decrypt.js";
import callWebService from "../commands/basic/callWebService.js";
import runcode from "../commands/basic/runCode.js";
import runCmd from "../commands/basic/runCmd.js";
import message from "../commands/basic/messageBackend.js";
import error from "../commands/basic/error.js";


import findSelectedIndex from "../commands/basic/findSelectedIndex.js";

//calculatin
import round from "../commands/calculation/round.js";
//db
import like from "../commands/db/setLike.js";
import begintran from "../commands/db/begintran.js";
import rollbacktran from "../commands/db/rollbacktran.js";
import committran from "../commands/db/committran.js";
//date
import addDays from "../commands/date/addDays.js";
import addHours from "../commands/date/addHours.js";
import firstDayOfMonth from "../commands/date/firstDayOfMonth.js";
import firstDayOfYear from "../commands/date/firstDayOfYear.js";
import format from "../commands/date/format.js";
import getDay from "../commands/date/getDay.js";
import getDayOfWeek from "../commands/date/getDayOfWeek.js";

import getDayDiff from "../commands/date/getDayDiff.js";
import getHourDiff from "../commands/date/getHourDiff.js";
import getMiliSecDiff from "../commands/date/getMiliSecDiff.js";
import getMinDiff from "../commands/date/getMinDiff.js";
import getMonth from "../commands/date/getMonth.js";
import getSecDiff from "../commands/date/getSecDiff.js";

import getWeek from "../commands/date/getWeek.js";
import getYear from "../commands/date/getYear.js";
import lastDayOfMonth from "../commands/date/lastDayOfMonth.js";
import lastDayOfYear from "../commands/date/lastDayOfYear.js";

import sendMailSrv from "../commands/basic/sendMail/sendMailSrv.js";
//system
import obfuscate from "../commands/system/obfuscate.js";


export default async function () {
    global.lis = {};
    global.lis.round = round;
    global.lis.objectAssign = objectAssign;
    global.lis.objectClear = objectClear;
    global.lis.objectCopy = objectCopy;
    global.lis.objectMove = objectMove;
    global.lis.objectEqual = objectEqual;
    global.lis.objectNew = objectNew;
    global.lis.objectToJson = objectToJson;
    global.lis.objectFromJson = objectFromJson;
    
    global.lis.sha256 = sha256;
    global.lis.encrypt = encrypt;
    global.lis.decrypt = decrypt;
    global.lis.callWebService = callWebService;
    global.lis.createUuid = createUuid;

    global.lis.runcode = runcode;
    global.lis.runCmd = runCmd;
    global.lis.findSelectedIndex = findSelectedIndex;
    global.lis.message = message;
    global.lis.error = error;
    
    
    //
    global.lis.like = like;
    global.lis.begintran = begintran;
    global.lis.rollbacktran = rollbacktran;
    global.lis.committran = committran;
    //
    global.lis.addDays = addDays;
    global.lis.addHours = addHours;
    global.lis.firstDayOfMonth = firstDayOfMonth;
    global.lis.firstDayOfYear = firstDayOfYear;
    global.lis.format = format;
    global.lis.getDay = getDay;
    global.lis.getDayOfWeek = getDayOfWeek;
    global.lis.getDayDiff = getDayDiff;
    global.lis.getHourDiff = getHourDiff;
    global.lis.getMiliSecDiff = getMiliSecDiff;
    global.lis.getMinDiff = getMinDiff;
    global.lis.getMonth = getMonth;
    global.lis.getSecDiff = getSecDiff;
    global.lis.getYear = getYear;
    global.lis.lastDayOfMonth = lastDayOfMonth;
    global.lis.lastDayOfYear = lastDayOfYear;
    global.lis.getWeek = getWeek;


    global.lis.sendMail = sendMailSrv;
    //
    global.lis.obfuscate = obfuscate;
}
