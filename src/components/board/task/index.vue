<template>
  <div class="task-wrapper">
    <div class="task" :class="priorityBar" @click="dialogVisible = true">
      <div class="title">{{task.description}}</div>
      <div class="info">
        <div class="status" :class="statusBColor">{{status}}</div>
        <div :class="typeBColor"><i :class="typeIcon"></i></div>
        <div class="tags" v-for="tag in tags" :key="tag.id">{{tag.name}}</div>
      </div>
    </div>
    <el-dialog :show-close=false :visible.sync="dialogVisible" @close="close">
      <div class="dialog-header">
        <div>
          <i class="el-icon-more"></i>
          <i class="el-icon-close" @click="close"></i>
        </div>
        <label>任务</label>
      </div>
      <div class="dialog-body">
        <div class="task-info">
          <div class="task-info-left">
            <div class="description">
              <p @blur.prevent="changeDescription($event)" v-text="description" contenteditable="true"></p>
            </div>
            <div class="form-item">
              <div class="form-label">
                <label><i class="el-icon-circle-check"></i>状态</label>
              </div>
              <el-dropdown class="status2" trigger="click">
                <label :class="statusBColor">{{status}}</label>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="statusChange(1)">未完成</el-dropdown-item>
                  <el-dropdown-item @click.native="statusChange(2)">进行中</el-dropdown-item>
                  <el-dropdown-item @click.native="statusChange(3)">已完成</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div class="form-item">
              <div class="form-label">
                <label><i class="el-icon-user"></i>负责人</label>
              </div>
              <div class="executor">
                <el-popover
                  placement="bottom"
                  width="260"
                  trigger="click"
                  v-model="userSelectVisible">
                  <label>选择成员</label>
                  <el-form ref="form" :model="form" style="margin: 10px 0">
                    <el-input placeholder="请输入用户ID或昵称" v-model="form.user"></el-input>
                  </el-form>
                  <div class="user-list">
                    <div class="user-item" v-for="member in members" :key="member.id" @click="()=>selectMember(member.id)">
                      <img :src="member.icon" alt="">
                      <label>{{member.nickName}}</label>
                    </div>
                  </div>
                  <div style="text-align: right; margin: 0">
                    <el-button size="mini" type="text" @click="userSelectVisible = false">取消</el-button>
                    <el-button type="primary" size="mini" @click="submit">确定</el-button>
                  </div>
                  <el-button class="executorBtn" slot="reference" @click="getMembers">
                    <div class="executorImg" v-if="hideExecutorIcon">
                      <img :src="executorImg" alt=""/>
                    </div>
                    <div class="executorIcon" v-if="!hideExecutorIcon">
                      <i class="el-icon-user-solid" ></i>
                    </div>
                  </el-button>
                </el-popover>
                <label style="margin: 0 10px;color: darkgrey;">{{executor}}</label>
                <i v-if="hideExecutorIcon" class="el-icon-circle-close" @click="removeExecutor()"></i>
              </div>
            </div>
            <div class="form-item">
              <div class="form-label">
                <label><i class="el-icon-time"></i>时间</label>
              </div>
              <div class="date">
                <el-date-picker
                  v-model="startDate"
                  type="datetime"
                  @change="changeStartDate"
                  placeholder="开始时间">
                </el-date-picker>
                <label style="margin-right: 30px">至</label>
                <el-date-picker
                  v-model="dueDate"
                  type="datetime"
                  @change="changeDueDate"
                  placeholder="截止时间">
                </el-date-picker>
              </div>
            </div>
            <div class="form-item">
              <div class="form-label">
              <label><i class="el-icon-medal"></i>优先级</label>
              </div>
              <el-dropdown class="priority" trigger="click">
                <label :class="priorityBColor">{{priority}}</label>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="priorityChange(1)">普通</el-dropdown-item>
                  <el-dropdown-item @click.native="priorityChange(2)">紧急</el-dropdown-item>
                  <el-dropdown-item @click.native="priorityChange(3)">非常紧急</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div class="form-item" style="margin-top: 11px; height: auto; display: flex; align-items: flex-start;">
              <div class="form-label" style="margin-top: 5px">
              <label><i class="el-icon-price-tag"></i>标签</label>
              </div>
              <div class="tags2">
                <el-tag
                  :key="tag.id"
                  v-for="tag in tags"
                  closable
                  :disable-transitions="true"
                  @close="deleteTag(tag.id)">
                  {{tag.name}}
                </el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="inputVisible"
                  v-model="inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="addTag"
                >
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
              </div>
            </div>
          </div>
          <div class="line"></div>
          <div class="task-info-right">
            <div class="followers">
            </div>
            <div class="dependence">
            </div>
          </div>
        </div>
        <div class="task-comment">
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    addTag, changeDescription,
    changeDueDate,
    changeStartDate,
    changeTaskPriority,
    changeTaskStatus,
    deleteTag,
    getTaskInfo, removeExecutor, selectMember
  } from "@/api/task";
  import {getProjectMembers} from "@/api/project";
  import avatar from "@/components/avatar"

    export default {
      name: "task",
      inject:['reload'],
      data(){
        return{
          dialogVisible:false,
          userSelectVisible:false,
          description:'',
          status:'未完成',
          statusBColor:'status-color1',
          startDate:'',
          dueDate:'',
          priority:'普通',
          priorityBColor:'priority-color1',
          tags:[],
          inputVisible: false,
          inputValue: '',
          typeBColor:'type-1',
          typeIcon:'',
          priorityBar:'priority-1',
          form:{
            user:''
          },
          members:[],
          executor:'Not Assigned',
          executorImg:'',
          hideExecutorIcon: false
        }
      },
      components:{
        avatar
      },
      props:{
        task:''
      },
      created(){
        getTaskInfo({taskId:this.task.id}).then(res=>{
          let taskInfo = res.data;
          this.description = taskInfo.description;
          this.startDate = taskInfo.startDate;
          this.dueDate = taskInfo.dueDate
          if(taskInfo.executor){
            this.hideExecutorIcon = true
            this.executor = taskInfo.executor.nickName
            this.executorImg = taskInfo.executor.icon
          }

          switch (taskInfo.priority) {
            case 1:{
              this.priority = '普通'
              this.priorityBColor = 'priority-color1'
              this.priorityBar = 'priority-1'
              break;
            }
            case 2:{
              this.priority = '紧急'
              this.priorityBColor = 'priority-color2'
              this.priorityBar = 'priority-2'
              break;
            }
            case 3:{
              this.priority = '非常紧急'
              this.priorityBColor = 'priority-color3'
              this.priorityBar = 'priority-3'
              break;
            }
          }
          switch (taskInfo.status) {
            case 1:{
              this.status = '未完成'
              this.statusBColor = 'status-color1'
              break;
            }
            case 2:{
              this.status = '进行中'
              this.statusBColor = 'status-color2'
              break;
            }
            case 3:{
              this.status = '已完成'
              this.statusBColor = 'status-color3'
              break;
            }
          }
          switch (taskInfo.type) {
            case 1:{
              this.typeIcon = 'el-icon-s-order'
              this.typeBColor='type-1'
              break;
            }
            case 2:{
              this.typeIcon = 'el-icon-s-flag'
              this.typeBColor='type-2'
              break;
            }
            case 3:{
              this.typeIcon = 'el-icon-warning'
              this.typeBColor='type-3'
              break;
            }
          }
          this.tags = taskInfo.tags;
        })
      },
      methods:{
        close(){
          this.dialogVisible = false
          this.reload();
        },
        statusChange(status){
          changeTaskStatus({taskId:this.task.id, status:status}).then(res=>{
            switch (status) {
              case 1:{
                this.status = '未完成'
                this.statusBColor = 'status-color1'
                break;
              }
              case 2:{
                this.status = '进行中'
                this.statusBColor = 'status-color2'
                break;
              }
              case 3:{
                this.status = '已完成'
                this.statusBColor = 'status-color3'
                break;
              }
            }
          })
        },
        priorityChange(priority){
          changeTaskPriority({taskId:this.task.id, priority:priority}).then(res=>{
            switch (priority) {
              case 1:{
                this.priority = '普通'
                this.priorityBColor = 'priority-color1'
                break;
              }
              case 2:{
                this.priority = '紧急'
                this.priorityBColor = 'priority-color2'
                break;
              }
              case 3:{
                this.priority = '非常紧急'
                this.priorityBColor = 'priority-color3'
                break;
              }
            }
          })
        },
        deleteTag(id){
          //this.tags.splice(this.tags.indexOf(tag), 1);
          deleteTag({id:id,taskId:this.task.id}).then(res=>{
            this.tags = res.data;
          })
        },
        showInput() {
          this.inputVisible = true;
          this.$nextTick(_ => {
            this.$refs.saveTagInput.$refs.input.focus();
          });
        },
        addTag() {
          let inputValue = this.inputValue;
          addTag({taskId:this.task.id,name:inputValue}).then(res=>{
            this.tags = res.data
          })
          this.inputVisible = false;
          this.inputValue = '';
        },
        changeStartDate(){
          changeStartDate({id:this.task.id, date:this.startDate})
        },
        changeDueDate(){
          changeDueDate({id:this.task.id, date:this.dueDate})
        },
        changeDescription(event){
          changeDescription({taskId:this.task.id,description:event.target.innerText}).then(res=>{
            this.description = res.data
          })
        },
        submit(){
          this.userSelectVisible = false
        },
        getMembers(){
          this.$store.dispatch("app/getProject").then(project=>{
            getProjectMembers({projectId:project.id}).then(res=>{
              this.members = res.data;
              console.log(this.members);
            })
          })
        },
        selectMember(memberId){
          console.log(memberId)
          selectMember({taskId:this.task.id,memberId:memberId}).then(res=>{
            this.executor = res.data.nickName
            this.executorImg = res.data.icon
            this.hideExecutorIcon = true
          })
        },
        removeExecutor(){
          removeExecutor({taskId:this.task.id}).then(res=>{
            this.executor = 'Not Assigned'
            this.hideExecutorIcon = false
          })
        }
      }
    }
