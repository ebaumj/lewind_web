<template>
    <div>
        <client-only>
            <Line :data="data" :options="options" />
        </client-only>
    </div>
</template>

<script setup>
import { attachScopes } from '@rollup/pluginutils';
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

const { lines, legend, maximum, valueToText } = defineProps(['lines', 'legend', 'maximum', 'valueToText' ])

const data = {
  labels: legend,
  datasets: lines
}
//https://www.chartjs.org/docs/latest/samples/tooltip/content.html

const delayBetweenPoints = 2000 / legend.length
const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y
const animation = {
  x: {
    type: 'number',
    easing: 'linear',
    duration: delayBetweenPoints,
    from: NaN, // the point is initially skipped
    delay(ctx) {
      if (ctx.type !== 'data' || ctx.xStarted) {
        return 0
      }
      ctx.xStarted = true
      return ctx.index * delayBetweenPoints
    }
  },
  y: {
    type: 'number',
    easing: 'linear',
    duration: delayBetweenPoints,
    from: previousY,
    delay(ctx) {
      if (ctx.type !== 'data' || ctx.yStarted) {
        return 0
      }
      ctx.yStarted = true;
      return ctx.index * delayBetweenPoints
    }
  }
}

let tooltipFunction, axisFunction
if(valueToText) {
  tooltipFunction = (tooltipItems) => {
    return valueToText(tooltipItems.parsed.y)
  }
  axisFunction = (value, index, ticks) => {
    return valueToText(value)
  }
}
else
  axisFunction = (value, index, ticks) => {
    return Math.round(value)
  }

const options = {
    responsive: true,
    plugins: {
        title: {
            display: false,
            text: 'Chart.js Line Chart'
        },
        legend: false,
        tooltip: {
          callbacks: {
            label: tooltipFunction
          }
        }
        
    },
    animation,
    maintainAspectRatio: true,
    scales: {
        x: {
            ticks: {
                maxTicksLimit: 12,
            },
            grid: {
              display: true,
              drawTicks: false
            }
        },
        y: {
            min: 0,
            max: maximum,
            ticks: {
              callback: axisFunction,
              stepSize: maximum / 4
            }
        }
    },
    interaction: {
        intersect: false,
        mode: 'index',
    },
}
</script>

<style scoped>

</style>