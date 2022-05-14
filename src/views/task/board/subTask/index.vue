<template>
  <div class="sub-task-wrapper">
    <div class="edit">
      <label style="float: left;color: darkgrey;font-size: 14px">当前有 {{subTaskList.length}} 个想法</label>
      <label  @click="edit"><i class="el-icon-s-promotion"></i>发表想法</label>
    </div>
    <div class="main">
      <el-empty v-if="subTaskList.length === 0" description=""></el-empty>
      <div class="sub-task-item" v-for="(subTask,index) in subTaskList">
        <div class="title">
          <div class="info">
            <img :src="subTask.icon" alt=""/><span>{{subTask.nickName}}</span><label>{{subTask.createDate}}</label>
          </div>
          <el-dropdown trigger="click">
            <i class="el-icon-more"></i>
            <el-dropdown-menu>
              <el-dropdown-item @click.native="deleteSubTask(subTask.id)">删除任务</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="content" v-html="marked(subTask.content)"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import {marked} from "marked";
  import hljs from "highlight.js";
  import {deleteSubTask, getSubTasks} from "@/api/task";

  export default {
    name: "index",
    data(){
      return{
        subTaskList:[]
      }
    },
    mounted() {
      marked.setOptions({
        renderer: new marked.Renderer(),
        highlight: function (code) {
          return hljs.highlightAuto(code).value;
        },
        pedantic: false,
        gfm: true,
        tables: true,
        breaks: true,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        xhtml: true
      })
    },
    props:{
      taskId:''
    },
    created(){
      this.getSubTasks()
    },
    methods:{
      getSubTasks(){
        getSubTasks({taskId:this.taskId}).then(res=>{
          this.subTaskList = res.data;
          console.log(this.subTaskList)
        })
      },
      edit(){
        this.$emit("edit")
      },
      marked(content){
        return marked(content, {breaks: true}).replace(/<pre class="ql-syntax" spellcheck="false">/g, "<pre class='ql-syntax hljs' spellcheck='false'>");
      },
      deleteSubTask(id){
        deleteSubTask({id:id}).then(()=>{
          this.$message.success("删除成功")
          this.getSubTasks()
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .sub-task-wrapper{
    padding: 0 25px 25px 25px;
  }
  .sub-task-item{
    border: solid 1.4px #E1F2FB;
    background-color: #E1F2FB;
    border-radius: 5px;
    margin-bottom: 10px;
    .title{
      width: 100%;
      height: 32px;
      font-weight: bolder;
      color: #606266;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 10px;
      .info{
        height: 100%;
        display: flex;
        align-items: center;
        img{
          width: 24px;
          height: 24px;
          border-radius: 12px;
          object-fit: cover;
          margin-right: 10px;
          margin-top: -2px;
        }
        label{
          font-weight: lighter;
          color: darkgrey;
          margin-left:  10px;
        }
      }

    }
    .content{
      padding: 10px;
      background-color: #ffffff;
      border-radius: 0 0 5px 5px;
    }
    >>>p{
      display: flex;
    }
    >>>.ql-syntax.hljs{
      padding: 10px;
      border-radius: 5px;
      background: #23241f;
    }
  }
  .edit{
    i{
      margin-right: 5px;
    }
    text-align: right;
    padding: 10px;
    font-size: 15px;
    color: #409EFF;
  }
</style>
