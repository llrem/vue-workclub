<template>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        :unique-opened="false"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
</template>

<script>
import SidebarItem from '@/components/sidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem },
  computed: {
    routes() {
      return this.$router.options.routes
    },
    activeMenu() {
      return this.$route.path
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.$store.getters.sidebar
    }
  }
}
</script>
