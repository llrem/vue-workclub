<template>
  <div class="file-wrapper">
    <div class="file-nav">
      <div class="path">
        <div class="pathItem">
          <label @click="pathIn('')">项目文件</label>
          <span> / </span>
        </div>
        <div class="pathItem" v-for="(item,index) in path" :key="index">
          <label @click="pathIn(item)">{{item}}</label>
          <span> / </span>
        </div>
      </div>
      <div class="btn">
        <el-button type="primary" @click="dialogVisible = true">新建文件夹</el-button>
        <upload2
          :object-name="'project/'+this.$store.getters.project.id+uploadPath"
          @uploadSuccess="uploadSuccess">
          <el-button style="margin-left: 10px" type="primary">上传文件</el-button>
        </upload2>
      </div>
      <el-dialog
        title="请输入文件夹名称"
        :visible.sync="dialogVisible"
        width="30%">
        <el-input v-model="folderName"></el-input>
        <div class="btn2">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addFolder">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="folderItem" v-for="folder in folderList" :key="folder.name" @dblclick="folderIn(folder.name)">
      <div class="content">
        <svg
          class="icon"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32">
          <path d="M848.8576 199.1936H415.7568c0-26.5728-21.5424-48.128-48.128-48.128H175.1424c-26.5728 0-48.128 21.5424-48.128 48.128V343.5648c0 26.5984 21.5424 48.1408 48.128 48.1408h673.728c26.5728 0 48.128-21.5424 48.128-48.1408v-96.2432c-0.0128-26.5856-21.5552-48.128-48.1408-48.128z" fill="#CCA352" p-id="4033"></path><path d="M800.7424 247.3088H223.2576c-26.5728 0-48.128 21.5424-48.128 48.128v48.128c0 26.5984 21.5424 48.1408 48.128 48.1408h577.472c26.5728 0 48.128-21.5424 48.128-48.1408v-48.128c0-26.5728-21.5424-48.128-48.1152-48.128z" fill="#FFFFFF" p-id="4034"></path><path d="M848.8576 295.4368H175.1424c-26.5728 0-48.128 21.5424-48.128 48.128v481.2544c0 26.5472 21.5424 48.128 48.128 48.128h673.728c26.5728 0 48.128-21.568 48.128-48.128V343.552c-0.0128-26.5728-21.5552-48.1152-48.1408-48.1152z" fill="#FFCC66"/>
        </svg>
        <label>{{folder.name}}</label>
      </div>
      <div class="operation">
        <i class="el-icon-delete" @click="deleteFile()"></i>
      </div>
    </div>
    <div class="fileItem" v-for="file in fileList" :key="file.name">
      <div class="content">
        <svg
          class="icon"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
          style="margin: 0 4px 0 2px"
          width="26"
          height="26">
          <path d="M679.814 62.381H128.692v897.177h768.434V255.079L679.814 62.381zM203.758 890.606V131.333h414.026v188.205H822.06v571.068H203.758z" fill="#8a8a8a" p-id="13360"></path><path d="M293.825 417.364H746.64v67.229H293.825zM293.825 577.709H746.64v67.229H293.825zM293.825 738.054H746.64v67.229H293.825z" fill="#8a8a8a"/>
        </svg>
        <label>{{file.name}}</label>
      </div>
      <div class="operation">
        <i class="el-icon-download" @click="download(file.name)"></i>
        <i class="el-icon-delete" @click="deleteFile(file.name)"></i>
      </div>
    </div>
  </div>
</template>

<script>
  import {addFolder, deleteFile, getFiles} from "@/api/file";
  import upload2 from "@/components/upload2/index";

  export default {
    name: "index",
    data(){
      return{
        folderList:[],
        fileList: [],
        path:[],
        projectId:'',
        dialogVisible: false,
        folderName:''
      }
    },
    components:{
      upload2
    },
    computed:{
      uploadPath(){
        let path = '';
        for(let i=0;i<this.path.length;i++){
          path = path +'/'+ this.path[i]
        }
        return path;
      }
    },
    created(){
      this.getFiles('')
    },
    methods:{
      getFiles(objectName){
        objectName = this.$store.getters.project.id + objectName;
        getFiles({path:objectName}).then(res=>{
          this.folderList = res.data.folderList;
          this.fileList = res.data.fileList;
        })
      },
      getPath(){
        let path = '';
        for(let i=0;i<this.path.length;i++){
          path = path +'/'+ this.path[i]
        }
        return path;
      },
      download(name){
        let objectName =this.$store.getters.project.id+this.getPath()+'/'+name
        window.location.href="http://localhost:8081/task/file/download_file?path="+objectName;
      },
      deleteFile(name){
        let objectName =this.$store.getters.project.id+this.getPath()+'/'+name
        deleteFile({path:objectName}).then(()=>{
          let path = this.getPath();
          this.getFiles(path);
          this.$message({
            message: '删除成功',
            type: 'success'
          });
        })
      },
      async folderIn(folderName) {
        let objectName = this.getPath() + '/' + folderName
        await this.getFiles(objectName)
        this.path.push(folderName)
      },
      addFolder(){
        let objectName = this.$store.getters.project.id+this.getPath()+'/'+this.folderName+'/'
        addFolder({objectName:objectName}).then(()=>{
          let path = this.getPath();
          this.getFiles(path);
          this.$message({
            message: '添加成功',
            type: 'success'
          });
          this.dialogVisible = false;
        })
      },
      pathIn(pathItem) {
        let objectName = '';
        if (pathItem !== '') {
          for (let i = 0; i < this.path.length; i++) {
            if (this.path[i] !== pathItem) {
              objectName = objectName + '/' + this.path[i]
            } else {
              break;
            }
          }
          objectName = objectName + '/' + pathItem;
        }
        this.getFiles(objectName);
        for (let i = this.path.length - 1; i >= 0; i--) {
          if (this.path[i] !== pathItem) {
            this.path.pop()
          }
        }
      },
      uploadSuccess() {
        this.getFiles(this.getPath());
        this.$message({
          message: '上传成功',
          type: 'success'
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .file-wrapper{
    padding: 10px 30px;
    height: 100%;
    overflow-y: auto;
  }
  .file-nav{
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 45px;
    padding: 0 5px;
    .el-button{
      padding: 7px 12px;
    }
    .path{
      display: flex;
      align-items: center;
      label{
        font-size: 14px;
        margin: 0 10px;
        color: #606266;
      }
      label:hover{
        color: #409EFF;
      }
    }
    .btn{
      display: flex;
      align-items: center;
    }
  }
  .fileItem,.folderItem{
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 45px;
    padding: 0 10px;
    border-radius: 5px;
    .content{
      display: flex;
      align-items: center;
      label{
        font-size: 14px;
        color: #606266;
        margin-left: 15px;
      }
    }
    &:hover{
      i{ display: inline-block; }
      background-color: #f0f0f0;
    }
    i{
      display: none;
      padding: 5px;
      font-size: 17px;
      color: grey;
      &:hover{
        color: #409EFF;
      }
    }
  }
</style>
<style lang="scss">
  .file-nav{
    .el-dialog{
      top:80px;
    }
    .el-dialog__header{
      padding: 15px 15px 5px 15px;
    }
    .el-dialog__title{
      font-size: 15px;
    }
    .el-dialog__headerbtn{
      top:15px;
      right:15px;
    }
    .el-dialog__body{
      padding: 15px;
      .el-input__inner{
        height: 35px;
      }
      .el-button{
        padding: 7px 14px;
        margin: 20px 0 0 10px;
        float: right;
      }
      .btn2{
        display: flex;
        justify-content: right;
      }
    }

  }
</style>