</script>

<style lang="scss" scoped>
  .task{
    width: 260px;
    margin: 0 3px 10px 3px;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 1px 3px #dedede;
    padding: 12px 10px;
  }
  .priority-1{
    border-left: solid 5px white;
  }
  .priority-2{
    border-left: solid 5px orange;
  }
  .priority-3{
    border-left: solid 5px orangered;
  }
  .title{
    width: 235px;
    white-space: normal;
    word-wrap: break-word;
    margin-bottom: 10px;
    font-size: 15px;
  }
  .info{
    display: flex;
    align-items: center;
    width: 100%;
    white-space: normal;
    word-wrap: break-word;
  }
  .status{
    font-size: 12px;
    padding: 4px 8px;
    border-radius: 2px;
    background-color: #dedede;
    margin: 0 5px 5px 0;
  }
  .type-1{
    padding: 3px 4px;
    border-radius: 3px;
    color: white;
    background-color: #1572A1;
    margin: 0 5px 5px 0;
  }
  .type-2{
    padding: 3px 4px;
    border-radius: 3px;
    color: white;
    background-color: darkcyan;
    margin: 0 5px 5px 0;
  }
  .type-3{
    padding: 3px 4px;
    border-radius: 3px;
    color: white;
    background-color: #ff4500;
    margin: 0 5px 5px 0;
  }
  .executor{
    display: flex;
    align-items: center;
    padding-right: 40px;
    .el-icon-circle-close{
      color: darkgrey;
      font-size:16px;
      margin-top: 2px;
      display: none;
      &:hover{
        color: #409EFF;
      }
    }
    &:hover{
      .el-icon-circle-close{
        display: block;
      }
    };
    .executorBtn{
      padding: 1px;
      border-radius: 17px;
      .executorIcon{
        border-radius: 15px;
        background-color: lightgrey;
        color: white;
        font-size: 15px;
        padding: 7px;
      }
      .executorImg{
        width: 30px;
        height: 30px;
        border-radius: 15px;
        img{
          width: 30px;
          height: 30px;
          border-radius: 15px;
          object-fit:cover;
        }
      }
    }
  }
  .user-list{
    height: 160px;
    overflow-x: hidden;
    overflow-y: auto;
    margin-bottom: 10px;
    .user-item{
      display: flex;
      align-items: center;
      padding: 0 5px;
      width: 100%;
      height: 35px;
      border-bottom: solid 1px lightgrey;
      &:hover{
        background-color: #f0f0f0;
        border-radius: 3px;
      }
      img{
        width: 26px;
        height: 26px;
        margin-right: 10px;
        border-radius: 13px;
        object-fit:cover;
      }
    }
  }
  .tags{
    font-size: 12px;
    padding: 4px 8px;
    border-radius: 2px;
    background-color: lightseagreen;
    margin: 0 5px 5px 0;
  }
  .dialog-header{
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    border-bottom: solid 1.5px #f0f0f0;
    i{
      margin-left: 10px;
      font-size: 18px;
    }
  }
  .dialog-body{
    height: calc(100% - 51px);
    overflow-x: hidden;
    overflow-y: auto;
    .task-info{
      display: flex;
      .task-info-left{
        width: 65%;
        padding: 10px 30px;
      }
      .line{
        width: 1.3px;
        margin: 20px 0;
        background-color: lightgrey;
      }
      .task-info-right{
        width: 35%;
        height:100px;
        display: flex;
      }
    }
    .description{
      p{
        color: #333333;
        outline: none;
        white-space: normal;
        word-wrap: break-word;
        word-break: break-all;
        padding: 10px 5px;
        font-size: 18px;
        font-weight: bolder;
        &:focus{
          background-color: #f0f0f0;
          border-radius: 5px;
        }
      }
    }
    .form-item{
      height: 50px;
      display: flex;
      align-items: center;
      .form-label{
        i{
          font-size: 18px;
          margin: 0 5px;
          color: grey;
        }
        label{
          color: grey;
          width: 80px;
          margin-right: 40px;
          font-weight: lighter;
          font-size: 14px;
          display: flex;
          align-items: center;
        }
      }
    }
    .tags2{
      display: flex;
      align-items: flex-start;
      flex-wrap: wrap;
      .el-tag {
        height: 30px;
        margin: 0 10px 10px 0;
      }
      .button-new-tag {
        height: 30px;
        padding-top: 0;
        padding-bottom: 0;
      }
      .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
      }
    }
    .task-comment{
      height: 500px;
    }
  }
  .status2{
    label{
      height: 30px;
      font-weight: lighter;
      font-size: 13px;
      padding: 6px 12px;
      border-radius: 3px;
    }
  }
  .status-color1{
    color: white;
    background-color: lightgrey;
  }
  .status-color2{
    color: white;
    background-color: #409EFF;
  }
  .status-color3{
    color: white;
    background-color: mediumseagreen;
  }
  .priority{
    label{
      font-weight: lighter;
      font-size: 13px;
      padding: 6px 12px;
      border-radius: 3px;
    }
  }
  .priority-color1{
    color: white;
    background-color: #409EFF;
  }
  .priority-color2{
    color: white;
    background-color: orange;
  }
  .priority-color3{
    color: white;
    background-color: #ff4500;
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
  .task-wrapper{
    .el-dialog{
      width: 76%;
      height: 90%;
      margin-top: 30px !important;
      margin-bottom: 0 !important;
      .el-dialog__header{
        padding:0
      }
      .el-dialog__body{
        padding:0;
        height: 100%;
      }
    }
  }
  .form-item{
    .date{
      .el-input{
        width: 170px;
      }
      .el-input__inner{
        font-size: 15px;
        padding: 0;
        border: none;
      }
      .el-input__prefix{
        display: none;
      }
      .el-input__suffix{
        right: 0;
      }
    }
  }
  .el-popover{
    .el-input__inner{
      height: 35px;
    }
  }
</style>
