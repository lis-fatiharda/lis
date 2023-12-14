<template>
    <q-layout view="hHh lpR fFf" container style="background-color: #f4f3ef">
        <q-header reveal bordered class="bg-white">
            <q-bar class="text-black bg-white non-selectable">
                <q-btn
                    icon="mail"
                    color="primary"
                    @click="mailDrawerOpen = !mailDrawerOpen"
                    flat
                />
                <q-toolbar-title> </q-toolbar-title>
                <q-btn
                    color="red"
                    icon="close"
                    size="sm"
                    v-close-popup
                    flat
                    dense
                />
            </q-bar>
        </q-header>

        <q-drawer
            v-model="mailDrawerOpen"
            show-if-above
            bordered
            class="bg-grey-2"
            :width="240"
        >
            <q-list bordered padding class="rounded-borders text-primary">
                <q-item
                    clickable
                    v-ripple
                    :active="link === 'inbox'"
                    @click="link = 'inbox'"
                    active-class="my-menu-link"
                >
                    <q-item-section avatar>
                        <l-icon name="inbox" />
                    </q-item-section>

                    <q-item-section>Inbox</q-item-section>
                </q-item>

                <q-item
                    clickable
                    v-ripple
                    :active="link === 'outbox'"
                    @click="link = 'outbox'"
                    active-class="my-menu-link"
                >
                    <q-item-section avatar>
                        <l-icon name="send" />
                    </q-item-section>

                    <q-item-section>Outbox</q-item-section>
                </q-item>

                <q-item
                    clickable
                    v-ripple
                    :active="link === 'trash'"
                    @click="link = 'trash'"
                    active-class="my-menu-link"
                >
                    <q-item-section avatar>
                        <l-icon name="delete" />
                    </q-item-section>

                    <q-item-section>Trash</q-item-section>
                </q-item>

                <q-separator spaced />

                <q-item
                    clickable
                    v-ripple
                    :active="link === 'settings'"
                    @click="link = 'settings'"
                    active-class="my-menu-link"
                >
                    <q-item-section avatar>
                        <l-icon name="settings" />
                    </q-item-section>

                    <q-item-section>Settings</q-item-section>
                </q-item>

                <q-item
                    clickable
                    v-ripple
                    :active="link === 'help'"
                    @click="link = 'help'"
                    active-class="my-menu-link"
                >
                    <q-item-section avatar>
                        <l-icon name="help" />
                    </q-item-section>

                    <q-item-section>Help</q-item-section>
                </q-item>
            </q-list>
        </q-drawer>
        <q-page-container>
            <q-container>
                <q-list
                    bordered
                    class="rounded-borders"
                    style="max-width: 350px"
                >
                    <q-item-label header>Friends</q-item-label>

                    <q-item clickable v-ripple>
                        <q-item-section avatar>
                            <q-avatar>
                                <img
                                    src="https://cdn.quasar.dev/img/avatar2.jpg"
                                />
                            </q-avatar>
                        </q-item-section>

                        <q-item-section>
                            <q-item-label lines="1"
                                >Brunch this weekend?</q-item-label
                            >
                            <q-item-label caption lines="2">
                                <span class="text-weight-bold">Janet</span>
                                -- I'll be in your neighborhood doing errands
                                this weekend. Do you want to grab brunch?
                            </q-item-label>
                        </q-item-section>

                        <q-item-section side top> 1 min ago </q-item-section>
                    </q-item>

                    <q-separator inset="item" />

                    <q-item clickable v-ripple>
                        <q-item-section avatar>
                            <q-avatar>
                                <img
                                    src="https://cdn.quasar.dev/img/avatar4.jpg"
                                />
                            </q-avatar>
                        </q-item-section>

                        <q-item-section>
                            <q-item-label lines="1"
                                >Linear Project</q-item-label
                            >
                            <q-item-label caption lines="2">
                                <span class="text-weight-bold">John</span>
                                -- Can we schedule a call for tomorrow?
                            </q-item-label>
                        </q-item-section>

                        <q-item-section side top> 1 min ago </q-item-section>
                    </q-item>
                </q-list>
            </q-container>
        </q-page-container>
    </q-layout>
</template>

<script>
export default {
    data() {
        return {
            link: "inbox",
            mailDrawerOpen: true,
        };
    },
};
</script>

<style lang="sass">
.my-menu-link
  color: white
  background: #F2C037
</style>
