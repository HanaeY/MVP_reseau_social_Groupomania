<template>
  <div id="app">
    <header class="header">
      <img class="header__logo" src="./assets/images/logo_groupomania.svg" alt="logo Groupomania">
      <nav class="header__nav" v-if="loggedIn">
        <router-link to="/" class="header__nav-child">Accueil</router-link> 
        <router-link to="/user" class="header__nav-child header__nav-child-2">Mon compte</router-link> 
        <button @click="logout" class="header__nav-child">Déconnexion</button>
      </nav>
    </header>
    <main>
      <router-view/>
    </main>
    <footer class="footer">
      <div class="sitemap">
      <h3>Accès directs</h3>
        <nav>
          <ul>
            <li><router-link v-if="!loggedIn" to="/signup"><i class="fas fa-rocket"></i> Connexion</router-link></li>
            <li><router-link v-if="!loggedIn" to="/login"><i class="fas fa-rocket"></i> Inscription</router-link></li>
            <li><router-link v-if="loggedIn" to="/"><i class="fas fa-rocket"></i> Accueil</router-link></li>
            <li><router-link v-if="loggedIn" to="/user"><i class="fas fa-rocket"></i> Mon compte</router-link></li>
            <li><router-link v-if="loggedIn" to="/forum_media"><i class="fas fa-rocket"></i> Forum multimedia</router-link></li>
          </ul>
        </nav>
      </div>
    </footer>
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
// styles globaux des vues et composants 
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #000033;
    background-image: url(assets/images/backgroundpattern.png);
    min-height: 100vh;
    width: 100vw;
    position: relative;
  }

  main {
    padding-bottom: 120px; // hauteur du footer
  }

  .container {
    width: 50vw;
    margin: auto;
    @media all and (max-width: 800px) {
      width: 90vw;
    }
  }

  .fa-info-circle {
    margin: 0 5px 0 5px;
  }

  .error {
    background-color: #cc666660;
    width: 40vw;
    margin: auto;
    border-radius: 5px;
    padding: 5px;
    font-size: 1.1em;
    text-align: center;
    margin-bottom: 20px;
    @media all and (max-width: 800px) {
      width: 90vw;
    }
  }

  .message-info {
    background-color: #18a52b60;
    width: 30vw;
    margin: auto;
    border-radius: 5px;
    padding: 5px;
    font-size: 1.1em;
    text-align: center;
    margin-bottom: 20px;
    @media all and (max-width: 800px) {
      width: 80vw;
    }
  }

  label {
    display: inline-block;
    margin-bottom: 5px;
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
    color : white;
    background-color: #000033;
    border: none;
    border-radius: 7px;
    padding: 10px 15px;
    font-weight: bolder;
    cursor: pointer;
    margin-bottom: 5px;
    box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.418);
    &:hover {
      box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.418);
    }
    &-danger {
      background-color: #BA4E56;
      padding: 5px 10px;
    }
    &-logout {
      margin-top: 10px;
      float: right;
      margin-right: 10px;
    }
  }

// styles des élément header et footer 
  .header {
    background-color: #000033;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 5px solid #BA4E56;
      @media all and (max-width: 800px) {
        flex-direction: column;
        align-items: flex-start;
      }
    padding: 10px 20px 10px 20px;
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
        font-size: 0.9em;
        text-transform: uppercase;
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
        text-transform: uppercase;
        font-size: 0.9em;
        padding: 0px;
        @media all and (max-width: 800px) {
        font-size: 0.9em;
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
          border-left: 2px solid white;
          border-right: 2px solid white;
          padding: 0px 10px 0px 10px;
        }
        }
      }
    }
  }

  .footer {
    background-color: #00003354;
    position: absolute;
    bottom: 0;
    width: 100vw;
    height: 120px;
    h3 {
      font-size: 1em;
      display: inline-block;
      margin-bottom: 0;
      color: #000033;
    }
    .sitemap {
      padding-left: 20px;
    }
    ul {
      list-style: none;
      padding-left: 10px;
      font-weight: bold;
    }
    a {
      color: #000033;
      text-decoration-line: none;
      &:hover {
        text-decoration-line: underline;
      }
    }
  }

</style>
