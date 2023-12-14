
import { createApp, defineAsyncComponent } from 'vue'
import App from './App.vue'
const app = createApp(App);
import router from './configs/router'

//-----------AXIOS--------------------
import appAxios from "./configs/lisFunc-axios.js";
app.config.globalProperties.$Axios = appAxios;

//-----------i18n----------------------
import { createI18n } from "vue-i18n"; 
//import stext from "../i18n.js"
import tr from "../../configs/locales/tr.json";
import en from "../../configs/locales/en.json"


const i18n = createI18n({
    // something vue-i18n options here ...
    locale: navigator.language || navigator.userLanguage,
    fallbackLocale: "tr",
    legacy: false,
    globalInjection: true,
    messages: {
        en,
        tr,
    },
});

//app.config.globalProperties.lis.i18n = i18n;
app.use(i18n);

//-----------QUASAR-------------------

// Import icon libraries
//import '@quasar/extras/roboto-font-latin-ext/roboto-font-latin-ext.css'
/* @vite-ignore */
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'
import '@quasar/extras/material-icons-round/material-icons-round.css'
import '@quasar/extras/material-icons-sharp/material-icons-sharp.css'
//import '@quasar/extras/mdi-v6/mdi-v6.css'
//import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'
//import '@quasar/extras/ionicons-v4/ionicons-v4.css'
//import '@quasar/extras/eva-icons/eva-icons.css'
//import '@quasar/extras/themify/themify.css'
//import '@quasar/extras/line-awesome/line-awesome.css'
//import '@quasar/extras/bootstrap-icons/bootstrap-icons.css'

// A few examples for animations from Animate.css:
// import @quasar/extras/animate/fadeIn.css
// import @quasar/extras/animate/fadeOut.css

// Import Quasar css
/* @vite-ignore */
import 'quasar/src/css/index.sass'

import {
    Quasar,
    Dialog,
    AddressbarColor,
    Notify,
    Loading,
  QSpinnerGrid,
} from "quasar";

app.use(Quasar, {
    plugins: {
        Dialog,
        AddressbarColor,
        Notify,
        Loading,
    },
    config: {
        notify: {
            position: "top-right",
            /* look at QuasarConfOptions from the API card */
        },
        loading: {
            spinner: QSpinnerGrid,
            spinnerColor: "primary",
            /* look at QuasarConfOptions from the API card */
        },
    },
    // import Quasar plugins and add here
    /*
  config: {
    brand: {
      // primary: '#e46262',
      // ... or all other brand colors
    },
    notify: {...}, // default set of options for Notify Quasar plugin
    loading: {...}, // default set of options for Loading Quasar plugin
    loadingBar: { ... }, // settings for LoadingBar Quasar plugin
    // ..and many more (check Installation card on each Quasar component/directive/plugin)
  }
  */
});

// -------Typed.js----------
//import { VueTypedJs } from "vue-typed-js";

//app.use(VueTypedJs);

