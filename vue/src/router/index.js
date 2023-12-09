import { createRouter, createWebHistory } from 'vue-router'
import Customers from '../views/Customers.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'customers',
      component: Customers
    },
    {
      path: '/create',
      name: 'customers.create',
      component: Customers
    },
    {
      path: '/update/:id',
      name: 'customers.update',
      props:true,
      component: Customers

    },
    {
      path: '/show/:id',
      name: 'customers.show',
      props:true,
      component: Customers

    },
    {
      path: '/channels',
      name: 'channels',

      component: () => import('../views/Channels.vue')
    },
    {
      path: '/channels/:id',
      name: 'channels.this',

      component: () => import('../views/Channels.vue')
    },
    {
      path: '/channels/create',
      name: 'channels.create',

      component: () =>
        import('../views/Channels.vue')

    },
    {
      path: '/channels/create/:id',
      name: 'channels.create.set',

      component: () =>
          import('../views/Channels.vue')

    },
    {
      path: '/channels/update/:id',
      name: 'channels.update',
      props:true,
      component: () =>
          import('../views/Channels.vue')

    },
    {
      path: '/channels/show/:id',
      name: 'channels.show',
      props:true,
      component: () =>
          import('../views/Channels.vue')

    }
  ]
})




export default router
