<template>
  <div class="member-wrapper">
    <div class="nav">
      <el-input v-model="name" placeholder="搜索成员" @keyup.enter.native="searchMember"></el-input>
      <el-button type="primary" @click="dialogVisible2=true">邀请成员</el-button>
    </div>
    <el-dialog
      title="邀请成员"
      :visible.sync="dialogVisible2"
      width="380px">
      <el-input placeholder="请输入用户名" v-model="key" @keyup.enter.native="searchUser"></el-input>
      <div class="user">
        <div class="item" v-for="user in userList" :tabindex="user.id" @focus="inviteUserId=user.id">
          <img :src="user.icon" alt="">
          <label>{{user.nickName}}</label>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="inviteUser">确 定</el-button>
      </span>
    </el-dialog>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        label="成员"
        width="200">
        <template slot-scope="scope">
          <img :src="scope.row.icon" alt=""/>
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="角色">
        <template slot-scope="scope">
          <p v-if="scope.row.role === '1'">超级管理员</p>
          <p v-if="scope.row.role === '2'">管理员</p>
          <p v-if="scope.row.role === '3'">普通成员</p>
        </template>
      </el-table-column>
      <el-table-column
        class="operation"
        label="操作"
        width="140">
        <template slot-scope="scope">
          <el-button type="primary" style="margin: 0 5px 0 15px" @click="edit(scope.row)">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" @click="remove(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="编辑"
      :visible.sync="dialogVisible"
      class="edit"
      width="35%">
      <el-radio-group v-model="radio">
        <el-radio label="1">超级管理员</el-radio>
        <el-radio label="2">管理员</el-radio>
        <el-radio label="3">普通成员</el-radio>
      </el-radio-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {getMembers, inviteUser, removeMember, searchMember, searchUser, setPermission} from "@/api/member";

  export default {
    name: "index",
    data() {
      return {
        tableData: [],
        name:'',
        dialogVisible:false,
        dialogVisible2:false,
        radio:'',
        userId:'',
        key:'',
        userList:[],
        inviteUserId:''
      }
    },
    created(){
     this.getMembers()
    },
    methods:{
      getMembers(){
        getMembers({projectId:this.$store.getters.project.id}).then(res=>{
          this.tableData = res.data
        })
      },
      edit(user){
        this.radio = user.role
        this.dialogVisible = true
        this.userId = user.id
      },
      submit(){
        setPermission({userId:this.userId,role:this.radio}).then(()=>{
          this.getMembers()
          this.$message.success("修改成功")
        })
        this.dialogVisible = false
      },
      remove(user){
        this.$confirm('是否移除该成员?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          removeMember({userId:user.id,projectId:this.$store.getters.project.id}).then(()=>{
            this.getMembers()
            this.$message.success("移除成功")
          })
        })
      },
      searchMember(){
        searchMember({keyword:this.name,projectId:this.$store.getters.project.id}).then(res=>{
          this.tableData = res.data
        })
      },
      searchUser(){
        if(this.key===''){
          this.userList=[]
        }else{
          searchUser({keyword:this.key}).then(res=>{
            this.userList = res.data
          })
        }
      },
      inviteUser(){
        if(this.inviteUserId===''){
          this.$message.info("请选择一个用户")
        }else{
          inviteUser({projectId:this.$store.getters.project.id,userId:this.inviteUserId,inviterId:this.$store.getters.userInfo.id}).then(()=>{
            this.$message.success("邀请成功")
            this.getMembers()
            this.dialogVisible2 = false
          })
        }
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
    img{
      width: 30px;
      height: 30px;
      border-radius: 15px;
      object-fit:cover;
    }
    span{
      font-weight: bold;
    }
    .el-button{
      padding: 6px;
      border-radius: 5px;
    }
    >>>.cell{
      display: flex;
      align-items: center;
    }
  }
  .el-dialog{
    .el-button{
      padding: 8px 16px;
    }
  }
  .user{
    margin-top: 10px;
    max-height: 180px;
    overflow-y: auto;
    .item{
      height: 40px;
      display: flex;
      align-items: center;
      padding: 0 10px;
      border-bottom: solid 1px #dedede;
      &:hover{
        background-color: #f4f4f4;
        border-radius: 5px;
      }
      &:focus{
        background-color: #dedede;
        border-radius: 5px;
      }
      img{
        width: 30px;
        height: 30px;
        border-radius: 15px;
      }
      label{
        font-weight: bold;
        margin-left: 12px;
      }
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
  .member-wrapper{
    .edit{
      .el-dialog{
        margin-top: 150px !important;
      }
    }
    .el-dialog__body{
      padding: 10px 20px;
    }
  }
</style>
