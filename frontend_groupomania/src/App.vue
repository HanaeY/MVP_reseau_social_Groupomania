<template>
  <div id="app">
    <header class="header">
      <img class="header__logo" src="./assets/images/logo_groupomania.svg" alt="logo Groupomania">
      <div class="header__nav" v-if="loggedIn">
        <router-link to="/" class="header__nav-child">Accueil</router-link> 
        <router-link to="/user" class="header__nav-child header__nav-child-2">Mon compte</router-link> 
        <button @click="logout" class="header__nav-child">Me déconnecter</button>
    </div>
    </header>
    <router-view/>
    <footer class="footer"></footer>
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
  color: #000033;
  background-image: url(assets/images/backgroundpattern.png);
  min-height: 100vh;
}

.container {
  width: 50vw;
  margin: auto;
  @media all and (max-width: 800px) {
    width: 90vw;
  }
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
  color: #000033;
  background-color: white;
  border: 2px solid #000033;
  border-radius: 7px;
  padding: 5px 10px;
  font-weight: bolder;
  cursor: pointer;
  margin-bottom: 5px;
  &-danger {
    border-color: #cc6666;
    padding: 2px 6px;
  }
  &-logout {
    margin-top: 10px;
    float: right;
    margin-right: 10px;
  }
}

.header {
  background-color: #000033;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
    @media all and (max-width: 800px) {
      flex-direction: column;
      align-items: flex-start;
    }
  padding: 10px;
  &__logo {
    display: block;
    width: 200px;
    @media all and (max-width: 800px) {
      width: 150px;
    }
  }
  &__nav {
    display: flex;
    justify-content: space-between;
    @media all and (max-width: 800px) {
       align-self: center;
    }
    a {
      text-decoration: none;
      color: white;
      font-weight: bold;
      &:hover {
        text-decoration-line: underline;
      }
    }
    button {
      color: white;
      background-color: unset;
      border: none;
      font-family: Avenir, Helvetica, Arial, sans-serif;
      font-weight: bold;
      font-size: 1em;
      padding: 0px;
      @media all and (max-width: 800px) {
       font-size: 0.8em;
      }
      &:hover {
        cursor: pointer;
        text-decoration-line: underline;
      }
    }
    &-child {
      margin: 10px;
      @media all and (max-width: 800px) {
       font-size: 0.8em;
       margin: 5px;
       margin-top: 10px;
       &-2 {
         border-left: 1px solid white;
         border-right: 1px solid white;
         padding: 0px 10px 0px 10px;
       }
      }
    }
  }
}

.footer {
  padding: 20px;
  background-color: #cc6666;
  position: fixed;
  bottom: 0;
  width: 100vw;
}

</style>