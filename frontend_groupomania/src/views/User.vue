<template>
  <div class="user container">
    <p v-if="error" >{{ error }}</p>
    <h1>Mon compte</h1>

    <div class="bloc bloc__info">
      <h2>Informations</h2>
      <p v-if="user.isadmin">Compte modérateur</p>
      <p>Nom d'utilisateur : {{ user.username }}</p>
      <p>Email : {{ user.email }}</p>
      <p>Compte créé le {{ date }}</p>
      <button class="button button-danger" @click="deleteAccount">Supprimer mon compte</button>
    </div>

    <div class="bloc">
      <h2>Modifier mon profile</h2>
        <p v-if="validationMessage">{{ validationMessage }}</p>

        <h3>Changer mon email</h3>
          <form @submit.prevent="updateEmail">
            <label for="new-email">Nouvel email</label><input type="email" id="new-email" v-model="newEmail"><br>
            <label for="password">Valider avec le mot de passe</label><input type="password" id="password" v-model="currentPassword">
            <button class="button" type="submit">Envoyer</button>
          </form>

        <h3>Changer mon nom d'utilisateur</h3>
          <form @submit.prevent="updateUsername">
            <label for="new-username">Nouveau nom d'utilisateur</label><input type="text" id="new-username" v-model="newUsername"><br>
            <label for="password">Valider avec le mot de passe</label><input type="password" id="password" v-model="currentPassword">
            <button class="button" type="submit">Envoyer</button>
          </form>

        <h3>Changer mon mot de passe</h3>
          <form @submit.prevent="updatePassword">
            <label for="new-password">Nouveau mot de passe</label><input type="text" id="new-password" v-model="newPassword"><br>
            <label for="password">Valider avec le mot de passe</label><input type="password" id="password" v-model="currentPassword">
            <button class="button" type="submit">Envoyer</button>
          </form>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import UserService from '@/services/UserService'

export default {
  data() {
    return {
      error: null,
      newUsername: null,
      newEmail: null, 
      newPassword: null,
      currentPassword: null, 
      validationMessage: null
    }
  },
  computed: {
    ...mapState(['user', 'loggedIn']),
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
    },
    redirectToLogin() {
      if(this.loggedIn == false) {
        this.$router.push('/login');
      }
    },
    clearData() {
        this.currentPassword = null;
        this.newEmail = null;
        this.newPassword = null;
        this.newUsername = null;
    },
    async updateUsername() {
      try {
        const response = await UserService.updateUsername({userid: this.user.id, username: this.newUsername, password: this.currentPassword});
        this.user.username = response.username;
        this.clearData();
        this.error = null;
        this.$store.dispatch("updateUsername", response.username);
        this.validationMessage = "Nom d'utilisateur bien modifié !";
      } catch(e) {
        this.clearData();
        this.error = e.toString();
      }
    },
    async updateEmail() {
      try {
        const response = await UserService.updateEmail({userid: this.user.id, email: this.newEmail, password: this.currentPassword});
        this.user.email = response.email;
        this.clearData();
        this.error = null;
        this.$store.dispatch("updateEmail", response.email);
        this.validationMessage = "Email bien modifié !"
      } catch(e) {
        this.clearData();
        this.error = e.toString();
      }
    },
    updatePassword() {
      //...
    }
  },
  beforeMount() {
    this.redirectToLogin()
  }

}
</script>

<style lang="scss">
.user {
  //height: 100vh;
  width: 530px;
  @media all and (max-width: 800px) {
    width: 90vw;
  }
}

.bloc {
  background-color: white;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 20px;
  box-shadow: 0px 2px 7px #8383bd;
  &__info {
    text-align: center;
  }
}
</style>

