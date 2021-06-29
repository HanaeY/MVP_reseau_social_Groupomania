import { api } from "@/services/api.js";

export default {
    signup(credentials) {
        return api("/users/signup", {
            method: "POST",
            body: JSON.stringify(credentials)
        });
    },
    login(credentials) {
        return api("/users/login", {
            method: "POST",
            body: JSON.stringify(credentials)
        });
    },
    deleteAccount(userid) {
        return api("/users/myaccount", {
            method: "DELETE",
            body: JSON.stringify(userid)
        });
    },
};