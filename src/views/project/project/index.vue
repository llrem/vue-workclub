<template>
  <div class="project-wrapper">
    <div class="navbar">
      <div class="search">
        <i class="el-icon-search"></i>
        <el-input
          v-model="projectName"
          @keyup.enter.native="searchProject"
          placeholder="搜索项目"
          ref="search">
        </el-input>
      </div>
      <el-button size="medium" type="primary" icon="el-icon-search" @click="dialogVisible2 = true">加入项目</el-button>
      <el-button size="medium" type="primary" icon="el-icon-plus" @click="createProject">新建项目</el-button>
    </div>

    <div class="content">
      <card v-for="project in projects"
            v-if="project.status===1"
            :img-src="project.picture"
            :title="project.name"
            :project="project"
            :key="project.id">
      </card>
      <div @click="createProject" class="add-project">
        <i class="el-icon-circle-plus-outline"></i>
        <label>添加项目</label>
      </div>
    </div>

    <el-dialog
      title="新建项目"
      :visible.sync="dialogVisible"
      width="35%"
      class="create-project" >
      <el-form ref="form" :model="form" label-width="75px">
        <el-form-item label="项目名称:">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="项目封面:" class="upload">
          <img class="cover" :src="form.picture" alt=""/>
          <upload class="upload-btn" :object-name="'project_cover'" @uploadSuccess="uploadSuccess">
            <el-button>上传封面</el-button>
          </upload>
        </el-form-item>
        <el-form-item label="项目描述:">
          <el-input type="textarea" v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item class="operation">
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <div class="joinProject">
      <el-dialog
        title="加入项目"
        :visible.sync="dialogVisible2"
        width="380px">
        <el-input placeholder="请输入项目编号" v-model="key" @keyup.enter.native="search"></el-input>
        <div class="project" :class="isHidden ? 'hidden':''" tabindex="1" @focus="isDisabled=false">
          <img :src="cover" alt="">
          <div class="content2">
            <div class="title">{{title}}</div>
            <div class="description">{{description}}</div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
        <el-button v-if="isDisabled" type="primary" disabled>确 定</el-button>
        <el-button v-if="!isDisabled" type="primary" @click="joinProject">确 定</el-button>
        <el-button @click="dialogVisible2 = false">取 消</el-button>
      </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import card from "@/components/card"
  import {createProject, getProjects, joinProject, search, searchProject} from "@/api/project"
  import upload from "@/components/upload"

  export default {
    name: "index.vue",
    inject:['reload'],
    data() {
      return {
        projects:[],
        form:{
          name:'',
          picture:'http://workclub-oss.oss-cn-chengdu.aliyuncs.com/workclub/project_cover/cover.png',
          description:'',
          createUserId:this.$store.getters.userInfo.id
        },
        projectName:'',
        dialogVisible:false,
        dialogVisible2:false,
        key:'',
        cover:'',
        title:'',
        description:'',
        isHidden: true,
        isDisabled:true,
        projectId:''
      }
    },
    components: {
      card,
      upload
    },
    created() {
      getProjects({id:this.$store.getters.userInfo.id}).then(res => {
        this.projects = res.data;
      })
    },
    methods:{
      createProject(){
        this.dialogVisible = true;
        this.form.name=''
        this.form.description=''
      },
      cancel(){
        this.dialogVisible=false
      },
      onSubmit() {
        createProject(this.form).then(res => {
          this.$message.success("创建成功")
          this.dialogVisible = false;
          this.reload()
        }).catch(() => {
          this.$message.error('创建失败');
        })
      },
      searchProject(){
        searchProject({userId:this.$store.getters.userInfo.id,key:this.projectName}).then(res => {
          if(res.data.length===0){
            this.$message.error('无记录');
          }else{
            this.projects=res.data
            this.$message.success("查询成功")
          }
        })
      },
      uploadSuccess(message){
        this.form.picture = message.dataObj.host+'/'+message.dataObj.dir+'/'+message.file.name
      },
      search(){
        search({projectId:this.key}).then(res=>{
          if(res.data===null){
            this.$message.error("查询失败")
            this.isHidden = true
            this.isDisabled = true
          }else{
            this.projectId=res.data.id
            this.cover = res.data.picture
            this.title = res.data.name
            this.description = res.data.description
            this.isHidden = false
          }
        })
      },
      joinProject(){
        joinProject({projectId:this.projectId,userId:this.$store.getters.userInfo.id}).then(res=>{
          this.$message.success(res.data)
          this.reload()
        })
      }
      // 自定义上传
      // httpRequest(param) {
      //   uploadImg(param,this.$store.getters.userInfo.username).then(res => {
      //     this.form.picture = res.data.picture
      //   }).catch(err => {
      //     this.$message.error(err)
      //     this.$message.error('上传失败');
      //   })
      // }
    }
  }
