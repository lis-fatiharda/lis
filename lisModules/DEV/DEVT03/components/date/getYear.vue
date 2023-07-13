<template>
    <l-div style="height: 100%">
        <l-card class="bg-grey-2">
            <l-toolbar-title>lis.getYear</l-toolbar-title>
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
                Returns the year as number type <br />

                <div class="text-subtitle2 text-red">
                    Frontend usage (in script tags)
                </div>
                this.lis.getYear(); <br />

                <div class="text-subtitle2 text-red">Backend usage</div>
                lis.getYear(); <br />
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
            code: `// ? Front End
let myReturn1 = this.lis.getYear();
// myReturn = 2023

// ? Back End
let myReturn2 = lis.getYear(sys_currentdate);
// myReturn = 2023`,
        };
    },
};
</script>
