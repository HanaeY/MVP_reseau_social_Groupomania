import { api } from "@/services/api.js";

export default {
    getArticles() {
        return api("/articles", {
            method: "GET"
        });
    },
};