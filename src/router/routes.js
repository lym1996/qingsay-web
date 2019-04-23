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
    },{
        path: 'tieba',
        name: 'tieba',
        component: lazyload('tieba'),
        meta: { title:'青说'}
    },{
        path: 'articleContent',
        name: 'articleContent',
        component: lazyload('articleContent'),
        meta: { title:'文章内容'}
    },{
        path: 'searchPage',
        name: 'searchPage',
        component: lazyload('searchPage'),
        meta: { title:'搜索页'}
    },{
        path: '404',
        name: '404',
        component: lazyload('404'),
        meta: { title:'404'}
    },]
}]

export {
    routes
}
