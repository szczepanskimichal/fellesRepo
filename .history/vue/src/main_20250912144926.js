import Vue from 'vue' 

new Vue({
    el: '#app',
    data: {
        name:"Michal",
        myColor: {
            color: "#ffaabb",
        },
    },
    template: '<h1 v-bind:style="myColor">Velkommen {{ name }}!</h1>'
})
