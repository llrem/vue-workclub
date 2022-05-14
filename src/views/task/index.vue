<template>
  <div :class="classObj">
    <sidebar class="sidebar-container"/>
    <div class="main-container">
      <div class="navbar">
        <div class="menu">
          <hamburger :is-active="isActive" class="hamburger-container" @toggleClick="toggleSideBar"/>
          <div class="img">
            <img :src="$store.getters.project.picture" alt="">
          </div>
          <div class="nav">
            <div class="title">
              <label>
                {{$store.getters.project.name}}
              </label>
              <el-popover placement="bottom" width="400" trigger="click">
                <p style="font-weight: bolder;margin-bottom: 5px">项目编号： </p>
                {{$store.getters.project.id}}
                <p style="font-weight: bolder;margin: 5px 0">项目描述：</p>
                {{$store.getters.project.description}}
                <el-button slot="reference"><i class="el-icon-info"></i></el-button>
              </el-popover>
            </div>
            <el-menu :default-active="$route.path" mode="horizontal">
              <el-menu-item index="/task/board"><router-link to="/task/board">任务看板</router-link></el-menu-item>
              <el-menu-item index="/task/member"><router-link to="/task/member">成员管理</router-link></el-menu-item>
              <el-menu-item index="/task/file"><router-link to="/task/file">文件管理</router-link></el-menu-item>
              <el-menu-item index="/task/statistic"><router-link to="/task/statistic">数据统计</router-link></el-menu-item>
              <el-menu-item index="/task/setting"><router-link to="/task/setting">基本设置</router-link></el-menu-item>
            </el-menu>
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
        avatar:this.$store.getters.userInfo.icon
      };
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
      },
      logout() {
        this.$store.dispatch("user/logout").then(()=>{
          this.$router.push("/login")
        })
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
      .title{
        display: flex;
        align-items: center;
        label{
          color: #333333;
          font-weight: bold;
        }
        .el-button{
          padding: 0;
          border: none;
          border-radius: 8px;
          margin: 3px 0 0 5px;
        }
        i{
          font-size: 16px;
          color: lightgrey;
        }
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
  .content{
    overflow-y: hidden;
    height: calc(100vh - 72px);
  }
  .el-dropdown-menu__item{
    width: 60px;
    text-align: center;
  }
</style>
