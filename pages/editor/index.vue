<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form @submit.prevent="submitArticle">
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                  v-model="article.title"
                  required
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="What's this article about ?"
                  v-model="article.description"
                  required
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  placeholder="Write your article ( in markdown )"
                  v-model="article.body"
                  required
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder='Multiple tags split with " , "'
                  v-model="article.tagList"
                />
                <div class="tag-list"></div>
              </fieldset>
              <button class="btn btn-lg pull-xs-right btn-primary">
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { addArticle, updateArticle, getArticle } from '@/api/article';
export default {
  middleware: 'authenticated',
  name: 'EditorPage',
  data() {
    return {
      article: {
        title: '',
        description: '',
        body: '',
        tagList: "",
      },
      slug: this.$route.params.slug
    }
  },
  mounted() {
    this.slug && this.getArticleBySlug()
  },
  methods: {
    async getArticleBySlug() {
      const { data } = await getArticle(this.slug)
      this.article = data.article
      this.article.tagList = this.article.tagList.join(',')
    },
    async submitArticle() {
      this.article.tagList = this.article.tagList.split(',')
      const { data } = this.slug
        ? await updateArticle({ slug: this.slug, article: this.article })
        : await addArticle({ article: this.article })
      const { article } = data || {}
      if (article && article.slug) {
        this.$router.push({
          name: 'article',
          params: {
            slug: article.slug
          }
        })
      }
    }
  }
}
</script>
<style scoped>
</style>