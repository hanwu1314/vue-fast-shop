// 引入每个目录下的所有js文件
const ModulesFile = import.meta.glob('./*.js', { eager: true })

// 当前目录的总Api集合
const ApiList = {}

// 获取对象的值
Object.values(ModulesFile).map(async (mod) => {
  if (mod.default) {
    Object.assign(ApiList, mod.default)
  }
})

export default ApiList
