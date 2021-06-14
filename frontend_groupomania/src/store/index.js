import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      userloggedin: true,
      email: "hanae.yamashita@lilo.org",
      password: "",
      username:"hanaë",
    },
    newcomment: {
      content: "exemple de commentaire",
      submit: false
    },
    newarticle: {
      url: "",
      file: "",
      description: "", 
      
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
