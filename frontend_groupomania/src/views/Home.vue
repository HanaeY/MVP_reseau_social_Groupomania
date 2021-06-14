<template>
  <div class="home">
    <h1>Bienvenue {{ user.username }}</h1>
    <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <h2>Forums</h2>
      <div id="buttons">
        <button><router-link to="/forum_media">Forum media</router-link></button>
        <button>Forum articles</button>
      </div>
    <h2>Dernières publications</h2>
      <Article/>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import Article from '@/components/Article.vue'
import { mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
    Article
  },
  computed: {
    ...mapState({
      user: "user"
  })}
}
</script>

<style lang="scss">
  #buttons {
    display: flex;
    justify-content: center;
    button {
      width: 400px;
      height: 100px;
      margin: 10px;
    }
  }
</style>
