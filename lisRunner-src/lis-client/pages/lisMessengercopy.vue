<template>
    <q-layout view="lHh Lpr lFf" container class="shadow-2 rounded-borders">
        <q-header elevated>
            <q-bar>
                <q-toolbar-title>
                    <q-chip clickable @click="messengerDrawerOpen = !messengerDrawerOpen">
                        <q-avatar
                            icon="message"
                            color="amber"
                            text-color="lHh Lpr lFf"
                        />
                        Lis Messenger
                    </q-chip>
                </q-toolbar-title>
                <q-btn color="red" icon="close" push size="sm" v-close-popup />
            </q-bar>
        </q-header>

        <q-drawer
            v-model="messengerDrawerOpen"
            show-if-above
            bordered
            class="bg-grey-2"
            :width="240"
        >
            
            





    <q-toolbar class="bg-primary text-white shadow-2">
      <q-toolbar-title>Contacts</q-toolbar-title>
    </q-toolbar>

    <q-list bordered>
      <q-item v-for="contact in contacts" :key="contact.id" class="q-my-sm" clickable v-ripple>
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            {{ contact.letter }}
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ contact.name }}</q-item-label>
          <q-item-label caption lines="1">{{ contact.email }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon name="chat_bubble" color="green" />
        </q-item-section>
      </q-item>

      <q-separator />
      <q-item-label header>Offline</q-item-label>

      <q-item v-for="contact in offline" :key="contact.id" class="q-mb-sm" clickable v-ripple>
        <q-item-section avatar>
          <q-avatar>
            <img :src="`https://cdn.quasar.dev/img/${contact.avatar}`">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ contact.name }}</q-item-label>
          <q-item-label caption lines="1">{{ contact.email }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon name="chat_bubble" color="grey" />
        </q-item-section>
      </q-item>
    </q-list>
  













        </q-drawer>

        <q-page-container>
            <q-page padding>
                <q-chat-message
                    :text="['Have you seen lis?']"
                    sent
                    text-color="white"
                    bg-color="primary"
                >
                    <template v-slot:name>me</template>
                    <template v-slot:stamp>7 minutes ago</template>
                    <template v-slot:avatar>
                        <img
                            class="q-message-avatar q-message-avatar--sent"
                            src="https://cdn.quasar.dev/img/avatar4.jpg"
                        />
                    </template>
                </q-chat-message>
                <q-chat-message
                    :text="['Have you seen lis?']"
                    sent
                    text-color="white"
                    bg-color="primary"
                >
                    <template v-slot:name>me</template>
                    <template v-slot:stamp>7 minutes ago</template>
                    <template v-slot:avatar>
                        <img
                            class="q-message-avatar q-message-avatar--sent"
                            src="https://cdn.quasar.dev/img/avatar4.jpg"
                        />
                    </template>
                </q-chat-message>
                <q-chat-message
                    :text="['Have you seen lis?']"
                    :sent="false"
                    text-color="white"
                    bg-color="secondary"
                >
                    <template v-slot:name>me</template>
                    <template v-slot:stamp>7 minutes ago</template>
                    <template v-slot:avatar>
                        <img
                            class="q-message-avatar q-message-avatar--sent"
                            src="https://cdn.quasar.dev/img/avatar4.jpg"
                        />
                    </template>
                </q-chat-message>

                <q-chat-message bg-color="amber">
                    <template v-slot:name>Mary</template>
                    <template v-slot:avatar>
                        <img
                            class="q-message-avatar q-message-avatar--received"
                            src="https://cdn.quasar.dev/img/avatar2.jpg"
                        />
                    </template>

                    <div>
                        Already building an app with it...
                        <img
                            src="https://cdn.quasar.dev/img/discord-qeart.png"
                            class="my-emoji"
                        />
                    </div>
                </q-chat-message>

                <q-chat-message bg-color="amber">
                    <template v-slot:name>Mary</template>
                    <template v-slot:avatar>
                        <img
                            class="q-message-avatar q-message-avatar--received"
                            src="https://cdn.quasar.dev/img/avatar2.jpg"
                        />
                    </template>

                    <div>
                        Already building an app with it...
                        <img
                            src="https://cdn.quasar.dev/img/discord-qeart.png"
                            class="my-emoji"
                        />
                    </div>
                </q-chat-message>

                <q-chat-message bg-color="amber">
                    <template v-slot:name>Mary</template>
                    <template v-slot:avatar>
                        <img
                            class="q-message-avatar q-message-avatar--received"
                            src="https://cdn.quasar.dev/img/avatar2.jpg"
                        />
                    </template>

                    <div>
                        Already building an app with it...
                        <img
                            src="https://cdn.quasar.dev/img/discord-qeart.png"
                            class="my-emoji"
                        />
                    </div>
                </q-chat-message>

                <q-chat-message bg-color="amber">
                    <template v-slot:name>Mary</template>
                    <template v-slot:avatar>
                        <img
                            class="q-message-avatar q-message-avatar--received"
                            src="https://cdn.quasar.dev/img/avatar2.jpg"
                        />
                    </template>

                    <q-spinner-dots size="2rem" />
                </q-chat-message>
                <!-- place QPageScroller at end of page -->
                <q-page-scroller
                    reverse
                    position="top"
                    :scroll-offset="20"
                    :offset="[0, 9]"
                >
                    <q-btn
                        round
                        icon="keyboard_arrow_down"
                        color="accent"
                        glossy 
                        dense
                    />
                </q-page-scroller>
            </q-page>
        </q-page-container>

        <q-footer style="background-color: white">
            <div class="q-pa-xs row justify-center">
                <q-input
                    style="width: 70%"
                    rounded
                    outlined
                    dense
                    v-model="txtTyping"
                    @keydown.enter="sendMessage(txtTyping)"
                ></q-input>
                <q-btn
                    class="q-pa-xs"
                    color="purple"
                    icon="attachment"
                    push
                    size="md"
                    round
                >
                    <q-tooltip
                        anchor="top middle"
                        self="bottom middle"
                        :offset="[10, 10]"
                        >Döküman ekle</q-tooltip
                    >
                </q-btn>
                <q-btn
                    class="q-pa-xs"
                    color="secondary"
                    icon="send"
                    push
                    size="md"
                    round
                    @click="sendMessage(txtTyping)"
                />
            </div>
        </q-footer>
    </q-layout>
</template>

<script>
import io from "socket.io-client";

export default {
    data() {
        return {
            messengerDrawerOpen: true,
            txtTyping: "",
            socket: {},


            contacts : [ {
  id: 1,
  name: 'Ruddy Jedrzej',
  email: 'rjedrzej0@discuz.net',
  letter: 'R'
}, {
  id: 2,
  name: 'Mallorie Alessandrini',
  email: 'malessandrini1@marketwatch.com',
  letter: 'M'
}, {
  id: 3,
  name: 'Elisabetta Wicklen',
  email: 'ewicklen2@microsoft.com',
  letter: 'E'
}, {
  id: 4,
  name: 'Seka Fawdrey',
  email: 'sfawdrey3@wired.com',
  letter: 'S'
} ], offline : [ {
  id: 5,
  name: 'Brunhilde Panswick',
  email: 'bpanswick4@csmonitor.com',
  avatar: 'avatar2.jpg'
}, {
  id: 6,
  name: 'Winfield Stapforth',
  email: 'wstapforth5@pcworld.com',
  avatar: 'avatar6.jpg'
} ]









        };
    },
    methods: {
        sendMessage(txtTyping) {
            console.log(txtTyping);
            this.socket.emit("SEND_MESSAGE", this.txtTyping);
            this.txtTyping = "";
        },
        fetchMessages(data) {
            console.log(data);
        },
    },
    mounted() {
        this.socket = io(localStorage.envFile.lisApi_URL + ":" + localStorage.envFile.lisSocket_PORT);

        this.socket.on("welcome_message", this.fetchMessages);
    },
};
</script>

<style lang="sass">
.my-emoji
  vertical-align: middle
  height: 2em
  width: 2em
</style>
