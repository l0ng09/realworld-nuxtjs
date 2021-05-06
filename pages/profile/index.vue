<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{ profile.username }}</h4>
            <button class="btn btn-sm btn-outline-secondary action-btn">
              <i class="ion-plus-round"></i>
              &nbsp;Edit Profile Settings
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: this.tab === 'my_article' }"
                  href="javascript:void(0)"
                  @click="changleTab('my_article')"
                >
                  My Articles
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: this.tab === 'favorited_article' }"
                  href="javascript:void(0)"
                  @click="changleTab('favorited_article')"
                >
                  Favorited Articles
                </a>
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
                >
                  {{ article.author.username }}
                </nuxt-link>
                <span class="date">
                  {{ article.createdAt | date("MMM DD YYYY") }}
                </span>
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

          <!-- 分页页码 -->
          <nav>
            <ul class="pagination">
              <li
                v-for="item in totalPage"
                class="page-item ng-scope"
                :class="{ active: item === page }"
                @click="changePage(item)"
              >
                <a href="javascript:void(0)" class="page-link ng-binding">
                  {{ item }}
                </a>
              </li>
            </ul>
          </nav>
          <!-- 分页页码 -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getProfile } from '@/api/user';
import { getArticles, addFavorite, deleteFavorite } from '@/api/article';
export default {
  middleware: 'authenticated',
  name: 'ProfilePage',
  data() {
    return {
      profile: {},
      articles: [],
      page: 1,
      limit: 5,
      articlesCount: 0,
      tab: 'my_article'
    }
  },
  async mounted() {
    this.init()
  },
  watch: {
    "$route.params.username": "init"
  },
  computed: {
    username() {
      const { username } = this.$route.params
      return username
    },
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit)
    }
  },
  methods: {
    init() {
      this.page = 1
      this.tab = 'my_article'
      this.fetchProfie()
      this.fetchArticleByTab()
    },
    async fetchProfie() {
      const { data } = await getProfile(this.username)
      this.profile = data.profile
    },
    async fetchArticle(params) {
      const { page, limit } = this
      const { data } = await getArticles({ limit, offset: (page - 1) * limit, ...params })
      const { articles, articlesCount } = data
      this.articles = articles
      this.articlesCount = articlesCount
    },
    fetchArticleByTab() {
      this.tab === "my_article"
        ? this.fetchArticle({ author: this.username })
        : this.fetchArticle({ favorited: this.username })
    },
    changePage(page) {
      this.page = page
      this.fetchArticleByTab()

    },
    changleTab(tab) {
      this.tab = tab
      this.page = 1
      this.fetchArticleByTab()
    },
    onFavorite(article) {
      article.disableFavorite = true
      if (article.favorited) {
        deleteFavorite(article.slug)
        article.favorited = false
        article.favoritesCount -= 1
      } else {
        addFavorite(article.slug)
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