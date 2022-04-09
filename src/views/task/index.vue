<template>
  <div :class="classObj">
    <sidebar class="sidebar-container"/>
    <div class="main-container">
      <div class="navbar">
        <div class="menu">
          <hamburger :is-active="isActive" class="hamburger-container" @toggleClick="toggleSideBar"/>
          <div class="img">
            <img :src="project.picture" alt="">
          </div>
          <div class="nav">
            <label>{{project.name}}</label>
            <el-menu :default-active="$route.path" mode="horizontal">
              <el-menu-item index="/task/board"><router-link to="/task/board">任务看板</router-link></el-menu-item>
              <el-menu-item index="/task/member"><router-link to="/task/member">成员管理</router-link></el-menu-item>
              <el-menu-item index="/task/file"><router-link to="/task/file">文件管理</router-link></el-menu-item>
              <el-menu-item index="/task/statistic"><router-link to="/task/statistic">数据统计</router-link></el-menu-item>
              <el-menu-item index="/task/setting"><router-link to="/task/setting">基本设置</router-link></el-menu-item>
            </el-menu>
          </div>
        </div>
        <div class="setting">
          <div class="avatar">
            <el-dropdown trigger="click">
              <img :src="avatar" alt=""/>
              <el-dropdown-menu>

              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>

      <div class="content">
        <transition name="fade-transform" mode="out-in">
          <router-view :key="key"/>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
  import Sidebar from '@/layout/Sidebar'
  import hamburger from "@/components/hamburger/index";
  export default {
    name: "index",
    components: {
      Sidebar,
      hamburger
    },
    data() {
      return {
        loading:true,
        project:'',
        avatar:this.$store.getters.userInfo.icon
      };
    },
    created(){
      this.project = this.$store.getters.project
    },
    computed: {
      key() {
        return this.$route.path
      },
      isActive: {
        get(){
          return !!this.$store.getters.sidebar
        },
        set(isActive){
          return isActive;
        }
      },
      sidebar() {
        return this.$store.state.settings.sidebar
      },
      classObj() {
        return {
          hideSidebar: !this.sidebar,
          openSidebar: this.sidebar,
        }
      }
    },
    methods: {
      toggleSideBar() {
        this.$store.dispatch('settings/toggleSideBar')
        this.isActive = !this.isActive
      }
    }
  }
</script>

<style lang="scss" scoped>
  .main-container{
    overflow: hidden;
  }
  .navbar{
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 70px;
    width: 100%;
    padding: 0 10px;
    border-bottom: solid 1px #ebebeb;
  }
  .hamburger-container {
    padding: 5px !important;
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;
    &:hover {
      background: rgba(0, 0, 0, .025)
    }
    >>> .hamburger{         // >>>作用？
      width: 24px;
      height: 24px;
    }
  }
  .menu{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    svg{
      float: left;
      margin: 15px 0;
    }
    .img{
      width: 48px;
      height: 48px;
      margin: 0 10px;
      border-radius: 5px;
      overflow: hidden;
      img{
        width: 48px;
        height: 48px;
        object-fit:cover;
        border-radius: 5px;
      }
    }
    .nav{
      padding: 10px 5px;
      height:70px;
      label{
        margin-top: 20px;
        height: 40px;
        color: #333333;
        font-weight: bold;
      }
      .el-menu{
        height: 38px;
        border: none;
        .is-active a{
          color: #333333;
        }
      }
      .el-menu-item{
        padding:0;
        margin-right: 25px;
        line-height:40px;
        height: 39px;
        a{
          padding: 10px 0;
          color: grey;
        }
      }
    }
  }
  .setting{
    display: flex;
    align-items: center;
    .avatar{
      margin: 0 10px;
      width: 38px;
      height: 38px;
      overflow: hidden;
      img{
        width: 38px;
        height: 38px;
        border-radius: 19px;
        object-fit:cover;
      }
    }
  }
  .content{
    overflow-y: hidden;
    margin-top: 1px;
    height: calc(100vh - 72px);
  }
</style>
