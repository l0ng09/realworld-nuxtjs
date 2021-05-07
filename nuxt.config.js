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
								path: "/editor/:slug",
								name: "editor",
								component: resolve(__dirname, "pages/editor/"),
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
	// 部署到服务器上需要配置相应的端口号
	server: {
    port: 80,  // 这里默认是 3000 端口
    host: '0.0.0.0',  // 这里默认是 localhost
    timing: false
  },
	// 注册插件
	// 使用插件的目的是为了在客户端和服务器端都能使用
	plugins: ["~/plugins/request.js", "~/plugins/day.js"],
}
