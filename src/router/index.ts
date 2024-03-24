import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '',
      component: () => import('../views/auth/AuthPage.vue'),
      children:[
        {
          path: '/',
          name: 'login',
          component: () => import('../views/auth/LoginPage.vue'),
        },
        {
          path: '/register',
          name: 'register',
          component: () => import('../views/auth/RegisterPage.vue'),
        }
      ]
    },

    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/AdminPage.vue'),
      children:[
        {
          path: '/admin',
          name: 'dashboard',
          component: () => import('../views/admin/dashbaord/DashbaordPage.vue'),
        },
        {
          path: '/create-post',
          name: 'create-post',
          component: () => import('../views/admin/createPost/CreatePostPage.vue'),
        },
        {
          path: '/post-lists',
          name: 'psot-lists',
          component: () => import('../views/admin/postList/PostListPage.vue'),
        },
      ]
    },

   
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
