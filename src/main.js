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

require('chart.js');
require('hchs-vue-charts');
Vue.use(VueCharts);

import VueHighcharts from 'vue-highcharts';
Vue.use(VueHighcharts);

import ECharts from 'vue-echarts/components/ECharts.vue'
Vue.use(ECharts);

import Orders from './components/Orders.vue';
import Dashboard from './components/Dashboard.vue';
import Ratings from './components/Ratings.vue';
import ProductChart from './components/ProductChart.vue';

const routes = [
  {
        name: 'Ratings',
        path: '/ratings',
        component: Ratings
    },
  {
          name: 'Orders',
          path: '/',
          component: Orders
      },
      {
            name: 'Dashboard',
            path: '/dashboard',
            component: Dashboard
        },
    {
            name: 'ProductChart',
            path: '/chart',
            component: ProductChart
        }
];

const router = new VueRouter({ mode: 'history', routes: routes });
new Vue(Vue.util.extend({ router }, App)).$mount('#app');
