<template>
  <div class="article">
    <div class="content">
      <p class="content__description"> Posté par {{ article.User.username }} le {{ date }}</p>
      <p class="content__description">{{ article.description }}</p>
      <img class="content__image" :src="article.file" :alt="article.alternativeText">
    </div>

    <!--<div class="reactions">
      <h3>Commentaires</h3>
      <div class="reactions__add">
        <input type="text" class="reactions__add-comment" placeholder="j'ajoute un commentaire ici ..." :value="newcomment.content">
        <Buttoncomponent class="reactions__add-submit" content="Publier mon commentaire" type="submit"/>
      </div>
      <div class="reactions__see">
        <h4>Dernier commentaire</h4>
        <div>
          <p class="content__description"><span>[USERNAME] </span><span>([DATE])</span> : <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam harum, perferendis quaerat facilis omnis voluptate animi repellat at id impedit, sapiente fuga recusandae quidem aliquid autem, accusantium ullam reiciendis? Architecto.</span></p>
        </div>
        <h4>Voir tout</h4>
      </div>
    </div>-->
  </div>
</template>

<script>
  export default {
  name: "Article",
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

.reactions {
  &__add {
    width: 100%;
    display: flex;
    &-comment {
      flex: 2;
      height: 50px;
    }
    &-submit {
      height: 56px;
      padding: 10px;
    }
  }
}
</style>
