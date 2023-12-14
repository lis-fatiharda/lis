<template>
    <div>
        <q-chip dense style="background: white">{{ date }}</q-chip>
        <q-chip dense style="background: white">{{ time }}</q-chip>
    </div>
</template>

<script>
import { format } from "date-fns";
export default {
    data() {
        return {
            time: "",
            date: "",
            week: ["PAZ", "PZT", "SAL", "ÇAR", "PER", "CUM", "CTS"],
            weekE: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
        };
    },

    methods: {
        format,
        zeroPadding(num, digit) {
            var zero = "";
            for (var i = 0; i < digit; i++) {
                zero += "0";
            }
            return (zero + num).slice(-digit);
        },
        updateTime() {
            var cd = new Date();
            this.time =
                this.zeroPadding(cd.getHours(), 2) +
                ":" +
                this.zeroPadding(cd.getMinutes(), 2) +
                ":" +
                this.zeroPadding(cd.getSeconds(), 2);
            this.date =
                this.zeroPadding(cd.getDate(), 2) +
                "." +
                this.zeroPadding(cd.getMonth() + 1, 2) +
                "." +
                this.zeroPadding(cd.getFullYear(), 4) + ", " + this.$gl(this.week[cd.getDay()],this.weekE[cd.getDay()]);
        },
    },
    mounted() {
        //this.updateTime();
        var timerID = setInterval(this.updateTime, 1000);
    },
};
</script>
