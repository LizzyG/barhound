import { createRouter, createWebHistory } from 'vue-router';

// Import views
const Home = () => import('../views/Home.vue');
const About = () => import('../views/About.vue');
const NotFound = () => import('../views/NotFound.vue');

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'BarHound - Find Your Perfect Bar'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      title: 'About BarHound'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: {
      title: 'Page Not Found'
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

// Update page title
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'BarHound';
  next();
});

export default router; 