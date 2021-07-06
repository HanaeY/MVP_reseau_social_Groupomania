<template>
  <div class="forum_media">
      <h1>Forum media</h1>
      <PostArticle/>
      <p v-if="error">{{ error }}</p>
      <div class="forum_media__refreshAndOrder">
        <p>Rafraîchir et trier : 
        <a href="" @click.prevent="getArticles('DESC')">du plus récent</a> / 
        <a href="" @click.prevent="getArticles('ASC')">du plus ancien</a></p>
      </div>
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
    async getArticles(order) {
      try {
        const response = await ArticleService.getArticles(null, 0, order); // limit, offset, order
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
      this.getArticles('DESC');
    }
  },
  beforeMount() {
    this.redirectToLogin();
    this.getArticles('DESC');
  }
}
</script>

<style lang="scss" scoped>
.forum_media {
  &__refreshAndOrder {
    max-width: 50vw;
    margin: auto;
    text-align: left;
    @media all and (max-width: 800px) {
      max-width: 90vw;
    }
  }
}

a, a:visited {
  color: #000033;
}

a:hover {
  font-weight: bold;
}
</style>