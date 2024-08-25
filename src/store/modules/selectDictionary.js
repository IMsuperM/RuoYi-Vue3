import { getDictionary } from '@/api/config'

const useSelectDictStore = defineStore('selectDict', {
    // 开启数据持久化
    persist: {
        enabled: true,
        detached: true // 设置订阅与组件分离
    },
    state: () => ({
        selectDict: new Array()
    }),
    actions: {
        // 获取字典
        getDict(_key) {
            if (_key == null && _key == '') {
                return null
            }
            try {
                for (let i = 0; i < this.selectDict.length; i++) {
                    if (this.selectDict[i].key == _key) {
                        return this.selectDict[i].value || null
                    }
                }
            } catch (e) {
                return null
            }
        },
        // 设置字典
        async setDict(_key, value) {
            if (_key === null && _key === '') return null
            const { data } = await getDictionary(_key)
            if (!data) return null
            const options = data.map(d => {
                return { label: d.desc, value: d.name }
            })
            this.selectDict.push({
                key: _key,
                value: options
            })
            return options
        },
        // 清空字典
        cleanDict() {
            this.selectDict = new Array()
        }
    }
})

export default useSelectDictStore