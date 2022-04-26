<template>
  <div class="setting-wrapper">
    <el-form ref="form" :model="form">
      <el-form-item class="id">
        <label>项目编号</label>
        <el-input v-model="form.id" disabled></el-input>
      </el-form-item>
      <el-form-item>
        <label>项目名称</label>
        <el-input v-model="form.name" @keyup.enter.native="updateName"></el-input>
      </el-form-item>
      <el-form-item>
        <p>项目封面</p>
        <div style="display: flex;align-items: flex-end">
          <img class="cover" :src="form.picture" alt=""/>
          <upload class="upload" :object-name="'project_cover'" @uploadSuccess="uploadSuccess">
            <el-button>上传封面</el-button>
          </upload>
        </div>
      </el-form-item>
      <el-form-item>
        <label>项目描述</label>
        <el-input type="textarea" v-model="form.description" @blur.prevent="updateDescription"></el-input>
      </el-form-item>
      <el-form-item style="display: flex;">
        <div class="archive">
          <p>归档项目</p>
          <el-button type="primary" @click="archiveProject">归档项目</el-button>
        </div>
        <div class="delete">
          <p>删除项目</p>
          <el-button type="danger" @click="deleteProject">删除项目</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {archiveProject, deleteProject, getProject, updateCover, updateDescription, updateName} from "@/api/project";
  import upload from "@/components/upload"

  export default {
    name: "index",
    data(){
      return{
        form:{
          id:'',
          name:'',
          picture:'',
          description:''
        }
      }
    },
    components:{
      upload
    },
    created(){
      let {id,name,picture,description} = this.$store.getters.project
      this.form.id = id
      this.form.name = name
      this.form.picture = picture
      this.form.description = description
    },
    methods: {
      updateName(){
        updateName({
          id:this.$store.getters.project.id,
          name:this.form.name
        }).then(()=>{
          this.updateProject()
        })
      },
      updateCover(){
        updateCover({
          id:this.$store.getters.project.id,
          picture: this.form.picture
        }).then(()=>{
          this.updateProject()
        })
      },
      updateDescription(){
        updateDescription({
          id:this.$store.getters.project.id,
          description:this.form.description
        }).then(()=>{
          this.updateProject()
        })
      },
      uploadSuccess(message){
        this.form.picture = message.dataObj.host+'/'+message.dataObj.dir+'/'+message.file.name
        this.updateCover()
      },
      updateProject(){
        getProject({id:this.$store.getters.project.id}).then(res=>{
          this.$store.dispatch("app/setProject",res.data)
        })
      },
      archiveProject(){
        archiveProject({projectId:this.$store.getters.project.id}).then(()=>{
          this.$message.success("归档成功")
          this.$router.push("/project/my-project")
        })
      },
      deleteProject(){
        deleteProject({projectId:this.$store.getters.project.id}).then(()=>{
          this.$message.success("删除成功")
          this.$router.push("/project/my-project")
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .setting-wrapper{
    padding: 20px 40px;
    height: 100%;
    overflow: auto;
  }
  .cover{
    width: 200px;
    height: 110px;
    border-radius: 5px;
    object-fit:cover;
  }
  .el-form-item{
    margin: 0;
    width: 600px;
    >>>.el-textarea__inner{
      min-height: 100px !important;
    }
    label, p{
      font-weight: bolder;
    }
    >>>.upload{
      width: 100px;
      margin-left: 20px;
    }
    .el-form-item__content{
      width: 600px;
    }
    .archive{
      width: auto;
      float: left;
    }
    .delete{
      width: auto;
      float: left;
      margin-left: 20px;
    }
  }
</style>
<style lang="scss">
  .id{
    .el-input.is-disabled .el-input__inner{
      color: #333333;
      cursor: text;
    }
  }
</style>
