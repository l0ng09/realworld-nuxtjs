import Vue from "vue"
import day from "dayjs"

// 给 vue 注入一个全局的过滤器
// 使用方式 {{ value | date }} 会直接把 value 传给 date 这个过滤器
Vue.filter("date", (value, format = "YYYY-MM-DD HH:mm:ss") => {
	return day(value).format(format)
})
