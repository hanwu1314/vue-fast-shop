// 引入当前目录下的所有的js文件
const ModulesFile = import.meta.glob("./*.js", { eager: true });

// 路由集合
const RouterList = [];

// 提取每个对象下的值 同步获取
Object.values(ModulesFile).map(async (mod) => {
    if (mod.default) {
        RouterList.push(...mod.default);
    }
});

// 定义父组件
const layout = {
    template: `<router-view></router-view>`,
};

export default [
    {
        path: "/business",
        component: layout,
        children: RouterList,
    },
];
