<template>
  <div class="article">
    <div class="content">
      <p class="content__description"> Posté par {{ article.User.username }} le {{ date }}</p>
      <p class="content__description">{{ article.description }}</p>
      <img class="content__image" :src="article.file" :alt="article.alternativeText">
    </div>
    <div class="comments">
      <Comment v-for="comment in article.Comments" :key="comment + comment.createdAt" :comment="comment" />
    </div>
    <div class="comments__add">
      <form action="">
        <input 
        class="comments__add__input" 
        type="text" name="newcomment" id="newcomment" 
        placeholder="Votre commentaire ..."
        >
        <button class="comments__add__submit" type="submit">Poster</button>
      </form>
    </div>
  </div>
</template>

<script>
  import Comment from '@/components/Comment.vue'

  export default {
  name: "Article",
  components: {
    Comment
  },
  props: ["article"],
  computed: {
    date() {
      return this.article.createdAt.split('T')[0];
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
