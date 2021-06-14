<template>
  <div class="user">
    <h1>Mon compte</h1>
    <p>Nom d'utilisateur : {{ user.username }}</p>
    <p>Email : {{ user.email }}</p>
    <Buttoncomponent class="" content="Supprimer mon compte" type="submit"/>
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
    user: 'user'
  })}
}
</script>
