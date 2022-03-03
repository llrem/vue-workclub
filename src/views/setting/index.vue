<template>
  <form>
    <input @change="getFiles($event)" type="file" multiple="multiple" >
    <button @click="submit">提交</button>
  </form>
</template>

<script>
  import {upload} from "@/api/test";
  export default {
    name: "index.vue",
    data() {
      return {
        files: []
      }
    },
    methods:{
      submit(){
        console.log(this.files);
        return new Promise((resolve, reject) => {
          upload(this.files).then(res=>{
            console.log(res.data)
            resolve();
          }).catch(error => {
            console.log(error)
            reject();
          })
        })
      },
      getFiles(event) {
        let files = event.target.files;
        for (let i = 0; i < files.length; i++) {
          this.files.push(files[i]);
        }
      }
    }
    }
</script>

<style scoped>

</style>
