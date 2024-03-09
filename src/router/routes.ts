import { RouteRecordRaw } from 'vue-router'
import { links } from 'src/common/routerLinks'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', component: () => import('pages/IndexPage.vue') },
      {
        path: links.EXCHANGE.path,
        name: links.EXCHANGE.name,
        component: () => import('pages/Exchange.vue')
      },
      {
        path: links.SCAN.path,
        name: links.SCAN.name,
        component: () => import('pages/ScanPage.vue')
      },
      {
        path: links.ONBOARDING.path,
        name: links.ONBOARDING.name,
        component: () => import('pages/OnboardingPage.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
