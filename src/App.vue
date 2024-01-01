<template>
  <div class="container" id="app">
    <Nav />
    <div :class="$route.path === '/login' ||
      $route.path === '/register' ||
      $route.path === '/' ||
      $route.path === '/forgotpassword' ||
      $route.path === '/verificationsent' ? 'auth-wrapper' : 'feed-wrapper'">
      <div :class="$route.path === '/login' ||
        $route.path === '/register' ||
        $route.path === '/' ||
        $route.path === '/forgotpassword' ||
        $route.path === '/verificationsent' ? 'auth-inner' : 'feed-inner'">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Nav from './components/Nav.vue'

export default {
  name: 'App',
  components: {
    Nav
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Fira+Sans:400,500,600,700,800');

* {
  box-sizing: border-box
}

body {
  background: #1C8EF9 !important;
  min-height: 100vh;
  display: flex;
  font-weight: 400;
  font-family: 'Fira Sans', sans-serif;
}

h1,
h2,
h3,
h4,
h5,
h6,
label,
span {
  font-weight: 500;
  font-family: 'Fira Sans', sans-serif;
}

body,
html,
#app,
#root,
.auth-wrapper {
  width: 100%;
  height: 100%;
}

body {
  padding-top: 70px;
}

#app {
  text-align: center;
}

.navbar-light {
  background-color: #ffffff;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
}

.auth-wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: left;
}

.feed-wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: left;
  padding-bottom: 20px;
}

.auth-inner {
  width: 455px;
  margin: auto;
  background: #ffffff;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
  padding: 40px 55px 45px 55px;
  border-radius: 15px;
}

.feed-inner {
  width: 100%;
  margin: auto;
  background: #1C8EF9;
  padding: 40px 55px 45px 55px;
  border-radius: 15px;
}

.auth-wrapper .form-control:focus {
  border-color: #167bff;
  box-shadow: none;
}

.auth-wrapper h3 {
  text-align: center;
  margin: 0;
  line-height: 1;
  padding-bottom: 20px;
}

.custom-control-label {
  font-weight: 400;
}
@import "../node_modules/katex/dist/katex.min.css";
</style>