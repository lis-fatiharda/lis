<template>
    <l-div style="height: 100%">
        <l-card class="bg-grey-2">
            <l-toolbar-title>lis.like</l-toolbar-title>
        </l-card>

        <l-card>
            <l-div-flex>
                <div class="text-h6">Definition</div>

                <l-space />

                <l-chip label="backend" color="negative" class="text-white" />
            </l-div-flex>
            <l-separator />

            <l-card-section>
                It covers the search criteria like % in SQL <br />
<br />

<div class="text-subtitle2 text-red">Backend usage</div>
                    lis.like([Search_Criteria]); <br />



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
            code: `dv.salDocList = await lissaldocs.find({
    company: lis.like(dv.sc.company),
    busarea: lis.like(dv.sc.busarea),
    doctype: lis.like(dv.sc.doctype),
    docnum: lis.like(dv.sc.docnum),
    project: lis.like(dv.sc.project),
    saldept: lis.like(dv.sc.saldept),
    customer: lis.like(dv.sc.customer),
    name1: lis.like(dv.sc.name1),
    material: lis.like(dv.sc.material),
    mtext: lis.like(dv.sc.mtext),
  });`,
        };
    },
};
</script>
