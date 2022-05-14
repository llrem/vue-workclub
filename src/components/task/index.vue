<template>
  <div class="task-wrapper">
    <div class="task" :class="priorityBar" @click="dialogVisible = true">
      <div class="title">{{task.description}}</div>
      <div class="info">
        <div class="status" :class="statusBColor">{{status}}</div>
        <div class="type2" :class="typeBColor">
          <svg
            v-if="task.type===1"
            class="icon"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16">
            <path d="M128 0h64v128a64 64 0 0 0 64 64h512a64 64 0 0 0 64-64V0h64a128 128 0 0 1 128 128v768a128 128 0 0 1-128 128H128a128 128 0 0 1-128-128V128a128 128 0 0 1 128-128z m641.152 355.776l-303.936 303.936-175.872-205.184-72.896 62.464 243.328 283.904 377.216-377.216-67.84-67.904zM768 0v64a64 64 0 0 1-64 64H320a64 64 0 0 1-64-64V0h512z" fill="#ffffff" />
          </svg>
          <svg
            v-if="task.type===2"
            class="icon"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16">
            <path d="M867.811556 598.357333c-28.074667 11.548444-96.597333 35.157333-188.16 35.157334-121.230222 0-242.517333-82.744889-363.776-82.744889-25.770667 0-58.709333 1.905778-88.32 4.864V967.111111a28.444444 28.444444 0 0 1-56.888889 0V98.332444C202.552889 91.107556 270.620444 85.333333 315.875556 85.333333c121.258667 0 242.545778 82.744889 363.776 82.744889 77.112889 0 137.841778-16.725333 171.889777-28.899555a22.641778 22.641778 0 0 1 30.236445 21.333333v416.938667a22.556444 22.556444 0 0 1-13.966222 20.906666z" p-id="27987" fill="#1296db"></path><path d="M867.811556 598.357333c-28.074667 11.548444-96.597333 35.157333-188.16 35.157334-121.230222 0-242.517333-82.744889-363.776-82.744889-25.770667 0-58.709333 1.905778-88.32 4.864V967.111111a28.444444 28.444444 0 0 1-56.888889 0V98.332444C202.552889 91.107556 270.620444 85.333333 315.875556 85.333333c121.258667 0 242.545778 82.744889 363.776 82.744889 77.112889 0 137.841778-16.725333 171.889777-28.899555a22.641778 22.641778 0 0 1 30.236445 21.333333v416.938667a22.556444 22.556444 0 0 1-13.966222 20.906666z" fill="#ffffff"/>
          </svg>
          <svg
            v-if="task.type===3"
            class="icon"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16">
            <path d="M518.804485 0c-276.586864 0-502.955038 226.30475-502.955038 502.959065 0 276.649282 226.368174 502.955038 502.955038 502.955038 276.588878 0 502.959065-226.305757 502.959065-502.955038C1021.762544 226.305757 795.39437 0 518.804485 0zM581.673739 817.305335 455.934224 817.305335 455.934224 691.567834l125.739515 0L581.673739 817.305335zM581.673739 628.69858 455.934224 628.69858 455.934224 188.607762l125.739515 0L581.673739 628.69858z" fill="#ffffff"/>
          </svg>
        </div>
        <div class="tags" v-for="tag in tags" :key="tag.id">{{tag.name}}</div>
      </div>
    </div>

    <el-dialog :show-close=false :visible.sync="dialogVisible" @close="close">
      <div class="dialog-header">
        <div>
          <el-dropdown trigger="click" placement="bottom">
            <i class="el-icon-more"></i>
            <el-dropdown-menu>
              <el-dropdown-item @click.native="handleCopy(task.id)">
                复制链接
              </el-dropdown-item>
              <el-dropdown-item @click.native="deleteTask">删除任务</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <i class="el-icon-close" @click="close"></i>
        </div>
        <el-dropdown trigger="click">
          <div>
            <div class="type" :class="typeBColor" v-if="task.type===1">
              <svg
                class="icon"
                viewBox="0 0 1024 1024"
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14">
                <path d="M128 0h64v128a64 64 0 0 0 64 64h512a64 64 0 0 0 64-64V0h64a128 128 0 0 1 128 128v768a128 128 0 0 1-128 128H128a128 128 0 0 1-128-128V128a128 128 0 0 1 128-128z m641.152 355.776l-303.936 303.936-175.872-205.184-72.896 62.464 243.328 283.904 377.216-377.216-67.84-67.904zM768 0v64a64 64 0 0 1-64 64H320a64 64 0 0 1-64-64V0h512z" fill="#ffffff" />
              </svg>
              <label>任务</label>
            </div>
            <div class="type" :class="typeBColor" v-if="task.type===2">
              <svg
                class="icon"
                viewBox="0 0 1024 1024"
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14">
                <path d="M867.811556 598.357333c-28.074667 11.548444-96.597333 35.157333-188.16 35.157334-121.230222 0-242.517333-82.744889-363.776-82.744889-25.770667 0-58.709333 1.905778-88.32 4.864V967.111111a28.444444 28.444444 0 0 1-56.888889 0V98.332444C202.552889 91.107556 270.620444 85.333333 315.875556 85.333333c121.258667 0 242.545778 82.744889 363.776 82.744889 77.112889 0 137.841778-16.725333 171.889777-28.899555a22.641778 22.641778 0 0 1 30.236445 21.333333v416.938667a22.556444 22.556444 0 0 1-13.966222 20.906666z" p-id="27987" fill="#1296db"></path><path d="M867.811556 598.357333c-28.074667 11.548444-96.597333 35.157333-188.16 35.157334-121.230222 0-242.517333-82.744889-363.776-82.744889-25.770667 0-58.709333 1.905778-88.32 4.864V967.111111a28.444444 28.444444 0 0 1-56.888889 0V98.332444C202.552889 91.107556 270.620444 85.333333 315.875556 85.333333c121.258667 0 242.545778 82.744889 363.776 82.744889 77.112889 0 137.841778-16.725333 171.889777-28.899555a22.641778 22.641778 0 0 1 30.236445 21.333333v416.938667a22.556444 22.556444 0 0 1-13.966222 20.906666z" fill="#ffffff"/>
              </svg>
              <label>里程碑</label>
            </div>
            <div class="type" :class="typeBColor" v-if="task.type===3">
              <svg
                class="icon"
                viewBox="0 0 1024 1024"
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14">
                <path d="M518.804485 0c-276.586864 0-502.955038 226.30475-502.955038 502.959065 0 276.649282 226.368174 502.955038 502.955038 502.955038 276.588878 0 502.959065-226.305757 502.959065-502.955038C1021.762544 226.305757 795.39437 0 518.804485 0zM581.673739 817.305335 455.934224 817.305335 455.934224 691.567834l125.739515 0L581.673739 817.305335zM581.673739 628.69858 455.934224 628.69858 455.934224 188.607762l125.739515 0L581.673739 628.69858z" fill="#ffffff"/>
              </svg>
              <label>问题</label>
            </div>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="typeChange(1)">任务</el-dropdown-item>
            <el-dropdown-item @click.native="typeChange(2)">里程碑</el-dropdown-item>
            <el-dropdown-item @click.native="typeChange(3)">问题</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
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
                    <div class="user-item" v-for="member in members" :tabIndex="member.id" :key="member.id" @click="()=>selectMember(member.id)">
                      <img :src="member.icon" alt="">
                      <label>{{member.nickName}}</label>
                    </div>
                  </div>
                  <div style="text-align: right; margin: 0">
                    <el-button size="mini" type="text" @click="userSelectVisible = false">取消</el-button>
                    <el-button type="primary" size="mini" @click="submitExecutorSelection">确定</el-button>
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
                  value-format = "yyyy-MM-dd hh:mm:ss"
                  placeholder="开始时间">
                </el-date-picker>
                <label style="margin-right: 30px">至</label>
                <el-date-picker
                  v-model="dueDate"
                  type="datetime"
                  @change="changeDueDate"
                  value-format = "yyyy-MM-dd hh:mm:ss"
                  placeholder="截止时间">
                </el-date-picker>
              </div>
            </div>
            <div class="form-item">
              <div class="form-label">
              <label><i class="el-icon-medal"></i>优先级</label>
              </div>
              <el-dropdown class="priority" placement="bottom-start" trigger="click">
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
                  @close="deleteTag(tag.id,tag.name)">
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
              <label>参与者</label>
              <div class="follower">
                <el-tooltip v-for="follower in followers" :open-delay=500 effect="dark" :key="follower.id" :content="follower.nickName" placement="top">
                  <img :src="follower.icon" alt="">
                </el-tooltip>
                <el-popover
                  placement="bottom"
                  width="260"
                  trigger="click"
                  v-model="followerSelectVisible">
                  <label>选择成员</label>
                  <el-form ref="form" :model="form" style="margin: 10px 0">
                    <el-input placeholder="请输入用户ID或昵称" v-model="form.user"></el-input>
                  </el-form>
                  <div class="user-list">
                    <div class="user-item" v-for="member in members" :tabindex="member.id" :key="member.id" @click="()=>selectMember(member.id)">
                      <img :src="member.icon" alt="">
                      <label>{{member.nickName}}</label>
                    </div>
                  </div>
                  <div style="text-align: right; margin: 0">
                    <el-button size="mini" type="text" @click="followerSelectVisible = false">取消</el-button>
                    <el-button type="primary" size="mini" @click="submitFollowerSelection">确定</el-button>
                  </div>
                  <el-button class="executorBtn" slot="reference" @click="getMembers">
                    <div class="add-follower">
                      <i class="el-icon-plus"></i>
                    </div>
                  </el-button>
                </el-popover>
              </div>
            </div>

            <div class="dependence">
              <div class="dependence-nav">
                <label>前置任务</label>
                <label class="add" @click="dialogVisible2=true">添加前置任务</label>
                <el-dialog
                  title="输入任务编号"
                  :visible.sync="dialogVisible2"
                  :modal="false"
                  width="30%">
                  <el-input v-model="headTaskId"></el-input>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible2 = false">取 消</el-button>
                    <el-button type="primary" @click="addHeadTask">确 定</el-button>
                   </span>
                </el-dialog>
              </div>
              <div class="dependence-main">
                <div class="dependence-item" v-for="(headTask,index) in headTaskList">
                  <label>{{index+1+'. '+headTask.description}}</label>
                  <div>
                    <i class="el-icon-video-play"  style="color: darkgrey" v-if="headTask.status === 1"/>
                    <i class="el-icon-video-pause"  style="color: #42C2FF" v-if="headTask.status === 2"/>
                    <i class="el-icon-circle-check"  style="color: #65C18C" v-if="headTask.status === 3"/>
                    <i class="el-icon-remove-outline" @click="removeHeadTask(headTask.id)"/>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div class="task-menu">
          <el-menu default-active="1" class="el-menu-demo" mode="horizontal">
            <el-menu-item index="1" @click="content = 1"><i class="el-icon-coin"></i>想法</el-menu-item>
            <el-menu-item index="2" @click="content = 2"><i class="el-icon-chat-dot-round"></i>讨论</el-menu-item>
            <el-menu-item index="3" @click="content = 3"><i class="el-icon-folder"></i>附件</el-menu-item>
            <el-menu-item index="4" @click="content = 4"><i class="el-icon-finished"></i>活动记录</el-menu-item>
          </el-menu>

          <sub-task v-if="content === 1" :task-id="this.task.id" @edit="edit"></sub-task>
          <comment v-if="content === 2" :task-id="this.task.id"/>
          <file v-if="content === 3" :task-id="this.task.id"/>
          <log ref="log" v-if="content === 4" :task-id="this.task.id"/>
          <rich-text v-if="content === 5" :task-id="this.task.id" @back="back"/>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    addHeadTask,
    addLog,
    addTag, changeDescription,
    changeDueDate,
    changeStartDate,
    changeTaskPriority,
    changeTaskStatus, changeTaskType,
    deleteTag, deleteTask, getHeadTasks,
    getTaskInfo, removeExecutor, removeHeadTask, selectExecutor, selectFollower
  } from "@/api/task";
  import {getProjectMembers} from "@/api/project";
  import comment from "@/views/task/board/comment/index"
  import file from "@/views/task/board/file/index"
  import log from "@/views/task/board/log/index"
  import richText from "@/views/task/board/richText/index"
  import subTask from "@/views/task/board/subTask/index"
  import {removeMember} from "@/api/member";

    export default {
      name: "task",
      inject:['reload'],
      data(){
        return{
          dialogVisible:false,
          dialogVisible2:false,
          userSelectVisible:false,
          followerSelectVisible:false,
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
          priorityBar:'priority-1',
          form:{
            user:''
          },
          members:[],
          followers:[],
          executor:'Not Assigned',
          executorImg:'',
          hideExecutorIcon: false,
          follower:'',
          followerImg:'',
          activeIndex:'',
          content: 1,
          memberId:'',
          headTaskId:'',
          headTaskList:[]
        }
      },
      props:{
        task:''
      },
      components:{
        comment,file,log,richText,subTask
      },
      computed: {
        key() {
          return this.$route.path
        },
      },
      created(){
        getTaskInfo({taskId:this.task.id}).then(res=>{
          let taskInfo = res.data;
          this.description = taskInfo.description;
          this.startDate = taskInfo.startDate;
          this.dueDate = taskInfo.dueDate
          this.followers = taskInfo.followers;
          this.headTaskList = taskInfo.headTaskList;
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
              this.typeBColor='type-1'
              break;
            }
            case 2:{
              this.typeBColor='type-2'
              break;
            }
            case 3:{
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
          //this.reload();
        },
        statusChange(status){
          if(this.headTaskList.filter(item=>item.status !== 3).length > 0){
            this.$message.warning("该任务还有前置任务未完成")
          }else{
            changeTaskStatus({taskId:this.task.id, status:status}).then(()=>{
              switch (status) {
                case 1:{
                  this.status = '未完成'
                  this.statusBColor = 'status-color1'
                  addLog({userId:this.$store.getters.userInfo.id, taskId:this.task.id, object:'未完成', type:2}).then(()=>{
                    if(this.content===4) this.$refs.log.getLogList()
                  })
                  break;
                }
                case 2:{
                  this.status = '进行中'
                  this.statusBColor = 'status-color2'
                  addLog({userId:this.$store.getters.userInfo.id, taskId:this.task.id, object:'进行中', type:2}).then(()=>{
                    if(this.content===4) this.$refs.log.getLogList()
                  })
                  break;
                }
                case 3:{
                  this.status = '已完成'
                  this.statusBColor = 'status-color3'
                  addLog({userId:this.$store.getters.userInfo.id, taskId:this.task.id, object:'已完成', type:2}).then(()=>{
                    if(this.content===4) this.$refs.log.getLogList()
                  })
                  break;
                }
              }
            })
          }
        },
        priorityChange(priority){
          changeTaskPriority({taskId:this.task.id, priority:priority}).then(()=>{
            switch (priority) {
              case 1:{
                this.priority = '普通'
                this.priorityBColor = 'priority-color1'
                addLog({userId:this.$store.getters.userInfo.id, taskId:this.task.id, object:'普通', type:6}).then(()=>{
                  if(this.content===4) this.$refs.log.getLogList()
                })
                break;
              }
              case 2:{
                this.priority = '紧急'
                this.priorityBColor = 'priority-color2'
                addLog({userId:this.$store.getters.userInfo.id, taskId:this.task.id, object:'紧急', type:6}).then(()=>{
                  if(this.content===4) this.$refs.log.getLogList()
                })
                break;
              }
              case 3:{
                this.priority = '非常紧急'
                this.priorityBColor = 'priority-color3'
                addLog({userId:this.$store.getters.userInfo.id, taskId:this.task.id, object:'非常紧急', type:6}).then(()=>{
                  if(this.content===4) this.$refs.log.getLogList()
                })
                break;
              }
            }
          })
        },
        typeChange(type){
          changeTaskType({taskId:this.task.id, type:type}).then(()=>{
            this.task.type = type;
            switch (type) {
              case 1:{
                this.typeBColor = 'type-1'
                addLog({userId:this.$store.getters.userInfo.id, taskId:this.task.id, object:'任务', type:10}).then(()=>{
                  if(this.content===4) this.$refs.log.getLogList()
                })
                break;
              }
              case 2:{
                this.typeBColor = 'type-2'
                addLog({userId:this.$store.getters.userInfo.id, taskId:this.task.id, object:'里程碑', type:10}).then(()=>{
                  if(this.content===4) this.$refs.log.getLogList()
                })
                break;
              }
              case 3:{
                this.typeBColor = 'type-3'
                addLog({userId:this.$store.getters.userInfo.id, taskId:this.task.id, object:'问题', type:10}).then(()=>{
                  if(this.content===4) this.$refs.log.getLogList()
                })
                break;
              }
            }
          })
        },
        deleteTag(id,name){
          //this.tags.splice(this.tags.indexOf(tag), 1);
          deleteTag({id:id,taskId:this.task.id}).then(res=>{
            this.tags = res.data;
            addLog({userId:this.$store.getters.userInfo.id, taskId:this.task.id, object:name, type:8}).then(()=>{
              if(this.content===4) this.$refs.log.getLogList()
            })
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
            addLog({userId:this.$store.getters.userInfo.id, taskId:this.task.id, object:inputValue, type:7}).then(()=>{
              if(this.content===4) this.$refs.log.getLogList()
            })
          })
          this.inputVisible = false;
          this.inputValue = '';
        },
        changeStartDate(){
          changeStartDate({id:this.task.id, date:this.startDate})
          addLog({userId:this.$store.getters.userInfo.id, taskId:this.task.id, object:this.startDate, type:4}).then(()=>{
            if(this.content===4) this.$refs.log.getLogList()
          })
        },
        changeDueDate(){
          changeDueDate({id:this.task.id,userId:this.$store.getters.userInfo.id,date:this.dueDate})
          addLog({userId:this.$store.getters.userInfo.id, taskId:this.task.id, object:this.dueDate, type:5}).then(()=>{
            if(this.content===4) this.$refs.log.getLogList()
          })
        },
        changeDescription(event){
          changeDescription({taskId:this.task.id,description:event.target.innerText}).then(res=>{
            this.description = res.data
          })
          addLog({userId:this.$store.getters.userInfo.id, taskId:this.task.id, object:event.target.innerText, type:1}).then(()=>{
            if(this.content===4) this.$refs.log.getLogList()
          })
        },
        selectMember(memberId){
          this.memberId = memberId;
        },
        submitExecutorSelection(){
          if(this.memberId === ''){
            this.$message({
              message: '请选择一个用户',
              type: 'warning'
            });
          }else{
            selectExecutor({taskId:this.task.id,memberId:this.memberId}).then(res=>{
              this.executor = res.data.nickName
              this.executorImg = res.data.icon
              this.hideExecutorIcon = true
              this.memberId=''
              this.userSelectVisible = false
            })
            addLog({userId:this.$store.getters.userInfo.id, taskId:this.task.id, object:this.memberId, type:3}).then(()=>{
              if(this.content===4) this.$refs.log.getLogList()
            })
          }
        },
        submitFollowerSelection(){
          selectFollower({taskId:this.task.id,memberId:this.memberId}).then(res=>{
            this.followers.push(res.data)
            addLog({userId:this.$store.getters.userInfo.id, taskId:this.task.id, object:this.memberId, type:9}).then(()=>{
              if(this.content===4) this.$refs.log.getLogList()
            })
            this.$message({
              message: '添加成功',
              type: 'success'
            });
          })
        },
        getMembers(){
          getProjectMembers({projectId:this.$store.getters.project.id}).then(res=>{
            this.members = res.data;
          })
        },
        removeExecutor(){
          removeExecutor({taskId:this.task.id}).then(()=>{
            this.executor = 'Not Assigned'
            this.hideExecutorIcon = false
          })
        },
        deleteTask(){
          deleteTask({taskId:this.task.id}).then(()=>{
            this.$message.success("删除成功");
            this.reload();
          })
        },
        handleCopy(val){
          let value = val.toString()
          const that = this
          this.$copyText(value)
            .then(() => {
              that.$message.success('复制成功')
            })
            .catch(() => {
              that.$message.success('复制失败')
            })
        },
        edit(){
          this.content=5
        },
        back(){
          this.content=1
        },
        addHeadTask(){
          addHeadTask({headTask:this.headTaskId,rearTask:this.task.id}).then(()=>{
            this.$message.success("添加成功")
            this.dialogVisible2 = false
            getHeadTasks({taskId:this.task.id}).then(res=>{
              this.headTaskList = res.data
            })
          })
        },
        removeHeadTask(taskId){
          this.$confirm('是否移除该前置任务?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            removeHeadTask({headTask:taskId,rearTask:this.task.id}).then(()=>{
              this.$message.success("移除成功")
              getHeadTasks({taskId:this.task.id}).then(res=>{
                this.headTaskList = res.data
              })
            })
          })
        }
      }
    }
