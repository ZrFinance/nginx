export default {
  handleAuthorization (state, authorization) {
    state.authorization = authorization
    try {
      localStorage.authorization = authorization
    } catch(e) {}
  },
  handleUser(state,user){
    state.user = user
    try {
      localStorage.username = user.username
    } catch(e) {}
  }
}
