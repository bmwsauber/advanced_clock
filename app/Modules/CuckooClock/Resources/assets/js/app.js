window.Vue = require('vue');
window.axios = require('axios');


Vue.use(require('vue-moment'));


Vue.component('clock', require('./components/Clock.vue').default);

const app = new Vue({
    el: '#app'
})
