<template>
  <div aria-label="commentaire">
    <div class="comment-header">
      <p class="comment-header__information"> Posté par {{ comment.User.username }} le {{ date }}</p>
      <button class="comment-header__delete button button-danger" v-if="(user.id == comment.UserId) || (user.isadmin)" @click="deleteComment">supprimer</button>
    </div>   
      <p class="comment-content">{{ comment.comment }}</p>  

    <p v-if="error" class="error deletecomment-error" role="alert">{{ error }}</p>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import ArticleService from '@/services/ArticleService'

  export default {
  name: "Comment",
  props: ["comment", "article"],
  data() {
    return {
      error: null,
      message: null
    }
  },
  computed: {
    ...mapState(['user']),
    date() {
      const date = new Date(this.comment.createdAt).toLocaleString();
      return date;
    },
  },
  methods: {
    async deleteComment() {
      try {
        await ArticleService.deleteComment(this.article.id, this.comment.id, {userid: this.user.id});
        this.$parent.$emit('comment-deleted');
      } catch(e) {
        this.error = e.toString();
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .comment-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    &__information {
      margin-right: 10px;
      font-style: italic;
      color: rgb(75, 74, 74);
      font-size: 0.9em;
    }
    &__delete {
      margin: 0;
    }
  }

  .comment-content {
    margin-top: 0;
    color: #FFFFFF;
    background:#000033;;
    border-radius: 10px;
    padding: 5px 10px;
  }

  .deletecomment-error {
    width: 90%;
  }
</style>
