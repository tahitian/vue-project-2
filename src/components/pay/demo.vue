<!-- <template>
   <div>
    hello world!
    </div>
</template>

<script type="text/javascript">
console.log('1111111111111111')
export default {
    name: 'demo'
} 
</script>
 -->

 <template>
  <div class="w6">

    <div id="message_nav">
      <ul>
        <li><router-link :to="{ name:'message_list' }" :class="{ checked: check_path('message_list') }">查看信息</router-link></li>
        <li><router-link :to="{ name:'message_setting' }" :class="{ checked: check_path('message_setting') }">消息设置</router-link></li>
      </ul>
    </div>

    <router-view></router-view>

  </div>
</template>
<script>

import {ajaxCallPromise} from '@/public/index'

export default {
  name: 'message_nav',
  mounted () {
  },
  data () {
    return {
    }
  },
  components: {
    top
  },
  watch: {
  },
  methods: {
    check_path (path) {
      return this.$route.name === path
    }
  }
}
</script>
<style>
* {
  box-sizing:border-box;
  -moz-box-sizing:border-box;
  -webkit-box-sizing:border-box;
  margin: 0;
  padding: 0;
  border: 0;
}
#message_nav {
  font-size: 0;
  height: 50px;
  border-bottom: 1px solid #ccc;
  background-color: #fff;
}
#message_nav>ul {
  list-style-type: none;
  margin-left: 60px;
} 
#message_nav>ul>li {
  display: inline-block;
}
#message_nav>ul>li>a {
  display: inline-block;
  width: 114px;
  height: 50px;
  border-bottom: 4px solid transparent;
  text-align: center;
  line-height: 46px;
  margin-right: 40px;

  font-family: HiraginoSansGB-W6;
  font-size: 16px;
  color: #000;
  text-decoration: none;
}
#message_nav>ul>li>a.checked {
  border-bottom: 4px solid #3a72bf;
}
.w6 {
  font-family: "HiraginoSansGB-W6";
}
.w3 {
  font-family: "HiraginoSansGB-W3";
}
.px-18 {
  font-size: 18px;
}
</style>