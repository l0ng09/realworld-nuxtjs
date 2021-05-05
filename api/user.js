import { request } from "@/plugins/request"

// 用户登录
export const login = (data) =>
	request({
		url: "/api/users/login",
		method: "POST",
		data,
	})

// 用户注册
export const register = (data) =>
	request({
		url: "/api/users",
		method: "POST",
		data,
	})
