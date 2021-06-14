<template>
  <div class="user">
    <h1>Connexion</h1>
    <form action="">
      <label for="email">email</label><input type="email" name="" id="email" :value="userEmail">
      <label for="password">mot de passe</label><input type="text" name="" id="password" :value="userPassword">
      <Buttoncomponent class="" content="Je me connecte" type="submit"/>
    </form>
    <p>Pas encore inscrit(e) ? <router-link to="/signup">Je créé mon compte</router-link></p>
    
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
   userEmail: 'email',
    userPassword: 'password'
  })}
}
</script>
