<template>
  <div id="message-list" calss="w6">

    <div id="title">
      <span>查看消息</span>
      <div v-if="show_audit" class="yellow-style">
        <span>更改密码后请牢记并妥善保存密码！</span>
        <img src="../../assets/icons/home/close.png" @click="hideAudit" />
      </div>
    </div>

    <div id="message-body">
      <div id="tool-bar">
        <Checkbox v-model="select_all">
        </Checkbox>
        <span>全选</span>
        <input type="button" value="设为已读"></input>
        <input type="button" value="设为未读"></input>
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
  name: 'account_qual_info',
  mounted () {
  },
  data () {
    return {
      show_audit: false,
      pwd_present: '',
      pwd_new: '',
      pwd_repeat: '',

      select_all: true
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
    hideAudit(){
      this.show_audit = false;
    },
    submitQualInfo(){
      if(this.pwd_present == "" || this.pwd_new == "" || this.pwd_repeat == ""){
          this.showErr("密码不能为空！");
      }else if(this.pwd_new != this.pwd_repeat){
          this.showErr("两次密码不一致！");
      }else if(!isPassword(this.pwd_new)){
          this.showErr("密码格式错误！必须包含数字，大小写字母，长度6-16位");
      }else{
          var passwords = {
            passwords: hex_sha1(this.pwd_new + SYSTEM.SALT),
            oldpassword: hex_sha1(this.pwd_present + SYSTEM.SALT)
          }

          var param = {
              // sinterface : SERVERCONF.USERS.RESETPASS,
              sinterface: {
                method: 'POST',
                path: '/v3/password/reset'
              },
              data : passwords
          };

          let _self = this;
      
          ajaxCallPromise(param).then( res => {
            _self.showInfo('密码修改成功！');
          }).catch( err => {
            _self.showErr(getErrMsg(err));
          });
      }
    }
  }
}
</script>

<style type="text/css">
#message-list {
  background-color: white;
  margin: 20px 16% 0 16%;
  height: 400px;
  position: relative;
}

#message-list>#title {
  background-color: #838b97;
  padding-left: 30px;
  height: 50px;
  line-height: 50px;
  font-size: 0;
}
#message-list>#title>span {
  font-size: 16px;
  color: #fff;
  vertical-align: middle;
}

#tool-bar {
  font-size: 0;
  height: 44px;
  line-height: 44px;
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
  line-height: 28px;
  padding: 0 8px;
}

#message-body>div {
  font-size: 14px;
  width: 100%;
  border-bottom: 1px solid #ccc;
}

#message-list>div>* {
  display: inline-block;
  position: absolute;
  top: 50%;
  transform: translateY(50%);
}

#message-list div.horizon {
  background-color: #ccc;
  position: absolute;
  bottom: 82px;
  width: 100%;
  height: 1px;
}

/*#message-list input[type="button"] {
  width: 100px;
  height: 40px;
  font-size: 16px;
  color: #fff;
  background-color: #3a72bf;
  border-radius: 3px;
  position: absolute;
  bottom: 20px;
  right: 20px;
}*/

</style>