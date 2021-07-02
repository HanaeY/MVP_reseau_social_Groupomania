<template>
  <div class="article">
    <div class="content">
      <p class="content__description"> Posté par {{ article.User.username }} le {{ date }}</p>
      <p class="content__description">{{ article.description }}</p>
      <img class="content__image" :src="article.file" :alt="article.alternativeText">
    </div>
    <button class="delete" v-if="(user.id == article.UserId) || (user.isadmin)" @click="deleteArticle">supprimer l'article</button>
    <div class="comments">
      <button v-if="commentsVisible == false" @click="showComments">Voir les commentaires</button>
      <button v-if="commentsVisible == true" @click="hideComments">Masquer les commentaires</button>
      <div v-if="commentsVisible == true">
        <p v-if="this.article.Comments == ''">Pas encore de commentaire... écrivez le premier :) !</p>
        <Comment v-for="comment in article.Comments" :key="comment + comment.createdAt" :comment="comment" :article="article"/>
        <PostComment :article="article"/>
      </div>
      <p v-if="this.error">{{ error }}</p>
    </div>
  </div>
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
      return this.article.createdAt.split('T')[0];
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
        const response = await ArticleService.deleteArticle(this.article.id, {userid: this.user.id});
        console.log(response);
      } catch(e) {
        this.error = e.toString();
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.article {
  width: 80%;
  margin: auto;
  border: 2px solid;
  border-radius: 15px;
  text-align: left;
  padding: 5px;
}

.content {
    &__image {
    height: 300px;
    margin: auto;
  }
}
</style>
