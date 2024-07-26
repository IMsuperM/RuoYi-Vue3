import { viteMockServe } from 'vite-plugin-mock'
export default function createMockPlugin() {
    return viteMockServe({
        mockPath: 'mock', // mock文件 z最好放在项目根目录
        localEnabled: true, // 是否应用于本地
        prodEnabled: false, // 是否应用于生产
        // supportTs: true, // 打开后 可以读取 ts 文件模块 请注意 打开后将无法监视.js 文件
        watchFiles: true, // 监视文件更改 这样更改mock的时候，不需要重新启动编译
        // configPath: './mock',
    })
}