<template>
  <div class="forum_media">
      <h1>Forum media</h1>
      <PostArticle/>
      <p v-if="error">{{ error }}</p>
      <button class="button" @click="getArticles">Mettre à jour</button>
      <Article 
        v-for="article in articles" :key="article.id" 
        :article="article" 
        @comment-posted="reloadArticles" 
        @comment-deleted="reloadArticles"
      />
  </div>
</template>

<script>
import PostArticle from '@/components/PostArticle.vue'
import Article from '@/components/Article.vue'
import { mapState } from 'vuex'
import ArticleService from '@/services/ArticleService'

export default {
  name: "ForumMedia",
  components: {
      PostArticle,
      Article
  },
  data() {
      return {
      error: null
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