<template>
    <v-form>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="12"
        >
          <v-text-field
            v-model="form.title"
            label="Post Title"
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="12"
        >
          <v-textarea
            label="Post body"
            v-model="form.body"
        ></v-textarea>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
    export default {
        props: {
          form: {
              title: "",
              body: ""
          }
        }
    }
</script>

<style lang="scss" scoped>

</style>