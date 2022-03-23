<template>
  <div>
    <div class="avatar">
      <img :src="src" alt="">
    </div>
  </div>
</template>

<script>
    export default {
      name: "avatar",
      props:{
        src:''
      }
    }
</script>

<style lang="scss" scoped>
  .avatar{
    height: 100%;
    display: flex;
    align-items: center;
    img{
      width: 26px;
      height: 26px;
      border-radius: 13px;
      object-fit:cover;
    }
  }
</style>
