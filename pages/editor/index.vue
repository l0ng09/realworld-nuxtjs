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
                  onkeydown="if(event.keyCode === 13) return false"
                  required
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="What's this article about ?"
                  v-model="article.description"
                  onkeydown="if(event.keyCode === 13) return false"
                  required
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  placeholder="Write your article ( in markdown )"
                  v-model="article.body"
                  onkeydown="if(event.keyCode === 13) return false"
                  required
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  v-model="article.tag"
                  onkeydown="if(event.keyCode === 13) return false"
                  @keyup.enter="onTagChange"
                />
                <div class="tag-list">
                  <span
                    class="tag-default tag-pill"
                    v-for="tag in article.tagList"
                  >
                    <i
                      class="ion-close-round"
                      @click="() => removeTag(tag)"
                    ></i>
                    {{ tag }}
                  </span>
                </div>
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
        tagList: [],
        tag: '',
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
      this.article.tag = ''
    },
    async submitArticle() {
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
    },
    onTagChange(event) {
      if (event.keyCode === 13) {
        this.article.tag = ''
        this.article.tagList.push(event.target.value)
      }
    },
    removeTag(tag) {
      const restTags = this.article.tagList.filter(item => item !== tag)
      this.article.tagList = restTags
    }
  }
}
</script>
<style scoped>
</style>