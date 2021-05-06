<template>
  <div class="article-meta">
    <nuxt-link
      :to="{
        name: 'profile',
        params: {
          username: article.author.username,
        },
      }"
    >
      <img :src="article.author.image" />
    </nuxt-link>
    <div class="info">
      <a href="" class="author">{{ article.author.username }}</a>
      <span class="date">{{ article.createdAt | date("MMM DD, YYYY") }}</span>
    </div>

    <template v-if="user.username === article.author.username">
      <nuxt-link
        :to="{ name: 'editor', params: { slug: article.slug } }"
        class="btn btn-sm action-btn ng-binding btn-outline-secondary"
      >
        <i class="ion-edit"></i>
        &nbsp; Edit Article
      </nuxt-link>
      &nbsp;&nbsp;
      <button class="btn btn-outline-danger btn-sm" @click="onDelete">
        <i class="ion-trash-a"></i> Delete Article
      </button>
    </template>

    <template v-else>
      <button
        class="btn btn-sm btn-outline-secondary"
        :class="{ active: article.author.following }"
        @click="onFollow"
      >
        <i class="ion-plus-round"></i>
        &nbsp; {{ article.author.following ? "UnFollow" : "Follow" }}
        {{ article.author.username }}
      </button>
      &nbsp;&nbsp;
      <button
        class="btn btn-sm btn-outline-primary"
        :class="{ active: article.favorited }"
        @click="onFavorite"
      >
        <i class="ion-heart"></i>
        &nbsp; Favorite Post
        <span class="counter">({{ article.favoritesCount }})</span>
      </button>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { followUser, unFollowUser } from '@/api/user';
import { addFavorite, deleteFavorite, deleteArticle } from '@/api/article';
export default {
  name: 'ArticleMeta',
  props: {
    article: { type: Object, require: true },
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    async onDelete() {
      try {
        await deleteArticle(this.article.slug)
        this.$router.push({ path: '/', query: { tab: 'your_feed' } })
      } catch (err) {
        console.log('err: ', err);
      }
    },
    async onFollow() {
      const { author } = this.article
      if (author.following) {
        await unFollowUser(author.username)
        author.following = false
      } else {
        await followUser(author.username)
        author.following = true
      }
    },
    async onFavorite() {
      const article = this.article
      if (article.favorited) {
        await deleteFavorite(article.slug)
        article.favorited = false
        article.favoritesCount -= 1
      } else {
        await addFavorite(article.slug)
        article.favorited = true
        article.favoritesCount += 1
      }
    }
  }
}
</script>
<style scoped>
</style>  