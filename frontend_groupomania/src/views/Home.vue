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
    <button @click="getArticles">Mettre à jour</button>
      <Article v-for="article in articles" :key="article.id" :article="article"/>
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
      articles: null,
      //query: ""
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async getArticles() {
      try {
        const response = await ArticleService.getArticles(); // TO DO : ajouter this.query en payload
        this.articles = response.articles;
      } catch (e) {
        this.error = e.toString();
      }
    }
  },
  beforeMount() {
    console.log('test');
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
