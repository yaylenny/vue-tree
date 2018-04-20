import Vue from 'vue';
import demo from './demo.vue';

import VueTree from "Lib/vue-tree";
Vue.use( VueTree );


new Vue({
  el: `#demo`,
  render:h=>h( demo )
});
