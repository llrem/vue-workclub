<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
      <p>{{formTitle}}</p>

      <el-form-item prop="username">
        <i class="el-icon-user"></i>
        <el-input
            v-model="loginForm.username"
            placeholder="用户名"
            ref="username">
        </el-input>
      </el-form-item>

      <el-form-item prop="password">
        <i class="el-icon-lock"></i>
        <el-input
            :type="passwordType"
            v-model="loginForm.password"
            placeholder="密码"
            ref="password">
        </el-input>
        <svg
          v-if="isEyeOpen"
          @click="showPassword"
          class="eye"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16">
          <path d="M512 240C178.704 240 12.304 483.872 5.376 494.256c-7.168 10.752-7.168 24.752 0 35.504C12.304 540.128 178.704 784 512 784s499.696-243.872 506.624-254.256c7.168-10.752 7.168-24.752 0-35.504C1011.696 483.872 845.296 240 512 240zM512 720C263.888 720 115.744 565.152 72.192 511.936 115.6 458.608 262.976 304 512 304c248.112 0 396.256 154.848 439.808 208.064C908.4 565.392 761.024 720 512 720zM512 368c-79.408 0-144 64.608-144 144s64.592 144 144 144 144-64.608 144-144S591.408 368 512 368zM512 592c-44.112 0-80-35.888-80-80s35.888-80 80-80 80 35.888 80 80S556.112 592 512 592z" fill="#707070"/>
        </svg>
        <svg
          v-else
          @click="showPassword"
          class="eye"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16">
          <path d="M941.677 391.71c9.338-14.006 6.225-32.681-6.225-43.575-14.006-10.894-32.681-7.781-43.575 6.225-1.557 1.556-174.3 205.426-379.728 205.426-199.2 0-379.727-205.426-381.283-206.982-10.895-12.45-31.125-14.006-43.576-3.113-12.45 10.894-14.006 31.125-3.113 43.576 3.113 4.668 40.463 46.687 99.6 93.375l-79.37 82.482c-12.45 12.45-10.893 32.681 1.557 43.575 3.113 6.225 10.894 9.338 18.676 9.338 7.78 0 15.562-3.113 21.787-9.338l85.594-88.706c40.463 28.013 88.707 54.47 141.62 73.144l-32.682 110.495c-4.668 17.118 4.67 34.237 21.788 38.906h9.337c14.006 0 26.457-9.338 29.569-23.344l32.681-110.495c24.9 4.669 51.357 7.782 77.813 7.782s52.913-3.113 77.814-7.782l32.68 108.939c3.114 14.006 17.12 23.343 29.57 23.343 3.113 0 6.225 0 7.782-1.556 17.118-4.67 26.456-21.787 21.788-38.906L649.099 595.58c52.914-18.676 101.157-45.132 141.62-73.144l84.038 87.15c6.225 6.225 14.006 9.338 21.787 9.338 7.781 0 15.563-3.113 21.787-9.337 12.45-12.451 12.45-31.125 1.557-43.576l-79.37-82.481c63.808-46.689 101.16-91.82 101.16-91.82z" fill="#707070"/>
        </svg>
      </el-form-item>

      <el-button :loading="loading" size="medium" type="primary" @click="onSubmit">{{buttonText}}</el-button>
      <a class="register" v-if="this.formTitle==='Login Form'" @click="changeForm">还没有账号？立即注册</a>
      <a class="register" v-else @click="changeForm">返回登录</a>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "login",
    data() {
      return{
        loginForm:{
          username:'2521224577',
          password:'123456'
        },
        loginRules: {
          id: [{ required: true, trigger: 'blur', message:'请输入用户名' }],
          password: [
            { required: true, trigger: 'blur', message:'请输入密码'},
            { min:6, max:20, message: '长度为6到20个字符',trigger: 'blur'}
          ]
        },
        loading: false,
        passwordType: 'password',
        isEyeOpen:false,
        formTitle:'Login Form',
        buttonText:'登录',
      }
    },
    methods:{
      onSubmit(){
        if(this.formTitle==='Login Form'){
          this.login()
        }else{
          this.register()
        }
      },
      login() {
        this.$refs.loginForm.validate(valid =>{
          if(valid){
            this.loading = true
            this.$store.dispatch('user/login', this.loginForm).then(() => {
              console.log("登录")
              this.$router.push({path:'/'})
              this.loading = false
            }).catch(() => {
              console.log("出错")
              this.loading = false
            })
          }else {
            console.log('error submit!!')
            return false
          }
        })
      },
      showPassword(){
        this.isEyeOpen = !this.isEyeOpen
        if(this.passwordType==='password'){
          this.passwordType = 'text'
        }
        else{
          this.passwordType = 'password'
        }
      },
      register(){
        this.$refs.loginForm.validate(valid =>{
          if(valid){
            this.loading = true
            this.$store.dispatch('user/register', this.loginForm).then(() => {
              console.log("注册")
              this.$router.push({path:'/login'})
              this.loading = false
            }).catch(() => {
              console.log("出错")
              this.loading = false
            })
          }else {
            console.log('error submit!!')
            return false
          }
        })
      },
      changeForm(){
        if(this.formTitle==='Login Form'){
          this.formTitle = 'Register Form'
          this.buttonText = '注册'
        } else {
          this.formTitle = 'Login Form'
          this.buttonText = '登录'
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

  .login-container{
    width: 100%;
    height: 100%;
    background-color: #F0ECE3;
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0;
        border-radius: 0;
        padding: 12px 5px 12px 15px;
        height: 47px;
      }
    }
    i{
      padding: 16px 0 16px 16px;
    }
  }

  .login-form{
    position: relative;
    top: 120px;
    width: 500px;
    padding:20px;
    margin:0 auto;
    overflow: hidden;
    p{
      margin: 10px 0 25px 0;
      font-size: 35px;
      font-weight: bold;
      color: #8E806A;
    }
    .el-button{
        height: 42px;
        width: 100%;
    }
  }

  .el-form-item {
    color: #333333;
    border: 1px solid #C7B198;
    border-radius: 5px;
    background-color: #eae3d3;
    height: 49px;
  }

  .eye{
    position: absolute;
    margin: 15px 5px;
  }

  .register{
    font-size: small;
    float: right;
    color: dodgerblue;
    padding: 10px 0;
  }
</style>

<style lang="scss">
  .login-form{
    .el-input__inner{
      color: #333333;
      border: none;
      background-color: #eae3d3;
      height: 47px;
    }
  }
</style>
