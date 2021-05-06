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

// 获取用户主页
export const getProfile = (username) =>
	request({
		url: `/api/profiles/${username}`,
		method: "GET",
	})

// 获取用户信息
export const getUser = (data) =>
	request({
		url: "/api/user",
		method: "GET",
	})


// 更新用户信息
export const updateUser = (data) =>
	request({
		url: "/api/user",
		method: "PUT",
		data,
	})


// Follow user
export const followUser = (username) =>
	request({
		url: `/api/profiles/${username}/follow`,
		method: "POST",
	})

// Unfollow user
export const unFollowUser = (username) =>
	request({
		url: `/api/profiles/${username}/follow`,
		method: "DELETE",
	})
