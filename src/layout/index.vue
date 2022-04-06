<template>
  <div :class="classObj" class="app-wrapper">
    <sidebar class="sidebar-container"/>
    <div class="main-container">
      <navbar/>
      <app-main/>
    </div>
  </div>
</template>

<script>
  import Sidebar from '@/layout/Sidebar'
  import Navbar from '@/layout/Navbar'
  import AppMain from '@/layout/AppMain'

  export default {
    name: 'Layout',
    components: {
      Navbar,
      Sidebar,
      AppMain
    },
    computed: {
      sidebar() {
        return this.$store.state.settings.sidebar
      },
      classObj() {
        return {
          hideSidebar: !this.sidebar,
          openSidebar: this.sidebar,
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .app-wrapper {
    position: relative;
    height: 100%;
    width: 100%;
  }
</style>
