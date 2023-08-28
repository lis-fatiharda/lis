<template>
    <l-div style="height: 100%">
        <l-card class="bg-grey-2">
            <l-toolbar-title>lis.objectNew</l-toolbar-title>
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
                    Creates new object from given model or nested model <br />
                    
                    <br />
                    <div class="text-subtitle2 text-red">
                        Frontend usage (in script tags)
                    </div>
                    this.lis.objectNew('lispurdocs'); <br />
                    this.lis.objectNew('lismaterials.stocks'); <br />

                    <div class="text-subtitle2 text-red">Backend usage</div>
                    lis.objectNew('lisinvdocs'); <br />
                    lis.objectNew('lisinvdocs.items'); <br />
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
            code: `// Frontend

let newSaldocs = await this.lis.objectNew('lissaldocs');

let newSaldocsItem = await this.lis.objectNew('lissaldocs.items');

//Backend

let newSaldocs = await lis.objectNew('lissaldocs');

let newSaldocsItem = await lis.objectNew('lissaldocs.items');

`,
        };
    },
};
</script>
