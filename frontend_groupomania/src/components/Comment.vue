<template>
  <div>
    <div class="comment">
      <p class="comment__information"> Posté par {{ comment.User.username }} le {{ date }}</p>
      <p class="comment__content">{{ comment.comment }}</p> 
      <button class="comment__delete" v-if="(user.id == comment.UserId) || (user.isadmin)" @click="deleteComment">supprimer</button>
    </div>  

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
.comment {
  display: flex;
  flex-direction: row;
  align-items: center;
  &__information {
    margin-right: 10px;
    font-style: italic;
    font-size: 0.9em;
  }
  &__delete {
    margin-left: 10px;
    border: 1px solid red;
    color: red;
    background:white;
    border-radius: 7px;
    height: 20px;
    font-size: 0.7em;
  }
  &__content {
    color: white;
    background:#000033;
    border-radius: 10px;
    padding: 5px 10px;
  }
}
</style>
