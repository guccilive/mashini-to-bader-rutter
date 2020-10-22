<template>
  <div>
    <v-banner elevation="3" two-line class="my-6">
      <v-avatar
        slot="icon"
        color="deep-purple accent-4"
        size="40"
      >
        <v-icon
          icon="mdi-lock"
          color="white"
        >
          mdi-comment-account
        </v-icon>
      </v-avatar>

      <div class="mb-3">
        <h5> Tittle </h5>
        {{ post.title }}
      </div>

      <div class="mb-3">
        <h5>Post Body:</h5>
        {{ post.body }}
      </div>
      <div>
        <h5>User:</h5>
        {{ post.userId }}
      </div>
    </v-banner>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: "SinglePost",

   computed: {
    ...mapState({
      posts: state => state.postsModule.allPosts
    }),

    post() {
      return this.posts.find(p => p.id == this.$route.params.id);
    }
  },

  methods: {
    // 
  },
}
</script>
