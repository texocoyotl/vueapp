
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  template: '',
  props: ['data', 'options'],
  mounted () {
    this.renderChart(this.data, this.options);
  }
}