import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GameView from '../views/GameView.vue'
import GameDetails from '../views/GameDetails.vue'
import Signup from '../views/Signup.vue'
import Cart from '../views/Cart.vue'
import AboutView from '../views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/games',
      name: 'games',
      component: GameView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/games/:gameId',
      name: 'game-details',
      component: GameDetails
    },
  ]
})

export default router
