<template>
  <div class="wrapper">
    <div class="content">
      <div class="myTask">
        <div class="task-header">
          <label>我的任务</label>
          <div class="filter">
            <el-select @change="getTasks()" v-model="projectId" placeholder="请选择">
              <el-option label="所有项目" value=""></el-option>
              <el-option
                v-for="project in projects"
                v-if="project.status===1"
                :key="project.id"
                :label="project.name"
                :value="project.id">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="task-body">
          <el-collapse v-model="activeNames" @change="">
            <el-collapse-item title="进行中" name="1">
              <task2 v-for="task in taskStatus2" :key="task.id" :task="task" @getTasks = getTasks></task2>
            </el-collapse-item>
            <el-collapse-item title="未完成" name="2">
              <task2 v-for="task in taskStatus1" :key="task.id" :task="task" @getTasks = getTasks></task2>
            </el-collapse-item>
            <el-collapse-item title="已完成" name="3">
              <task2 v-for="task in taskStatus3" :key="task.id" :task="task" @getTasks = getTasks></task2>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
      <div class="info">
        <div class="calendar">
          <el-calendar v-model="value">
            <template slot="dateCell" slot-scope="{date, data}">
              <div class="calendarItem" :class="data.isSelected ? 'is-selected' : ''"
                   @dblclick="showInfo(data.day)"
                   @click="selectItem(data.day)">
                <label>{{ data.day.split('-').slice(2).join('-') }}</label>
                <i class="el-icon-star-on" style="color: orange"
                   v-if="eventDateList.indexOf(data.day) > -1">
                </i>
              </div>
            </template>
          </el-calendar>
          <el-dialog
            :title=day
            :visible.sync="dialogVisible"
            width="30%">
            <span>这是一段信息</span>
            <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
          </el-dialog>
        </div>
        <div class="notice">
          <div class="event" v-for="event in eventList" :key="event.id">
            <div class="event-title">
              {{event.title}}
            </div>
            <div class="event-content">
              <p>{{event.content}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getEventDates, getEvents, getTasks} from "@/api/dashboard";
  import task2 from "@/components/task2"
  import {getProjects} from "@/api/project";
  require("@/utils/formatDate")

  export default {
    name: "index",
    inject:['reload'],
    data() {
      return {
        value: new Date(),
        dialogVisible:false,
        eventDateList:[],
        eventList:[],
        day:'',
        activeNames: ['1'],
        taskStatus1:[],
        taskStatus2:[],
        taskStatus3:[],
        projects:[],
        projectId:''
      }
    },
    components:{
      task2
    },
    created(){
      this.day = new Date().Format("yyyy-MM-dd")
      this.getProjects()
      this.getTasks()
      this.getEvents()
      this.getEventDates()
    },
    methods:{
      getProjects(){
        getProjects({id:this.$store.getters.userInfo.id}).then(res=>{
          this.projects = res.data;
        })
      },
      getTasks(){
        getTasks({userId:this.$store.getters.userInfo.id,projectId:this.projectId}).then(res=>{
          const { taskStatus1, taskStatus2, taskStatus3 } = res.data;
          this.taskStatus1 = taskStatus1
          this.taskStatus2 = taskStatus2
          this.taskStatus3 = taskStatus3
        })
      },
      getEvents(){
        getEvents({userId:this.$store.getters.userInfo.id,date:this.day}).then(res=>{
          this.eventList = res.data
        })
      },
      getEventDates(){
        getEventDates({userId:this.$store.getters.userInfo.id}).then(res=>{
          this.eventDateList = res.data
        })
      },
      showInfo(day){
        this.day = day
        this.dialogVisible = true;
      },
      selectItem(day){
        this.day = day
        this.getEvents()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .wrapper{
    //height: calc(100vh - 50px);
    width: 100%;
    padding: 10px;
    background-color: #f4f4f4;
  }
  .content{
    width: 100%;
    height:calc(100vh - 70px);
  }
  .myTask{
    width: 67%;
    height: 100%;
    float: left;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0,21,41,.15);
    background-color: white;
  }
  .task-header{
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 15px;
    font-weight: bold;
    color: #333333;
    .filter{
      width: 130px;
      display: flex;
      align-items: center;
      .el-select{
        width: 130px;
      }
      >>>.el-input{
        font-size: 12px;
      }
      >>>input{
        height: 30px;
      }
      >>>.el-input__icon{
        line-height: 30px;
      }
    }
  }
  .task-body{
    height: calc(100% - 40px);
    overflow: auto;
    /*.el-collapse{*/
    /*  border-top: solid 1.2px #dedede;*/
    /*}*/
    >>>.el-collapse-item__header{
      font-weight: bold;
      padding: 0 15px;
    }
    >>>.el-collapse-item__wrap,{
      background-color: #f7f7f7;
      padding: 20px 0 20px 10px;
    }
    >>>.el-collapse-item__content{
      line-height: unset;
      display: flex;
      flex-wrap: wrap;
      padding: 0;
    }
  }
  .info{
    width: 32%;
    background-color: white;
    height: 100%;
    float: right;
    padding: 0 10px;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0,21,41,.15);
    overflow-y: hidden;
    .calendar{
      width: 100%;
      height: 63%;
      border-radius: 15px;
      margin: 10px 0;
      .calendarItem{
        font-size: 14px;
        width: 100%;
        height: 100%;
        padding: 7px;
      }
      .el-calendar{
        >>>.el-calendar-table .el-calendar-day{
          height: 8vh;
        }
      }
      >>>.el-calendar__header {
        padding: 0;
        border: none;
      }
      >>>.el-calendar__body {
        thead th{
          padding: 10px 0;
          font-size: 14px;
          display: none;
        }
        padding: 10px 0 0 0;
        .el-calendar-day{
          padding: 0;
        }
      }
      //background-color:  #F0ECE3;
    }
    .notice{
      width: 100%;
      height: 32%;
      overflow: auto;
      //background-color:  #F0ECE3;;
    }
    .event{
      width: 95%;
      border-radius: 5px;
      margin-bottom: 10px;
      padding: 10px;
      background-color: #f0f0f0;
      .event-title{
        min-height: 26px;
        border-radius: 5px 5px 0 0;
        display: flex;
        align-items: center;
        font-weight: bolder;
        white-space: normal;
        word-wrap: break-word;
        word-break: break-all;
      }
      .event-content{
        border-radius: 0 0 5px 5px;
        min-height: 30px;
        margin-top: 10px;
        white-space: normal;
        word-wrap: break-word;
        word-break: break-all;
      }
    }
  }
  ::-webkit-scrollbar{
    width: 8px;
    height: 8px;
  }
  ::-webkit-scrollbar-track{
    border-radius: 5px;
    background-color: #f0f0f0;

  }
  ::-webkit-scrollbar-thumb{
    border-radius: 5px;
    background-color: lightgray;
  }
</style>
<style lang="scss">
  .calendar{
    .el-dialog{
      margin-top: 100px !important;
      .el-dialog__body{
        padding: 10px 20px;
      }
      .el-dialog__footer{
        .el-button{
          padding: 8px 16px
        }
      }
    }
  }

</style>
