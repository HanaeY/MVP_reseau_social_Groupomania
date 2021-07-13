<template>
  <div class="login">
    <h1>Connexion</h1>
    <form @submit.prevent="login">
      <label for="email">email</label><br>
      <input type="email" name="" id="email" required v-model="email"><br>
      <label for="password">mot de passe</label><br>
      <input type="password" name="" id="password" required v-model="password">
      <br>
      <button type="submit" class="button">Je me connecte</button>
    </form>
    <p>Pas encore inscrit(e) ? <router-link to="/signup">Je créé mon compte</router-link></p>
    <p v-if="error" class="error" role="alert">{{ error }}</p>
    <p v-if="message" >{{ message }}</p>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import UserService from "@/services/UserService"

  export default {
    name: "Login",
    computed: {
      ...mapState(['message', 'loggedIn'])
    },
    data() {
      return {
        email: "",
        password: "",
        error: null
      }
    },
    methods: {
      async login() {
        try {
          const response = await UserService.login({email: this.email, password: this.password});
          this.$store.dispatch("login", {user: response.user, token: response.token});
        } catch(error) {
          this.error = error.toString();
        }
      },
      redirectToHome() {
        if(this.loggedIn == true) {
          this.$router.push('/');
        }
      }
    },
    beforeMount() {
      this.redirectToHome()
    }
  }
</script>

<style lang="scss" scoped>
  .login {
    text-align: center;
  }
</style>
