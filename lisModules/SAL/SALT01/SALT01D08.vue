<template>
  <!-- <l-card style="width: 49%; min-width: 320px">
    <l-card-section-flex> </l-card-section-flex>
  </l-card>

  <l-card style="width: 50%; min-width: 320px">
    <l-card-section-flex> </l-card-section-flex>
  </l-card> -->
  <l-card style="width: 100%">
    <q-markup-table style="width: 100%" separator="cell" bordered>
      <thead>
        <tr class="bg-blue-grey-2">
          <th style="width: 35px">
            {{ this.$gl("No", "No") }}
          </th>
          <th style="width: 55px">
            {{ this.$gl("Tipi", "Type") }}
          </th>
          <th style="width: 55px">
            {{ this.$gl("Gün", "Day") }}
          </th>
          <th style="width: 290px">
            {{ this.$gl("Tarih", "Date") }}
          </th>
          <th style="width: 200px">
            {{ this.$gl("Yüzde %", "Percent %") }}
          </th>
          <th style="width: 200px">
            {{ this.$gl("Ödeme Tutarı", "Payment Total") }}
          </th>
          <th style="width: 65px">
            {{ this.$gl("Statü", "Status") }}
          </th>
          <th>{{ this.$gl("Not", "Note") }}</th>
          <th></th>
        </tr>
      </thead>
      <tbody @change="calcPayDay()">
        <tr v-for="(item, index) in dv.lissaldocs.payplan" :key="index">
          <td>
            <l-chip :label="index + 1" />
          </td>
          <td>
            <l-select
              v-model="dv.sc.saldept"
              options="lisbas011"
              optValue="paytype"
              optTitle="stext"
              optCaptions="paytype"
              width="130px"
            />
          </td>
          <td>
            <l-input
              borderless
              dense
              v-model="item.payday"
              @change="calcpaydate()"
            />
          </td>
          <td>
            <l-date
              v-model="item.paydate"
              @change="calcPayDay();"
              style="width: 140px"
            />
          </td>
          <td>
            <l-input
              type="number"
              borderless
              dense
              v-model="item.paypercent"
              @change="calcPayPercent()"
            />
          </td>
          <td>
            <l-input
              borderless
              dense
              v-model="item.payamount"
              @change="calcPayAmount()"
            />
          </td>
          <td>
            <l-input borderless dense v-model="item.paystat" />
          </td>
          <td>
            <l-input borderless dense v-model="item.ltext" />
          </td>
          <td>
            <l-chip
              icon="cancel"
              dense
              clickable
              text-color="negative"
              class="bg-white"
              @click="removePayplan(index)"
            />
          </td>
        </tr>
      </tbody>
    </q-markup-table>
    <l-chip
      dense
      justify="right"
      icon="add"
      clickable
      rounded
      glossy
      color="secondary"
      text-color="white"
      @click="pushNewPayplan()"
    />
  </l-card>
</template>

<script>
export default {
  props: ["dv", "tabInfo"],

  methods: {
    calcPayAmount() {
      var sumAmount = 0;
      for (let i in this.dv.lissaldocs.payplan) {
        let tmpPayPlan = this.dv.lissaldocs.payplan[i];

        if (
          sumAmount + parseInt(tmpPayPlan.payamount) <=
          this.dv.lissaldocs.grandtotal
        ) {
          sumAmount += parseInt(tmpPayPlan.payamount);
          if (parseInt(i) + 1 == this.dv.lissaldocs.payplan.length) {
            tmpPayPlan.payamount += this.dv.lissaldocs.grandtotal - sumAmount;
            sumAmount = this.dv.lissaldocs.grandtotal;
          }
        } else {
          tmpPayPlan.payamount = this.dv.lissaldocs.grandtotal - sumAmount;
          sumAmount = this.dv.lissaldocs.grandtotal;
        }

        tmpPayPlan.paypercent =
          (tmpPayPlan.payamount / this.dv.lissaldocs.grandtotal) * 100;
      }
    },
    calcPayDay() {
      for (let i in this.dv.lissaldocs.payplan) {
        let tmpPayPlan = this.dv.lissaldocs.payplan[i];
        tmpPayPlan.payday =
          Math.round(
            (new Date(tmpPayPlan.paydate) - new Date()) / (1000 * 60 * 60 * 24)
          ) + 1;
      }
    },
    calcpaydate() {
      for (let i in this.dv.lissaldocs.payplan) {
        let tmpPayPlan = this.dv.lissaldocs.payplan[i];
        let tmpDate = new Date();

        tmpDate.setDate(
          Math.round(tmpDate.getDate()) + Math.round(tmpPayPlan.payday)
        );
        console.log(tmpDate);
        let pmtMonth = tmpDate.getMonth() + 1;
        tmpPayPlan.paydate =
          pmtMonth + "." + tmpDate.getDate() + "." + tmpDate.getFullYear();
        console.log(tmpPayPlan.paydate);
      }
    },
    calcPayPercent() {
      var sumPercent = 0;
      for (let i in this.dv.lissaldocs.payplan) {
        let tmpPayPlan = this.dv.lissaldocs.payplan[i];

        if (sumPercent + parseInt(tmpPayPlan.paypercent) <= 100) {
          sumPercent += parseInt(tmpPayPlan.paypercent);
          if (
            (parseInt(i) + 1 == this.dv.lissaldocs.payplan.length) &
            (this.dv.lissaldocs.payplan.length > 1)
          ) {
            tmpPayPlan.paypercent += 100 - sumPercent;
            sumPercent = 100;
          }
        } else {
          tmpPayPlan.paypercent = 100 - sumPercent;
          sumPercent = 100;
        }
        console.log("tmpPayPlan.payamount");

        console.log(this.dv.lissaldocs.grandtotal);
        console.log("tmpPayPlan.payamount");

        tmpPayPlan.payamount =
          this.dv.lissaldocs.grandtotal *
          (parseInt(tmpPayPlan.paypercent) / 100);
      }
    },
    async pushNewPayplan() {
      let myReturn = await this.lis.function("SALT01/pushNewPayplan", this.dv);

      this.dv.lissaldocs.payplan.push(myReturn);
      //this.$Axios.post("SALT01/pushNewPayplan", this.dv).then((res) => {
      //  console.log(res.data);
      //  this.dv.lissaldocs.payplan.push(res.data);
      //});
    },
    removePayplan(index) {
      this.dv.lissaldocs.payplan.splice(index, 1);
    },
  },
};
</script>
