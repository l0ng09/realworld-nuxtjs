<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">#conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" v-if="user.username">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'your_feed',
                  }"
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'your_feed',
                    },
                  }"
                  exact
                >
                  Your Feed
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'global_feed',
                  }"
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'global_feed',
                    },
                  }"
                  exact
                >
                  Global Feed
                </nuxt-link>
              </li>
              <li class="nav-item" v-if="tag">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'tag',
                  }"
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'tag',
                    },
                  }"
                  exact
                >
                  #{{ tag }}
                </nuxt-link>
              </li>
            </ul>
          </div>

          <div class="article-preview" v-for="article in articles">
            <div class="article-meta">
              <nuxt-link
                :to="{
                  name: 'profile',
                  params: { username: article.author.username },
                }"
              >
                <img :src="article.author.image" />
              </nuxt-link>
              <div class="info">
                <nuxt-link
                  :to="{
                    name: 'profile',
                    params: { username: article.author.username },
                  }"
                  class="author"
                  >{{ article.author.username }}</nuxt-link
                >
                <span class="date">{{
                  article.createdAt | date("MMM DD YYYY")
                }}</span>
              </div>
              <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{ active: article.favorited }"
                @click="onFavorite(article)"
                :disabled="article.disableFavorite"
              >
                <i class="ion-heart">{{ article.favoritesCount || "" }}</i>
              </button>
            </div>
            <nuxt-link
              :to="{ name: 'article', params: { slug: article.slug } }"
              class="preview-link"
            >
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>
        </div>
        <div class="col-md-3">
          <!-- 标签列表 -->
          <div class="sidebar">
            <p>Popular Tags</p>
            <div class="tag-list">
              <nuxt-link
                v-for="item in tags"
                :key="item"
                :to="{
                  name: 'home',
                  query: {
                    tag: item,
                    tab: 'tag',
                  },
                }"
                class="tag-pill tag-default"
              >
                {{ item }}
              </nuxt-link>
            </div>
          </div>
          <!-- 标签列表 -->
        </div>
        <!-- 分页页码 -->
        <nav>
          <ul class="pagination">
            <li
              v-for="item in totalPage"
              class="page-item ng-scope"
              :class="{ active: item === page }"
            >
              <nuxt-link
                :to="{
                  name: 'home',
                  query: {
                    page: item,
                    tag: tag,
                    tab: tab,
                  },
                }"
                class="page-link ng-binding"
              >
                {{ item }}
              </nuxt-link>
            </li>
          </ul>
        </nav>
        <!-- 分页页码 -->
      </div>
    </div>
  </div>
</template>

<script>
import { getArticles, getTags, getFeedArticles, addFavorite, deleteFavorite } from '@/api/article';
import { mapState } from 'vuex';
export default {
  watchQuery: ['page', 'tag', 'tab'],
  name: 'HomePage',
  async asyncData({ query, store }) {
    const page = parseInt(query.page) || 1
    const { tag, tab } = query
    const limit = 5
    const curArticles = store.state.user.username && tab === 'your_feed' ? getFeedArticles : getArticles
    const [articleRes, tagRes] = await Promise.all([
      curArticles({ limit, offset: (page - 1) * limit, tag }),
      getTags()
    ])
    const { tags = [] } = tagRes.data
    const { articles = [], articlesCount = 0 } = articleRes.data
    // 给每个 favorite 按钮增加一个属性，是否可点击
    articles.forEach(item => item.disableFavorite = false)
    return {
      tag,
      page,
      limit,
      tags,
      articles,
      articlesCount,
      tab: tab || 'global_feed',
    }
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState(['user']),
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit)
    }
  },
  methods: {
    async onFavorite(article) {
      article.disableFavorite = true
      if (article.favorited) {
        await deleteFavorite(article.slug)
        article.favorited = false
        article.favoritesCount -= 1
      } else {
        await addFavorite(article.slug)
        article.favorited = true
        article.favoritesCount += 1
      }
      article.disableFavorite = false
    }
  }
}
</script>
<style scoped>
</style>