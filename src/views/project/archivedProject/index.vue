<template>
  <div class="project-wrapper">
    <div class="navbar">
      <div class="search">
        <i class="el-icon-search"></i>
        <el-input
          placeholder="搜索项目"
          ref="search">
        </el-input>
      </div>
      <el-button size="medium" type="primary" icon="el-icon-document-copy" @click="">批量操作</el-button>
    </div>
    <div class="content">
      <card v-for="project in projects" v-if="project.status===0" :img-src="project.picture" :title="project.name" :key="project.id"></card>
    </div>
  </div>
</template>

<script>
  import card from "@/components/card"
  import {getProjects} from "@/api/project";

  export default {
    name: "index.vue",
    components: {
      card
    },
    data() {
      return {
        projects:[]
      }
    },
    created() {
      getProjects({id:this.$store.getters.userInfo.id}).then(res => {
        this.projects = res.data;
        console.log(res.data);
      }).catch(err => {
        this.$message.error(err)
      })
    },
  }
</script>

<style lang="scss" scoped>
  .project-wrapper{
    width: 100%;
    padding: 10px;

    .navbar{
      height: 57px;
      padding: 10px;
    }
    .content{
      padding: 10px;
      margin-right: 10px;
      height:calc(100vh - 130px);
      overflow: auto;
    }
  }

  .search{
    color: #333333;
    border: 1px solid #C7B198;
    border-radius: 5px;
    width: 300px;
    height: 37px;
    float: left;
  }

  .el-input {
    display: inline-block;
    height: 35px;
    width: 266px;

    input {
      background: transparent;
      border: 0;
      border-radius: 0;
      padding: 0;
      height: 35px;
    }
  }
  i{
    float: left;
    margin: 9px 6px 10px 10px;
  }

  .el-button{
    display: inline-block;
    float: right;
    margin-left: 5px;
  }
</style>


<style lang="scss">
  .search{
    .el-input__inner{
      color: #333333;
      border: none;
      //background-color: #eae3d3;
      height: 35px;
      padding: 0;
    }
  }
</style>
