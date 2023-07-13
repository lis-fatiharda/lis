<template>
    <l-div style="height: 100%">
        <l-card class="bg-grey-2">
            <l-toolbar-title>lis.printPDF</l-toolbar-title>
        </l-card>

        <l-card>
            <l-div-flex>
                <div class="text-h6">Definition</div>

                <l-space />

                <l-chip label="frontend" color="amber" class="text-white" />
            </l-div-flex>
            <l-separator />

            <l-card-section>
                <l-card-section>
                    It sends a tag which has an id to printer as pdf file <br />
                    <br />
                    this.lis.printPDF("[PDF tag id]", "[File name]"); <br />

                    <div class="text-subtitle2 text-red">Options :</div>

                    <l-card-section>
                        orientation: p:portrait, l:landscape  |  default: 'p' <br />
                        format: 'a0' - 'a10'  |  default: 'a4' <br />
                        unit: "mm", "cm", "in", "px", "pc", "em"  |  default: "px" <br />
                        margin: 10, <br /> </l-card-section
                ></l-card-section>
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
            code: `this.lis.printPDF("pdfFite", "Liserp Eğitim Dökümanı");`,
        };
    },
};
</script>
