import {login, logout, getInfo, register} from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'

// const getDefaultState = () => {
//   return {
//     token: getToken(),
//     userInfo: '',
//   }
// }
//
// const state = getDefaultState()

const state = {
  token: getToken(),
  userInfo:''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
    setToken(token)
  },
  RESET_STATE: (state) => {
    //Object.assign(state, getDefaultState())
    state.token = ''
    state.userInfo = ''
  },
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  },

}

const actions = {
  register({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      register({ username: username.trim(), password: password }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const { data } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        commit('SET_USERINFO', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove token first
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // resetToken({ commit }) {
  //   return new Promise(resolve => {
  //     removeToken()
  //     commit('RESET_STATE')
  //     resolve()
  //   })
  // }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

