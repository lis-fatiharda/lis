<template>
    <l-div style="height: 100%">
        <l-card class="bg-grey-2">
            <l-toolbar-title>lis.lastDayOfMonth</l-toolbar-title>
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
                It Gives last day of month as Date<br />


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
let myReturn1 = this.lis.lastDayOfMonth();
// myReturn = Sat Jul 01 2023 00:00:00 GMT+0000

// ! Back End
let myReturn2 = lis.lastDayOfMonth();
// myReturn = Sat Jul 01 2023 00:00:00 GMT+0000`,
        };
    },
};
</script>