</script>

<style lang="scss" scoped>
  .project-wrapper{
    width: 100%;
    padding: 10px;
    .navbar{
      height: 57px;
      padding: 10px;
    }
    .content{
      padding: 10px;
      margin-right: 10px;
      height:calc(100vh - 130px);
      overflow: auto;
    }
  }
  .search{
    color: #333333;
    border: 1px solid #409EFF;
    border-radius: 5px;
    width: 300px;
    height: 37px;
    float: left;
  }
  .upload{
    .cover{
      width: 200px;
      height: 110px;
      border-radius: 5px;
      object-fit:cover;
      border: solid 1px #f0f0f0;
    }
    .upload-btn{
      line-height: 0;
    }
  }
  .el-input {
    display: inline-block;
    height: 35px;
    width: 266px;
    input {
      background: transparent;
      border: 0;
      border-radius: 0;
      padding: 0;
      height: 35px;
    }
  }
  .el-button{
    display: inline-block;
    float: right;
    margin-left: 5px;
  }
  .add-project{
    width: 220px;
    height: 146px;
    background-color: #f4f4f4;
    border-radius: 8px;
    margin: 0 10px 10px 0;
    float: left;
    transition:All 0.2s ease-in-out;
    box-shadow: 0 2px 5px rgba(0,21,41,.15);
    &:hover{
      i,label{
        color: #409EFF;
      }
      box-shadow: 2px 5px 5px rgba(0,21,41,.20);
      transform:translate(0,-5px);
    }
    i{
      font-size: 50px;
      margin: 37px 40px 0 85px;
      color: grey;
      float: none;
    }
    label{
      width: 64px;
      height: 18px;
      font-weight: normal;
      margin:5px 0 0 80px;
      color: grey;
    }
  }
  >>>.el-dialog{
    margin-top: 45px !important;
    .el-input {
      width: 100%;
    }
  }
  .create-project>>>.el-dialog__body{
    padding: 20px 35px;
  }
  .operation{
    margin-bottom: 10px;
  }
  .project{
    width: 100%;
    height: 70px;
    padding: 6px;
    margin-top: 15px;
    border-radius: 8px;
    display: flex;
    border: solid 1.5px #f0f0f0;
    &:focus{
      border: solid 1.5px #409EFF;
    }
    img{
      width: 54px;
      height: 54px;
      object-fit: cover;
      border-radius: 7px;
    }
    .title{
      font-weight: bold;
      font-size: 15px;
      padding-top: 1px;
      height: 28px;
      padding-left: 10px;
    }
    .description{
      height: 28px;
      width: 270px;
      padding-top: 3px;
      padding-left: 10px;
    }
  }
  .hidden{
    display: none;
  }
</style>

<style lang="scss">
  .search{
    i{
      float: left;
      margin: 9px 6px 10px 10px;
    }
    .el-input__inner{
      color: #333333;
      border: none;
      height: 35px;
      width: 250px;
      padding: 0;
    }
  }
  .project-wrapper{
    .joinProject{
      .el-dialog{
        margin-top: 100px !important;
        .el-dialog__body{
          padding: 10px 20px;
        }
        .el-dialog__footer{
          display: flex;
          justify-content: flex-end;
        }
      }
    }
  }
</style>
