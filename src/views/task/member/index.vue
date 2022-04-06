<template>
  <div class="member-wrapper">
    <div class="nav">
      <el-input v-model="name" placeholder="搜索成员"></el-input>
      <el-button type="primary" @click="invite">邀请成员</el-button>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="name"
        label="成员"
        width="200">
      </el-table-column>
      <el-table-column
        prop="roles"
        label="角色">
      </el-table-column>
      <el-table-column
        label="操作"
        width="150">
        <el-button type="primary">编辑</el-button>
        <el-button type="danger" icon="el-icon-delete"></el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {getMembers} from "@/api/member";

  export default {
    name: "index",
    data() {
      return {
        tableData: [],
        name:''
      }
    },
    created(){
      getMembers({projectId:this.$store.getters.project.id}).then(res=>{
        this.tableData = res.data
      })
    },
    methods:{
      invite(){

      }
    }
  }
</script>

<style lang="scss" scoped>
  .nav{
    height: 35px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .el-button{
      padding: 7px 14px;
    }
  }
  .member-wrapper{
    padding: 15px 20px;
    height: 100%;
    overflow: auto;
  }
  .el-table{
    .el-button{
      padding: 6px 12px;
      margin-left: 10px;
    }
  }
</style>
<style lang="scss">
  .nav{
    .el-input{
      width: 240px;
    }
    .el-input__inner{
      height: 35px;
    }
  }
</style>
