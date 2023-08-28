<template>
    <l-div style="height: 100%">
        <l-card class="bg-grey-2">
            <l-toolbar-title>lis.createUUID</l-toolbar-title>
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
                    Creates a new UUID code <br />
                    <br />
                    this.lis.createUUID(); <br />
                    <br />
                    <div class="text-subtitle2 text-red">
                        Frontend usage (in script tags)
                    </div>
                    this.lis.createUUID(); <br />

                    <div class="text-subtitle2 text-red">Backend usage</div>
                    lis.createUUID(); <br />

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
            code: `this.lis.createUUID();
            // return: 9bb3b5a8-21e4-4299-93f7-62c6f0e32c5c`,
        };
    },
};
</script>
