<template>
    <q-img
        name="first"
        src="../../../configs/assets/bgImage.png"
        style="height: 92.9vh"
        class="row justify-center items-center"
    >
        <q-card class="cursor-pointer">
            <q-card-section>Favori Uyulamalar</q-card-section>
            <l-separator />

            <div
                v-for="favPage in lv.favPages"
                :key="favPage.code"
                class="q-pa-xs"
                @click="emitToTransaction(favPage)"
            >
                {{ favPage.code }} - {{ favPage.stext }}

                <q-menu touch-position context-menu>
                    <q-list dense style="min-width: 100px">
                        <q-item
                            @click="emitToFavPage(favPage.code)"
                            clickable
                            v-close-popup
                        >
                            <q-item-section>Kaldır</q-item-section>
                        </q-item>
                    </q-list>
                </q-menu>
            </div>
        </q-card>
        <div class="absolute-bottom custom-caption">
            <div class="text-h2"></div>
            <div class="text-subtitle1">Living Industrial Solutions</div>
        </div>
    </q-img>
</template>

<script>
export default {
    props: ["lv", "tabInfo"],
    data() {
        return {};
    },
    methods: {
        emitToTransaction(favPage) {
            this.$emit("goToTransaction", {
                component: favPage.component,
                code: favPage.code,
                moduleColor: favPage.moduleColor,
            });
        },
        emitToFavPage(favPage) {
            console.log("addFavPage", favPage)
            this.$emit("addFavPage", favPage);
        },
    },
};
</script>

<style lang="sass" scoped>
.custom-caption
  text-align: center
  padding: 12px
  color: white
  background-color: rgba(0, 0, 0, .3)
</style>
