<template>
  <div class="forum_media">
      <h1>Forum media</h1>
      <Newarticle/>
      <Article 
      username="coucou"
      date="12 octobre 2021"
      description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam harum, perferendis quaerat facilis omnis voluptate animi repellat at id impedit, sapiente fuga recusandae quidem aliquid autem, accusantium ullam reiciendis? Architecto."
      />
  </div>
</template>

<script>
import Newarticle from '@/components/New_article.vue'
import Article from '@/components/Article.vue'
import { mapState } from 'vuex'

export default {
    components: {
        Newarticle,
        Article
    },
    computed: {...mapState({
    //userEmail: 'email',
    //userPassword: 'password'
    })}
}
</script>