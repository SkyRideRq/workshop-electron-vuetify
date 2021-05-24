import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import db from "./db/datastore";
import dbParts from "./dbParts/datastore";
import icons from "./assets/icons";

Vue.prototype.$db = db;

Vue.prototype.$dbParts = dbParts;
Vue.prototype.$icons = icons;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,

  render: (h) => h(App),
}).$mount("#app");
