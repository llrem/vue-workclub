<template>
  <div class="setting-wrapper">
    <el-form ref="form" :model="form">
      <el-form-item>
        <label>项目编号</label>
        <el-input v-model="form.id" disabled></el-input>
      </el-form-item>
      <el-form-item>
        <label>项目名称</label>
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item>
        <label>项目封面</label>
        <div class="uploadImg">
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
        </div>
      </el-form-item>
      <el-form-item>
        <label>项目描述</label>
        <el-input type="textarea" v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item>
        <p>归档项目</p>
        <el-button type="primary">归档项目</el-button>
      </el-form-item>
      <el-form-item>
        <p>删除项目</p>
        <el-button type="danger">删除项目</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {policy} from "@/api/oss";
  import {updateCover} from "@/api/project";

  export default {
    name: "index",
    data(){
      return{
        form:{
          name:'',
          description:''
        },
        dataObj: {
          policy: '',
          signature: '',
          key: '',
          ossaccessKeyId: '',
          dir: '',
          host: ''
        },
        hideUpload: true,
        imgDialogVisible:false,
        dialogImageUrl:'',
      }
    },
    methods: {
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
            console.log(_this.dataObj)
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
        updateCover({
          id:this.$store.getters.project.id,
          picture:this.form.picture
        }).then(()=>{
          this.$message.success("上传成功!")
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
  .hide {
    height: 110px;
    >>>.el-upload--picture-card {
      height: 0;
      display: none;
    }
  }
  .uploadImg{
    i{
      float: left;
      margin: 9px 6px 10px 10px;
    }
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
  }
</style>
