<template>
  <!-- new message window -->
<div>
  <div id="global-menu" v-if="showMenu">
    <div class="arrow-shape as-1">
    </div>
    <div class="arrow-shape as-2">
    </div>

    <div id="menu-box" >
      <div class="table-row table-head">
        <div>
            <img src="../../assets/icons/home/ad_lib.png" />
            <span>广告库</span>
        </div>
        <div class="middle-col">
            <img src="../../assets/icons/home/tool_box.png" />
            <span>工具箱</span>
        </div>
        <div>
            <img src="../../assets/icons/home/setting_2.png" />
            <span>设置</span>
        </div>
      </div>

      <div class="table-row table-body">
        <div>
            <ul>
                <li><span>广告管理</span></li>
                <li><span>自动规则</span></li>
            </ul>
        </div>
        <div class="middle-col">
            <ul>
                <li><span>自定义受众</span></li>
                <li><span>定项模板</span></li>
                <li><span>广告报告</span></li>
                <li><span>素材库</span></li>
            </ul>
        </div>
        <div>
            <ul>
                <li><span>账户设置</span></li>
                <li><span>财务设置</span></li>
                <li><span>系统设置</span></li>
            </ul>
        </div>
      </div>
    </div>

  </div>

  <div id="menu-cover" v-if="showMenu" @click="hide_menu"></div>

</div>
</template>

<script type="text/javascript">
export default {
  name: 'global_menu',
  props: {
    'showMenu': {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data () {
    return {

    }
  },
  methods: {
    hide_menu(){
      this.$emit('update:showMenu', false );
    }
  }
}
</script>

<style type="text/css" scoped>
* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  border: 0;
}
#global-menu {
  position: fixed;
  top: 46px;
  left: 60px;
  /*background-color: green;*/
  z-index: 2000;
  cursor: pointer;
}
#global-menu * {
  z-index: 2000;
}
#global-menu>div.arrow-shape {
  width: 20px;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  position: absolute;
  left: 23px;
}
#global-menu>div.as-1 {
  border-bottom: 6px solid #ccc;
  margin-top: -6px;
}
#global-menu>div.as-2 {
  border-bottom: 6px solid #f5f7f8;
  margin-top: -5px;
}
#global-menu>#menu-box {
}

#menu-box {
    display: table;
    border-collapse: collapse;
    border: 0;
    border-radius: 5px;
  box-shadow: 0 0 8px -2px #222; 
}
.table-row {
    display: table-row;
}
.table-head {
    height: 50px;
}
.table-row>div {
    display: table-cell;
    width: 150px;
    padding-left: 30px;
}
#menu-box div.middle-col {
    border-right: 1px solid #ccc;
    border-left: 1px solid #ccc;
}
.table-head>div:first-child {
    border-top-left-radius: 5px;
}
.table-head>div:last-child {
    border-top-right-radius: 5px;
}
.table-body>div:first-child {
    border-bottom-left-radius: 5px;
}
.table-body>div:last-child {
    border-bottom-right-radius: 5px;
}
.table-head>div {
    background-color: #f5f7f8;
    font-size: 0;
    line-height: 50px;
}
.table-head>div>* {
    font-size: 14px;
    vertical-align: middle;
    margin-right: 10px;
}
.table-body>div {
    background-color: #fff;
    padding-bottom: 20px;
}
#menu-box>.table-body ul {
    list-style-type: none;
    font-size: 14px;
    margin-top: 10px;
}
#menu-box>.table-body li {
    line-height: 34px;
    color: #929598;
}

#menu-cover {
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: 1999;
}


</style>