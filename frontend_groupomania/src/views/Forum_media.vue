<template>
  <div class="forum_media">
      <h1>Forum media</h1>
      <Newarticle/>
      <p v-if="error">{{ error }}</p>
      <button @click="getArticles">Mettre à jour</button>
      <Article v-for="article in articles" :key="article.id" :article="article"/>
  </div>
</template>

<script>
import Newarticle from '@/components/New_article.vue'
import Article from '@/components/Article.vue'
import { mapState } from 'vuex'
import ArticleService from '@/services/ArticleService'

export default {
    name: "ForumMedia",
    components: {
        Newarticle,
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