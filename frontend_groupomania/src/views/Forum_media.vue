<template>
  <div class="forum_media">
      <h1>Forum media</h1>
      <!--<NewArticle/>-->
      <p v-if="error">{{ error }}</p>
      <button @click="getArticles">Mettre à jour</button>
      <Article v-for="article in articles" :key="article.id" :article="article"/>
  </div>
</template>

<script>
//import NewArticle from '@/components/NewArticle.vue'
import Article from '@/components/Article.vue'
import { mapState } from 'vuex'
import ArticleService from '@/services/ArticleService'

export default {
    name: "ForumMedia",
    components: {
        //NewArticle,
        Article
    },
    data() {
        return {
        error: null,
        }
    },
    computed: {...mapState(['user', 'articles'])
    },
      methods: {
    async getArticles() {
      try {
          const response = await ArticleService.getArticles();
          this.$store.dispatch("displayArticles", response.articles);
      } catch (e) {
        this.error = e.toString();
      }
    }
  },
  beforeMount() {
      this.getArticles();
  }
}
</script>