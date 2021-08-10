import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

new Vue({
  data: {
    premium: true,
  },
  render: (h) => h(App),
}).$mount("#app");
