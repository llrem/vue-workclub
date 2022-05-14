<template>
  <div class="sub-task-wrapper">
    <quill-editor
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
    ></quill-editor>
    <div class="operation">
      <el-button @click="back">返回</el-button>
      <el-button @click="submit" type="primary" v-model="content">发布</el-button>
      <upload class="illustration-upload" :object-name="'rich_text'" @uploadSuccess="uploadSuccess"></upload>
    </div>
  </div>
</template>

<script>
  import Quill from 'quill'
  import { quillEditor } from 'vue-quill-editor'
  import hljs from "highlight.js"
  import 'highlight.js/styles/github-dark.css'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import {publishSubTask} from "@/api/task";
  import upload from "@/components/upload"
  import ImageResize from 'quill-image-resize-module'
  Quill.register('modules/imageResize', ImageResize)

  export default {
    name: "index",
    data(){
      return{
        content:'',
        code:'',
        code2:'',
        flag:'',
        editorOption: {
          placeholder: '请输入内容...',
          modules: {
            imageResize: {
              displayStyles: {
                backgroundColor: 'black',
                border: 'none',
                color: 'white'
              },
              modules: ['Resize', 'DisplaySize', 'Toolbar']
            },
            toolbar: {
              container: [
                ['bold', 'italic', 'underline', 'strike'],// 加粗，斜体，下划线，删除线
                ['blockquote','code-block'],// 引用
                [{'header': 1}, {'header': 2}],// 标题，键值对的形式；1、2表示字体大小
                [{'list': 'ordered'}, {'list': 'bullet'}],//列表
                //[{'indent': '-1'}, {'indent': '+1'}],// 缩进
                //[{'direction': 'rtl'}],// 文本方向
                [{'size': [false, '16', '18', '20', '22', '24', '26', '28']}],// 字体大小
                [{'header': [1, 2, 3, 4, false]}],//几级标题
                [{'color': []}, {'background': []}],// 字体颜色，字体背景颜色
                //[{'font': []}],//字体
                [{'align': []}],//对齐方式
                ['clean'],//清除字体样式
                ['image']//上传图片、上传视频
              ],
              handlers: {
                'image': function (val) {
                  if (val) {
                    document.querySelector('.illustration-upload input').click()
                  } else {
                    this.quill.format('image', false);
                  }
                }
              }
            },
            syntax: {
              highlight: text => {
                return hljs.highlightAuto(text).value; // 这里就是代码高亮需要配置的地方
              }
            }
          }
        }
      }
    },
    components: {
      quillEditor,
      upload
    },
    props:{
      taskId:''
    },
    methods:{
      submit(){
        publishSubTask({content:this.content,userId:this.$store.getters.userInfo.id,taskId:this.taskId}).then(()=>{
          this.$message.success("发布成功")
          this.$emit("back")
        })
      },
      uploadSuccess({dataObj,file}){
        const imageUrl = dataObj.host+'/'+dataObj.dir+'/'+file.name
        // 获取光标所在位置
        let quill = this.$refs.myQuillEditor.quill
        let length = quill.getSelection().index
        // 插入图片
        quill.insertEmbed(length, 'image', imageUrl)
        // 调整光标到最后
        quill.setSelection(length + 1)
      },
      back(){
        this.$emit("back")
      }
    }
  }
</script>

<style lang="scss" scoped>
  .sub-task-wrapper{
    padding: 10px 25px;
    font-size: 14px;
    .operation{
      text-align: right;
    }
    .el-button{
      margin-top: 10px;
      padding: 8px 20px;
    }
  }
  .ql-picker{
    width: 70px;
  }
  .quill-editor{
    >>>.ql-formats{
      .ql-picker.ql-size{
        width: 80px;
      }
      .ql-picker.ql-header{
        width: 80px;
      }
    }
    >>>.ql-container{
      font-size: 14px;
      min-height: 200px;
    }
  }
</style>
