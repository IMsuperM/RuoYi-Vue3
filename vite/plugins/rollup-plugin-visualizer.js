import { visualizer } from "rollup-plugin-visualizer"
// 打包分析
export default function createVisualizerPlugin() {
    return visualizer({ open: true })
}