import _ from 'lodash'
import dateFormatter from 'date-fns/format'
import { mapState, mapActions } from 'vuex'
import { Toaster } from '../../../library/Toaster'

export default {
  name: 'track-show',

  computed: mapState('tracks', {
    fetching: state => state.fetchingTrack,
    track: state => state.track
  }),

  mounted () {
    this.fetchTrack(this.$route.params.id)
      .catch(() => Toaster.error('There was an error loading this track.'))
  },

  methods: {
    ...mapActions('tracks', ['fetchTrack']),

    truncateLink (link) {
      return _.truncate(link, {length: 50})
    },

    formatReleasedDate (date) {
      return dateFormatter(date, 'MMM Do, YYYY')
    }
  }
}
