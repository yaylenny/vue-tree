import Vue from 'vue';
import demo from './demo.vue';
import VueTree from "Lib/vue-tree";
Vue.use( VueTree );
/* * *    VUE ROUTER    * * */
// import VueRouter from 'vue-router';
// import routes from './routes.js';
// Vue.use( VueRouter );

new Vue({
  el: `#demo`,
  render:h=>h( demo )
  // router: new VueRouter({ mode: 'hash', routes })
});
