<template>
  <el-upload
    ref="upload"
    action="http://workclub-oss.oss-cn-chengdu.aliyuncs.com"
    :data="dataObj"
    :show-file-list=false
    :on-success="handleUploadSuccess"
    :before-upload="beforeUpload"
    :multiple="false">
    <slot></slot>
  </el-upload>
</template>

<script>
  import {policy} from "@/api/oss";

  export default {
    name: "index",
    data(){
      return{
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
    props:{
      objectName:''
    },
    methods:{
      beforeUpload(file) {
        let _this = this
        const isLt1M = file.size / 1024 / 1024 < 100
        if (!isLt1M) {
          this.$message.error('上传的图片大小不能超过 100MB!')
        }
        return new Promise(((resolve, reject) => {
          policy().then(res=>{
            _this.dataObj.policy = res.data.policy;
            _this.dataObj.signature = res.data.signature;
            _this.dataObj.ossaccessKeyId = res.data.accessKeyId;
            _this.dataObj.key = res.data.dir +this.objectName+ '/${filename}';
            _this.dataObj.dir = res.data.dir+this.objectName;
            _this.dataObj.host = res.data.host;
            resolve(true)
          }).catch(err => {
            reject(false)
          })
        }))
      },
      handleUploadSuccess(res, file) {
        this.$emit('uploadSuccess',{dataObj:this.dataObj,file:file})
      }
    }
  }
</script>

<style scoped>

</style>
