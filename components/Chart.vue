<template>
    <div>
        <client-only>
            <Line :data="data" :options="options" />
        </client-only>
    </div>
</template>

<script setup>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const { lines, legend } = defineProps(['lines', 'legend'])

const data = {
  labels: legend,
  datasets: lines
}
//https://www.chartjs.org/docs/latest/samples/tooltip/content.html
const options = {
    responsive: true,
    plugins: {
        title: {
            display: false,
            text: 'Chart.js Line Chart'
        },
    },
    maintainAspectRatio: true,
    scales: {
        x: {
            ticks: {
                // For a category axis, the val is the index so the lookup via getLabelForValue is needed
                callback: function(val, index) {
                    // Hide every 2nd tick label
                    return index % 4 === 0 ? this.getLabelForValue(val) : '';
                },
            }
        },
        y: {

        }

    }
}
</script>

<style scoped>

</style>