// -------PrimeVue integration----------
// ? import PrimeVue from "primevue/config";
// ? 
// ? import "primevue/resources/themes/lara-light-blue/theme.css";
// ? import "primevue/resources/primevue.min.css";
// ? import "primeicons/primeicons.css";
// ? 
// ? import AutoComplete from "primevue/autocomplete";
// ? import Accordion from "primevue/accordion";
// ? import AccordionTab from "primevue/accordiontab";
// ? import Avatar from "primevue/avatar";
// ? import AvatarGroup from "primevue/avatargroup";
// ? import Badge from "primevue/badge";
// ? import BadgeDirective from "primevue/badgedirective";
// ? import BlockUI from "primevue/blockui";
// ? import Button from "primevue/button";
// ? import Breadcrumb from "primevue/breadcrumb";
// ? import Calendar from "primevue/calendar";
// ? import Card from "primevue/card";
// ? import CascadeSelect from "primevue/cascadeselect";
// ? import Carousel from "primevue/carousel";
// ? import Checkbox from "primevue/checkbox";
// ? import Chip from "primevue/chip";
// ? import Chips from "primevue/chips";
// ? import ColorPicker from "primevue/colorpicker";
// ? import Column from "primevue/column";
// ? import ColumnGroup from "primevue/columngroup";
// ? import ConfirmDialog from "primevue/confirmdialog";
// ? import ConfirmPopup from "primevue/confirmpopup";
// ? import ConfirmationService from "primevue/confirmationservice";
// ? import ContextMenu from "primevue/contextmenu";
// ? import DataTable from "primevue/datatable";
// ? import DataView from "primevue/dataview";
// ? import DataViewLayoutOptions from "primevue/dataviewlayoutoptions";
// ? import DeferredContent from "primevue/deferredcontent";
// ? //import Dialog from "primevue/dialog";
// ? import DialogService from "primevue/dialogservice";
// ? import Divider from "primevue/divider";
// ? import Dock from "primevue/dock";
// ? import Dropdown from "primevue/dropdown";
// ? import DynamicDialog from "primevue/dynamicdialog";
// ? import Fieldset from "primevue/fieldset";
// ? import FileUpload from "primevue/fileupload";
// ? import Galleria from "primevue/galleria";
// ? import Image from "primevue/image";
// ? import InlineMessage from "primevue/inlinemessage";
// ? import Inplace from "primevue/inplace";
// ? import InputSwitch from "primevue/inputswitch";
// ? import InputText from "primevue/inputtext";
// ? import InputMask from "primevue/inputmask";
// ? import InputNumber from "primevue/inputnumber";
// ? import Knob from "primevue/knob";
// ? import Listbox from "primevue/listbox";
// ? import MegaMenu from "primevue/megamenu";
// ? import Menu from "primevue/menu";
// ? import Menubar from "primevue/menubar";
// ? import Message from "primevue/message";
// ? import MultiSelect from "primevue/multiselect";
// ? import OrderList from "primevue/orderlist";
// ? import OrganizationChart from "primevue/organizationchart";
// ? import OverlayPanel from "primevue/overlaypanel";
// ? import Paginator from "primevue/paginator";
// ? import Panel from "primevue/panel";
// ? import PanelMenu from "primevue/panelmenu";
// ? import Password from "primevue/password";
// ? import PickList from "primevue/picklist";
// ? import ProgressBar from "primevue/progressbar";
// ? import ProgressSpinner from "primevue/progressspinner";
// ? import Rating from "primevue/rating";
// ? import RadioButton from "primevue/radiobutton";
// ? import Ripple from "primevue/ripple";
// ? import Row from "primevue/row";
// ? import SelectButton from "primevue/selectbutton";
// ? import ScrollPanel from "primevue/scrollpanel";
// ? import ScrollTop from "primevue/scrolltop";
// ? import Skeleton from "primevue/skeleton";
// ? import Slider from "primevue/slider";
// ? import Sidebar from "primevue/sidebar";
// ? import SpeedDial from "primevue/speeddial";
// ? import SplitButton from "primevue/splitbutton";
// ? import Splitter from "primevue/splitter";
// ? import SplitterPanel from "primevue/splitterpanel";
// ? import Steps from "primevue/steps";
// ? import StyleClass from "primevue/styleclass";
// ? import TabMenu from "primevue/tabmenu";
// ? import TieredMenu from "primevue/tieredmenu";
// ? import Textarea from "primevue/textarea";
// ? import Toast from "primevue/toast";
// ? import ToastService from "primevue/toastservice";
// ? import Toolbar from "primevue/toolbar";
// ? import TabView from "primevue/tabview";
// ? import TabPanel from "primevue/tabpanel";
// ? import Tag from "primevue/tag";
// ? import Terminal from "primevue/terminal";
// ? import Timeline from "primevue/timeline";
// ? import ToggleButton from "primevue/togglebutton";
// ? import Tooltip from "primevue/tooltip";
// ? import Tree from "primevue/tree";
// ? import TreeSelect from "primevue/treeselect";
// ? import TreeTable from "primevue/treetable";
// ? import TriStateCheckbox from "primevue/tristatecheckbox";
// ? import VirtualScroller from "primevue/virtualscroller";
// ? 
// ? app.use(PrimeVue);
// ? //app.component("Dialog", Dialog); 
// ? app.use(PrimeVue, { ripple: true });
// ? app.use(ConfirmationService);
// ? app.use(ToastService);
// ? app.use(DialogService);
// ? 
// ? app.directive("tooltip", Tooltip);
// ? app.directive("badge", BadgeDirective);
// ? app.directive("ripple", Ripple);
// ? app.directive("styleclass", StyleClass);
// ? 
// ? app.component("Accordion", Accordion);
// ? app.component("AccordionTab", AccordionTab);
// ? app.component("AutoComplete", AutoComplete);
// ? app.component("Avatar", Avatar);
// ? app.component("AvatarGroup", AvatarGroup);
// ? app.component("Badge", Badge);
// ? app.component("BlockUI", BlockUI);
// ? app.component("Breadcrumb", Breadcrumb);
// ? app.component("Button", Button);
// ? app.component("Calendar", Calendar);
// ? app.component("Card", Card);
// ? app.component("Carousel", Carousel);
// ? app.component("CascadeSelect", CascadeSelect);
// ? app.component("Checkbox", Checkbox);
// ? app.component("Chip", Chip);
// ? app.component("Chips", Chips);
// ? app.component("ColorPicker", ColorPicker);
// ? app.component("Column", Column);
// ? app.component("ColumnGroup", ColumnGroup);
// ? app.component("ConfirmDialog", ConfirmDialog);
// ? app.component("ConfirmPopup", ConfirmPopup);
// ? app.component("ContextMenu", ContextMenu);
// ? app.component("DataTable", DataTable);
// ? app.component("DataView", DataView);
// ? app.component("DataViewLayoutOptions", DataViewLayoutOptions);
// ? app.component("DeferredContent", DeferredContent);
// ? //app.component("Dialog", Dialog);
// ? app.component("Divider", Divider);
// ? app.component("Dock", Dock);
// ? app.component("Dropdown", Dropdown);
// ? app.component("DynamicDialog", DynamicDialog);
// ? app.component("Fieldset", Fieldset);
// ? app.component("FileUpload", FileUpload);
// ? app.component("Galleria", Galleria);
// ? app.component("Image", Image);
// ? app.component("InlineMessage", InlineMessage);
// ? app.component("Inplace", Inplace);
// ? app.component("InputMask", InputMask);
// ? app.component("InputNumber", InputNumber);
// ? app.component("InputSwitch", InputSwitch);
// ? app.component("InputText", InputText);
// ? app.component("Knob", Knob);
// ? app.component("Listbox", Listbox);
// ? app.component("MegaMenu", MegaMenu);
// ? app.component("Menu", Menu);
// ? app.component("Menubar", Menubar);
// ? app.component("Message", Message);
// ? app.component("MultiSelect", MultiSelect);
// ? app.component("OrderList", OrderList);
// ? app.component("OrganizationChart", OrganizationChart);
// ? app.component("OverlayPanel", OverlayPanel);
// ? app.component("Paginator", Paginator);
// ? app.component("Panel", Panel);
// ? app.component("PanelMenu", PanelMenu);
// ? app.component("Password", Password);
// ? app.component("PickList", PickList);
// ? app.component("ProgressBar", ProgressBar);
// ? app.component("ProgressSpinner", ProgressSpinner);
// ? app.component("RadioButton", RadioButton);
// ? app.component("Rating", Rating);
// ? app.component("Row", Row);
// ? app.component("SelectButton", SelectButton);
// ? app.component("ScrollPanel", ScrollPanel);
// ? app.component("ScrollTop", ScrollTop);
// ? app.component("Slider", Slider);
// ? app.component("Sidebar", Sidebar);
// ? app.component("Skeleton", Skeleton);
// ? app.component("SpeedDial", SpeedDial);
// ? app.component("SplitButton", SplitButton);
// ? app.component("Splitter", Splitter);
// ? app.component("SplitterPanel", SplitterPanel);
// ? app.component("Steps", Steps);
// ? app.component("TabMenu", TabMenu);
// ? app.component("TabView", TabView);
// ? app.component("TabPanel", TabPanel);
// ? app.component("Tag", Tag);
// ? app.component("Textarea", Textarea);
// ? app.component("Terminal", Terminal);
// ? app.component("TieredMenu", TieredMenu);
// ? app.component("Timeline", Timeline);
// ? app.component("Toast", Toast);
// ? app.component("Toolbar", Toolbar);
// ? app.component("ToggleButton", ToggleButton);
// ? app.component("Tree", Tree);
// ? app.component("TreeSelect", TreeSelect);
// ? app.component("TreeTable", TreeTable);
// ? app.component("TriStateCheckbox", TriStateCheckbox);
// ? app.component("VirtualScroller", VirtualScroller);








