<template>
    <l-div style="height: 100%">
        <l-card class="bg-grey-2">
            <l-toolbar-title>lis.objectMove</l-toolbar-title>
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
                    It assigns only corresponding values to target object <br />
                    If target object is undefined, dont works! <br />
                    If target object is defined, copy source keys and values to
                    target object (only corresponding values) <br />
                    <br />
                    <div class="text-subtitle2 text-red">
                        Frontend usage (in script tags)
                    </div>
                    this.lis.objectMove(sourceObject, targetObject); <br />
                    this.lis.objectMove(liscustomers, lissaldocs); <br />

                    <div class="text-subtitle2 text-red">Backend usage</div>
                    lis.objectMove(sourceObject, targetObject); <br />
                    lis.objectMove(liscustomers, lissaldocs); <br />
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
    doctype: "O1",
    docnum: "202315",
    customer: "lis Technology",
    subtotal: 150.25,
    items: [
        { material: "chocolate", quantity: 15 },
        { material: "milk", quantity: 15 },
    ],
};

let secondObj = {
    _id: 123456,
    doctype: "O2",
    docnum: "66666",
    customer: "Samson",
    subtotal: 150.25,
    price: 150.25,
};

lis.objectMove(firstObj, secondObj);

console.log("secondObj", secondObj);

// secondObj {
//   _id: 123456,
//   doctype: 'O1',
//   docnum: '202315',
//   customer: 'lis Technology',
//   subtotal: 150.25,
//   price: 150.25
// }`,
        };
    },
};
</script>
