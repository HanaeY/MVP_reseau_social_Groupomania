<template>
  <div class="newarticle">
      <h2>Publier un nouvel article</h2>
      <form action="">
          <label for="url">URL de l'article</label><input type="url" name="" id="" v-model="newarticle.url"><br>
          <p>OU</p>
          <label for="fichier_image">Fichier image</label><input type="file" name="" id=""><br> 
          <label for="description"></label>
          <input 
            type="text" 
            name="" 
            id="description" 
            class="newarticle__description"
            placeholder="description de l'article"
            v-model="newarticle.description"><br>
          <Buttoncomponent class="" content="Publier" type="submit"/>
      </form>
  </div>
</template>

<script>
import Buttoncomponent from '@/components/Button.vue'
import { mapState } from 'vuex'

export default {
  name: 'Article',
  components: {
      Buttoncomponent
  },
  computed: {
    ...mapState({
      newarticle: "newarticle"
  })},
  props: {
    //msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.newarticle {
  width: 80%;
  margin: auto;
  border: 2px solid;
  border-radius: 15px;
  text-align: left;
  padding: 5px;
   &__description {
       width: 80%;
       height: 50px;
   } 
}

.content {
    &__image {
    width: 500px;
    height: 300px;
    background-color: violet;
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
