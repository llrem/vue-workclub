
const state = {
  project: JSON.parse(sessionStorage.getItem("project"))
}

const mutations = {
  SET_PROJECT: (state, project) => {
    state.project = project;
  }
}

const actions = {
  setProject({ commit },project){
    commit("SET_PROJECT",project)
    console.log(project)
    sessionStorage.setItem("project",JSON.stringify(project))
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
