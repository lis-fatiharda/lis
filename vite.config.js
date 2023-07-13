import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { quasar, transformAssetUrls } from "@quasar/vite-plugin";
import Components from "unplugin-vue-components/vite";

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        hmr: {
            clientPort: 443,
            overlay: true,
        },
    },

    //base: "/opt/liserp/",

    plugins: [
        vue({
            template: { transformAssetUrls },
        }),

        quasar({
            sassVariables: "lisRunner/quasar-variables.sass",
        }),

        Components({ dirs: ["/opt/liserp/lisModules"] }),
    ],
});
