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
import { mapGetters } from 'vuex'
import SidebarItem from '@/components/sidebar/SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      return this.$router.options.routes
    },
    activeMenu() {
      const route = this.$route
      return route.path
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar;
    }
  }
}
</script>
