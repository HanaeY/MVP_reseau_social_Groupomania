import { api } from "@/services/api.js";

export default {
    getArticles(limit, offset, order) {
        return api(`/articles?limit=${limit}&offset=${offset}&order=${order}`, {
            method: "GET"
        });
    },
    postArticle(article) {
        return api("/articles", {
            method: "POST",
            "Content-type": "multipart/form-data",
            body: JSON.stringify(article)
        })
    },
    deleteArticle(articleid, userid) {
        return api(`/articles/${articleid}`, {
            method: "DELETE",
            body: JSON.stringify(userid)
        })
    },
    postComment(articleid, body) {
        return api(`/articles/${articleid}/comments`, {
            method: "POST",
            body: JSON.stringify(body)
        })
    },
    deleteComment(articleid, commentid, userid) {
        return api(`/articles/${articleid}/comments/${commentid}`, {
            method: "DELETE",
            body: JSON.stringify(userid)
        })
    }
};