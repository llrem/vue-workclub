<template>
  <div class="document-wrapper">
    <div class="upload">
      <label style="float: left;color: darkgrey;font-size: 14px">当前有 {{fileList.length}} 个文件</label>
      <upload :object-name="'file/task/'+this.taskId" @uploadSuccess="uploadSuccess">
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
          <path d="M913.29536 941.04064c0.0256 24.82688-16.54784 44.96384-37.0176 44.98432l-708.23936 0.6912c-20.46464 0.02048-37.07904-20.08576-37.10464-44.91264l-0.83968-859.02848c-0.0256-24.82688 16.54784-44.96384 37.0176-44.98432l521.10848-0.50688 224.39424 210.50368 0.68096 693.25312z" fill="#E6E4E2" p-id="7440"></path><path d="M913.29536 253.26592l-189.11744 0.18432c-20.46464 0.02048-37.07904-20.08576-37.10464-44.91264l-0.16384-165.77024 226.38592 210.49856z" fill="#C4BCB1" p-id="7441"></path><path d="M720.72192 396.84096a22.54848 22.54848 0 0 1-22.54848 22.54848H326.13376a22.54848 22.54848 0 0 1 0-45.09696h372.0448a22.54848 22.54848 0 0 1 22.54336 22.54848zM720.72192 565.95456a22.54848 22.54848 0 0 1-22.54848 22.54848H326.13376a22.54848 22.54848 0 0 1 0-45.09696h372.0448a22.54848 22.54848 0 0 1 22.54336 22.54848zM720.72192 746.33728a22.54848 22.54848 0 0 1-22.54848 22.54848H326.13376a22.54848 22.54848 0 0 1 0-45.09696h372.0448a22.54848 22.54848 0 0 1 22.54336 22.54848z" fill="#C4BCB1"/>
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
  import upload from "@/components/upload/index"
  import {addFile, getFiles} from "@/api/task";
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
          this.$message.success("删除成功")
        })
      },
      uploadSuccess(message){
        addFile({taskId:this.taskId,path:message.dataObj.dir,name:message.file.name}).then(()=>{
          this.$message.success("上传成功")
          this.getFiles();
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
