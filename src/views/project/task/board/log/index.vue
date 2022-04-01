<template>
  <div class="log-wrapper"  ref="log">
    <el-timeline :reverse=false>
      <el-timeline-item
        v-for="(log, index) in logList"
        :key="index"
        :timestamp="log.createDate">
        {{log.content}}
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
  import {getLogList} from "@/api/task";

  export default {
  name: "index",
  data() {
    return {
      reverse: true,
      logList: []
    };
  },
  props:{
   taskId:''
  },
  created(){
    this.getLogList()
  },
  methods:{
    getLogList(){
      getLogList({taskId:this.taskId}).then(res=>{
        this.logList = res.data;
      })
    }
  }
}
</script>

<style scoped>
  .log-wrapper{
    padding: 10px 25px;
  }
  .el-timeline{
    padding: 10px;
  }
</style>
