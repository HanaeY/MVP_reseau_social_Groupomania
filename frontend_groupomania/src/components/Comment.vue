<template>
  <div class="comment">
      <p class="comment__information"> Posté par {{ comment.User.username }} le {{ date }}</p>
      <p class="content__content">{{ comment.comment }}</p>
  </div>
</template>

<script>
  export default {
  name: "Comment",
  props: ["comment"],
  computed: {
    date() {
      const date = this.comment.createdAt.split('T')[0];
      const time = this.comment.createdAt.split('T')[1].substring(0, 5);
      return `${date}, ${time}`;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