// -------Composables integration----------
// -------Apexcharts integration----------
import vueApexCharts from "vue3-apexcharts"
app.use(vueApexCharts)
app.component("apexchart", vueApexCharts)
// ---------------------------------------

// Assumes you have a <div id="app"></div> in your index.html
app.use(router)
// Global component imports
import lChip from "./components/l-chip.vue";
app.component("l-chip", lChip);

import lBadge from "./components/l-badge.vue";
app.component("l-badge", lBadge);


import lSeparator from "./components/l-separator.vue";
app.component("l-separator", lSeparator);

import lIcon from "./components/l-icon.vue";
app.component("l-icon", lIcon);


import lTooltip from "./components/l-tooltip.vue";
app.component("l-tooltip", lTooltip);

import lDialog from "./components/l-dialog.vue";
app.component("l-dialog", lDialog);

import lDialogsmall from "./components/l-dialog-small.vue";
app.component("l-dialog-small", lDialogsmall);

import lDialoglarge from "./components/l-dialog-large.vue";
app.component("l-dialog-large", lDialoglarge);



import lCheckbox from "./components/l-checkbox.vue";
app.component("l-checkbox", lCheckbox);

import lToolbar from "./components/l-toolbar.vue";
app.component("l-toolbar", lToolbar);
import lToolbartitle from "./components/l-toolbar-title.vue";
app.component("l-toolbar-title", lToolbartitle);



