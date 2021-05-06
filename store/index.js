const cookieparser = process.server ? require("cookieparser") : undefined

// 为了方式数据从图，每次服务端渲染的时候都返回一个全新的对象，这里需要使用函数返回的方式
export const state = () => {
	return {
		user: {},
	}
}

export const mutations = {
	setUser(state, user) {
		state.user = { ...state.user, ...user }
	},
}

export const actions = {
	// 这个 action 的名称 nuxtServerInit 是固定的，用于服务器渲染时触发
	nuxtServerInit({ commit }, { req }) {
		if (req.headers.cookie) {
			// 这里利用请求时，浏览器会自动带上 cookie 的特性来实现
			// 使用 cookieparse 将 cookie 解析出来为一个对象
			const cookie = cookieparser.parse(req.headers.cookie)
			commit("setUser", JSON.parse(cookie.user))
		}
	},
}
