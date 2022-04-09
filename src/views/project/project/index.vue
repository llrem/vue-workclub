<template>
  <div class="project-wrapper">
    <div class="navbar">
      <div class="search">
        <i class="el-icon-search"></i>
        <el-input
          v-model="projectName"
          @keyup.enter.native="search"
          placeholder="搜索项目"
          ref="search">
        </el-input>
      </div>
      <el-button size="medium" type="primary" icon="el-icon-search" @click="">加入项目</el-button>
      <el-button size="medium" type="primary" icon="el-icon-plus" @click="createProject">新建项目</el-button>
    </div>

    <div class="content">
      <card v-for="project in projects" v-if="project.status===1" :img-src="project.picture" :title="project.name" :project="project" :key="project.id"></card>

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

        <el-form-item class="uploadImg" label="上传封面:">
          <el-upload
            action="http://workclub-oss.oss-cn-chengdu.aliyuncs.com"
            :data="dataObj"
            ref="upload"
            list-type="picture-card"
            :class="{hide: !hideUpload}"
            :on-preview="handlePreview"
            :before-upload="beforeUpload"
            :on-change="uploadChange"
            :on-remove="handleRemove"
            :on-success="handleUploadSuccess"
            :multiple="false">
            <i ref="file" class="el-icon-plus"></i>
          </el-upload>
          <el-dialog
            :visible.sync="imgDialogVisible"
            :append-to-body="true">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
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
  </div>
</template>

<script>
  import card from "@/components/card"
  import {createProject, getProjects, search} from "@/api/project"
  import {policy} from "@/api/oss";

  export default {
    name: "index.vue",
    inject:['reload'],
    data() {
      return {
        projects:[],
        dataObj: {
          policy: '',
          signature: '',
          key: '',
          ossaccessKeyId: '',
          dir: '',
          host: ''
        },
        form:{
          name:'',
          picture:'',
          description:'',
          createUserId:this.$store.getters.userInfo.id
        },
        projectName:'',
        dialogVisible:false,
        dialogImageUrl:'',
        imgDialogVisible:false,
        hideUpload: true,
      }
    },
    components: {
      card
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
      search(){
        search({key:this.projectName}).then(res => {
          if(res.data.length===0){
            this.$message.error('无记录');
          }else{
            this.projects=res.data
            this.$message.success("查询成功")
          }
        })
      },
      // 自定义上传
      // httpRequest(param) {
      //   uploadImg(param,this.$store.getters.userInfo.username).then(res => {
      //     this.form.picture = res.data.picture
      //   }).catch(err => {
      //     this.$message.error(err)
      //     this.$message.error('上传失败');
      //   })
      // },

      //当检测到有上传更改时调用
      uploadChange() {
        this.hideUpload = false
        if (this.$refs.upload.uploadFiles.length > 1) {
          this.$refs.upload.uploadFiles.splice(0, 1)
        }
      },
      //查看图片
      handlePreview(file) {
        this.dialogImageUrl = file.url;
        this.imgDialogVisible = true;
      },
      //移除图片
      handleRemove() {
        this.hideUpload = true
      },
      //图片上传前的处理
      beforeUpload(file) {
        let _this = this
        const isLt1M = file.size / 1024 / 1024 < 10
        if (!isLt1M) {
          this.$message.error('上传的图片大小不能超过 10MB!')
        }
        return new Promise(((resolve, reject) => {
          policy().then(res=>{
            console.log(res)
            _this.dataObj.policy = res.data.policy;
            _this.dataObj.signature = res.data.signature;
            _this.dataObj.ossaccessKeyId = res.data.accessKeyId;
            _this.dataObj.key = res.data.dir +'project_cover/'+this.$store.getters.project.id+ '/${filename}';
            _this.dataObj.dir = res.data.dir+'project_cover/'+this.$store.getters.project.id;
            _this.dataObj.host = res.data.host;
            resolve(true)
          }).catch(err => {
            console.log(err)
            reject(false)
          })
        }))
      },
      //上传成功后的处理
      handleUploadSuccess(res, file) {
        this.form.picture = this.dataObj.host + '/' + this.dataObj.dir + '/'+ file.name
      }
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
  .uploadImg{
    i{
      float: left;
      margin: 9px 6px 10px 10px;
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
  .hide {
    height: 110px;
    >>>.el-upload--picture-card {
      height: 0;
      display: none;
    }
  }
  .el-dialog{
    .el-input {
      width: 100%;
    }
  }
  .create-project>>>.el-dialog__body{
    padding: 20px 40px;
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
</style>
