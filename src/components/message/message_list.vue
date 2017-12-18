<template>
  <div id="message-list" calss="w6">

    <div id="title">
      <div class="title-wrapper">
        <span>查看消息</span>
        <DatePicker type="daterange" class="date-picker" v-model="validity_period"></DatePicker>
        <select v-model="request_param.categories">
          <option v-for="m_type in msg_cates" :value="m_type.name">{{m_type.name}}</option>
        </select>
      </div>
    </div>

    <div id="message-win">

      <div id="tool-bar">
        <Checkbox v-model="select_all" @on-change="selectAllChange"></Checkbox>
        <span>全选</span>
        <input type="button" value="设为已读" @click="markReadTogether" :disabled="mark_read_disabled" :class="mark_style"></input>
        <!-- <input type="button" value="设为未读"></input> -->
      </div>

      <div v-if="total==0" class="replace">
        <span>暂无消息！</span>
      </div>

      <ul>
        <li class="message-item" v-for=" msg in msg_list">

          <div class="head-line">
            <Checkbox class="select-this" v-model="msg.selected" @on-change="selectChange"></Checkbox>

            <div class="read-message" @click="openContent(msg.msg_id)">
              <img v-if="msg.notify_status=='已读'" src="../../assets/icons/message/read.png" class="message-icon" />
              <img v-if="msg.notify_status=='未读'" src="../../assets/icons/message/unread.png" class="message-icon" />
              <div class="message-title">
                {{msg.title}}
              </div>
            </div>

            <div class="message-type">
              {{msg.categories}}
            </div>

            <div class="time">
              {{msg.create_time}}
            </div>

          </div>

          <div v-if="msg.show_content" class="message-body">
            {{msg.content}}
          </div>

        </li>
      </ul>

    </div>

    <page id="turn-page" v-on:on-change="turnPage" :page-size="request_param.count" :total="total" v-if="total!=0" show-elevator></page>

  </div>
</template>

<script type="text/javascript">
import '@/public/tools'
import {cloneObj} from '@/public/tools'
import {ajaxCallPromise} from '@/public/index'
import {SERVERCONF,getErrMsg} from '@/public/constants'

