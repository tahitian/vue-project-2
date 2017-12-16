<template>
  <div id="message-list" calss="w6">

    <div id="title">
      <div class="title-wrapper">
        <span>查看消息</span>
        <DatePicker type="daterange" class="date-picker" v-model="validity_period"></DatePicker>
        <select v-model="message_type_wanted">
          <option v-for="m_type in m_types" :value="m_type.code">{{m_type.name}}</option>
        </select>
      </div>
    </div>

    <div id="message-win">

      <div id="tool-bar">
        <Checkbox v-model="select_all"></Checkbox>
        <span>全选</span>
        <input type="button" value="设为已读"></input>
        <input type="button" value="设为未读"></input>
      </div>

      <div class="message-item">

        <div class="head-line">
          <Checkbox class="select-this" v-model="select_this"></Checkbox>

          <div class="read-message" @click="openBody">
            <img v-if="read" src="../../assets/icons/message/read.png" class="message-icon" />
            <img v-if="!read" src="../../assets/icons/message/unread.png" class="message-icon" />
            <div class="message-title">
              {{message_title}}
            </div>
          </div>

          <div class="message-type">
            {{message_type}}
          </div>

          <div class="time">
            {{time}}
          </div>

        </div>

        <div v-if="show_body" class="message-body">
          {{message_body}}
        </div>

      </div>

    </div>

  </div>
</template>

<script type="text/javascript">
import '@/public/tools'
import {isPassword} from '@/public/tools'
import {ajaxCallPromise} from '@/public/index'
import {SERVERCONF,getErrMsg,SYSTEM} from '@/public/constants'
import {hex_sha1} from '@/public/sha1'

export default {
  name: 'message_list',
  mounted () {
  },
  data () {
    return {
      select_all: true,
      select_this: true,

      m_types: {
        ALL:  {code:0,  name: '所有消息'},
        SYSTEM:  {code:1,  name: '系统消息'},
        AUDIT:  {code:2,   name: '审核消息'},
        ACCOUNT:  {code:3,  name: '账户消息'},
        FINANCIAL:  {code:4,  name: '财务消息'},
      },
      message_type_wanted: 0,
      validity_period: ['', ''],

      read: true,
      message_title: '账户余额不足',
      time: '2017-12-12 00:00:00',
      message_type: '财务消息',
      show_body: true,
      message_body: '余额少于500余额少于500余额少于500余额少于500余额少于500余额少于500余额少于500余额少于500余额少于500余额少于500余额少于500余额少于500余额少于500余额少于500余额少于500余额少于500余额少于500余额少于500余额少于500余额少于500余额少于500余额少于500余额少于500余额少于500余额少于500余额少于500余额少于500余额少于500余额少于500余额少于500余额少于500余额少于500余额少于500余额少于500余额少于500余额少于500余额少于500余额少于500余额少于500余额少于500余额少于500余额少于500余额少于500余额少于500余额少于500余额少于500余额少于500余额少于500'
    }
  },
  watch: {
  },
  methods: {
    showInfo(text){
      this.$Message.info({
        content: text,
        duration: 2,
        closable: true
      });
    },
    showErr(text){
      this.$Message.error({
        content: text,
        duration: 2,
        closable: true
      });
    },
    openBody(){
      this.show_body = this.show_body ? false : true
      this.read = this.read ? false : true
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
#message-list {
  background-color: white;
  margin: 80px 18% 0 18%;
  height: 400px;
  /*position: relative;*/
}

#message-list>#title {
  background-color: #838b97;
  height: 50px;
  line-height: 50px;
  font-size: 0;
  width: 100%;
}
#message-list>#title>* {
  vertical-align: middle;
  color: #4b4f56;
  display: inline-block;
}
#message-list>#title>div.title-wrapper {
  height: 30px;
  line-height: 30px;
  width: 100%;
  padding: 0 30px;
}
#message-list>#title>div.title-wrapper>span {
  font-size: 16px;
  color: #fff;
}
#message-list>#title select {
  font-size: 14px;
  background-color: #f3f4f4;
  border-radius: 3px;
  height: 30px;
  /*line-height: 48px;*/
  padding: 0 6px;
  border: 1px solid #ccc;
  float: right;
  margin-right: 14px;
}
#message-list .date-picker {
  color: #4b4f56;
  font-size: 14px;
  float: right;
}
#message-list .date-picker input {
  display: inline-block;
  border: 1px solid #ccc;
  height: 30px;
  font-size: 14px;
  background-color: #f3f4f4;
  /*color: #000;*/
}

#message-win>div {
  width: 100%;
  border-bottom: 1px solid #ccc;
  padding: 0 30px;
}

#tool-bar {
  font-size: 0px;
  height: 44px;
  line-height: 42px;
  /*padding-left: 30px;*/
}
#tool-bar>* {
  display: inline-block;
  vertical-align: middle;
  font-size: 14px;
}
#tool-bar>input[type="button"] {
  background-color: #f3f4f4;
  color: #838b97;
  border-radius: 3px;
  height: 28px;
  line-height: 26px;
  padding: 0 8px;
  border: 1px solid #ccc;
  margin-left: 15px;
}

#message-list #message-win div.message-item {
  /*padding-bottom: 16px;*/
}

#message-list #message-win div.head-line {
  font-size: 0;
  height: 50px;
  line-height: 50px;
}
#message-list #message-win div.head-line>* {
  display: inline-block;
  vertical-align: middle;
  font-size: 14px;
}
#message-list #message-win div.head-line>div.read-message {
  display: inline-block;
  vertical-align: middle;
  font-size: 0;
  height: 22px;
  line-height: 22px;
  cursor: pointer;
}
#message-list #message-win div.head-line>div.read-message>* {
  display: inline-block;
  vertical-align: middle;
  font-size: 14px;
}
#message-list #message-win div.head-line>div.read-message>div.message-title {
  padding-left: 28px
}
#message-list #message-win div.head-line>div.time, div.message-type {
  float: right;
  padding-left: 26px;
}

#message-list #message-win div.message-body {
  font-size: 14px;
  color: #838b97;
  padding-left: 71px;
  padding-bottom: 16px;
}


</style>