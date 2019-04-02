const lazyload = (name) => (resolve) => require([`@/pages/${name}`], resolve)
const routes = [{
    path:'/',
    redirect:'/home',
    component: lazyload('index'),
    children: [{
        path: 'home',
        name: 'home',
        component: lazyload('home'),
        meta: { title:'首页'}
    }]
}]

export {
    routes
}
