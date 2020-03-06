import './css/style.css'
import './js/main.js'

import Vue from 'vue'
import App from './vue/app.vue'

let element = document.querySelector('#app')
console.log("element", element)

if (element) {
  new Vue({
    render: (h) => h(App)
  }).$mount(element)
}
