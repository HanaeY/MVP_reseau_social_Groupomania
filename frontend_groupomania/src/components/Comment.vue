<template>
  <div class="comment">
      <p class="comment__information"> Posté par {{ comment.User.username }} le {{ date }}</p>
      <p class="content__content">{{ comment.comment }}</p> 
      <button v-if="user.id == comment.UserId" @click="deleteComment">supprimer mon commentaire</button>
      <p v-if="error">{{ error }}</p>
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
      message: null,
    }
  },
  computed: {
    ...mapState(['user']),
    date() {
      const date = this.comment.createdAt.split('T')[0];
      const time = this.comment.createdAt.split('T')[1].substring(0, 5);
      return `${date}, ${time}`;
    },
  },
  methods: {
    async deleteComment() {
      try {
        const response = await ArticleService.deleteComment(this.article.id, this.comment.id, {userid: this.user.id});
        this.message = response.message;
      } catch(e) {
        this.error = e.toString();
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
