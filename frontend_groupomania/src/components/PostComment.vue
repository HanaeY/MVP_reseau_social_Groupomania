<template>
    <div>
        <p>Publier un commentaire</p><i class="fas fa-info-circle" title="Max 255 caractères"></i>
        <form @submit.prevent="postComment">
            <textarea name="newcomment" id="newcomment" cols="60" rows="5" maxlength="255" required v-model="comment" placeholder="écrivez votre commentaire ici"></textarea>
            <button type="submit">Envoyer</button>
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
            await ArticleService.postComment(this.article.id, {userid: this.user.id, comment: this.comment});
            this.comment = '';
            this.$parent.$emit('comment-posted');
            } catch(e) {
                this.error = e.toString();
            }
        },
    }
}
</script>