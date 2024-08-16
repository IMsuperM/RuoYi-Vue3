<template>
    <div class="app-container home">
        <div class="chart-warp">
            <div class="title">风控调用量</div>
            <div ref="chartLineRef" class="chart-container"></div>
        </div>
        <!-- <div class="chart-warp">
            <div class="title">饼图</div>
            <div class="chart-container" ref="chartPieRef"></div>
        </div> -->
        <div class="chart-warp">
            <div class="title">合作方调用量</div>
            <div ref="chartCategoryRef" class="chart-container"></div>
        </div>
    </div>
</template>

<script setup name="Index">
import * as echarts from 'echarts'
import { echartOne, echartTwo } from '@/api/index'
const chartLineRef = ref(null) // 折线图
const chartPieRef = ref(null) // 附带饼图
const chartCategoryRef = ref(null) // 柱状图

let chartLine = null
let chartPie = null
let chartCategory = null

async function initChartLine() {
    chartLine = echarts.init(chartLineRef.value)

    const res = await echartOne({})
    const { data } = res
    let xAxisArr = []
    let seriesArr = []
    let legendArr = []
    Object.keys(data).forEach(key => {
        legendArr.push(key)
        xAxisArr = data[key].map(item => {
            return item.statisticDate
        })
        const val = data[key].map(item => {
            return item.num
        })
        const series = { smooth: true, name: key, type: 'line', data: val }
        seriesArr.push(series)
    })

    // 配置项
    const options = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: legendArr
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: xAxisArr
        },
        yAxis: {
            type: 'value'
        },
        series: seriesArr
    }

    // 设置图表配置项
    chartLine.setOption(options)
}

async function initChartCategory() {
    chartCategory = echarts.init(chartCategoryRef.value)

    const res = await echartTwo({})
    const { data } = res
    const xAxisArr = []
    const yAxisArr = []
    data.forEach(item => {
        xAxisArr.push(item.statisticDate)
        yAxisArr.push(item.num)
    })

    const options = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: xAxisArr,
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '合作方调用量',
                type: 'bar',
                barWidth: '60%',
                data: yAxisArr
            }
        ]
    }
    // 设置图表配置项
    chartCategory.setOption(options)
}
function initChartPie() {
    chartPie = echarts.init(chartPieRef.value)
    const option = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: '50%',
                data: [
                    { value: 1048, name: 'Search Engine' },
                    { value: 735, name: 'Direct' },
                    { value: 580, name: 'Email' },
                    { value: 484, name: 'Union Ads' },
                    { value: 300, name: 'Video Ads' }
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    }
    chartPie.setOption(option)
}
onMounted(() => {
    initChartLine()
    initChartCategory()
    // initChartPie()
})

onUnmounted(() => {
    if (chartLine) {
        chartLine.dispose()
        chartLine = null
    }
    if (chartCategory) {
        chartCategory.dispose()
        chartCategory = null
    }
    // if (chartPie) {
    //     chartPie.dispose()
    //     chartPie = null
    // }
})
</script>

<style scoped lang="scss">
.home {
    padding: 0 80px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    overflow: auto;
    color: #676a6c;
    overflow-x: hidden;
    .chart-warp {
        display: flex;
        flex-direction: column;
        align-items: center;
        .title {
            font-size: 16px;
            padding: 10px;
        }
    }
    .chart-container {
        transform: rotateZ(360deg); // 处理0.5px边框
        border: 0.5px solid #ccc;
        border-radius: 4px;
        min-width: 850px;
        height: 400px;
        margin-bottom: 40px;
        margin-top: 20px;
    }
    .pie {
        flex: 1;
        height: 500px;
        overflow: auto;
        // width: 800px;
    }

    blockquote {
        padding: 10px 20px;
        margin: 0 0 20px;
        font-size: 17.5px;
        border-left: 5px solid #eee;
    }
    hr {
        margin-top: 20px;
        margin-bottom: 20px;
        border: 0;
        border-top: 1px solid #eee;
    }
    .col-item {
        margin-bottom: 20px;
    }

    ul {
        padding: 0;
        margin: 0;
    }

    ul {
        list-style-type: none;
    }

    h4 {
        margin-top: 0px;
    }

    h2 {
        margin-top: 10px;
        font-size: 26px;
        font-weight: 100;
    }

    p {
        margin-top: 10px;

        b {
            font-weight: 700;
        }
    }

    .update-log {
        ol {
            display: block;
            list-style-type: decimal;
            margin-block-start: 1em;
            margin-block-end: 1em;
            margin-inline-start: 0;
            margin-inline-end: 0;
            padding-inline-start: 40px;
        }
    }
}
</style>
