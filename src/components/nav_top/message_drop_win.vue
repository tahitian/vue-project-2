<template>
  <!-- new message window -->
  <div id="unread-message-window" v-if="showMessage">
    <div class="arrow-shape as-1">
    </div>
    <div class="arrow-shape as-2">
    </div>

    <div id="unread-message-list" >
      <div class="title">
        <span>新消息</span>
        <div>
          <span>全部标记为已读</span>
        </div>
      </div>

      <div class="unread-message-item">
        <div class="title-line">
          <span>账户余额不足账户余额不足账户余额不足账户余额不足账户余额不足账户余额不足账户余额不足账户余额不足</span>
        </div>
        <div class="icon-wrapper">
          <img src="../../assets/icons/message/unread.png" />
        </div>

        <div class="description">
          <span>{{message_type}}</span>
          <div>
            <span>{{message_time}}</span>
          </div>
        </div>

        <div class="check-point">
          <div>
          </div>
        </div>
      </div>

      <span>查看所有消息</span>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'message_drop_win',
  props: {
    'showMessage': {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data () {
    return {
      // show_message: true,
      message_type: '系统消息',
      message_time: '2017-12-12 00:00:00'
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
#unread-message-window {
  position: fixed;
  top: 46px;
  right: 160px;
  /*background-color: green;*/
  z-index: 2000;
}
#unread-message-window * {
  z-index: 2000;
}
#unread-message-window>div.arrow-shape {
  width: 20px;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  position: absolute;
  right: 10px;
}
#unread-message-window>div.as-1 {
  border-bottom: 6px solid #ccc;
  margin-top: -6px;
}
#unread-message-window>div.as-2 {
  border-bottom: 6px solid #fff;
  margin-top: -5px;
}
#unread-message-window>#unread-message-list {
  height: 500px;
  width: 400px;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 0 8px -2px #222; 
  border-radius: 5px;
}

#unread-message-list>div.title {
  height: 41px;
  border-bottom: 1px solid #ccc;
  font-size: 0;
  line-height: 40px;
  padding:0 20px;
}
#unread-message-list>div.title span {
  font-size: 14px;
  vertical-align: middle;
}
#unread-message-list>div.title>div {
  height: 40px;
  font-size: 0;
  line-height: 40px;
  float: right;
  display: inline-block;
  color: #3a72bf;
}

#unread-message-list>div.unread-message-item {
  height: 51px;
  /*width: 100%;*/
  border-bottom: 1px solid #ccc;
  font-size: 0;
  padding: 0 20px;
  position: relative;
}
#unread-message-list>div.unread-message-item>div.title-line {
  height: 30px;
  width: 100%;
  line-height: 30px;
  font-size: 0;
}
#unread-message-list>div.unread-message-item>div.title-line>span {
  width: 100%;
  vertical-align: middle;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  padding-left: 30px;
  padding-right: 40px;
}
#unread-message-list>div.unread-message-item>div.icon-wrapper {
  height: 30px;
  width: 100%;
  line-height: 30px;
  font-size: 0;
  position: absolute;
  top: 0;
  left: 0;
}
#unread-message-list>div.unread-message-item>div.icon-wrapper>img {
  vertical-align: middle;
  padding-left: 20px;
}
#unread-message-list>div.unread-message-item>div.description {
  width: 100%;
  height: 30px;
  line-height: 30px;
  margin-top: -10px;
  font-size: 0;    
  padding-left: 30px;
  padding-right: 60px;
}
#unread-message-list>div.unread-message-item>div.description>span {
  font-size: 14px;
  vertical-align: middle;
}
#unread-message-list>div.unread-message-item>div.description>div {
  display: inline-block;
  vertical-align: middle;
  height: 30px;
  line-height: 30px;
  float: right;
}
#unread-message-list>div.unread-message-item>div.description>div>span {
  vertical-align: middle;
  font-size: 14px;
}


#unread-message-list>div.unread-message-item>div.check-point {
  height: 50px;
  line-height: 50px;
  font-size: 0;
  position: absolute;
  right: 30px;
  top: 0;
}
#unread-message-list>div.unread-message-item>div.check-point>div {
  height: 10px;
  width: 10px;
  border-radius: 5px;
  background-color: #6dbd25;
  vertical-align: middle;
  display: inline-block;
  cursor: pointer;
}

#unread-message-list>span {
  display: inline-block;
  width: 100%;
  text-align: center;
  position: absolute;
  bottom: 10px;
  color: #3a72bf;
}
</style>