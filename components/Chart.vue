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
const totalDuration = 2000;
const delayBetweenPoints = totalDuration / legend.length;
const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
const animation = {
  x: {
    type: 'number',
    easing: 'linear',
    duration: delayBetweenPoints,
    from: NaN, // the point is initially skipped
    delay(ctx) {
      if (ctx.type !== 'data' || ctx.xStarted) {
        return 0;
      }
      ctx.xStarted = true;
      return ctx.index * delayBetweenPoints;
    }
  },
  y: {
    type: 'number',
    easing: 'linear',
    duration: delayBetweenPoints,
    from: previousY,
    delay(ctx) {
      if (ctx.type !== 'data' || ctx.yStarted) {
        return 0;
      }
      ctx.yStarted = true;
      return ctx.index * delayBetweenPoints;
    }
  }
};
const options = {
    responsive: true,
    plugins: {
        title: {
            display: false,
            text: 'Chart.js Line Chart'
        },
    },
    animation,
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