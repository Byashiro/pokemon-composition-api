import { createRouter, createWebHashHistory } from "vue-router";
import { defineAsyncComponent } from "vue";
import PokemonQuizz from "../pages/PokemonQuizz.vue";
import PokemonData from "../components/PokemonData.vue";
import PokemonDescription from "../components/PokemonDescription.vue";

const routes = [
  {
    path: '/quizz',
    name: 'quizz',
    component: PokemonQuizz,
    children: [
      {
        path: '',
        name: 'data',
        component: PokemonData,
        children: [
          {
            path: '/quizz/data/:id/description',
            name: 'description',
            component: PokemonDescription,
          },
        ],
      },
    ],
  },
];

export default routes;
