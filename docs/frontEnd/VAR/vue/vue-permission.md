---
title: 【Vue2.0】vue之菜单权限
date: 2020-07-27
categories: 
- 前端
tags: 
- Vue
- JS
---

## 实现动态路由菜单权限
:100:UI框架: antDesign vue

:rofl:vue:版本: 2.0

:innocent:技术栈: vue + axios + vuex

## 前言 
 目前大多数公司做菜单权限的时候有的用beforeEach里面做处理,有的利用服务端渲染后台做处理,而现在vue的项目做一个后台管理系统用动态的路由去做是再好不过了，好在vue出了一个新的api方法,那就是addRoutes,

### addRoutes
 addRoutes是一个路由实例的一个方法,其方法可传递一个参数,这个参数会大概类似数组的[].concat([])或者[...routes,参数]方法合并到routes路由中去,routes本来就是一个数组形式
````javascript 1.8
    //函数签名
    router.addRoutes(routes:Array<RouteConfig>)
  
    //TODO: 动态添加更多的路由规则。参数必须是一个符合 routes 选项要求的数组。
````

试想,如果把这个参数变为动态的,或者可动态配置的数据,那菜单权限不就好做了吗? 下面是一个小demo仅供参考,如企业有其他需求,按正常需求去做就行

1.router.js
````js
export const syncRoutesMap = [
  {
    name: 'index',
    path: '/',
    redirect: '/WelcomePage',
    component: () =>
      import ('@/views/Home.vue'),
    children: [{
      name: 'WelcomePage',
      path: '/WelcomePage',
      meta: {
        title: '首页',
        icon: 'ant-design'
      },
      component: () =>
        import ('@/views/page/WelcomePage')
    },
      {
        name: 'company',
        path: '/company',
        redirect: '/company/list',
        meta: {
          title: '公司信息',
          icon: 'zhihu'
        },
        component: () =>
          import ('@/views/layout/LayoutView.vue'),
        children: [{
          name: 'company-list',
          path: '/company/list',
          meta: {
            title: '公司列表',
            icon: 'zhihu'
          },
          component: () =>
            import ('@/views/page/CompanyList')
        },
          {
            name: 'company-detail',
            path: '/company/detail',
            meta: {
              title: '公司详情',
              icon: 'zhihu'
            },
            component: () =>
              import ('@/views/page/CompanyDetail'),
          }
        ]
      },
      {
        name: 'contract',
        path: '/contract',
        meta: {
          title: '合同管理',
          icon: 'container'
        },
        component: () =>
          import ('@/views/page/Contract')
      },
      {
        name: 'bankAccount',
        path: '/bankAccount',
        meta: {
          title: '银行信息',
          icon: 'bank'
        },
        component: () =>
          import ('@/views/page/BankAccount')
      },
      {
        name: 'settings',
        path: '/settings',
        meta: {
          title: '个人设置',
          icon: 'setting'
        },
        component: () =>
          import ('@/views/page/Settings')
      },
    ]
  },
  {
    name: 'dashboard',
    path: '/dashboard',
    component: () => import('@/views/page/WelcomePage.vue')
  }
]
export const constRoutesMap = [{
  name: 'login',
  path: '/login',
  component: () =>
    import ('@/views/auth/Login')
},
  {
    name: '404',
    path: '*',
    component: () =>
      import ('@/views/404')
  }
]
const router = new VueRouter({
  routes: constRoutesMap // routes: routes 的简写
})
````
#### 代码解释
 router.js里面有2个变量,`syncRoutesMap` 异步路由表,思路:先把所有的页面路由都注册下来,但是不放在routes里面, 后台人员返回菜单的时候,就拿后台人员返回的菜单与`syncRoutesMap`做比较与筛查,
 `constRoutesMap` 这个变量里面是静态写死的路由,初始化的时候可以放在routes,因为登录页每个用户是必有的,
 
 然后就是配合全局路由守卫
      
````js
// TODO:路由守卫拦截登录

router.beforeEach((to, from, next) => {
  NProgress.start()
  const info = sessionStorage.getItem('userData')
  const userData = info !== 'undefined' ? JSON.parse(info) : null
  if (userData && userData.token) {
    if (to.path === '/login') {
      sessionStorage.removeItem('userData')
      store.state.user.menus = [] // TODO: 清空菜单
    }
    if (store.getters.MENUS.length == 0) {
      store.dispatch('user/GET_USERDATA').then(() => {
        next(to.path)
      })
    } else {
      next()
    }
  } else {
    if (to.path === '/login') {
      sessionStorage.removeItem('userData')
      next()
    } else {
      next({path: '/login'})
      NProgress.done()
    }

  }
})
router.afterEach(() => {
  NProgress.done()
})

