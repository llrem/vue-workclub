import Cookies from 'js-cookie'

const state = {
  sidebar: parseInt(Cookies.get('sidebarStatus'))
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar = state.sidebar ? 0 : 1
    console.log("TOGGLE_SIDEBAR")
    if (state.sidebar) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar = 0
  },
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }) {
    commit('CLOSE_SIDEBAR')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
