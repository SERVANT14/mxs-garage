import Vue from 'vue'
import Vuex from 'vuex'
import tracks from './modules/tracks'

Vue.use(Vuex)

export default new Vuex.Store({
  actions: {},
  getters: {},
  modules: {
    tracks
  }
})
