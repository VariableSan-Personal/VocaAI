import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../views/HomeView.vue'),
    },

    {
      path: '/learn',
      component: () => import('../layouts/BaseLayout.vue'),

      children: [
        {
          path: '',
          name: 'learn',
          component: () => import('../views/LearnView.vue'),
        },
        {
          path: '/vocabulary',
          name: 'vocabulary',
          component: () => import('../views/VocabularyView.vue'),
        },
        {
          path: '/menu',
          name: 'menu',
          component: () => import('../views/MenuView.vue'),
          children: [
            {
              path: 'settings',
              name: 'settings',
              component: () => import('../views/SettingsView.vue'),
              meta: {
                showBack: true,
              },
            },
          ],
        },
      ],
    },

    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
})
