import Vue from "vue";

export default {
    SET_ALL_POSTS(state, posts) {
    state.allPosts = posts;
  },

  ADD_NEW_POST(state, post) {
    let posts = state.allPosts.concat(post);
    state.allPosts = posts;
  },

  UPDATE_POST(state, post) {
    let pIndex = state.allPosts.findIndex(u => u.id == post.id);
    Vue.set(state.allPosts, pIndex, post);
  },

  DELETE_POST(state, payload) {
    let posts = state.allPosts.filter(p => p.id != payload.id);
    state.allPosts = posts;
  }
};
