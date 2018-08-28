import Vue from "vue";
import App from "./App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCoffee,
  faStar,
  faEnvelope,
  faHome
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "./registerServiceWorker";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";

library.add(
  faCoffee,
  faStar,
  faStarRegular,
  faFacebookSquare,
  faEnvelope,
  faHome
);
Vue.component("fa-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");

/*
window.addEventListener("beforeinstallprompt", function(event) {
  alert("ok stuff");
  console.log("before install prompt");
  //  event.prompt();
});
*/
