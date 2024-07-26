import vue from '@vitejs/plugin-vue'

import createAutoImport from './auto-import'
import createSvgIcon from './svg-icon'
import createCompression from './compression'
import createSetupExtend from './setup-extend'
import createMkcert from './mkcert'
import createEslintPlugin from './vite-plugin-eslint'
import createMockPlugin from './vite-plugin-mock'
export default function createVitePlugins(viteEnv, isBuild = false) {
    const vitePlugins = [vue()]
    // vitePlugins.push(createEslintPlugin())
    vitePlugins.push(createMockPlugin())
    vitePlugins.push(createAutoImport())
	vitePlugins.push(createSetupExtend())
    vitePlugins.push(createSvgIcon(isBuild))
    vitePlugins.push(createMkcert())
	isBuild && vitePlugins.push(...createCompression(viteEnv))
    return vitePlugins
}
