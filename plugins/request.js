/**
 * 基于 axios 封装的请求
 */
import axios from "axios"

// 创建一个 axios 的实例
export const request = axios.create({
	baseURL: "https://conduit.productionready.io",
})

// 通过上下文对象获取 req res query params app store ...
export default ({ store }) => {
	// 请求拦截
	// 服务端需要通过上下文拿到 store 对象
	// 统一给请求头添加 token
	request.interceptors.request.use(
		function(config) {
			const { user } = store.state
			if (user && user.token) {
				// Do something before request is sent
				config.headers.Authorization = `Token ${user.token}`
			}
			return config
		},
		function(error) {
			// Do something with request error
			return Promise.reject(error)
		}
	)
}
