import { mapState, mapActions } from 'vuex'
import { Toaster } from '../../../library/Toaster'

export default {
  name: 'track-list',

  computed: mapState({
    fetching: state => state.tracks.fetchingTracksPage,
    paginator: state => state.tracks.tracksPaginator
  }),

  mounted () {
    this.fetchPage()
      .catch(() => Toaster.error('There was an error loading tracks.'))
  },

  methods: {
    ...mapActions('tracks', ['fetchPage'])
  }
}
