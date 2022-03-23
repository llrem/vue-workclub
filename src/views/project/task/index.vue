<template>
  <div class="hideSidebar">
    <sidebar class="sidebar-container"/>
    <div class="main-container">
      <div class="navbar">
        <div class="menu">
          <svg
            class="icon"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
          ><path d="M369.728 512l384.768-384.704a48.64 48.64 0 0 0 0.896-68.8 48.64 48.64 0 0 0-68.736 0.96L269.44 476.736a48.704 48.704 0 0 0-11.136 17.344c-1.024 2.304-1.024 4.736-1.472 7.04-0.896 3.648-2.048 7.168-2.048 10.88 0 3.712 1.152 7.232 1.984 10.88 0.512 2.368 0.512 4.8 1.472 7.04a48.704 48.704 0 0 0 11.136 17.344l417.216 417.28a48.576 48.576 0 0 0 68.736 0.96 48.576 48.576 0 0 0-0.896-68.736L369.728 512z" fill="#8a8a8a" /></svg>
          <div class="img">
            <img :src="project.picture" alt="">
          </div>
          <div class="nav">
            <label>{{project.name}}</label>
            <el-menu :default-active="$route.path" mode="horizontal">
              <el-menu-item index="/task/board"><router-link to="/task/board">任务看板</router-link></el-menu-item>
              <el-menu-item index="/task/member"><router-link to="/task/member">成员管理</router-link></el-menu-item>
              <el-menu-item index="/task/log"><router-link to="/task/log">项目日志</router-link></el-menu-item>
              <el-menu-item index="/task/statistic"><router-link to="/task/statistic">数据统计</router-link></el-menu-item>
              <el-menu-item index="/task/setting"><router-link to="/task/setting">基本设置</router-link></el-menu-item>
            </el-menu>
          </div>
        </div>
        <div class="setting">
          <div class="invite">invite</div>
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
  import Sidebar from '@/components/layout/Sidebar'
  export default {
    name: "index",
    components: {
      Sidebar
    },
    data() {
      return {
        loading:true,
        project:[],
        avatar:this.$store.getters.userInfo.icon
      };
    },
    created(){
      this.$store.dispatch('app/getProject').then(project=>{
        this.project = project;
      })
    },
    computed: {
      key() {
        return this.$route.path
      },
    },
    methods: {

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
    height: 50px;
    .invite{
      width: 60px;
      height: 26px;
      background-color: #ffc0cb;
      margin: 12px 5px;
      border-radius: 3px;
      padding: 3px 12px;
      color: white;
    }
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
