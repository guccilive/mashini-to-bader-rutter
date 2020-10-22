import Vue from 'vue'
import Vuex from 'vuex'

// Import Index class of post store
import postsModule from "./posts/index";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    postsModule
  }
})
