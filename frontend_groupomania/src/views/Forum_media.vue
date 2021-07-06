<template>
  <div class="forum_media">
      <h1>Forum media</h1>
      <PostArticle/>
      <p v-if="error">{{ error }}</p>
      <button class="button" @click="getArticles">Rafraichir</button>
      <Article 
        v-for="article in articles" :key="article.id" 
        :article="article" 
        @comment-posted="reloadArticles" 
        @comment-deleted="reloadArticles"
      />
      <BackToTop class="btn-to-top" text="retour en haut" />
  </div>
</template>

<script>
import PostArticle from '@/components/PostArticle.vue'
import Article from '@/components/Article.vue'
import { mapState } from 'vuex'
import ArticleService from '@/services/ArticleService'
import BackToTop from 'vue-backtotop'

export default {
  name: "ForumMedia",
  components: {
      PostArticle,
      Article,
      BackToTop
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