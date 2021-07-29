import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    USER_ID: 0
  },
  mutations: {
    UPDATE_USER_ID(state, userId) {
      state.USER_ID = userId
    }
  },
  actions: {
    // UPDATE_USER_ID({commit, state}, userId) {
    //   userIdUpdate = userId;
    //   commit('UPDATE_USER_ID_mutation', userIdUpdate)
    // }

  },
  modules: {
  }
})