export default {
  name: 'message_list',
  mounted () {
    this.getMessage();
  },
  data () {
    return {
      total: 0,
      mark_read_disabled: true,
      selected_num: 0,
      select_all: false,
      mark_style: {
        'mark-disabled': true
      },

      msg_cates: {
        ALL:  {code:0,  name: '所有消息'},
        SYSTEM:  {code:1,  name: '系统消息'},
        AUDIT:  {code:2,   name: '审核消息'},
        ACCOUNT:  {code:3,  name: '账户消息'},
        FINANCIAL:  {code:4,  name: '财务消息'}
      },
      msg_subcates: {
        SYSTEMNOTIFY: {code: 1, name: '系统通知'},
        CHECKADFAIL:  {code: 1001, name: '广告审核不通过'},
        ACCOUNTOVERDAYLIMIT: {code: 2001, name: '账户消耗达到日限额'},
        ACCOUNTADPLANOVERDAYLIMIT: {code: 2002, name: '推广计划消耗达到日限额'},
        ACCOUNTADIDEADONE: {code: 2003, name: '创意定制完成通知'},
        ACCOUNTADEXPIRE: {code: 2005, name: '广告投放到期预警'},
        FINANCIALNOBALANCE: {code: 3001, name: '账户余额为零提醒'},
        FINANCIALBALANCE500: {code: 3002, name: '账户余额不足500元预警'},
        FINANCIALBALANCE3DAY: {code: 3003, name: '账户余额不足3日消耗预警'},
        FINANCIALRECHARGEDONE: {code: 3004, name: '资金到账提醒'}
      },
      validity_period: [null, null],
      request_param: {
        index: 0,
        count: 10,
        start_time: null,
        end_time: null,
        categories: '所有消息'
      },
      msg_list: [
        {
          msg_id: '',
          categories: 0,
          subcategories: 0,
          title: '',
          content: '',
          notify_status: '',
          create_time: '',
          selected: false,
          show_content: false
        }
      ]
    }
  },
  watch: {
    validity_period: function(val){
      if(val[0]){
        this.request_param.start_time = val[0].format('yyyy-MM-dd hh:mm:ss');
        this.request_param.end_time = val[1].format('yyyy-MM-dd hh:mm:ss');
      }
      this.getMessage();
    },
    'request_param.categories': function(val){
      this.getMessage();
    },
    selected_num: function(val){
      if(val > 0) {
        this.mark_read_disabled = false;
        this.mark_style = {
          'mark-enable': true
        }
        if(this.selected_num == this.msg_list.length)
          this.select_all = true;
        else this.select_all = false;
      }
      else {
        this.mark_read_disabled = true;
        this.mark_style = {
          'mark-disabled': true
        }
        this.select_all = false;
      }
    }
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
    openContent(id){
      var msgs = this.msg_list;
      for(var i in msgs){
        if(msgs[i].msg_id == id){
          msgs[i].show_content = msgs[i].show_content ? false : true;
          if(msgs[i].notify_status == '未读'){
            msgs[i].notify_status = '已读';
            this.markRead(msgs[i].msg_id);
          }
          this.msg_list = msgs.slice(0, msgs.length);
          return;
        }
      }
    },
    selectChange(val){
      if(val) this.selected_num++;
      else this.selected_num--;
    },
    selectAllChange(val){
      var msgs = this.msg_list;
      if(val) {
        this.selected_num = msgs.length;
        for(let i in msgs){
          msgs[i].selected = true;
        }
      }
      else {
        this.selected_num = 0;
        for(let i in msgs){
          msgs[i].selected = false;
        }
      }
    },
    getMsgType(code){
      for(let type in this.msg_cates){
        if(this.msg_cates[type].code == code){
          return this.msg_cates[type].name;
        }
      }
    },
    getMessage(){
      let data = cloneObj(this.request_param);
      if(!this.validity_period[0]){
        data.start_time = '1900-01-01 00:00:00';
        data.end_time = new Date().format('yyyy-MM-dd hh:mm:ss');
      }

      let param = {
        sinterface: {
          method: 'GET',
          path: '/v3/settings/system/msg/list'
        },
        data
      };

      let _self = this;

      ajaxCallPromise(param).then(res => {
        for(var i in res.list){
          res.list[i].selected = false;
          res.list[i].show_content = false;
          res.list[i].categories = this.getMsgType(res.list[i].categories);
        }
        _self.msg_list = res.list;
        _self.total = res.total;
      }).catch(err=> {
        let msg = getErrMsg(err);
        _self.$Message.error({
            content: msg,
            duration: 2,
            closable:true
        });        
      });
    },
    markRead(id){    
      let param = {
        sinterface: {
          method: 'POST',
          path: '/v3/settings/system/msg/mark'
        },
        data: {
          msg_id: id
        }
      };
      ajaxCallPromise(param).then(res => {
      }).catch(err=> {
        let msg = getErrMsg(err);
        _self.$Message.error({
            content: msg,
            duration: 2,
            closable:true
        });        
      });
    },
    markReadTogether(){ 
      var msgs = this.msg_list;
      for(var i in msgs){
        if(msgs[i].selected == true){
          if(msgs[i].notify_status == '未读'){
            msgs[i].notify_status = '已读';
            this.markRead(msgs[i].msg_id);
          }
        }
      }
      this.msg_list = msgs.slice(0, msgs.length);
    },
    turnPage(num){
      this.request_param.index = --num;
      this.getMessage();
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
  padding-bottom: 60px;
  /*height: 400px;*/
  position: relative;
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

#message-win>#tool-bar {
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
#tool-bar>label {
  height: 14px;
  line-height: 14px;
  margin-right: 8px;
}
#tool-bar>input[type="button"] {
  border-radius: 3px;
  height: 28px;
  line-height: 26px;
  padding: 0 8px;
  margin-left: 15px;
  cursor: pointer;
}
.mark-enable {
  background-color: #3a72bf;
  color: #fff;
}
.mark-disabled {
  background-color: #f3f4f4;
  color: #838b97;
  border: 1px solid #ccc;
}

#message-win div.replace {
  width: 100%;
  padding: 0 30px;
  font-size: 0;
  height: 50px;
  line-height: 50px;
}
#message-win div.replace>* {
  display: inline-block;
  font-size: 14px;
}

#message-win li {
  width: 100%;
  border-bottom: 1px solid #ccc;
  padding: 0 30px;
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
#message-list #message-win div.head-line>label {
  height: 14px;
  line-height: 14px;
  margin-right: 8px;
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

#message-list>#turn-page {
  position: absolute;
  bottom: 14px;
  right: 30px;
  font-size: 14px;
}


</style>