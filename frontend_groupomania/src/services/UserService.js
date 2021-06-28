import { api } from "./api";

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
        })
    },
};