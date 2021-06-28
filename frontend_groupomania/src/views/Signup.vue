<template>
  <div class="user">
    <h1>Inscription</h1>
    <form @submit.prevent="signup">
      <label for="username">nom d'utilisateur</label><input type="text" name="username" id="username" required v-model="username">
      <label for="email">email</label><input type="email" name="email" id="email" required v-model="email">
      <label for="password">mot de passe</label><input type="text" name="password" id="password" required v-model="password">
      <!--<Buttoncomponent content="Je m'inscris" type="submit"/>-->
      <button type="submit">Je m'inscris</button>
    </form>
    <p>déjà inscrit(e) ? <router-link to="/login">Je me connecte</router-link></p>
    <p v-if="error" >{{ error }}</p>
  </div>
</template>

<script>
//import Buttoncomponent from '@/components/Button.vue'
import UserService from '@/services/UserService'

export default {
  name: 'Signup',
  data() {
    return {
      email:"",
      password: "",
      username: "",
      error: null
    }
  },
  components: {
    //Buttoncomponent
  },
  methods: {
    async signup() {
      try {
        const response = await UserService.signup({email: this.email, username: this.username, password: this.password});
        this.$store.dispatch("login", {user: response.user, token: response.token});
      } catch(error) {
        this.error = error.toString();
      }
    }
  }
}
</script>