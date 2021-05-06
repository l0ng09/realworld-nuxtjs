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
  </div>
</template>

<script>
import { followUser, unFollowUser } from '@/api/user';
import { addFavorite, deleteFavorite } from '@/api/article';
export default {
  name: 'ArticleMeta',
  props: {
    article: { type: Object, require: true },
  },
  data() {
    return {
    }
  },
  methods: {
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