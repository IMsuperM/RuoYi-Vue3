<template>
    <div class="app-container home">
        <div class="chart-warp">
            <div class="title">折线图</div>
            <div class="chart-container" ref="chartLineRef"></div>
        </div>
        <div class="chart-warp">
            <div class="title">饼图</div>
            <div class="chart-container" ref="chartPieRef"></div>
        </div>
        <div class="chart-warp">
            <div class="title">柱状图</div>
            <div class="chart-container" ref="chartCategoryRef"></div>
        </div>
    </div>
</template>

<script setup name="Index">
import * as echarts from 'echarts'

const chartLineRef = ref(null) // 折线图
const chartPieRef = ref(null) // 附带饼图
const chartCategoryRef = ref(null) // 柱状图

let chartLine = null
let chartPie = null
let chartCategory = null

function initChartLine() {
    chartLine = echarts.init(chartLineRef.value)

    // 配置项
    const options = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
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
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            { smooth: true, name: 'Email', type: 'line', stack: 'Total', data: [120, 132, 101, 134, 90, 230, 210] },
            { smooth: true, name: 'Union Ads', type: 'line', stack: 'Total', data: [220, 182, 191, 234, 290, 330, 310] },
            { smooth: true, name: 'Video Ads', type: 'line', stack: 'Total', data: [150, 232, 201, 154, 190, 330, 410] },
            { smooth: true, name: 'Direct', type: 'line', stack: 'Total', data: [320, 332, 301, 334, 390, 330, 320] },
            { smooth: true, name: 'Search Engine', type: 'line', stack: 'Total', data: [820, 932, 901, 934, 1290, 1330, 1320] }
        ]
    }

    // 设置图表配置项
    chartLine.setOption(options)
}

function initChartCategory() {
    chartCategory = echarts.init(chartCategoryRef.value)

    const options = {
        legend: {},
        tooltip: {},
        dataset: {
            source: [
                ['product', '2015', '2016', '2017'],
                ['Matcha Latte', 43.3, 85.8, 93.7],
                ['Milk Tea', 83.1, 73.4, 55.1],
                ['Cheese Cocoa', 86.4, 65.2, 82.5],
                ['Walnut Brownie', 72.4, 53.9, 39.1]
            ]
        },
        xAxis: { type: 'category' },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
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
    initChartPie()
    initChartCategory()
})

onUnmounted(() => {
    if (chartLine) {
        chartLine.dispose()
        chartLine = null
    }
    if (chartPie) {
        chartPie.dispose()
        chartPie = null
    }
    if (chartCategory) {
        chartCategory.dispose()
        chartCategory = null
    }
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
        min-width: 600px;
        height: 300px;
        // margin-bottom: 40px;
        // margin-right: 40px;
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
