import Axios from "axios";

export default {
  async loadAllPosts({ commit }) {
    let response = await Axios.get("posts");
    let posts = response.data;
    commit("SET_ALL_POSTS", posts);
  },

  async addNewPost({ commit }, payload) {
    let response = await Axios.post("posts", payload);
    let post = response.data;
    if (response.status == 201) {
      commit("ADD_NEW_POST", post);
      return post;
    }
  },

  async updatePost({ commit }, payload) {
    let response = await Axios.put("/posts/" + payload.id, payload);
    let post = response.data;
    if (response.status == 201 || response.status == 200) {
      commit("UPDATE_POST", post);
      return post;
    }
  },

  async deletePost({ commit }, payload) {
    let response = await Axios.delete("/posts/" + payload.id);
    if (response.status == 200 || response.status == 204) {
      commit("DELETE_POST", payload);
    }
  }
};
