// 引入每个目录下面的index.js文件
const ModulesFile = import.meta.glob('./*/index.js', { eager: true })

const ApiList = {}

// 获取对象的值
Object.values(ModulesFile).map(async (mod) => {
  if (mod.default) {
    Object.assign(ApiList, mod.default)
  }
})

export default ApiList
