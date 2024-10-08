import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import createVitePlugins from './vite/plugins'
import postCssPxToRem from 'postcss-pxtorem'
// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
    const env = loadEnv(mode, process.cwd())
    const { VITE_APP_ENV, VITE_APP_BASE_URL } = env
    return {
        __VUE_PROD_DEVTOOLS__: VITE_APP_ENV === 'production' ? false : true, // 开启测试工具
        // 部署生产环境和开发环境下的URL。
        // 默认情况下，vite 会假设你的应用是被部署在一个域名的根路径上
        // 例如 https://www.ruoyi.vip/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.ruoyi.vip/admin/，则设置 baseUrl 为 /admin/。
        // base: VITE_APP_ENV === 'production' ? '/admin' : '/',
        base: VITE_APP_BASE_URL,
        plugins: createVitePlugins(env, command === 'build'),
        resolve: {
            // https://cn.vitejs.dev/config/#resolve-alias
            alias: {
                // 设置路径
                '~': path.resolve(__dirname, './'),
                // 设置别名
                '@': path.resolve(__dirname, './src')
            },
            // https://cn.vitejs.dev/config/#resolve-extensions
            extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
        },
        // vite 相关配置
        server: {
            port: 80,
            host: true,
            // open: true, // 自动在浏览器中打开应用程序
            proxy: {
                // https://cn.vitejs.dev/config/#server-proxy
                '/api/mock': {
                    target: 'https://127.0.0.1:80', //对mock进行代理，为了区别非mock的代理（要走mock的话 得放前面，不然优先找其他请求了）
                    changeOrigin: true,
                    secure: false,
                    rewrite: path => path.replace(/^\/api/, '')
                },
                '/api': {
                    target: 'https://cbc3-183-159-23-76.ngrok-free.app',
                    //  target: 'https://sumperm.com/koa2',
                    changeOrigin: true,
                    rewrite: path => path.replace(/^\/api/, '')
                }
            }
        },
        //fix:error:stdin>:7356:1: warning: "@charset" must be the first rule in the file
        css: {
            postcss: {
                plugins: [
                    {
                        postcssPlugin: 'internal:charset-removal',
                        AtRule: {
                            charset: atRule => {
                                if (atRule.name === 'charset') {
                                    atRule.remove()
                                }
                            }
                        }
                    }
                    // rem适配
                    // postCssPxToRem({
                    //     rootValue: 37.5,
                    //     propList: ['*']
                    // })
                ]
            }
        },
        // 去除日志和debuger
        esbuild: {
            drop: ['console', 'debugger']
        }
    }
})
