// System class Manage numerator
import loginRec from "./login.js";
import checkUserRec from "./checkUser.js";
import createInvFromSalRec from "./createInvFromSal.js";
import createDelFromSalRec from "./createDelFromSal.js";
import getBaseSchemaRec from "./1-getBaseSchema.js";

import getDespatchRefSchemaRec from "./2-getDespatchRefSchema.js";
import getOrderRefSchemaRec from "./2-getOrderRefSchema.js";
import getAdditionalSchemaRec from "./3-getAdditionalSchema.js";
import getSignatureSchemaRec from "./4-getSignatureSchema.js";
import getSupplierSchemaRec from "./5-getSupplierSchema.js";

import getTaxSchemaRec from "./8-getTaxSchema.js";
import getTaxSubSchemaRec from "./8-getTaxSubSchema.js";

import getMonetaryTotalSchemaRec from "./8-getMonetaryTotalSchema.js";
import getItemSchemaRec from "./9-getItemSchema.js";

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
    createInvFromSal = createInvFromSalRec;
    createDelFromSal = createDelFromSalRec;
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
