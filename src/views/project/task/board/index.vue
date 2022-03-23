<template>
  <div class="wrapper">
    <div class="nav">

    </div>
    <div class="content">
      <div class="boards">
        <board v-for="board in boards"
               @deleteBoard="deleteBoard(board.id)"
               :board-id="board.id"
               :title="board.name"
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
  </div>
</template>

<script>
  import task from '@/components/board/task'
  import board from '@/components/board'
  import {addList,getBoards,deleteBoard} from "@/api/task";
  import {getProjectMembers} from "@/api/project";

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
        boards:[]
      }
    },
    created(){
      this.$store.dispatch('app/getProject').then(project=>{
        getBoards({projectId:project.id}).then(res=>{
          this.boards = res.data;
        }).catch(err=>{
          console.log(err)
        })
      })
    },
    methods:{
      submit(){
        this.$store.dispatch('app/getProject').then(project=>{
          this.form.projectId = project.id
          addList(this.form).then(res=>{
            this.$message({
              message: '创建成功',
              type: 'success'
            });
            this.visible = false
            this.reload()
          }).catch(err=>{
            console.log(err)
          })
        })
      },
      deleteBoard(id) {
        deleteBoard({id:id}).then(res=>{
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.reload()
        }).catch(err=>{
          console.log(err)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .wrapper{
    height: 100%;
    padding: 0;
  }
  .nav{
    width: 100%;
    height: 35px;
    border-bottom: solid 1px #f7f7f7;
  }
  .content{
    height: calc(100vh - 105px);
    background-color: #f7f7f7;
    overflow-y: hidden;
    overflow-x: auto;
  }
  .boards{
    padding: 15px 25px 7px 25px;
    white-space: nowrap;
  }
  .add{
    display: inline-block;
  }
  .addList{
    width: 295px;
    height: calc(100vh - 150px);
    overflow: auto;
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
