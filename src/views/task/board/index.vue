<template>
  <div class="board-wrapper">
    <div class="nav">
      <div class="search">
        <i class="el-icon-search"></i>
        <el-input
          class="task-search"
          v-model="description"
          tabindex="1"
          @keyup.enter.native="search"
          placeholder="搜索任务"
          ref="search">
        </el-input>
      </div>
      <div class="operation"></div>
    </div>
    <div class="content">
      <board v-for="board in boards"
             @deleteBoard="deleteBoard(board.id)"
             :board-id="board.id"
             :title="board.name"
             :keyword="keyword"
             :key="board.id">
      </board>
      <div class="add">
        <div class="addList">
          <el-popover
            placement="bottom"
            width="250"
            trigger="click"
            v-model="visible">
            <label>添加列表</label>
            <el-form ref="form" :model="form">
              <el-input placeholder="请输入列表名称" v-model="form.name"></el-input>
            </el-form>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="visible = false">取消</el-button>
              <el-button type="primary" size="mini" @click="submit">确定</el-button>
            </div>
            <el-button class="btn" slot="reference"><i class="el-icon-plus"></i><label> 添加列表</label></el-button>
          </el-popover>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import task from '@/components/task/index'
  import board from '@/components/board/index'
  import {addList, getBoards, deleteBoard, searchTask} from "@/api/task";

  export default {
    inject:['reload'],
    name: "index",
    components:{
      board,
      task
    },
    data() {
      return{
        visible: false,
        form:{
          name:'',
          projectId:''
        },
        boards:[],
        description:'',
        keyword:'',
      }
    },
    created(){
      this.getBoards()
    },
    methods:{
      getBoards(){
        getBoards({projectId:this.$store.getters.project.id}).then(res=>{
          this.boards = res.data;
        })
      },
      submit(){
        this.form.projectId = this.$store.getters.project.id
        addList(this.form).then(()=>{
          this.$message({
            message: '创建成功',
            type: 'success'
          });
          this.visible = false
          this.reload()
        })
      },
      deleteBoard(id) {
        deleteBoard({id:id}).then(()=>{
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.reload()
        })
      },
      search(){
        this.keyword = this.description
      }
    }
  }
</script>

<style lang="scss" scoped>
  .board-wrapper{
    height: 100%;
    padding: 0;
  }
  .nav{
    height: 35px;
    display: flex;
    justify-content: space-between;
  }
  .operation{
    height: 35px;
    width: 200px;
    display: flex;
    align-items: center;
  }
  .content{
    display: flex;
    flex-wrap: nowrap;
    height: calc(100% - 35px);
    background-color: #f7f7f7;
    overflow-y: hidden;
    overflow-x: auto;
    padding: 15px 25px 5px 25px;
  }
  .addList{
    width: 275px;
    height: 100%;
  }
  .el-popover{
    label{
      margin-top:10px;
    }
    .el-form{
      margin: 10px 0;
    }
    .el-textarea__inner{
      min-height: 100px;
    }
  }
  .btn{
    border: none;
    background-color: #f7f7f7;
    padding: 0;
    label{
      color: darkgrey;
      font-size: 15px;
      font-weight: normal;
    }
    i{
      font-weight: bolder;
      color: darkgrey;
      font-size: 15px;
    }
    &:hover{
      label,i{
        color: #409EFF;
      }
    }
  }
</style>
<style lang="scss">
  .board-wrapper{
    .search{
      width: 230px;
      height: 35px;
      display: flex;
      align-items: center;
      margin-left: 10px;
      i{
        font-weight: bolder;
        margin: 6px;
        color: darkgrey;
      }
      .task-search{
        .el-input__inner{
          height: 30px;
          width: 200px;
          border: none;
          border-radius: 0;
          padding: 0;
        }
      }
    }
  }
</style>
