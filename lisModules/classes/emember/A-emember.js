// System class Manage numerator
import loginRec from "./login.js";
import checkUserRec from "./checkUser.js";
import createUblFromSalRec from "./createUblFromSal.js";
import getBaseSchemaRec from "./getBaseSchema.js";

import getDespatchRefSchemaRec from "./getDespatchRefSchema.js";
import getOrderRefSchemaRec from "./getOrderRefSchema.js";
import getAdditionalSchemaRec from "./getAdditionalSchema.js";
import getSignatureSchemaRec from "./getSignatureSchema.js";
import getSupplierSchemaRec from "./getSupplierSchema.js";

import getTaxSchemaRec from "./getTaxSchema.js";
import getTaxSubSchemaRec from "./getTaxSubSchema.js";

import getMonetaryTotalSchemaRec from "./getMonetaryTotalSchema.js";
import getItemSchemaRec from "./getItemSchema.js";

import checkInvoiceStatus from "./checkInvoiceStatus.js";
import sendEinvoiceRec from "./sendEinvoice.js";
import sendEarchiveRec from "./sendEarchive.js";
import sendEdeliveryRec from "./sendEdelivery.js";

import getInvoice from "./getInvoice.js";
import markInvoice from "./markInvoice.js";
//import acceptInvoice from "./acceptInvoice.js";

const emember = class {
    login = loginRec;
    checkUser = checkUserRec;
    //-
    createUblFromSal = createUblFromSalRec;
    getBaseSchema = getBaseSchemaRec;

    getDespatchRefSchema = getDespatchRefSchemaRec;
    getOrderRefSchema = getOrderRefSchemaRec;
    getAdditionalSchema = getAdditionalSchemaRec;
    getSignatureSchema = getSignatureSchemaRec;
    getSupplierSchema = getSupplierSchemaRec;

    getTaxSchema = getTaxSchemaRec;
    getTaxSubSchema = getTaxSubSchemaRec;

    getMonetaryTotalSchema = getMonetaryTotalSchemaRec;
    getItemSchema = getItemSchemaRec;

    checkInvoiceStatus = checkInvoiceStatus;
    sendEinvoice = sendEinvoiceRec;
    sendEarchive = sendEarchiveRec;
    sendEdelivery = sendEdeliveryRec;

    getInvoice = getInvoice;
    markInvoice = markInvoice;
    //acceptInvoice = acceptInvoice;
};

export default emember;
