<template>
    <l-div style="height: 100%">

        <l-card class="bg-grey-2">
            <l-toolbar-title>lis.objectClear</l-toolbar-title>
        </l-card>

        <l-card>
            <l-div-flex>
                <div class="text-h6">Definition</div>

                <l-space />

                <l-chip label="frontend" color="amber" class="text-white" />
                <l-chip label="backend" color="negative" class="text-white" />
            </l-div-flex>
            <l-separator />

            <l-card-section>
                <l-card-section>
                    it clears object values <br />
                    
                    <br />
                    <div class="text-subtitle2 text-red">
                        Frontend usage (in script tags)
                    </div>
                    this.lis.objectClear(liscustomers); <br />

                    <div class="text-subtitle2 text-red">Backend usage</div>
                    lis.objectClear(liscustomers); <br />
                    <br />

                    * lis.objectClear clears ony first level keys. If you want to clear nested objects, you can use this <br>
                    firstObj.items.forEach((e) => this.lis.objectClear(e));
                </l-card-section>
            </l-card-section>
        </l-card>

        <l-card>
            <l-card-section>
                <div class="text-h6">Code Example</div>
            </l-card-section>
            <l-separator />

            <l-card-section style="height: 400px">
                <l-code-editor :code="this.code" />
            </l-card-section>
        </l-card>
    </l-div>
</template>

<script>
export default {
    data() {
        return {
            code: `let firstObj = {
    _id: 123456,
    doctype: "O2",
    docnum: "66666",
    customer: "Samson",
    subtotal: 150.25,
    price: 150.25,
};

lis.objectClear(firstObj);

console.log("firstObj", firstObj);

// firstObj {
//   _id: undefined,
//   doctype: '',
//   docnum: '',
//   customer: '',
//   subtotal: 0,
//   price: 0
// }`,
        };
    },
};
</script>
