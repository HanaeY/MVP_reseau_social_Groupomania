import Vue from 'vue'
import Vuex from 'vuex'
import router from "@/router";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn: false,
    user: null,
    token: null,
    message: null,
    articles: null,
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
    }, 
    SET_MESSAGE(state, message) {
      state.message = message
    }
  },
  actions: {
    login(context, {user, token}) {
      context.commit('SET_LOGGEDIN', true),
      context.commit('SET_USER', user),
      context.commit('SET_TOKEN', token),
      router.push('/')
    },
    logout(context, message) {
      context.commit('SET_LOGGEDIN', false),
      context.commit('SET_USER', null),
      context.commit('SET_TOKEN', null),
      router.push('/login')
      context.commit('SET_MESSAGE', message)
    }
  },
  modules: {
  }
})
