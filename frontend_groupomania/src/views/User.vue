<template>
  <div class="user">
    <h1>Mon compte</h1>
    <p>Nom d'utilisateur : {{ user.username }}</p>
    <p>Email : {{ user.email }}</p>
    <p>Compte créé le {{ date }}</p>
    <button @click="deleteAccount">Supprimer mon compte</button>
    <p v-if="error" >{{ error }}</p>
    
  </div>
</template>

<script>
import { mapState } from 'vuex'
import UserService from '@/services/UserService'

export default {
  data() {
    return {
      error: null
    }
  },
  computed: {
    ...mapState(['user']),
    date() {
      return this.user.createdAt.split('T')[0];
    }
  },
  methods: {
    async deleteAccount() {
      try {
        const response = await UserService.deleteAccount({userid: this.user.id});
        this.$store.dispatch("logout", response.message);
      } catch(error) {
        this.error = error.toString();
      }
    }
  }

}
</script>
