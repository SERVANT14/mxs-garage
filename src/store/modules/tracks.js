import { TracksRepository } from '../../repositories/TracksRepository'

const state = {
  fetchingTracksPage: false,
  tracksPaginator: null,

  fetchingTrack: false,
  track: null,

  creatingTrack: false
}

const getters = {}

const actions = {
  /**
   * Fetch a page of tracks.
   *
   * @returns {Promise.<*>}
   */
  fetchPage ({commit}, pageNumber = 1, perPage = 15) {
    commit('FETCH_TRACKS_PAGE_REQUEST')

    return new TracksRepository().getPage(pageNumber, perPage)
      .then(result => commit('FETCH_TRACKS_PAGE_SUCCESS', {result}))
      .catch(() => commit('FETCH_TRACKS_PAGE_FAILURE'))
  },

  /**
   * Fetch a track.
   *
   * @returns {Promise.<*>}
   */
  fetchTrack ({commit}, id) {
    commit('FETCH_TRACK_REQUEST')

    return new TracksRepository().find(id)
      .then(result => commit('FETCH_TRACK_SUCCESS', {result}))
      .catch(() => commit('FETCH_TRACK_FAILURE'))
  },

  createTrack ({commit}, track) {
    commit('CREATE_TRACK_REQUEST')

    return new TracksRepository().create(track)
      .then(result => commit('CREATE_TRACK_SUCCESS', {result}))
      .catch(() => commit('CREATE_TRACK_FAILURE'))
  }
}

const mutations = {
  // Fetch track page mutations.
  FETCH_TRACKS_PAGE_REQUEST (state) {
    state.fetchingTracksPage = true
    state.tracksPaginator = null
  },
  FETCH_TRACKS_PAGE_SUCCESS (state, {result}) {
    state.fetchingTracksPage = false
    state.tracksPaginator = result
  },
  FETCH_TRACKS_PAGE_FAILURE (state) {
    state.fetchingTracksPage = false
    state.tracksPaginator = null
  },

  // Fetch a track mutations.
  FETCH_TRACK_REQUEST (state) {
    state.fetchingTrack = true
    state.track = null
  },
  FETCH_TRACK_SUCCESS (state, {result}) {
    state.fetchingTrack = false
    state.track = result
  },
  FETCH_TRACK_FAILURE (state) {
    state.fetchingTrack = false
    state.track = null
  },

  // Create a track mutations.
  CREATE_TRACK_REQUEST (state) {
    state.creatingTrack = true
    state.track = null
  },
  CREATE_TRACK_SUCCESS (state, {result}) {
    state.creatingTrack = false
    state.track = result
  },
  CREATE_TRACK_FAILURE (state) {
    state.creatingTrack = false
    state.track = null
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
