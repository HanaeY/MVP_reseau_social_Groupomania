import store from "@/store/index.js";

export const BASE_URL = "http://localhost:3000/api";

export const api = async (url, params = {}) => {
    // la meth Object.assign(cible, source) copie les prop depuis un objet source vers un objet cible  
    params = Object.assign({mode: "cors", cache: "no-cache"}, params);
    params.headers = Object.assign({Authorization: `Bearer ${store.state.token}`,"Content-type": "application/json"}, params.headers);

    let response = await fetch(BASE_URL + url, params);
    let json = (await response.json()) || {};

    if(!response.ok) {
        let errorMessage = json.error ? json.error.error || json.error : response.status;
        throw new Error(errorMessage);
    }
    return json;
};

export const api2 = async (url, params = {}) => {
    // la meth Object.assign(cible, source) copie les prop depuis un objet source vers un objet cible  
    params = Object.assign({mode: "cors", cache: "no-cache"}, params);
    params.headers = Object.assign({Authorization: `Bearer ${store.state.token}`}, params.headers);

    let response = await fetch(BASE_URL + url, params);
    let json = (await response.json()) || {};

    if(!response.ok) {
        let errorMessage = json.error ? json.error.error || json.error : response.status;
        throw new Error(errorMessage);
    }
    return json;
};

