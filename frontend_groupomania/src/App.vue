<template>
  <div id="app">
    <header class="header">
      <div>
        <img src="./assets/images/logo_groupomania.svg" alt="logo Groupomania">
      </div>
      <div id="nav" v-if="loggedIn">
        <router-link to="/">Accueil</router-link> |
        <router-link to="/user">Mon compte</router-link>
    </div>
    </header>
    <button v-if="loggedIn" @click="logout">Me déconnecter</button>
    <router-view/>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'App',
  computed: {...mapState(['loggedIn'])},
  methods: {
    logout() {
      this.$store.dispatch("logout");
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000033;
}

.header {
  padding: 20px;
  background-color: #000033;
  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    width: 150px;
  }

  a {
    font-weight: bold;
    color: #cc6666;
    text-decoration: none;

    &.router-link-exact-active {
      color: white;
      text-decoration: underline;
    }
  }
}
</style>
