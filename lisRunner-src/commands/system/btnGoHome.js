// Go Home Component and open on screen
import home from "../../lis-client/pages/home.vue";
export default async function btnGoHome(tabInfo) {
    tabInfo.name = "home";
    tabInfo.icon = "home";
    tabInfo.label = "Ana Sayfa";
    tabInfo.component = home;
    tabInfo.moduleColor = "grey";
  return tabInfo;
}
