
<template>
    <l-div> 
                <l-input
                    type="textarea"
                    v-model="dv.lisprddocs.note"
                    label="İş Emri Notu"
                    dense
                    style="width: 1250px"
                    autogrow
                />
    </l-div>
</template> 

<script>
 export default {
     props: ["dv", "tabInfo"],
     data(){

         return {

     }},
   
 }
  
 </script>

function data() { throw new Error('Function not implemented.'); }
