<template>
  <div class="navbar">
    <hamburger :is-active="isActive" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img src="static/images/user.jpg" class="user-avatar" alt=""/>
        </div>
        <el-dropdown-menu></el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import breadcrumb from '@/components/breadcrumb'
  import hamburger from '@/components/hamburger'

  export default {
    data() {
      return{
        isActive:true
      }
    },
    components: {
      breadcrumb,
      hamburger
    },
    computed: {
      ...mapGetters([

      ])
    },
    methods: {
      toggleSideBar() {
        this.$store.dispatch('settings/toggleSideBar')
        this.isActive = !this.isActive
      },
      async logout() {

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

    .hamburger-container {
      line-height: 46px;
      height: 100%;
      float: left;
      cursor: pointer;
      transition: background .3s;
      -webkit-tap-highlight-color:transparent;

      &:hover {
        background: rgba(0, 0, 0, .025)
      }
    }

    .breadcrumb-container {
      float: left;
    }

    .right-menu {
      float: right;
      height: 100%;
      line-height: 50px;

      &:focus {
        outline: none;
      }

      .avatar-container {
        margin-right: 20px;

        .avatar-wrapper {
          margin-top: 6px;
          position: relative;

          .user-avatar {
            cursor: pointer;
            width: 38px;
            height: 38px;
            border-radius: 19px;
            object-fit:cover;
          }
        }
      }
    }
  }
</style>
