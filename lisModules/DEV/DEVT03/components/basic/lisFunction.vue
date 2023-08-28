<template>
    <l-div style="height: 100%">
        <l-card class="bg-grey-2">
            <l-toolbar-title>lis.function</l-toolbar-title>
        </l-card>

        <l-card>
            <l-div-flex>
                <div class="text-h6">Definition</div>

                <l-space />

                <l-chip label="frontend" color="amber" class="text-white" />
                
            </l-div-flex>
            <l-separator />

            <l-card-section>
                Calls a function from a dialog or a class <br />
                * Should be called in an async function with await <br />
                <br />
                <br />

                <div class="text-subtitle2 text-red">
                    Call function from a dialog :
                </div>

                this.lis.function(['Application Code]/[Function Name]', [Parameters as object]); <br />


                <div class="text-subtitle2 text-red">
                    Call function from a Class :
                </div>

                this.lis.function('cls-[Class Name].[Function Name]', [Parameters as object]); <br />
            </l-card-section>
            <br />
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
            code: `let myReturn1 = await this.lis.function("SALT01/btnSearch", this.dv);

let myReturn2 = await this.lis.function("cls-sales.save", this.dv);`,
        };
    },
};
</script>
