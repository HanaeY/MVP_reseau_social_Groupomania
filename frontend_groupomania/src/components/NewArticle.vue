<template>
  <div class="newarticle">
      <h2>Publier un nouvel article</h2>
      <form>
          <label for="file">Fichier image</label>
          <input type="file" name="file" id="file" required @change="onFileSelected"><br> 

          <label for="alternativeText">Texte alternatif (image)</label>
          <input type="text" name="alternativeText" id="alternativeText" maxlength="255" required v-model="alternativeText"><br>

          <label for="description">Votre message</label>
          <input type="text" name="description" id="description" maxlength="255" required v-model="description"><br>

          <button type="submit" @click="postArticle">Publier</button>
          <p v-if="error">{{ error }}</p>
      </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ArticleService from "@/services/ArticleService"

export default {
  name: 'NewArticle',
  data() {
    return {
      file: null,
      alternativeText: null, 
      description: null,
      error: null
    }
  },
  computed: {...mapState(['user'])},
  props: {
    //msg: String
  },
  methods: {
    onFileSelected(event) {
      console.log(event.target.files[0]);
      this.file = event.target.files[0];

    },
    async postArticle() {
      const fd = new FormData();
      fd.append('image', this.file, this.file.name);
      fd.append('alternativeText', this.alternativeText);
      fd.append('description', this.description);
      fd.append('userid', this.user.id)
      try {
        const response = await ArticleService.postArticle(fd);
        console.log(response);
        // recharger l'élément parent 
      } catch(e) {
        this.error = e.toString();
      }
    }
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
}
</style>