import lCard0 from "./components/l-card0.vue";
app.component("l-card0", lCard0);
import lCard from "./components/l-card.vue";
app.component("l-card", lCard);
import lCardsection from "./components/l-card-section.vue";
app.component("l-card-section", lCardsection);

import lCardflex from "./components/l-card-flex.vue";
app.component("l-card-flex", lCardflex);
import lCardsectionflex from "./components/l-card-section-flex.vue";
app.component("l-card-section-flex", lCardsectionflex);


import lBtn from "./components/l-btn.vue";
app.component("l-btn", lBtn);
import lBtnGroup from "./components/l-btn-group.vue";
app.component("l-btn-group", lBtnGroup);
import lSpace from "./components/l-space.vue";
app.component("l-space", lSpace);


import lDiv from "./components/l-div.vue";
app.component("l-div", lDiv);
import lDivflex from "./components/l-div-flex.vue";
app.component("l-div-flex", lDivflex);

import lDiv0flex from "./components/l-div0-flex.vue";
app.component("l-div0-flex", lDiv0flex);

import lTabs from "./components/l-tabs.vue";
app.component("l-tabs", lTabs);
import lTab from "./components/l-tab.vue";
app.component("l-tab", lTab);



import lTabpanels from "./components/l-tab-panels.vue";
app.component("l-tab-panels", lTabpanels);
import lTabpanel from "./components/l-tab-panel.vue";
app.component("l-tab-panel", lTabpanel);
//
import lselect from "./components/tags/lSelect/l-select.vue";
app.component("l-select", lselect);
import BAST03D01mini from "../../development/lisModules/BAS/BAST03/BAST03D01mini.vue";
app.component("BAST03D01mini", BAST03D01mini);
import BAST02D01mini from "../../development/lisModules/BAS/BAST02/BAST02D01mini.vue";
app.component("BAST02D01mini", BAST02D01mini);

