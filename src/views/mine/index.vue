<template>
  <div class="mine-wrapper">
    <div class="title">
      <h2>{{name}}</h2>
    </div>
    <div class="content">
      <div class="info">
        <el-form ref="form" :model="form" label-width="70px">
          <el-form-item label="账号">
            <el-input v-model="form.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="昵称">
            <el-input v-model="form.nickName"></el-input>
          </el-form-item>
          <el-form-item label="性别" placeholder="选择性别" style="width: 284px;display: inline-block">
            <el-select v-model="form.gender">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="年龄" style="width: 284px;display: inline-block;">
            <el-input v-model="form.age"></el-input>
          </el-form-item>
          <el-form-item label="电话" style="width: 400px;">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <el-form-item label="电子邮件">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="职业" style="width: 400px;">
            <el-input v-model="form.job"></el-input>
          </el-form-item>
          <el-form-item label="城市" style="width: 400px;">
            <el-input v-model="form.city"></el-input>
          </el-form-item>
          <el-form-item label="个性签名">
            <el-input type="textarea" v-model="form.personalizedSignature"></el-input>
          </el-form-item>
          <el-form-item class="save">
            <el-button type="success" @click="onSubmit">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="avatar">
        <div class="img">
          <img :src="this.form.icon" alt=""/>
        </div>
        <el-upload
          ref="upload"
          action="http://workclub-oss.oss-cn-chengdu.aliyuncs.com"
          :data="dataObj"
          :show-file-list=false
          :on-success="handleUploadSuccess"
          :before-upload="beforeUpload"
          :multiple="false">
          <el-button class="change-cover">更换头像</el-button>
        </el-upload>
      </div>
    </div>
  </div>
</template>

<script>
  import {saveAvatar, saveInfo} from "@/api/user";
  import {policy} from "@/api/oss";

  export default {
    inject:['reload'],
    name: "mine",
    data(){
      return{
        name:'Account',
        form: {
          id:this.$store.getters.userInfo.id,
          nickName: '',
          icon:'',
          gender: '',
          age: '',
          phone: '',
          email: '',
          job: '',
          city: '',
          personalizedSignature: ''
        },
        dataObj: {
          policy: '',
          signature: '',
          key: '',
          ossaccessKeyId: '',
          dir: '',
          host: ''
        },
      }
    },
    created(){
      this.form = this.$store.getters.userInfo
    },
    methods:{
      onSubmit(){
        saveInfo(this.form).then(res=>{
          console.log(res)
        }).catch(err=>{
          console.log(err)
        })
      },
      beforeUpload(file) {
        let _this = this
        const isLt1M = file.size / 1024 / 1024 < 10
        if (!isLt1M) {
          this.$message.error('上传的图片大小不能超过 10MB!')
        }
        return new Promise(((resolve, reject) => {
          policy().then(res=>{
            _this.dataObj.policy = res.data.policy;
            _this.dataObj.signature = res.data.signature;
            _this.dataObj.ossaccessKeyId = res.data.accessKeyId;
            _this.dataObj.key = res.data.dir +'user_avatar/'+this.$store.getters.userInfo.id+ '/${filename}';
            _this.dataObj.dir = res.data.dir+'user_avatar/'+this.$store.getters.userInfo.id;
            _this.dataObj.host = res.data.host;
            resolve(true)
          }).catch(err => {
            console.log(err)
            reject(false)
          })
        }))
      },
      handleUploadSuccess(res, file) {
        this.form.icon = this.dataObj.host + '/' + this.dataObj.dir + '/'+ file.name
        saveAvatar(this.form).then(res=>{
          //为什么上传图片后，没有调用set_userInfo,但这里打印出来的userInfo是已经更新了的userInfo
          //console.log(this.$store.getters.userInfo)

          this.reload();
        }).catch(err=>{
          console.log(err)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .mine-wrapper{
    height: 100%;
    padding: 20px 200px;
    overflow: auto;
  }
  .title{
    width: 100%;
    padding: 10px 0;
    border-bottom: solid 1px lightgrey;
  }
  .content{
    width: 100%;
    padding: 30px 0;
  }
  .info{
    float: left;
    width: 70%;
    .save{
      .el-button{
        padding: 10px 15px;
        width: 100%;
        background-color: #4CAF50;
        &:hover{
          background-color: #45a049;
        }
      }
    }
  }
  .avatar{
    float: left;
    width: 30%;
  }
  .img{
    width: 150px;
    height: 150px;
    margin-left: 70px;
    border-radius: 75px;
    background-color: #1572A1;
    overflow: hidden;
    img{
      width: 150px;
      height: 150px;
      border-radius: 75px;
      object-fit:cover;
    }
  }
  .change-cover{
    padding: 6px 10px;
    margin: 15px 0 0 105px;
  }
  ::-webkit-scrollbar{
    width: 7px;
    height: 7px;
  }
  ::-webkit-scrollbar-track{
    background-color: #f4f4f4;

  }
  ::-webkit-scrollbar-thumb{
    border-radius: 5px;
    background-color: darkgrey;
  }
</style>

<style lang="scss">
  .info{
    .el-form{
      label{
        font-weight: bolder;
      }
      .el-textarea__inner{
        min-height: 80px !important;
      }
      .is-disabled .el-input__inner{
        color: grey;
        background-color: #f7f7f7;
        cursor:default;
      }
    }
  }
</style>
