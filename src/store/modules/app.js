
const state = {
  project: JSON.parse(sessionStorage.getItem("project")),
  role:JSON.parse(sessionStorage.getItem("role"))
}

const mutations = {
  SET_PROJECT: (state, project) => {
    state.project = project;
  },
  SET_ROLE: (state, role) => {
    state.role = role;
  }
}

const actions = {
  setProject({ commit },project){
    commit("SET_PROJECT",project)
    sessionStorage.setItem("project",JSON.stringify(project))
  },
  setRole({ commit},role){
    commit("SET_ROLE",role)
    sessionStorage.setItem("role",JSON.stringify(role))
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
