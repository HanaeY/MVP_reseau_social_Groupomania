<template>
    <div>
        <p>Publier un commentaire</p>
        <form action="">
            <input type="text" name="newcomment" id="newcomment" placeholder="écrivez votre commentaire ici" v-model="comment">
            <button type="submit" @click.prevent="postComment">Envoyer</button>
            <p v-if="error">{{ error }}</p>
        </form>
    </div>
</template>

<script>
import ArticleService from '@/services/ArticleService'
import { mapState } from 'vuex'

export default {
    name: "PostComment",
    props: ["article"],
    data() {
        return {
            comment: null,
            error: null
        }
    },
    computed: {
        ...mapState(['user']),
    },
    methods: {
        async postComment() {
            console.log('article id: ', this.article.id);
            try {
            const response = await ArticleService.postComment(this.article.id, {userid: this.user.id, comment: this.comment});
            console.log('RESPONSE', response);
            // recharger le composant article/la page pour afficher le nouveau commentaire
            } catch(e) {
                this.error = e.toString();
            }
        },
    }
}
</script>