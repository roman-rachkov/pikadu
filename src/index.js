import "./js/common"
import "./assets/scss/main.scss"
import "./assets/css/main.css"

window.Vue = require('vue');
import store from './store';

Vue.component('example-component', require('./components/Example.vue').default)

const app = new Vue({
    data(){
        return{
            showExampleComponent: false
        }
    },
    store,
    el: '#app',
})