import FINT01D01mini from "../../development/lisModules/FIN/FINT01/FINT01D01mini.vue";
app.component("FINT01D01mini", FINT01D01mini);

import lDate from "./components/tags/lDate/l-date.vue";
app.component("l-date", lDate);

import lDateRange from "./components/tags/lDateRange/l-date-range.vue";
app.component("l-date-range", lDateRange);




import lDateTime from "./components/tags/lDateTime/l-dateTime.vue";
app.component("l-datetime", lDateTime);
import lBarcodeReader from "./components/tags/lBarcodeReader/l-barcode-reader.vue";
app.component("l-barcode-reader", lBarcodeReader);

import lBarcode from "./components/tags/lBarcode/l-barcode.vue";
app.component("l-barcode", lBarcode);

import lQrcode from "./components/tags/lQrcode/l-qrcode.vue";
app.component("l-qrcode", lQrcode);

import lTable from "./components/tags/lTable/l-table.vue";
app.component("l-table", lTable);
import lTablesimple from "./components/l-simple-table.vue";
app.component("l-simple-table", lTablesimple);

import lPageBreak from "./components/tags/l-page-break.vue";
app.component("l-page-break", lPageBreak);

import lMoney from "./components/l-input-money.vue";
app.component("l-input-money", lMoney);

import lInput from "./components/l-input.vue";
app.component("l-input", lInput);

import lCodeeditor from "./components/tags/l-code-editor/l-code-editor.vue";
app.component("l-code-editor", lCodeeditor);


import lScroller from "./components/l-scroller.vue";
app.component("l-scroller", lScroller);

import doct02d01 from "../../development/lisModules/DOC/DOCT02/DOCT02D01.vue";
app.component("l-doct02d01", doct02d01);

//-------------

import gl from "../commands/system/gl";
app.config.globalProperties.$gl = gl;
// Global functions imports
import btnGoHome from "../commands/system/btnGoHome"
app.config.globalProperties.$btnGoHome = btnGoHome;
//******************************************************* */
//-lis object
app.config.globalProperties.lis = {};
import lisFunction from "../commands/basic/lisFunction.js";
app.config.globalProperties.lis.function = lisFunction;
import lisFunc from "../commands/basic/lisFunc.js";
app.config.globalProperties.lis.func = lisFunc;
import callWebService from "../commands/basic/callWebService.js";
app.config.globalProperties.lis.callWebService = callWebService;

import sha256 from "../commands/basic/sha256.js";
app.config.globalProperties.lis.sha256 = sha256;

//import encrypt from "../commands/basic/encrypt.js";
//app.config.globalProperties.lis.encrypt = encrypt;

//import decrypt from "../commands/basic/decrypt.js";
//app.config.globalProperties.lis.decrypt = decrypt;
//----------------------------------------------------------------
import printPdf from "../commands/basic/printPdf.js";
app.config.globalProperties.lis.printPdf = printPdf;
import printDirect from "../commands/basic/printDirect.js";
app.config.globalProperties.lis.printDirect = printDirect;
//----------------------------------------------------------------
import sendMail from "../commands/basic/sendMail/sendMail.js";
app.config.globalProperties.lis.sendMail = sendMail;
import pushNotification from "../commands/basic/pushNotification.js";
app.config.globalProperties.lis.pushNotification = pushNotification;
//----------------------------------------------------------------
import lisAlert from "../commands/basic/alert.js";
app.config.globalProperties.lis.alert = lisAlert;
import lisMessage from "../commands/basic/message.js";
app.config.globalProperties.lis.message = lisMessage;
import createUuid from "../commands/basic/createUuid.js";
app.config.globalProperties.lis.createUuid = createUuid;
import runcode from "../commands/basic/runCode.js";
app.config.globalProperties.lis.runcode = runcode;
import findSelectedIndex from "../commands/basic/findSelectedIndex.js";
app.config.globalProperties.lis.findSelectedIndex = findSelectedIndex;

