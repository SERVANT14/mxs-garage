import { mapState, mapActions } from 'vuex'
import { DateHelper } from '../../../library/Helpers/DateHelper'
import { Toaster } from '../../../library/Toaster'
import { TrackDownloadLink } from '../../../data-models/TrackDownloadLink'
import { TrackCategoryRepository } from '../../../repositories/TrackCategoryRepository'

export default {
  name: 'track-create',

  data () {
    return {
      maxFileSize: 150000,
      categories: [],
      formData: {
        name: null,
        released_at: DateHelper.formatForPicker(Date.now()),
        category_id: null,
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

  created () {
    new TrackCategoryRepository().all()
      .then(categories => this.categories = categories)
  },

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
      const isTooBig = file => file.size > this.maxFileSize

      if (haveFile(event.target)) {
        let file = event.target.files[0];

        if (isTooBig(file)) {
          Toaster.error('File is too large. ' + parseInt(this.maxFileSize, 10) / 1000 + ' KB max.')
        } else {
          this.formData.image = file
        }
      }
    }
  }
}
