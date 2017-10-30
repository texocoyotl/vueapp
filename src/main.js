import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import './stylus/main.styl'

Vue.use(Vuetify)

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios, axios);

import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);

var longpress = require('vue-long-press-directive')
Vue.use(longpress, { duration: 1000 })

import CreateItem from './components/CreateItem.vue';
import DisplayItem from './components/DisplayItem.vue';
import EditItem from './components/EditItem.vue';
import Ratings from './components/Ratings.vue';

const routes = [
  {
        name: 'Ratings',
        path: '/',
        component: Ratings
    },
  {
          name: 'DisplayItem',
          path: '/asdf',
          component: DisplayItem
      },
      {
            name: 'EditItem',
            path: '/edit/:id',
            component: EditItem
        }
];

const router = new VueRouter({ mode: 'history', routes: routes });
new Vue(Vue.util.extend({ router }, App)).$mount('#app');
