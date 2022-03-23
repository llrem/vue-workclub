<template>
  <div class="card" @click="goto">
    <img class="image" :src="imgSrc" alt="" >
    <div class="operation">
      <label>{{this.title}}</label>
    </div>
  </div>
</template>

<script>
  export default {
    name: "card",
    props: {
      title: {
        type:String,
        default:'我的项目'
      },
      imgSrc: {
        type: String,
        default:'http://workclub-oss.oss-cn-chengdu.aliyuncs.com/workclub/project_cover/default.png'
      },
      project: ''
    },
    methods:{
      goto(){
        this.$store.dispatch('settings/closeSideBar')
        this.$store.dispatch('app/setProject',JSON.stringify(this.project))
        this.$router.push('/task');
      }
    }
  }
</script>

<style lang="scss" scoped>
  .card{
    width: 220px;
    height: 146px;
    border-radius: 8px;
    margin: 0 10px 10px 0;
    float: left;
    transition:All 0.2s ease-in-out;
    box-shadow: 0 2px 5px rgba(0,21,41,.15);
    &:hover{
      box-shadow: 2px 5px 5px rgba(0,21,41,.20);
      transform:translate(0,-4px);
    }
    img{
      width: 100%;
      height: 108px;
      border-radius: 8px 8px 0 0;
      object-fit: cover;
    }
    label{
      color: #606266;
      font-size: 15px;
    }
    .operation{
      width: 100%;
      height: 38px;
      padding: 4px 12px;
      border-radius: 0 0 10px 10px;
    }
  }
</style>
