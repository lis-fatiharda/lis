<template>
    <l-table
         :tableData="dv.lisprddocs.equipments"
         :columns="equipmentsColumns"
         :height="'73vh'" 
          width="100%"
         @zoom="zoomMaterialRow = $event.row"
     />
     <BAST03D01mini
         :pComp="dv.sc.company"
         :isShow="zoomMaterialRow == null ? false : true"
         @ok="
             lis.objectMove($event, dv.lisprddocs.equipments[zoomMaterialRow]);
             dv.lisprddocs.equipments[zoomMaterialRow].material = $event.material;
             dv.lisprddocs.equipments[zoomMaterialRow].mtext = $event.stext;
             dv.lisprddocs.equipments[zoomMaterialRow].unit = $event.skunit;
             zoomMaterialRow = null;
         "
         @cancel="zoomMaterialRow = null"
     />
 
 </template> 
 
 <script>
 export default {
     props: ["dv", "tabInfo"],
     data(){

         return {
             zoomMaterialRow: null,
             equipmentsColumns: [   
                 {
                     type: "number",
                     value: "operation",
                     label: this.$gl("Operasyon No", "Operation No"),
                 },
                 {
                     type: "string",
                     value: "type",
                     label: this.$gl("Aktivite Tipi", "Activity Type"),
                 },
                 {
                     type: "zoom",
                     value: "material",
                     label: this.$gl("Malzeme", "Material"),
                 },
                 {
                     type: "string",
                     value: "stext",
                     label: this.$gl("Açıklama", "Description"),
                 },
                 {
                     type: "number",
                     value: "value",
                     label: this.$gl("Tahmini Operasyon Süresi", "Estimated Operation Time"),
                 },
                 {
                     type: "selectmenu",
                     label: this.$gl("Miktar Br.", "Quantity Unit"),
                     value: "unit",
                     options: "lisbas007",
                     optValue: "unit",
                     optTitles: { unit: "Birim", stext: "Açıklama" },
                     optFilter: { unittype: 0 },
                  },
                 {
                     type: "checkbox",
                     value: "iscost",
                     label: this.$gl("Maliyete Ekle", "Add to Cost"),
                 },
                
             ], 
     }},
   
 }
  
 </script>
 
 function data() { throw new Error('Function not implemented.'); }
 