/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [{
  path: '/',
  component: () => import('@/views/layouts/index'),
  redirect: '/home',
  meta: {
    title: '自助开票',
    keepAlive: false
  },
  children: [{
      path: '/home',
      name: 'Home',
      component: () => import('@/views/home/home'),
      meta: {
        title: '自助开票'
      }
    },
    {
      path: '/info',
      name: 'Info',
      component: () => import('@/views/home/info'),
      meta: {
        title: '发票信息',
        keepAlive: false
      }
    },
    {
      path: '/succed',
      name: 'Succed',
      component: () => import('@/views/home/succed'),
      meta: {
        title: '发票信息',
        keepAlive: false
      }
    },
    {
      path: '/order',
      name: 'Order',
      component: () => import('@/views/home/order'),
      meta: {
        title: '订单号',
        keepAlive: false
      }
    },
    {
      path: '/payment',
      name: 'Payment',
      component: () => import('@/views/home/payment'),
      meta: {
        title: '支付完成',
        keepAlive: false
      }
    }
    // {
    //   path: '/about',
    //   name: 'About',
    //   component: () => import('@/views/home/about'),
    //   meta: { title: '关于我', keepAlive: false }
    // }
  ]
}]
