<template>
  <div>
    <div class="comment-wrapper">
      <div class="comment" v-for="comment in comments" :key="comment.id">
        <div class="comment-header">
          <img :src="comment.icon" alt="">
          <label class="name">{{comment.name}}</label>
          <label class="time">{{comment.createDate}}</label>
        </div>
        <div class="comment-body">
          <p>{{comment.content}}</p>
        </div>
      </div>
    </div>
    <div class="write-comment">
      <img :src="this.icon" alt="">
      <el-input v-model="content" @keyup.enter.native="submit">

      </el-input>
      <el-button type="primary" size="mini" @click="submit">发送</el-button>
    </div>
  </div>
</template>

<script>
  import {getComments, submitComments} from "@/api/task";

  export default {
    name: "index",
    inject:["reload"],
    data(){
      return{
        comments:[],
        content:'',
        icon:''
      }
    },
    props:{
      taskId:''
    },
    created(){
      this.getComments();
      this.$store.dispatch("user/getInfo").then(user=>{
        this.icon = user.icon
      })
    },
    methods:{
      submit(){
        this.$store.dispatch("user/getInfo").then(user=>{
          submitComments({taskId:this.taskId,userId:user.id,content:this.content}).then(
            this.getComments
          )
        })
      },
      getComments(){
        getComments({taskId:this.taskId}).then(res=>{
          this.comments = res.data;
          this.content = ''
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .comment-wrapper{
    padding: 15px 25px;
    margin-bottom: 40px;
  }
  .comment-header{
    display: flex;
    align-items: center;
    height: 36px;
    img{
      width: 30px;
      height: 30px;
      border-radius: 15px;
      object-fit:cover;
    }
    .name{
      color: #333333;
      margin: 0 10px;
      font-size: 16px;
      font-weight: bold;
    }
    .time{
      color: darkgrey;
      font-size: 16px;
    }
  }
  .comment-body{
    margin-left: 40px;
    margin-bottom: 5px;
    padding: 12px 0;
    border-bottom: solid 1px #dedede;
  }
  .write-comment{
    display: flex;
    align-items: center;
    height: 46px;
    width: 99%;
    background-color: #ffffff;
    position:absolute;
    bottom:0;
    padding: 0 25px;
    border-radius: 0 0 5px 5px;
    img{
      width: 30px;
      height: 30px;
      border-radius: 15px;
      object-fit:cover;
      margin-right: 10px;
    }
    .el-button{
      margin-left: 10px;
      height: 29px;
    }
  }
</style>
<style lang="scss">
  .write-comment{
    .el-input__inner{
      height: 30px;
    }
  }
</style>
