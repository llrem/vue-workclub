import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // token:localStorage.getItem("token"),
    role:sessionStorage.getItem("role"),
    userInfo:JSON.parse(sessionStorage.getItem("userInfo")),
    courseInfo:JSON.parse(sessionStorage.getItem("courseInfo")),
  },
  mutations: {
    // SET_TOKEN:(state,token)=>{
    //   state.token = token
    //   localStorage.setItem("token",token)
    // },
    SET_ROLE:(state,role)=>{
      state.role=role;
      sessionStorage.setItem("role",role)
    },
    SET_USERINFO:(state,userInfo)=>{
      state.userInfo=userInfo;
      sessionStorage.setItem("userInfo",JSON.stringify(userInfo))
    },
    REMOVE_INFO:(state)=>{
      // state.token='';
      // localStorage.setItem("token",'');
      state.role='';
      state.userInfo={};
      sessionStorage.setItem("role",'')
      sessionStorage.setItem("userInfo",JSON.stringify(''))
    },
    SET_COURSE_INFO:(state,courseInfo)=>{
      state.courseInfo=courseInfo;
      sessionStorage.setItem("courseInfo",JSON.stringify(courseInfo))
    }
  },
  getters:{
    getRole:state => {
      return state.role
    },
    getUserInfo:state => {
      return state.userInfo
    },
    getCourseInfo:state => {
      return state.courseInfo
    }
  },
  actions: {
  },
  modules: {
  }
})
