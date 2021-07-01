import { api } from "@/services/api.js";

export default {
    getArticles() {
        return api("/articles", {
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