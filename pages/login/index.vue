<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">
            {{ isLoginPage ? "Sign in" : "Sign up" }}
          </h1>
          <p class="text-xs-center" v-if="!isLoginPage">
            <nuxt-link to="login">Have an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <template v-for="(messages, field) of errors">
              <li v-for="msg in messages">{{ field }} {{ msg }}</li>
            </template>
          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset class="form-group" v-if="!isLoginPage">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
                v-model="user.username"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="email"
                placeholder="Email"
                v-model="user.email"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                :minlength="8"
                v-model="user.password"
                required
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ isLoginPage ? "Sign in" : "Sign up" }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from '@/api/user';
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  middleware: 'not-authenticated',
  name: 'LoginPage',
  data() {
    return {
      user: {
        username: '',
        email: '',
        password: ''
      },
      auth: {},
      errors: {},
    }
  },
  computed: {
    isLoginPage() {
      return this.$route.name === 'login'
    }
  },
  methods: {
    async onSubmit() {
      try {
        const res = this.isLoginPage
          ? await login({ user: this.user })
          : await register({ user: this.user })

        // 保存用户登录信息
        this.$store.commit('setUser', res.data.user)
        // 为了方式数据刷新丢失，需要实现数据持久化
        Cookie.set('user', res.data.user)

        // 登录成功，跳转到首页
        this.$router.push('/')
      } catch (err) {
        this.errors = err.response.data.errors
      }
    }
  }
}
</script>
<style scoped>
</style>