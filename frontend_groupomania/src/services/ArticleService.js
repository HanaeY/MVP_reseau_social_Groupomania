import { api } from "@/services/api.js";
import { api2 } from "@/services/api.js";

export default {
    getArticles(limit, offset, order) {
        return api(`/articles?limit=${limit}&offset=${offset}&order=${order}`, {
            method: "GET"
        });
    },
    postArticle(content) {
        return api2("/articles", {
            method: "POST",
            body: content
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