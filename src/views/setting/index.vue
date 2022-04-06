<template>
  <div>
    <p>sidebar:{{sidebar}}</p>
    <p>token:{{token}}</p>
    <p>userInfo:{{userInfo}}</p>
    <p>project:{{project}}</p>
  </div>
</template>

<script>
  export default {
    name: "index.vue",
    data(){
      return{
        sidebar:'',
        token:'',
        userInfo:'',
        project:''
      }
    },
    // computed:{
    //   sidebar(){
    //     return this.$store.getters.sidebar
    //   },
    //   token(){
    //     return  this.$store.getters.token
    //   },
    //   userInfo(){
    //     return  this.$store.getters.userInfo.id
    //   },
    //   project(){
    //     return  this.$store.state.app.project.id
    //   }
    // },
    created(){
       this.sidebar = this.$store.getters.sidebar
        this.token = this.$store.getters.token
        this.userInfo = this.$store.getters.userInfo
        this.project = this.$store.getters.project
    }
  }
</script>

<style scoped>

</style>
