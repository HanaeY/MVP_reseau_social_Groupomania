<template>
  <div class="article">
    <div class="content">
      <p class="content__description"> Posté par {{ article.User.username }} le {{ date }}</p>
      <p class="content__description">{{ article.description }}</p>
      <img class="content__image" :src="article.file" :alt="article.alternativeText">
    </div>
    <div class="comments">
      <button v-if="commentsVisible == false" @click.prevent="showComments">Voir les commentaires</button>
      <button v-if="commentsVisible == true" @click.prevent="hideComments">Masquer les commentaires</button>
      <div v-if="commentsVisible == true">
        <Comment v-for="comment in article.Comments" :key="comment + comment.createdAt" :comment="comment" :article="article"/>
        <PostComment :article="article"/>
      </div>
    </div>
  </div>
</template>

<script>
  import Comment from '@/components/Comment.vue'
  import PostComment from '@/components/PostComment.vue'

  export default {
  name: "Article",
  components: {
    Comment,
    PostComment
  },
  props: ["article"],
  computed: {
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
    }
  },
  data() {
    return {
      commentsVisible: false
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
