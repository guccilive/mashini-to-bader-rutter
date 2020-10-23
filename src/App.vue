<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <h2>BADER RUTTER ASSESSMENT</h2>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/guccilive/mashini-to-bader-rutter.git"
        target="_blank"
        text
      >
        <span class="mr-2">GitHub Repos</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    //
  }),

   async mounted() {
    this.$store.dispatch("postsModule/loadAllPosts");
  },
};
</script>
