import Cookies from 'js-cookie'

const state = {
  //sidebar: Cookies.get('sidebarStatus')失效，为什么？
  sidebar: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar = !state.sidebar
    if (state.sidebar) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar = false
  },
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }) {
    commit('CLOSE_SIDEBAR')
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
