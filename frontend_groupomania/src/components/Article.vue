<template>
  <article class="article container">
    <p v-if="this.error" class="error" role="alert">{{ error }}</p>
    <!-- Text/info -->
    <div class="content">
      <div class="content__text">
        <p class="content__text-info"> Posté par {{ article.User.username }} le {{ date }}</p>
        <p class="content__text-description">{{ article.description }}</p>
      </div>
      <button 
        class="content__delete-btn button button-danger" 
        v-if="(user.id == article.UserId) || (user.isadmin)" 
        @click="deleteArticle">
        supprimer
      </button>
    </div>
    <!-- Contenu multimedia : image ou vidéo -->
    <img 
      v-if="!article.file.match('mp4$') && !article.file.match('webm$')" 
      class="image" 
      :src="article.file" :alt="article.alternativeText" 
      loading="lazy"
    >
    <video 
      v-if="article.file.match('mp4$') || article.file.match('webm$')" 
      :src="article.file" :alt="article.alternativeText" 
      autoplay loop muted controls loading="lazy">
    </video>
    <button class="button comments-button" v-if="commentsVisible == false && countComments !== 0" @click="showComments">Voir les commentaires ({{ countComments }})</button>
    <button class="button comments-button" v-if="commentsVisible == false && countComments == 0" @click="showComments">Commentez en premier !</button>
    <button class="button comments-button" v-if="commentsVisible == true" @click="hideComments">Masquer les commentaires</button>
    <!-- Commentaire -->
    <section class="comments">
      <div v-if="commentsVisible == true">
        <p v-if="countComments == 0">Pas encore de commentaire... écrivez le premier !</p>
        <Comment v-for="comment in article.Comments" :key="comment + comment.createdAt" :comment="comment" :article="article"/>
        <PostComment :article="article"/>
      </div>
    </section>
  </article>
</template>

<script>
  import { mapState } from 'vuex'
  import Comment from '@/components/Comment.vue'
  import PostComment from '@/components/PostComment.vue'
  import ArticleService from '@/services/ArticleService'

  export default {
  name: "Article",
  components: {
    Comment,
    PostComment
  },
  props: ["article"],
  data() {
    return {
      commentsVisible: false,
      error: null,
    }
  },
  computed: {
    ...mapState(['user']),
    date() {
      const date = new Date(this.article.createdAt).toLocaleString();
      return date;
    },
    countComments() {
      return this.article.Comments.length;
    }
  },
  methods: {
    showComments() {
      this.commentsVisible = true
    },
    hideComments() {
      this.commentsVisible = false
    },
    async deleteArticle() {
      try {
        await ArticleService.deleteArticle(this.article.id, {userid: this.user.id});
        this.$emit('article-deleted');
      } catch(e) {
        this.error = e.toString();
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .article {
    margin-bottom: 20px;
    box-shadow: 0px 2px 7px #8383bd;
    border-radius: 15px;
    text-align: left;
    padding: 10px;
    background-color: white;
    @media all and (max-width: 800px) {
      margin-bottom: 10px;
      padding: 5px;
      width: 85vw;
    }
  }

  .content {
    display: flex;
    &__text {
      flex: 2;
      &-info {
      font-style: italic;
      font-size: 0.9em;
      color: rgb(75, 74, 74);
      }
    }
    &__delete-btn {
      height: 30px;
    }
  }

  .image, video {
    display: block;
    margin: auto;
    max-width: 50vw;
    max-height: 50vh;
    border-radius: 15px;
    @media all and (max-width: 800px) {
      max-width: 80vw;
      max-height: 90vw;
    }
  }

  .comments-button {
      display: block;
      margin: auto;
      margin-top: 10px;
      margin-bottom: 10px;
  }

  .comments {
    background-color: #ffffff;
    border-radius: 0px 0px 10px 10px;
    padding: 5px;
  }
</style>
