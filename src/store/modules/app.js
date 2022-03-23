
const state = {
  project: JSON.parse(sessionStorage.getItem("project"))
}

const mutations = {

}

const actions = {
  getProject(){
    return new Promise((resolve) => {
      resolve(JSON.parse(sessionStorage.getItem("project")))
    })
  },
  setProject({ commit, state },project){
    state.project = project
    sessionStorage.setItem("project",project)
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
