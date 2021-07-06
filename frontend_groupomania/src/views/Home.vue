<template>
  <div class="home">
    <h1>Bienvenue {{ user.username }}</h1>
    <h2>Forums</h2>
      <div id="buttons">
        <button><router-link to="/forum_media">Forum media</router-link></button>
        <button>Forum articles</button>
      </div>
    <h2>Dernières publications</h2>
    <p v-if="error">{{ error }}</p>
    <button class="button" @click="getArticles">Rafraichir</button>
      <Article 
        v-for="article in articles" :key="article.id" 
        :article="article"
        @comment-posted="reloadArticles"
        @comment-deleted="reloadArticles"
      />
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import Article from '@/components/Article.vue'
import { mapState } from 'vuex'
import ArticleService from '@/services/ArticleService'

export default {
  name: 'Home',
  components: {
    Article
  },
  data() {
    return {
      error: null,
      //query: ""
    }
  },
  computed: {
    ...mapState(['user', 'articles', 'loggedIn'])
  },
  methods: {
    async getArticles() {
      try {
          const response = await ArticleService.getArticles();
          this.$store.dispatch("displayArticles", response.articles);
      } catch (e) {
        this.error = e.toString();
      }
    },
    redirectToLogin() {
      if(this.loggedIn == false) {
        return this.$router.push('/login');
      }
    },
    reloadArticles() {
      this.getArticles();
    }
  },
  beforeMount() {
    this.redirectToLogin();
    this.getArticles();
  }
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
