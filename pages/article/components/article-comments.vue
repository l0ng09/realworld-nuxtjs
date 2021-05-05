<template>
  <div>
    <form class="card comment-form" @submit.prevent="submitComment">
      <div class="card-block">
        <textarea
          class="form-control"
          placeholder="Write a comment..."
          rows="3"
          v-model="commentBody"
          :minlength="1"
        ></textarea>
      </div>
      <div class="card-footer">
        <img :src="article.author.image" class="comment-author-img" />
        <button class="btn btn-sm btn-primary">Post Comment</button>
      </div>
    </form>

    <div class="card" v-for="comment in comments">
      <div class="card-block">
        <p class="card-text">
          {{ comment.body }}
        </p>
      </div>
      <div class="card-footer">
        <nuxt-link
          :to="{
            name: 'profile',
            params: {
              username: comment.author.username,
            },
          }"
          class="comment-author"
        >
          <img :src="comment.author.image" class="comment-author-img" />
        </nuxt-link>
        &nbsp;
        <a href="" class="comment-author">{{ comment.author.username }}</a>
        <span class="date-posted">{{
          comment.createdAt | date("MMM DD, YYYY")
        }}</span>
        <span
          class="mod-options"
          v-if="user.username === comment.author.username"
          @click="removeComment(article.slug, comment.id)"
        >
          <i class="ion-trash-a"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { getComments, addComment, deleteComment } from '@/api/article';
import { mapState } from 'vuex';
export default {
  name: 'ArticleComments',
  props: {
    article: {
      type: Object,
      require: true,
    }
  },
  data() {
    return {
      commentBody: '',
      comments: [],
    }
  },
  computed: {
    ...mapState(['user'])
  },
  async mounted() {
    this.fetchComments()
  },
  methods: {
    async fetchComments() {
      const { data } = await getComments(this.article.slug)
      this.comments = data.comments || []
    },
    async submitComment() {
      await addComment({
        slug: this.article.slug,
        comment: { body: this.commentBody }
      })
      await this.fetchComments()
      this.commentBody = ''
    },
    async removeComment(slug, id) {
      await deleteComment(slug, id)
      await this.fetchComments()
    }
  }
}
</script>
<style scoped>
</style>