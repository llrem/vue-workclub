<template>
  <div class="navbar">
    <div class="path">
      <hamburger :is-active="isActive" class="hamburger-container" @toggleClick="toggleSideBar" />
      <breadcrumb class="breadcrumb-container"/>
    </div>
    <div class="menu">
      <el-popover
        placement="bottom"
        width="270"
        trigger="click">
        <div v-if="invitations.length === 0">没有通知！</div>
        <div class="notice-item"
             v-for="(invitation,index) in invitations"
             :key="index"
             :class="index!==invitations.length-1?'notice-has-border-bottom':'' ">
          <div class="notice-content">
            {{invitation.content}}
          </div>
          <div class="notice-item-footer">
            <el-button type="primary" plain size="mini" @click="agree(invitation.id)">同意</el-button>
            <el-button type="danger" plain size="mini" @click="refuse(invitation.id)">拒绝</el-button>
          </div>
        </div>
        <el-button slot="reference"><i class="el-icon-message-solid"></i></el-button>
      </el-popover>
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar" alt=""/>
        </div>
        <el-dropdown-menu>
          <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
  import breadcrumb from '@/components/breadcrumb/index'
  import hamburger from '@/components/hamburger/index'
  import notice from '@/components/notice/index'
  import {agreeInvite, getInvitations, refuseInvite} from "@/api/project";

  export default {
    inject:['reload'],
    data() {
      return{
        avatar:'',
        invitations:[]
      }
    },
    components: {
      breadcrumb,
      hamburger,
      notice
    },
    created(){
      this.avatar = this.$store.getters.userInfo.icon
      this.getInvitations()
    },
    computed: {
      isActive: {
        get(){
          return !!this.$store.getters.sidebar
        },
        set(isActive){
          return isActive;
        }
      }
    },
    methods: {
      getInvitations(){
        getInvitations({userId:this.$store.getters.userInfo.id}).then(res=>{
          this.invitations = res.data
        })
      },
      toggleSideBar() {
        this.$store.dispatch('settings/toggleSideBar')
        this.isActive = !this.isActive
      },
      logout() {
        this.$store.dispatch("user/logout").then(()=>{
          this.$router.push("/login")
        })
      },
      agree(id){
        agreeInvite({id:id}).then(()=>{
          this.$message.success("已成功加入项目")
          this.reload()
        })
      },
      refuse(id){
        refuseInvite({id:id}).then(()=>{
          this.$message.success("已拒绝")
          this.reload()
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .navbar {
    height: 50px;
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .path{
    height: 100%;
    width: auto;
    display: flex;
    align-items: center;
    .hamburger-container {
      line-height: 46px;
      height: 100%;
      cursor: pointer;
      transition: background .3s;
      -webkit-tap-highlight-color:transparent;
      &:hover {
        background: rgba(0, 0, 0, .025)
      }
    }
  }
  .menu {
    display: flex;
    align-items: center;
    height: 100%;
    &:focus {
      outline: none;
    }
    i{
      color: grey;
      font-size: 18px;
    }
    .el-button{
      margin-right: 15px;
      border: none;
      padding: 0;
      background-color: #fff;
    }
    .avatar-container {
      margin-right: 20px;
      .avatar-wrapper {
        height: 38px;
        position: relative;
        img{
          cursor: pointer;
          width: 38px;
          height: 38px;
          border-radius: 19px;
          object-fit:cover;
        }
      }
    }
  }
  .el-dropdown-menu__item{
    line-height: 30px;
    padding: 0 15px;
    width: 60px;
    text-align: center;
  }
</style>
<style lang="scss">
  .el-popover{
    padding: 10px;
  }
  .notice-item{
    padding: 7px 0;
    .el-button{
      padding: 5px 10px;
      margin-left: 3px;
    }
    .notice-item-footer{
      margin-top: 10px;
      text-align: right;
    }
  }
  .notice-has-border-bottom{
    border-bottom: solid 1px #dedede;
  }
</style>
