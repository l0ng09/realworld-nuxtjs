export default {
	router: {
		linkActiveClass: "active",
		extendRoutes(routes, resolve) {
			// 清空原来的路由配置
			routes.splice(0)

			routes.push(
				...[
					{
						path: "/",
						component: resolve(__dirname, "pages/layout/"),
						children: [
							{
								// 这是一个默认的子路由
								path: "",
								name: "home",
								component: resolve(__dirname, "pages/home/"),
							},
							{
								path: "/login",
								name: "login",
								component: resolve(__dirname, "pages/login/"),
							},
							{
								path: "/register",
								name: "register",
								component: resolve(__dirname, "pages/login/"),
							},
							{
								path: "/article/:slug",
								name: "article",
								component: resolve(__dirname, "pages/article/"),
							},
							{
								path: "/editor",
								name: "editor",
								component: resolve(__dirname, "pages/editor/"),
							},
							{
								path: "/profile/:username",
								name: "profile",
								component: resolve(__dirname, "pages/profile/"),
							},
							{
								path: "/settings",
								name: "settings",
								component: resolve(__dirname, "pages/settings/"),
							},
						],
					},
				]
			)
		},
	},
	// 这个配置是为了忽略 loose is false 的告警
	build: {
		babel: {
			presets({ isServer }, [preset, options]) {
				return [[preset, { loose: true, ...options }]]
			},
		},
	},
	server: {
    port: 3000, 
    host: '0.0.0.0', 
    timing: false
  },
	// 注册插件
	// 使用插件的目的是为了在客户端和服务器端都能使用
	plugins: ["~/plugins/request.js", "~/plugins/day.js"],
}
