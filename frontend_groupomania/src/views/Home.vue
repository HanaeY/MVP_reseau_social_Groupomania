<template>
  <div class="home container">
    <h1>Bienvenue {{ user.username }} !</h1>
    <h2 id="forum-header">Je visite les forums</h2>
      <div class="forum-buttons">
        <router-link to="/forum_media"><button class="forum-buttons__button media-btn">> images</button></router-link>
        <button class="forum-buttons__button article-btn">> articles</button>
      </div>
    <div class="latest-posts-header">  
      <h2>Dernières publications</h2>
      <button class="button" id="refresh-button" @click="getArticles">Rafraîchir</button>
    </div>
    <p v-if="error">{{ error }}</p>
      <Article 
        v-for="article in articles" :key="article.id" 
        :article="article"
        @article-deleted="reloadArticles"
        @comment-posted="reloadArticles"
        @comment-deleted="reloadArticles"
      />
  </div>
</template>

<script>
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
          const response = await ArticleService.getArticles(3, 0, 'DESC'); // params : limit, offset, order
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

<style lang="scss" scoped>
  h1 {
    position: relative;
    top: -50px;
    left: 10px;
    @media all and (max-width: 800px) {
      top: 0px;
    }
  }

  .forum-buttons {
    width: 50vw;
    margin: auto;
    display: flex;
    @media all and (max-width: 800px) {
      width: 100vw;
    }
    &__button {
      width: 25vw;
        @media all and (max-width: 800px) {
        width: 45vw;
        font-size: 1em;
      }
      height: 100px;
      font-size: 3em;
      color: white;
      font-family: Avenir, Helvetica, Arial, sans-serif;
      border: none;
      border-radius: 10px;
      box-shadow: 0px 1px 5px #8383bd;
      &:hover {
        cursor: pointer;
        box-shadow: 0px 0px 4px #8383bd;
      }
    }
  }

  .media-btn {
    background: url('../assets/images/media-forum-img.jpg') no-repeat 0, 0 #0000338f;
    background-blend-mode: multiply;
    background-size: cover;
    background-position-y: 25%;
    margin-right: 7px;
    @media all and (max-width: 800px) {
      margin-right: 0px;
    }
  }

  .article-btn {
    background: url('../assets/images/article-forum-img.jpg') no-repeat 0, 0 #0000338f;
    //#0000338f #99e9ff;
    background-blend-mode: multiply;
    background-size: cover;
    background-position-y: 25%;
  }

  a {
    //font-weight: bold;
    //color: white;
    text-decoration: none;

    &.router-link-exact-active {
      //color: white;
      text-decoration: underline;
    }
  }

.latest-posts-header {
  display: flex;
  margin-top: 40px;
  margin-bottom: 15px;
  align-items: center;
  & button {
    margin: 0;
  }
  & h2 {
    margin-right: 10px;
  }
}
</style>
