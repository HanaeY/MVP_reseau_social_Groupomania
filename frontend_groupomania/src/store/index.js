import Vue from 'vue'
import Vuex from 'vuex'
import router from "@/router";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn: false,
    user: null,
    token: null,

    newcomment: {
      content: "",
      submit: false
    },
    newarticle: {
      url: "",
      file: "",
      description: "", 
      
    }
  },
  mutations: {
    SET_LOGGEDIN(state, loggedIn) {
      state.loggedIn = loggedIn
    },
    SET_USER(state, user) {
      state.user = user
    },
    SET_TOKEN(state, token) {
      state.token = token
    }
  },
  actions: {
    login(context, {user, token}) {
      context.commit('SET_LOGGEDIN', true),
      context.commit('SET_USER', user),
      context.commit('SET_TOKEN', token),
      router.push('/')
    }
  },
  modules: {
  }
})
