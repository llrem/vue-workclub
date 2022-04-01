<template>
  <div class="document-wrapper">
    <div class="upload">
      <label style="float: left;color: darkgrey;font-size: 14px">当前有 {{fileList.length}} 个文件</label>
      <upload :task-id="this.taskId" @getFiles="getFiles">
        <label><i class="el-icon-upload"></i>上传附件</label>
      </upload>
    </div>
    <div class="file" v-for="file in fileList" :key="file.id">
      <div class="content">
        <svg
          class="icon"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22">
          <path d="M679.814 62.381H128.692v897.177h768.434V255.079L679.814 62.381zM203.758 890.606V131.333h414.026v188.205H822.06v571.068H203.758z" fill="#8a8a8a" p-id="13360"></path><path d="M293.825 417.364H746.64v67.229H293.825zM293.825 577.709H746.64v67.229H293.825zM293.825 738.054H746.64v67.229H293.825z" fill="#8a8a8a"/>
        </svg>
        <label class="file-name">{{file.name}}</label>
      </div>
      <div class="operation">
        <i class="el-icon-download" @click="download(file.id)"></i>
        <i class="el-icon-delete" @click="deleteFile(file.id)"></i>
      </div>
    </div>
    <el-empty v-if="false" description="没有附件"></el-empty>
  </div>
</template>

<script>
  import upload from "@/components/upload"
  import {getFiles} from "@/api/task";
  import {deleteFile} from "@/api/oss";
  export default {
    name: "index",
    data() {
      return {
        fileList: []
      };
    },
    created(){
      this.getFiles()
    },
    props:{
      taskId:''
    },
    components:{
      upload
    },
    methods: {
      getFiles(){
        getFiles({taskId:this.taskId}).then(res=>{
          this.fileList = res.data;
          console.log(this.fileList)
        })
      },
      download(id){
        window.location.href="http://localhost:8081/aliyun/oss/download?id="+id
      },
      deleteFile(id){
        deleteFile({id:id}).then(res=>{
          this.getFiles()
          this.$message({
            message: '删除成功',
            type: 'success'
          });
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .document-wrapper{
    padding: 10px 25px 50px 25px;
  }
  .file{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    height: 38px;
    border-radius: 3px;
    &:hover{
      i{
        display: inline-block;
      }
      background-color: #f3f3f3;
    }
    i{
      display: none;
      padding: 5px;
      font-size: 17px;
      &:hover{
        color: #409EFF;
      }
    }
  }
  .content{
    display: flex;
    align-items: center;
    .file-name{
      margin-left: 10px;
    }
  }
  .upload{
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 20px;
    width: 100%;
    margin-bottom: 10px;
    padding: 0 10px;
    font-size: 15px;
    color: #409EFF;
    label{
      display: flex;
      align-items: center;
      i{
        font-size: 20px;
      }
    }
  }
</style>
<style>

</style>
