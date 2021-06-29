<template>
  <div class="user">
    <h1>Connexion</h1>
    <form @submit.prevent="login">
      <label for="email">email</label><input type="email" name="" id="email" required v-model="email">
      <label for="password">mot de passe</label><input type="text" name="" id="password" required v-model="password">
      <button type="submit">Je me connecte</button>
    </form>
    <p>Pas encore inscrit(e) ? <router-link to="/signup">Je créé mon compte</router-link></p>
    <p v-if="error" >{{ error }}</p>
    <p v-if="message" >{{ message }}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import UserService from "@/services/UserService"

export default {
  name: "Login",
  computed: {
    ...mapState(['message'])
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
    }
  }
}
</script>
