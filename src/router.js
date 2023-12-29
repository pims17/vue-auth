import Home from './components/Home.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import VerificationSent from './components/VerificationSent.vue'
import ForgotPassword from './components/ForgotPassword.vue'
import Feed from './components/Feed.vue'
import HavoA from './components/HavoA.vue'
import HavoAAv from './components/HavoAAv.vue'
import HavoAAlv from './components/HavoAAlv.vue'
import HavoAAlvHaakjesOne from './components/HavoAAlvHaakjesOne.vue'
import HavoAAlvHaakjesTwo from './components/HavoAAlvHaakjesTwo.vue'
import HavoAAlvHaakjesThree from './components/HavoAAlvHaakjesThree.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/verificationsent', name: 'VerificationSent', component: VerificationSent },
  { path: '/forgotpassword', name: 'ForgotPassword', component: ForgotPassword },
  {
    path: '/feed', name: 'Feed', component: Feed, meta: {
      requiresAuth: true
    }
  },
  {
    path: '/havoa', name: 'HavoA', component: HavoA, meta: {
      requiresAuth: true
    }
  },
  {
    path: '/havoaav', name: 'HavoAAv', component: HavoAAv, meta: {
      requiresAuth: true
    }
  },
  {
    path: '/havoaalv', name: 'HavoAAlv', component: HavoAAlv, meta: {
      requiresAuth: true
    }
  },
  {
    path: '/havoaalvhaakjes-1', name: 'HavoAAlvHaakjesOne', component: HavoAAlvHaakjesOne, meta: {
      requiresAuth: true
    }
  },
  {
    path: '/havoaalvhaakjes-2', name: 'HavoAAlvHaakjesTwo', component: HavoAAlvHaakjesTwo, meta: {
      requiresAuth: true
    }
  },
  {
    path: '/havoaalvhaakjes-3', name: 'HavoAAlvHaakjesThree', component: HavoAAlvHaakjesThree, meta: {
      requiresAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user)
      },
      reject
    )
  })
}

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      alert("je hebt geen toegang!");
      next("/");
    }
  } else {
    next();
  }
});

export default router;