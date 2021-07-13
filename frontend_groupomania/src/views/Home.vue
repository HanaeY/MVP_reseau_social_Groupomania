<template>
  <div class="home container">
    <h1>Bienvenue {{ user.username }} !</h1>
    <div class="forum-nav">
      <h2>Accès aux forums</h2>
      <nav class="forum-nav__buttons">
        <router-link to="/forum_media">
          <button class="button forum-nav__buttons-btn"><i class="fas fa-photo-video"></i> multimedia</button>
        </router-link>
        <button 
          class="button forum-nav__buttons-btn forum-nav__buttons-btn-articles" 
          title="fonctionnalité à venir, patience !">
          <i class="far fa-newspaper"></i> 
          articles
        </button>
      </nav>
    </div>  
    <section class="latest-posts">
      <div class="latest-posts__header">  
        <h2>Dernières publications</h2>
        <button class="button" id="refresh-button" @click="getArticles">Rafraîchir</button>
      </div>
      <p v-if="error" class="error" role="alert">{{ error }}</p>
        <Article 
          v-for="article in articles" :key="article.id" 
          :article="article"
          @article-deleted="reloadArticles"
          @comment-posted="reloadArticles"
          @comment-deleted="reloadArticles"
        />
    </section>  
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
  .forum-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    box-shadow: 0px 2px 7px #8383bd;
    border-radius: 15px;
    padding: 10px;
    background-color: white;
    width: 50vw;
    margin: auto;
      @media all and (max-width: 800px) {
        flex-direction: column;
        width: 75vw;
      }
    &__buttons {
        @media all and (max-width: 800px) {
          margin: auto;
          width: 200px;
          align-items: center;
        }
      &-btn {
        margin: 10px;
        width: 200px;
        height: 45px;
        color: white;
        text-transform: uppercase;
        background-color: #000033;
        font-size: 0.9em;
        @media all and (max-width: 800px) {
          margin: 0 0 5px 0;
        }
        &:hover {
          background-color: white;
          color: #000033;
        }
        // temporaire - fonction en construction
        &-articles {
          background-color: #00003377;
          border: none;
          cursor: not-allowed;
          &:hover {
            background-color: #00003377;
            color: white;
        }
        }
      }
    }
  }

  .latest-posts__header {
    display: flex;
    margin-top: 20px;
    align-items: center;
      @media all and (max-width: 800px) {
        margin-top: 10px;
      }
    & button {
      margin: 0;
    }
    & h2 {
      margin-right: 10px;
    }
  }
</style>
