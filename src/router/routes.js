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
        path: 'personCenter',
        name: 'personCenter',
        component: lazyload('personCenter'),
        meta: { title:'个人空间'}
    },{
        path: '404',
        name: '404',
        component: lazyload('404'),
        meta: { title:'404'}
    },{
        path: '315',
        name: '315',
        component: lazyload('315'),
        meta: { title:'文章审核中'}
    },{
        path: '305',
        name: '305',
        component: lazyload('305'),
        meta: { title:'404'}
    },]
}]

export {
    routes
}
