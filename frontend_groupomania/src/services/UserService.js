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
    updateUsername(userid, username, password) {
        return api("/users/myaccount/updateUsername", {
            method:"PUT",
            body: JSON.stringify(userid, username, password)
        })
    },
    updateEmail(userid, email, password) {
        return api("/users/myaccount/updateEmail", {
            method:"PUT",
            body: JSON.stringify(userid, email, password)
        })
    },
    updatePassword(userid, password, currentPassword) {
        return api("/users/myaccount/updatePassword", {
            method:"PUT",
            body: JSON.stringify(userid, password, currentPassword)
        })
    },
};