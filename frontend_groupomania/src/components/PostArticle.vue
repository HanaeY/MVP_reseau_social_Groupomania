<template>
  <div class="postarticle container">
      <h2>Publier</h2>
      <form @submit.prevent="postArticle">
          <label for="file">Fichier image</label>
          <i class="fas fa-info-circle" title="fichiers acceptés : .jpg, .jpeg, .png, .webp, .gif, .mp4, .webm" aria-label="informations sur les fichiers acceptés"></i>
          <input 
            type="file" name="file" id="file" 
            required 
            @change="onFileSelected"
            accept="image/jpeg, image/jpg, image/webp, image/gif, image/png, video/mp4, video/webm"
          >
          <br> 

          <label for="alternativeText">Texte alternatif (image)</label><i class="fas fa-info-circle" title="Max 255 caractères" aria-label="informations"></i>
          <br>
          <input type="text" name="alternativeText" id="alternativeText" maxlength="255" required v-model="alternativeText"><br>

          <label for="description">Votre message</label><i class="fas fa-info-circle" title="Max 255 caractères" aria-label="informations"></i>
          <br>
          <input type="text" name="description" id="description" maxlength="255" required v-model="description"><br>

          <button class="button" type="submit">Publier</button>
          <p v-if="error" class="error" role="alert">{{ error }}</p>
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
      clearFields() {
          this.alternativeText = null;
          this.description = null;
          this.selectedFile = null;
          document.getElementById('file').value = "";
      },
      async postArticle() {
        const fd = new FormData();
        const textContent = {alternativeText: this.alternativeText, description: this.description, userid: this.user.id};

        fd.append('textContent', JSON.stringify(textContent));
        fd.append('image', this.selectedFile);
    
        try {
          await ArticleService.postArticle(fd);
          this.clearFields();
          this.error = null;
          this.$emit('article-posted');
        } catch(e) {
            this.clearFields();
            this.error = e.toString();
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .postarticle {
    margin-bottom: 20px;
    box-shadow: 0px 2px 7px gray;
    border-radius: 15px;
    border: 3px solid #000033;
    text-align: left;
    padding: 10px;
    background-color: white;
    @media all and (max-width: 800px) {
      margin-bottom: 10px;
      padding: 10px;
      width: 80vw;  
    }
  }

  h2 {
    margin: 0 0 10px 0;
  }

  input {
    width: 49vw;
    @media all and (max-width: 800px) {
      width: 77vw; 
    }
  }
</style>

