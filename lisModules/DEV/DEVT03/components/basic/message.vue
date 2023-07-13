<template>
    <l-div style="height: 100%">
        <l-card class="bg-grey-2">
            <l-toolbar-title>lis.message</l-toolbar-title>
        </l-card>

        <l-card>
            <l-div-flex>
                <div class="text-h6">Definition</div>

                <l-space />

                <l-chip label="frontend" color="amber" class="text-white" />
            </l-div-flex>
            <l-separator />

            <l-card-section>
                It creates a message pop up on the screen<br />
                <br />

                <div class="text-subtitle2 text-red">Message Types :</div>

                <l-card-section>
                    C : Confirmation <br />
                    E : Error <br />
                    P : Prompt <br />
                    O : Options <br />
                </l-card-section>

                <l-separator dark inset />

                <div class="text-subtitle2 text-red">
                    Confirmation type returns :
                </div>
                Yes : return true; <br />
                No : return false; <br />
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
            code: `this.lis.message("e", "Message Header", "Message Text");

let myReturn = await this.lis.message("c", "Message Header", "Message Text");
// if Yes  myReturn = true
// if No  myReturn = false`,
        };
    },
};
</script>
