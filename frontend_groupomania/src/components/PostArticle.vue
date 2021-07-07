<template>
  <div class="postarticle container">
      <h2>Publier</h2>
      <form>
          <label for="file">Fichier image</label><i class="fas fa-info-circle" title="fichiers acceptés : .jpg, .jpeg, .png, .webp, .gif"></i>
          <input type="file" name="file" id="file" required @change="onFileSelected"><br> 

          <label for="alternativeText">Texte alternatif (image)</label>
          <input type="text" name="alternativeText" id="alternativeText" maxlength="255" required v-model="alternativeText"><br>

          <label for="description">Votre message</label>
          <input type="text" name="description" id="description" maxlength="255" required v-model="description"><br>

          <button class="button" type="submit" @click="postArticle">Publier</button>
          <p v-if="error">{{ error }}</p>
      </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
//import ArticleService from "@/services/ArticleService"

export default {
  name: 'NewArticle',
  data() {
    return {
      selectedFile: null,
      alternativeText: null, 
      description: null,
      error: null
    }
  },
  computed: {...mapState(['user'])},
  methods: {
    onFileSelected(event) {
      console.log(event.target.files[0]);
      this.selectedFile = event.target.files[0];

    },
    async postArticle() {
      const fd = new FormData();
      //fd.append('image', this.selectedFile, this.selectedFile.name);
      console.log(fd);
      fd.append('alternativeText', this.alternativeText);
      //fd.append('description', this.description);
      //fd.append('userid', this.user.id)
      console.log('FD', fd);
      /*
      try {
        const response = await ArticleService.postArticle({fd});
        console.log(response);
        // recharger l'élément parent 
      } catch(e) {
        this.error = e.toString();
      }
      */
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.postarticle {
  margin-bottom: 20px;
  box-shadow: 0px 2px 7px gray;
  border-radius: 15px;
  text-align: left;
  padding: 10px;
  background-color: white;
  @media all and (max-width: 800px) {
    margin-bottom: 10px;
    padding: 5px;
    width: 80vw;
    
  }
}
</style>

