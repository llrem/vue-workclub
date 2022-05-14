<template>
  <div class="notice-wrapper">
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <label @click="dialogVisible = true">通知</label>
  </div>
</template>

<script>
  export default {
    name: "index",
    data(){
      return{
        dialogVisible:false
      }
    }
  }
</script>

<style scoped>

</style>