export default router
````
> 我是把路由和全局钩子写一起了,如果逻辑比较多可以拆分出来

2.vuex 逻辑
````js
import axios from '../utils/axios'
import router, {syncRoutesMap} from '../route'

function filterSyncMenus(syncRoutes, menus) {
    let routes = syncRoutes.filter(route => {
        if (route.children && route.children.length) {
            route.children = filterSyncMenus(route.children, menus)
        }
        for (let i = 0; i < menus.length; i++) {
            if (menus[i] === route.path) {
                return true
            }
        }
        return false
    })
    return routes
}

export default {
    namespaced: true,
    state: {
        userData: {},
        menus: [] //处理之后的菜单
    },
    mutations: {
        SET_USERDATA(state, userData) {
            let routes = filterSyncMenus(syncRoutesMap, userData.menus)
            state.userData = userData
            state.menus = routes[0].children
            router.addRoutes(routes)
        }
    },
    actions: {
        GET_USERDATA({commit}) {
            return new Promise((resolve) => {
                axios({
                    method: 'get',
                    url: '/api/getMenus'
                }).then(res => {
                    commit('SET_USERDATA', res.data)
                    resolve(res)
                })
            })
        }
    }
}

````
# 实际思路
  1.读取后台返回的路由表,结构如下
  ````js
['/home','/xxx','/xxx']
````
2.`filterSyncMenus` 方法去递归查询`syncRoutesMap` (此变量在router里面上面写的有),如果查到有后台返回的路由,就把这个路由留下,反之过滤掉.
3. 把整合好的路由保存到vuex里面,用来让布局去遍历
> 此方法是递归遍历,原则来说是你有多少个children就可以遍历到多少层,但是一般需求也就2层,3层撑死
下面是menus 组件递归渲染组件
````vue
<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "LayoutMenus",
        data() {
            return {
                currentPath: [],
                currentParentPath: ''
            }
        },
        methods: {
            /**
             * @@ 递归遍历菜单,原则上来说可以支持无限级菜单,一般之后2层,
             * @ 这只是个菜单测试
             * **/
            menusListMap(menus) {
                let constMenusList = menus.map(route => {
                    return route.children
                        ? (
                            <a-sub-menu
                                key={route.path}
                                scopedSlots={{
                                    title: () => <span><a-icon
                                        type={route.meta.icon}/><span>{route.meta.title}</span></span>
                                }}
                            >
                                {this.menusListMap(route.children)}
                            </a-sub-menu>
                        )
                        : (
                            <a-menu-item
                                key={route.path}
                            >
                                <router-link to={route.path}>
                                    <a-icon type={route.meta.icon}/>
                                    <span>{route.meta.title}</span>
                                </router-link>
                            </a-menu-item>
                        )
                })
                return constMenusList
            }
        },
        render() {
            return (
                /**
                 * @ 如有children就返回 <a-sub-menu title="子菜单">
                 * <a-menu-item>子菜单项</a-menu-item>
                 * </a-sub-menu>
                 * **/
                <a-menu
                    default-open-keys={this.currentParentPath}
                    defaultSelectedKeys={this.currentPath}
                    selectedKeys={this.currentPath}
                    theme="dark"
                    mode="inline"
                    style="border-top: 1px solid #3a3844">
                    {this.menusListMap(this.menus)}
                </a-menu>
            )
        },
        computed: {
            ...mapGetters({
                menus: 'MENUS'
            })
        },
        watch: {
            $route: {
                handler: function (route) {
                    const {matched} = route
                    const index = matched.findIndex(({path}) => path === route.path)
                    this.currentParentPath = [matched[index - 1].path]
                    this.currentPath = [route.path]
                },
                deep: true,
                immediate: true
            }
        }
    }
</script>

<style scoped>

</style>

````

4. 最后就是要搞定如果刷新页面menu会丢失,登录信息也会丢失问题,这个想必大家都会,也是非常简单啦,可以把首次登录的token存起来,然后刷新页面可以判断你本地有没有token,如有没有,打回登录页,如果有取这个token 去请求用户信息,如果这个token没有失效,就可以调用接口成功,得到你想要的数据,再走一遍 `filterSyncMenus`  这些方法就可以了.

## 结尾
::: tip
此方法适用绝大多数中小管理系统, 如果项目复杂还是要按照实际情况去开发
:::
