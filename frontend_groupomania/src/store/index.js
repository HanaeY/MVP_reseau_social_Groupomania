import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import router from "@/router"

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
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
    },
    SET_ARTICLES(state, articles) {
      state.articles = articles
    },
    SET_USERNAME(state, username) {
      state.user.username = username
    },
    SET_EMAIL(state, email) {
      state.user.email = email
    },
  },
  actions: {
    login(context, {user, token}) {
      context.commit('SET_LOGGEDIN', true),
      context.commit('SET_USER', user),
      context.commit('SET_TOKEN', token),
      router.push('/')
      setTimeout(function(){ 
        context.commit('SET_LOGGEDIN', false);
        context.commit('SET_USER', null);
        context.commit('SET_TOKEN', null);
        router.push('/login')
      }, 86400000);
    },
    logout(context, message) {
      context.commit('SET_LOGGEDIN', false),
      context.commit('SET_USER', null),
      context.commit('SET_TOKEN', null),
      router.push('/login')
      context.commit('SET_MESSAGE', message)
    },
    displayArticles(context, articles) {
      context.commit('SET_ARTICLES', articles);
    },
    updateUsername(context, username) {
      context.commit('SET_USERNAME', username)
    },
    updateEmail(context, email) {
      context.commit('SET_EMAIL', email)
    },
  },
  modules: {
  }
})