//####################################################
import lisRound from "../commands/calculation/round.js";
app.config.globalProperties.lis.round = lisRound;

import objectAssign from "../commands/basic/objectAssign.js";
app.config.globalProperties.lis.objectAssign = objectAssign;
import objectClear from "../commands/basic/objectClear.js";
app.config.globalProperties.lis.objectClear = objectClear;
import objectCopy from "../commands/basic/objectCopy.js";
app.config.globalProperties.lis.objectCopy = objectCopy;
import objectMove from "../commands/basic/objectMove.js";
app.config.globalProperties.lis.objectMove = objectMove;
import objectEqual from "../commands/basic/objectEqual.js";
app.config.globalProperties.lis.objectEqual = objectEqual;
import objectNew from "../commands/basic/objectNewFrontend.js";
app.config.globalProperties.lis.objectNew = objectNew;

import objectToJson from "../commands/basic/objectToJson.js";
app.config.globalProperties.lis.objectToJson = objectToJson;
import objectFromJson from "../commands/basic/objectFromJson.js";
app.config.globalProperties.lis.objectFromJson = objectFromJson;


//date
import addDays from "../commands/date/addDays.js";
app.config.globalProperties.lis.addDays = addDays;
import addHours from "../commands/date/addHours.js";
app.config.globalProperties.lis.addHours = addHours;
import firstDayOfMonth from "../commands/date/firstDayOfMonth.js";
app.config.globalProperties.lis.firstDayOfMonth = firstDayOfMonth;
import firstDayOfYear from "../commands/date/firstDayOfYear.js";
app.config.globalProperties.lis.firstDayOfYear = firstDayOfYear;
import format from "../commands/date/format.js";
app.config.globalProperties.lis.format = format;
import getDay from "../commands/date/getDay.js";
app.config.globalProperties.lis.getDay = getDay;

import getWeek from "../commands/date/getWeek.js";
app.config.globalProperties.lis.getWeek = getWeek;

import getDayOfWeek from "../commands/date/getDayOfWeek.js";
app.config.globalProperties.lis.getDayOfWeek = getDayOfWeek;


import getDayDiff from "../commands/date/getDayDiff.js";
app.config.globalProperties.lis.getDayDiff = getDayDiff;
import getHourDiff from "../commands/date/getHourDiff.js";
app.config.globalProperties.lis.getHourDiff = getHourDiff;
import getMiliSecDiff from "../commands/date/getMiliSecDiff.js";
app.config.globalProperties.lis.getMiliSecDiff = getMiliSecDiff;
import getMinDiff from "../commands/date/getMinDiff.js";
app.config.globalProperties.lis.getMinDiff = getMinDiff;
import getMonth from "../commands/date/getMonth.js";
app.config.globalProperties.lis.getMonth = getMonth;
import getSecDiff from "../commands/date/getSecDiff.js";
app.config.globalProperties.lis.getSecDiff = getSecDiff;
import getYear from "../commands/date/getYear.js";
app.config.globalProperties.lis.getYear = getYear;
import lastDayOfMonth from "../commands/date/lastDayOfMonth.js";
app.config.globalProperties.lis.lastDayOfMonth = lastDayOfMonth;
import lastDayOfYear from "../commands/date/lastDayOfYear.js";
app.config.globalProperties.lis.lastDayOfYear = lastDayOfYear;

 app.config.globalProperties.sys_currentDate = (() => new Date());
 app.config.globalProperties.sys_maxDate = new Date(2100);
 app.config.globalProperties.sys_minDate = new Date(1900);
//

if (import.meta.hot) import.meta.hot.accept(() => import.meta.hot.invalidate());

//******************************************************* */
app.mount('#app')