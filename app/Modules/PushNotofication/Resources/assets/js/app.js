window.Vue = require('vue');
window.axios = require('axios');

Vue.component('messages', require('./components/Messages.vue').default);

import Pusher from 'pusher-js';
// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

let pusher = new Pusher('3649e657e1e0a1e1b361', {
    cluster: 'eu'
});

let channel = pusher.subscribe('my-channel');
channel.bind('my-event', function(data) {
    app.messages.push(JSON.stringify(data));
});

/*
const app = new Vue({
    el: '#app'
})
*/
