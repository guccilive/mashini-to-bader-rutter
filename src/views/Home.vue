<template>
  <div>
    <v-alert dense
      v-if="alertMsg.body.length"
        dismissible
        text
        :type="alertMsg.code"
      >
        {{ alertMsg.body }}
      </v-alert>
     <v-row>
        <v-col cols="12" md="8">
          <v-card
            class="mx-auto"
          >
            <v-toolbar
              color="cyan"
              dark
            >
              <v-toolbar-title>ALL POSTS</v-toolbar-title>

              <v-spacer></v-spacer>
            </v-toolbar>
            <v-list three-line>
                <template   v-for="item in posts" >
                  <v-list-item :key="item.id">
                    <v-list-item-content>
                      <v-list-item-title>
                        <v-btn text @click.prevent="showSinglePost(item)">
                          {{ item.title }}
                        </v-btn>
                      </v-list-item-title>

                      <v-list-item-subtitle> {{ item.body }} </v-list-item-subtitle>

                      <v-list-item-subtitle> 
                        <v-btn class="my-2" text dark x-small color="info"
                          @click.prevent="setFormToEditMode(item)"
                        >
                          Edit Post
                        </v-btn>

                      <v-btn class="my-2" text dark x-small color="pink"
                        @click.prevent="deletePost(item)"
                      >
                        Delete Post
                      </v-btn>
                      </v-list-item-subtitle>
                      <hr>
                    </v-list-item-content>
                  </v-list-item>
                </template>
            </v-list>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
            <v-card elevation="2" >
              <v-toolbar
              :color="color"
              dark
            >
              <v-toolbar-title>{{ cruTitle }}</v-toolbar-title>

              <v-spacer></v-spacer>
            </v-toolbar>
              <v-card-text>
                <FormComponent :form="form"/>
              </v-card-text>

              <v-card-actions>
                <v-btn
                v-if="!editMode"
                  dark
                  :color="color"
                  @click.prevent="createNewPost()"
                >
                  CREATE NEW POST
                </v-btn>
                <v-btn
                  v-else
                  dark
                  :color="color"
                  @click.prevent="updateExistingPost()"
                >
                  UPDATE POST
                </v-btn>
                <br>
              </v-card-actions>

            </v-card>
        </v-col>

      </v-row>
  </div>
</template>

<script>
import FormComponent from '@/components/FormComponent';
import { mapGetters } from "vuex";
export default {
  name: 'App',

  components: {
    FormComponent,
  },

  data() {
    return {
      form: {
        body: "",
        title: "",
        userId: Math.floor(Math.random() * 10) + 1 // Assign a random number from between 1-9 to userID for post Creation
      },
      cruTitle: "Create New Post", // Setup a dynamic Title for the Post for hearder(Create/Edit)
      editMode: false,
      color: "primary",
      alertMsg: {
        code: "",
        body: ""
      }
    }
  },

  computed: {
    /** 
      I could get data directely from State, but since I'm ordering data in Desc order, 
      I prefered to use Getters
    */

    // ...mapState({
    //   posts: state => state.postsModule.allPosts
    // }),
    ...mapGetters({
      posts: "postsModule/orderByDesc"
    })
  },

  methods: {

    // Set Form to it initila Mode, which is CREATE Mode
    setFormToInitialMode() {
      this.cruTitle =  "Create New Post";
      this.submitBtn =  "CREATE";
      this.color = "primary";
      this.form.body = "";
      this.form.title = "";
      this.form.id = "";
      this.form.userId = "";
      this.editMode = false;
    },
    // Change the tile and color of the header/button when FORM is on the Edit Mode
    setFormToEditMode(item) {
      this.editMode = true;
      this.cruTitle =  "Update Post";
      this.color = "deep-purple darken-2";
      this.form.body = item.body;
      this.form.title = item.title;
      this.form.id = item.id;
      this.form.userId = item.userId;
      this.cruTitle =  "Update Post"
    },
    
    createNewPost(){
      this.alertMsg.body = "";
      this.$store
          .dispatch("postsModule/addNewPost", this.form)
          .then(() => {
            this.alertMsg.body = "New Post Created Successfully!";
            this.alertMsg.code = "success";
            this.setFormToInitialMode();
          })
          .catch((error) => {
            console.log(error);
            this.alertMsg.body = "Ooops! Something went wrong, please try again." ;
            this.alertMsg.code = "error";
          });
    },

    updateExistingPost(){
      this.alertMsg.body = "";
      this.$store
          .dispatch("postsModule/updatePost", this.form)
          .then(() => {
            this.alertMsg.body = "Post Updated Successfully!";
            this.alertMsg.code = "success";
            this.setFormToInitialMode();
          })
          .catch((error) => {
            console.log(error);
            this.alertMsg.body = "Ooops! Post Create by YOU can't be updated because it doesn't exist in the actual database. Please update one of the original post." ;
            this.alertMsg.code = "error";
          });
      },

    deletePost(item){
      this.alertMsg.body = "";
      this.$store
          .dispatch("postsModule/deletePost", item)
          .then(() => {
            this.alertMsg.body = "Post Deleted Successfully!";
            this.alertMsg.code = "success";
            this.setFormToInitialMode();
          })
          .catch((error) => {
            console.log(error);
            this.alertMsg.body = "Ooops! Something went wrong, please try again." ;
            this.alertMsg.code = "error";
          });
    },

    /** Since we have post on our local State, 
        I prefered to get a post directly from State instead of 
        sending another Http request to get a single post and 
    */
    showSinglePost(item) {
      this.$router.push({
        name: "show-single-post",
        params: { id: item.id }
      });
    },
  }
};
</script>

