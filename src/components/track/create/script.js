import { mapState, mapActions } from 'vuex'
import { Toaster } from '../../../library/Toaster'
import { TrackDownloadLink } from '../../../data-models/TrackDownloadLink'

export default {
  name: 'track-create',

  data () {
    return {
      name: null,
      releasedAt: null,
      maker: null,
      description: null,
      downloadLinks: [new TrackDownloadLink()]
    }
  },

  methods: {
    ...mapActions('tracks', ['createTrack']),

    save () {
      this.createTrack({
        name: this.name,
        maker: this.maker,
        released_at: this.releasedAt,
        description: this.description,
        download_links: this.downloadLinks
      })
        .catch(() => Toaster.error('There was an error creating this track.'))
    },

    addDownloadLink () {
      this.downloadLinks.push(new TrackDownloadLink())
    },

    removeDownloadLink (index) {
      this.downloadLinks.splice(index, 1)
    }
  }
}
