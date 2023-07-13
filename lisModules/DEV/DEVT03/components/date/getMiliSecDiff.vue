<template>
    <l-div style="height: 100%">
        <l-card class="bg-grey-2">
            <l-toolbar-title>lis.getMiliSecDiff</l-toolbar-title>
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
                It rounds a fractional number to a desired number form <br />


                <div class="text-subtitle2 text-red">
                        Frontend usage (in script tags)
                    </div>
                    this.lis.round([number], [fraction]); <br />

                    <div class="text-subtitle2 text-red">Backend usage</div>
                    lis.round([number], [fraction]); <br />



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
            code: `// ! Front End
let myReturn1 = this.lis.round(56.8462, 2);
// myReturn = 56.84

// ! Back End
let myReturn2 = lis.round(56.8462, 2);
// myReturn = 56.84`,
        };
    },
};
</script>
