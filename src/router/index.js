import Vue from 'vue'
import Router from 'vue-router'
import App from '@/components/App'
import finance_InvoiceNav from '@/components/finance/InvoiceNav'
import finance_BasicInfo from '@/components/finance/BasicInfo'
import finance_Records from '@/components/finance/Records'
import InvoiceManagement from '@/components/finance/InvoiceManagement'
import Style from '@/components/global/Style'
import Login from '@/components/Login'
import Main from '@/components/Main'
import Pay from '@/components/pay/Pay'
import Overall from '@/components/account/overview/Overall'
import AccountMain from '@/components/account/AccountMain'
import ac_adplan from '@/Components/account/adplan/AdPlan'

import account_setting from '@/components/account_setting/account_nav.vue'
import account_basic_info from '@/components/account_setting/account_basic_info.vue'
import account_qual_info from '@/components/account_setting/account_qual_info.vue'
import account_pwd_reset from '@/components/account_setting/account_pwd_reset.vue'

Vue.use(Router)

export default new Router({
  mode:'history',

  routes: [
    {
      path: '/',
      name: 'app',
      component: App
    },
    
    {
      path:'/login',
      name: 'login',
      component: Login
    },
    {
      path:'/main',
      name: 'main',
      component: Main,
      children:[
        {
          path: 'finance',
          name: 'finance',
          component: finance_InvoiceNav,
          children: [
            {
              path: '',
              name: 'info',
              component: finance_BasicInfo
            },
             {
              path: 'records',
              name: 'records',
              component: finance_Records
            },
            {
              path: 'invoice-management',
              name: 'invoice-management',
              component: InvoiceManagement
            },
            {
            path: 'pay',
            name: 'pay',
            component: Pay
            },
          ]
        },
        {
          path:'style',
          name: 'style',
          component: Style
        },
        {
          path: 'account',
          name: 'account',
          component: AccountMain,
          children: [
            {
              path: 'overall',
              name: 'overall',
              component: Overall
            },
            {
              name: 'ac_adplan',
              path: 'ac_adplan',
              component: ac_adplan
            },
            {
              name: 'ac_adunit',
              path: 'ac_adunit',
              component: Overall
            },
            {
               name: 'ac_adidea',
              path: 'ac_adidea',
              component: Overall
            },

          ]
        },
        {
          path: 'account-setting',
          name: 'account_setting',
          component: account_setting,
          redirect: { name: 'account_basic_info' },
          children: [
            {
              path: 'basic-info',
              name: 'account_basic_info',
              component: account_basic_info
            },
            {
              path: 'qual-info',
              name: 'account_qual_info',
              component: account_qual_info
            },
            {
              path: 'pwd-reset',
              name: 'account_pwd_reset',
              component: account_pwd_reset
            }

          ]
        }


      ]
    }

  ]
})
