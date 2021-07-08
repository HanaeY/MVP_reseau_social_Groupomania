<template>
  <div class="postarticle container">
      <h2>Publier</h2>
      <form>
          <label for="file">Fichier image</label>
          <i class="fas fa-info-circle" title="fichiers acceptés : .jpg, .jpeg, .png, .webp, .gif"></i>
          <input 
            type="file" name="file" id="file" 
            required 
            @change="onFileSelected"
            accept="image/jpeg, image/jpg, image/webp, image/gif, image/png"
          >
          <br> 

          <label for="alternativeText">Texte alternatif (image)</label>
          <input type="text" name="alternativeText" id="alternativeText" maxlength="255" required v-model="alternativeText"><br>

          <label for="description">Votre message</label>
          <input type="text" name="description" id="description" maxlength="255" required v-model="description"><br>

          <button class="button" type="submit" @click.prevent="postArticle">Publier</button>
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
      selectedFile: null,
      alternativeText: null, 
      description: null,
      error: null
    }
  },
  computed: {...mapState(['user'])},
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];

    },
    async postArticle() {
      const fd = new FormData();
      const textContent = {alternativeText: this.alternativeText, description: this.description, userid: this.user.id};

      fd.append('textContent', JSON.stringify(textContent));
      fd.append('image', this.selectedFile);
  
      try {
        await ArticleService.postArticle(fd);
        this.alternativeText = null;
        this.description = null;
        this.error = null;
        // recharger l'élément parent 
        this.$emit('article-posted');
      } catch(e) {
          this.selectedFile = null;
          this.alternativeText = null;
          this.description = null;
          this.error = e.toString();
      }
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

