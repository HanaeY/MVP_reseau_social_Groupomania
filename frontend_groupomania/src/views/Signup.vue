<template>
  <div class="user">
    <h1>Inscription</h1>
    <form action="">
      <label for="username">nom d'utilisateur</label><input type="text" name="" id="username" :value="userName">
      <label for="email">email</label><input type="email" name="" id="email" :value="userEmail">
      <label for="password">mot de passe</label><input type="text" name="" id="password" :value="userPassword">
      <Buttoncomponent class="" content="Je m'inscris" type="submit"/>
    </form>
    <p>déjà inscrit(e) ? <router-link to="/login">Je me connecte</router-link></p>
  </div>
</template>

<script>
import Buttoncomponent from '@/components/Button.vue'
import { mapState } from 'vuex'

export default {
  components: {
    Buttoncomponent
  },
  computed: {...mapState({
    userName: 'username',
    userEmail: 'email',
    userPassword: 'password'
  })}
}
</script>