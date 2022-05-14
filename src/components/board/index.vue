<template>
   <div class="board">
     <div class="title">
       <label>{{boardName}}</label>
       <el-dropdown trigger="click">
         <i class="el-icon-more"></i>
         <el-dropdown-menu>
           <el-dropdown-item @click.native="dialogVisible = true">重命名</el-dropdown-item>
           <el-dropdown-item @click.native="deleteBoard">删除列表</el-dropdown-item>
         </el-dropdown-menu>
       </el-dropdown>
       <el-dialog
         title="重命名"
         :visible.sync="dialogVisible"
         width="30%">
         <el-input v-model="newBoardName"></el-input>
         <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="renameSubmit">确 定</el-button>
         </span>
       </el-dialog>
     </div>
     <div class="tasks">
       <task v-for="task in tasks" :task="task" :key="task.id"></task>
     </div>
     <el-popover
       placement="top-start"
       width="260"
       trigger="click"
       v-model="visible">
       <label>添加任务</label>
       <el-form ref="form" :model="form">
         <el-input type="textarea" placeholder="请输入任务描述" v-model="form.description"></el-input>
       </el-form>
       <div style="text-align: right; margin: 0">
         <el-button size="mini" type="text" @click="visible = false">取消</el-button>
         <el-button type="primary" size="mini" @click="submit">确定</el-button>
       </div>
       <el-button class="add" slot="reference"><i class="el-icon-plus"></i></el-button>
     </el-popover>
   </div>
</template>

<script>
  import task from '@/components/task'
  import {addTask, boardRename, getTasks} from "@/api/board";

  export default {
    name: "board",
    inject:['reload'],
    data() {
      return {
        visible: false,
        form:{
          boardId:this.boardId,
          description:''
        },
        tasks:[],
        dialogVisible:false,
        boardName: this.title,
        newBoardName:''
      }
    },
    props: {
      boardId:'',
      title:'',
      keyword:''
    },
    components:{
      task
    },
    watch:{
      keyword(){
        this.getTasks()
      }
    },
    created(){
      this.getTasks()
    },
    methods:{
      getTasks(){
        getTasks({boardId:this.form.boardId,keyword:this.keyword}).then(res=>{
          this.tasks = res.data
        }).catch(err=>{
          console.log(err)
        })
      },
      submit(){
        addTask(this.form).then(()=>{
          this.$message({
            message: '添加成功',
            type: 'success'
          });
          this.visible = false
          this.reload()
        }).catch(err=>{
          console.log(err)
        })
      },
      deleteBoard(){
        this.$emit('deleteBoard')
      },
      renameSubmit(){
        boardRename({boardId:this.boardId,boardName:this.newBoardName}).then(()=>{
          this.boardName = this.newBoardName
          this.dialogVisible = false
          this.$message.success("修改成功")
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .board{
    width: 275px;
    margin-right: 25px;
  }
  .tasks{
    margin: 3px 0 6px 0;
    width: 275px;
    max-height: calc(100% - 65px);
    overflow-x: hidden;
    overflow-y: auto;
  }
  .title{
    margin: 0 5px;
    height: 25px;
    .el-dropdown{
      float:right;
      margin-right: 7px;
      .el-dropdown-menu{
        padding: 0;
      }
    }
    label{
      font-weight: bold;
      font-size: 14px;
    }
    i{
      margin-top: 3px;
      color: darkgrey;
      float: right;
      &:hover{
        color: #409EFF;
      }
    }
  }
  .el-dialog{
    .el-button{
      padding: 8px 16px;
    }
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
  .add{
    margin:0 12px 0 3px;
    height: 28px;
    width: 260px;
    border: none;
    text-align: center;
    padding: 3px;
    border-radius: 5px;
    box-shadow: 0 1px 2px #dedede;
    background-color: white;
    i{
      font-size: 20px;
      color: #333333;
    }
    &:hover{
      i{
        color: #409EFF;
      }
    }
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
    background-color: lightgray;
  }
</style>
<style lang="scss">
  .el-textarea__inner{
    height: 80px;
    max-height: 80px;
  }
  .el-dropdown-menu{
    padding: 5px 0;
  }
  .el-dropdown-menu__item{
    padding: 0 10px;
  }
  .title{
    .el-dialog{
      margin-top: 120px !important;
      .el-dialog__body{
        padding: 20px;
      }
    }
  }
</style>
