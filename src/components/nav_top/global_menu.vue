<template>
  <!-- new message window -->
  <div id="global-menu" v-if="showMenu">
    <div class="arrow-shape as-1">
    </div>
    <div class="arrow-shape as-2">
    </div>

    <div id="menu-box" >
      <div class="table-row table-head">
        <div>
        </div>
        <div>
        </div>
        <div>
        </div>
      </div>

      <div class="table-row table-body">
        <div>
        </div>
        <div>
        </div>
        <div>
        </div>
      </div>
    </div>
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
  }
}
</script>

<style type="text/css">
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
  border-bottom: 6px solid #fff;
  margin-top: -5px;
}
#global-menu>#menu-box {
  height: 500px;
  width: 400px;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 0 8px -2px #222; 
  border-radius: 5px;
}

#menu-box {
  display: table;
}
.table-row {
  display: table-row;
}


</style>