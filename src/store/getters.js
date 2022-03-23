const getters = {
  sidebar: state => state.settings.sidebar,
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  project: state => state.app.project,
}
export default getters
