import DatePicker from 'vue-bulma-datepicker'

export default {
  components: {DatePicker},
  props: {
    value: {
      type: String
    }
  },

  data () {
    return {
      selectedDate: this.value // from v-model.
    }
  },

  watch: {
    selectedDate (newValue) {
      this.$emit('input', newValue)
    }
  }
}
