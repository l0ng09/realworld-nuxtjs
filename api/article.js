import { request } from "@/plugins/request"

// 获取公共文章列表
export const getArticles = (params) =>
	request({
		url: "/api/articles",
		method: "GET",
		params,
	})

// 获取关注的文章列表
export const getFeedArticles = (params) =>
	request({
		url: "/api/articles/feed",
		method: "GET",
		params,
	})

// 获取所有的标签信息
export const getTags = () =>
	request({
		url: "/api/tags",
		method: "GET",
	})

// 添加点赞
export const addFavorite = (slug) =>
	request({
		url: `/api/articles/${slug}/favorite`,
		method: "POST",
	})

// 删除点赞
export const deleteFavorite = (slug) =>
	request({
		url: `/api/articles/${slug}/favorite`,
		method: "DELETE",
	})

// 获取文章详情
export const getArticle = (slug) =>
	request({
		url: `/api/articles/${slug}`,
		method: "GET",
	})

// 新增文章
export const addArticle = (data) =>
	request({
		url: `/api/articles`,
		method: "POST",
		data,
	})

// 编辑文章
export const updateArticle = (data) =>
	request({
		url: `/api/articles/${data.slug}`,
		method: "PUT",
		data,
	})

// 删除文章
export const deleteArticle = (slug) =>
	request({
		url: `/api/articles/${slug}`,
		method: "DELETE",
	})

// 获取评论
export const getComments = (slug) =>
	request({
		url: `/api/articles/${slug}/comments`,
		method: "GET",
	})

// 新增评论
export const addComment = (data) =>
	request({
		url: `/api/articles/${data.slug}/comments`,
		method: "POST",
		data,
	})

// 删除评论
export const deleteComment = (slug, id) =>
	request({
		url: `/api/articles/${slug}/comments/${id}`,
		method: "DELETE",
	})
