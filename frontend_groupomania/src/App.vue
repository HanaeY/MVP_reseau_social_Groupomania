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
    <button class="button" id="logout-button" v-if="loggedIn" @click="logout">Me déconnecter</button>
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
  background-image: url(assets/images/backgroundpattern.png);
}

label {
  margin-right: 10px;
}

input {
  border-radius: 5px;
  width: 200px;
  margin-bottom: 10px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 0.9em;
}

.button {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  background-color: white;
  border: 2px solid;
  border-radius: 7px;
  padding: 5px 10px;
  font-weight: bolder;
  cursor: pointer;
  &-danger {
    border-color: #cc6666;
    padding: 2px 6px;
  }
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
    color: white;
    text-decoration: none;

    &.router-link-exact-active {
      color: white;
      text-decoration: underline;
    }
  }
}

/*
#nav {
  display: flex;
  @media all and (max-width: 800px) {
    flex-direction: column;
  }
}
*/

#logout-button {
  margin-right: 10px;
}
</style>
