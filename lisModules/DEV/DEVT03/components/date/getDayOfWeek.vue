<template>
    <l-div style="height: 100%">
        <l-card class="bg-grey-2">
            <l-toolbar-title>lis.getDayOfWeek</l-toolbar-title>
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
                Returns the day of week as number type <br />

                0 : Sunday :  <br />
                1 : Monday <br />
                2 : Tuesday  <br />
                3 : Wednesday <br />
                4 : Thursday  <br />
                5 : Friday  <br />
                6 : Saturday <br />

                <div class="text-subtitle2 text-red">
                    Frontend usage (in script tags)
                </div>
                this.lis.getDay(); <br />

                <div class="text-subtitle2 text-red">Backend usage</div>
                lis.getDay(); <br />
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
let myReturn1 = this.lis.getDayOfWeek();
// myReturn = 0 //  Monday

// ? Back End
let myReturn2 = lis.getDayOfWeek(sys_currentdate);
// myReturn = 1 //  Tuesday`,
        };
    },
};
</script>
