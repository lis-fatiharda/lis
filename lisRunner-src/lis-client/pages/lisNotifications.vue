<template>
    <div class="q-pa-xs">
      <q-list>
        <q-item>
          <q-item-section>

            <div class="row">
              <q-item-label>Bildirim Başlığı</q-item-label>
              <q-space/>
            <q-chip label="BPM Code" outlined dense/>
            </div>
            
            <q-item-label caption lines="2">Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>5 min ago</q-item-label>
            <q-chip dense outline icon="launch" color="teal" clickable/>
            <q-chip dense outline icon="delete" color="red" clickable/>
          </q-item-section>
        </q-item>

        <q-separator spaced inset />

        <q-item>
            <q-item-section>
              <q-item-label>Single line item</q-item-label>
              <q-item-label caption lines="2">Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
            </q-item-section>

            <q-item-section side top>
              <q-item-label caption>5 min ago</q-item-label>
              <q-chip dense outline icon="launch" color="teal" clickable/>
              <q-chip dense outline icon="delete" color="red" clickable/>
            </q-item-section>
          </q-item>

          <q-separator spaced inset />

          <q-item>
            <q-item-section>
              <q-item-label>Single line item</q-item-label>
              <q-item-label caption lines="2">Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
            </q-item-section>

            <q-item-section side top>
              <q-item-label caption>5 min ago</q-item-label>
              <q-chip dense outline icon="launch" color="teal" clickable/>
              <q-chip dense outline icon="delete" color="red" clickable/>
            </q-item-section>
          </q-item>

          <q-separator spaced inset />

          <q-item>
            <q-item-section>
              <q-item-label>Single line item</q-item-label>
              <q-item-label caption lines="2">Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
            </q-item-section>

            <q-item-section side top>
              <q-item-label caption>5 min ago</q-item-label>
              <q-chip dense outline icon="launch" color="teal" clickable/>
              <q-chip dense outline icon="delete" color="red" clickable/>
            </q-item-section>
          </q-item>

      </q-list>
    </div>
</template>

<script>
export default {
    data() {
        return {
            expanded: false,
            lorem: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        };
    },
};
</script>

<style lang="sass">
.my-emoji
  vertical-align: middle
  height: 2em
  width: 2em
</style>
