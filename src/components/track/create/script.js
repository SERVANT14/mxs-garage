import { mapState, mapActions } from 'vuex'
import { DateHelper } from '../../../library/Helpers/DateHelper'
import { Toaster } from '../../../library/Toaster'
import { TrackDownloadLink } from '../../../data-models/TrackDownloadLink'

export default {
  name: 'track-create',

  data () {
    return {
      formData: {
        name: null,
        released_at: DateHelper.formatForPicker(Date.now()),
        creator: null,
        image: null,
        description: null,
        download_links: [new TrackDownloadLink()]
      }
    }
  },

  computed: mapState({
    creating: state => state.tracks.creatingTrack
  }),

  methods: {
    ...mapActions('tracks', ['createTrack']),

    /**
     * Save this track.
     */
    save () {
      this.$validator.validateAll()
        .then(() => {
          this.createTrack(this.formData)
            .catch(() => Toaster.error('There was an error creating this track.'))
        })
        .catch(() => Toaster.error('Some fields failed to pass validation.'))
    },

    /**
     * Add a download link.
     */
    addDownloadLink () {
      this.download_links.push(new TrackDownloadLink())
    },

    /**
     * Remove a download link.
     *
     * @param index
     */
    removeDownloadLink (index) {
      this.download_links.splice(index, 1)
    },

    /**
     * Called when an image changed.
     *
     * @param event
     */
    imageChanged (event) {
      this.formData.image = null
      const haveFile = input => input.files && input.files.length > 0

      if (haveFile(event.target))
        this.formData.image = event.target.files[0]
    }
  }
}
