<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <span v-if="index===levelList.length-1" class="last-path">{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
  export default {
    name: 'breadcrumb',
    data() {
      return {
        levelList: []
      }
    },
    watch: {
      //监听$route函数，变化时重新渲染breadcrumb
      $route() {
        this.getBreadcrumb()
      }
    },
    created() {
      this.getBreadcrumb()
    },
    methods: {
      getBreadcrumb() {
        // item为该路径的对象
        //this.$route.matched.filter(item => console.log(item))
        let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
        //console.log(matched)
        const first = matched[0]
        //如果第一个路径不是dashboard，则添加一个dashboard对象到数组前面
        if (!this.isDashboard(first)) {
          matched = [{ path: '/dashboard', meta: { title: '我的工作台' }}].concat(matched)
        }
        this.levelList = matched
      },

      isDashboard(route) {
        const name = route && route.name
        if (!name) {
          return false
        }
        return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
      },

      handleLink(item) {
        const { redirect, path } = item
        if (redirect) {
          this.$router.push(redirect)
          return
        }
        this.$router.push(path)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 8px;

    .last-path {
      color: #97a8be;
      cursor: text;
    }
  }
</style>

