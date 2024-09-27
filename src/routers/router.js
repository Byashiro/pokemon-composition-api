import { createRouter, createWebHashHistory } from "vue-router";
import { defineAsyncComponent } from "vue";
import quizzRouter from '../modules/quizz/routers/router';
import Home from '../pages/Home.vue';
import Pokedex from '../pages/Pokedex.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/pokedex',
    name: 'pokedex',
    component: Pokedex
  },
  ...quizzRouter,
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

const router = createRouter({
  // history: createWebHashHistory(),
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;