</script>

<style lang="scss" scoped>
  .task{
    width: 260px;
    margin: 0 3px 8px 3px;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 1px 3px #dedede;
    padding: 12px 10px 10px 10px;
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
    flex-wrap: wrap;
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
  .type{
    display: flex;
    align-items: center;
    padding: 3px 10px;
    border-radius: 12px;
    label{
      font-size: 14px;
      margin-left: 3px;
      color: white;
    }
  }
  .type2{
    width: 24px;
    height: 24px;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    margin: 0 5px 5px 0;
  }
  .type-1{
    background-color: #26BAEE;
  }
  .type-2{
    background-color: #596E79;
  }
  .type-3{
    background-color: #FD5D5D;
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
      &:focus{
        background-color: #dedede;
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
    padding: 4.5px 10px;
    border-radius: 2px;
    background-color: #ecf5ff;
    border:solid 1px #d9ecff;
    color: #409EFF;
    margin: 0 5px 5px 0;
  }
  .dialog-header{
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center;
    padding: 13px 20px;
    border-bottom: solid 1.5px #f0f0f0;
    i{
      margin-left: 10px;
      font-size: 18px;
    }
  }
  .dialog-body{
    height: calc(100% - 56px);
    overflow-x: hidden;
    overflow-y: auto;
    margin-bottom: 50px;
    .task-info{
      display: flex;
      //border-bottom: solid 1px lightgrey;
      .task-info-left{
        width: 65%;
        padding: 10px 25px;
      }
      .line{
        width: 1px;
        margin-top: 15px;
        background-color: #dedede;
      }
      .task-info-right{
        width: 35%;
        height:auto;
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
    .task-menu{
      .el-menu{
        position: sticky;
        top: -1px;
        margin: 0 25px;
        z-index: 1000;
      }
      .el-menu-item{
        padding:0 5px;
        margin-right: 15px;
        line-height:45px;
        height: 44px;
        transition: none;
        &:hover{
          color: #333333;
          i{
            color: #333333;
          }
        }
        i{
          margin-right: 2px;
          margin-top: -3px;
        }
        a{
          padding: 12px 0;
        }
      }
      .is-active{
        color: #333333;
        i{
          color: #333333;
        }
      }
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
    background-color: #C8C2BC;
  }
  .status-color2{
    color: white;
    background-color: #42C2FF;
  }
  .status-color3{
    color: white;
    background-color: #65C18C;
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
  .followers{
    width: 100%;
    padding: 15px 12px 0 12px;
    border-bottom: solid 1px lightgrey;
    label{
      width: 100%;
      font-size: 14px;
      font-weight: bolder;
    }
    .follower{
      display: flex;
      align-items: center;
      height: auto;
      padding: 10px 0;
      flex-wrap: wrap;
      img{
        width: 30px;
        height: 30px;
        border-radius: 15px;
        margin-right: -4px;
        margin-bottom: 3px;
        object-fit:cover;
      }
      .add-follower{
        width: 30px;
        height: 30px;
        border-radius: 15px;
        background-color: lightgrey;
        &:hover{
          background-color: #c8c8c8;
        }
        i{
          color: white;
          font-size: 15px;
          font-weight: bold;
        }
        padding: 7.7px 7.2px;
      }
    }
  }
  .dependence{
    .dependence-nav{
      height: 30px;
      padding: 0 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      label{
        font-size: 14px;
      }
      .add{
        color: #409EFF;
      }
      .el-dialog{}
    }
    .dependence-main{
      padding: 0 10px;
      i{
        font-size: 15px;
      }
      .dependence-item{
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 30px;
        padding: 0 8px;
        border-radius: 3px;
        &:hover{
          background-color: #dedede;
        }
        .el-icon-remove-outline:hover{
          color: #FD5D5D;
        }
      }
    }
  }
  ::-webkit-scrollbar{
    width: 7px;
    height: 7px;
  }
  ::-webkit-scrollbar-track{
    background-color: #f4f4f4;
    border-radius: 5px;
  }
  ::-webkit-scrollbar-thumb{
    border-radius: 5px;
    background-color: darkgrey;
  }
</style>
<style lang="scss">
  .task-wrapper{
    .el-dialog{
      width: 78%;
      height: 92%;
      margin-top: 22px !important;
      margin-bottom: 0 !important;
      .el-dialog__header{
        padding:0;
        border: none;
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
  .follower{
    .el-button{
      margin-left: 7px;
      padding: 0;
      border-radius: 15px;
      border: none;
    }
  }
  .dependence-nav{
    .el-dialog{
      height: auto;
      margin-top: 120px !important;
      .el-dialog__header{
        .el-dialog__title{
          font-size: 16px;
        }
        padding:17px;
        border: none;
      }
      .el-dialog__body{
        height: 50px;
        padding: 10px 20px;
      }
      .el-dialog__footer{
        padding: 27px 20px 20px 20px;
        .el-button{
          padding: 10px 20px;
        }
      }
    }
  }
</style>
