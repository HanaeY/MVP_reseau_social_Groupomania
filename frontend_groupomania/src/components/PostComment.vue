<template>
    <section>
        <div class="postcomment-header">
            <p class="postcomment-header__text">Publier un commentaire</p>
            <i class="fas fa-info-circle" title="Max 255 caractères" aria-label="informations"></i>
        </div>
        <p v-if="error" class="error comment-error">{{ error }}</p>
        <form @submit.prevent="postComment">
            <textarea name="newcomment" id="newcomment" cols="60" rows="5" maxlength="255" required v-model="comment" placeholder="écrivez votre commentaire ici"></textarea><br>
            <button type="submit" class="button">Envoyer</button>
        </form>
    </section>
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

<style lang="scss" scoped>
    .postcomment-header {
        display: flex;
        align-items: center;
    }

    textarea {
        border-radius: 10px;
        border: solid 2px #000033;
        font-family: Avenir, Helvetica, Arial, sans-serif;
        font-size: 0.9em;
        width: 90%;
        margin: auto;
        padding: 5px;
    }

    button {
        display: block;
        margin: auto;
        margin-top: 10px;
    }

    .comment-error {
        width: 100%;
    }
</style>