<template>
    <l-div style="height: 100%">
        <l-card class="bg-grey-2">
            <l-toolbar-title>lis.alert</l-toolbar-title>
        </l-card>

        <l-card>
            <l-div-flex>
                <div class="text-h6">Definition</div>

                <l-space />

                <l-chip label="frontend" color="amber" class="text-white" />
            </l-div-flex>
            <l-separator />

            <l-card-section>
                It creates an alert pop up top-right on the screen<br />
<br />

                <div class="text-subtitle2 text-red">Alert Types :</div>

                <l-card-section>
                    P : Positive <br />
                    E : Negative <br />
                    W : warning <br />
                    I : info <br />
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
            code: `this.lis.alert("p", "Message Header", "Message Text");`,
        };
    },
};
</script>
