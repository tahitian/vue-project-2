<template>
<div id="uploader">
  <div id="input-line">
    <div id="new-input">
      <span>点击载入文件</span>
      <input type="file" id="file-input" @change = "fileChange" />
    </div>

    <span v-if="file_name">{{file_name}}</span>
    <img v-if="file_name" src="../assets/icons/home/close.png" />
  </div>

  <div id="upload-line" v-if="file_name">
    <input type="button" @click="uploadFile" value="点击上传文件" />
    <span>{{res_message}}</span>
  </div>

</div>
</template>
<script>
import {ajaxCallPromise} from '@/public/index'
import '@/public/tools'
import {SERVERCONF,getErrMsg} from '@/public/constants'

export default {
  data () {
      return {
        file_name: null,
        res_message: null,
      }
  },
  watch: {
  },
  methods: {
    fileChange(){
      this.file_name = document.getElementById('file-input').files[0].name;
    },
    uploadFile(){
      var oData = new FormData();

      oData.append("upload-file", document.getElementById('file-input').files[0]);

      // var oReq = new XMLHttpRequest();
      // oReq.open("POST", "http://172.16.1.180:6188/v3/settings/account/license", true);
      // oReq.onload = function(oEvent) {
      //   if (oReq.status == 200) {
      //     this.res_message = "Uploaded!";
      //   } else {
      //     this.res_message = "Error " + oReq.status + " occurred when trying to upload your file.<br \/>";
      //   }
      // };

      // oReq.send(oData);

      let param = {
        sinterface: {
          method: 'POST',
          path: '/v3/settings/account/license'
        },
        data: oData
      }
      let _self = this;
      ajaxCallPromise(param).then(res => {
        _self.getBasicInfo();
        _self.$Message.info({
          content: '上传成功！',
          duration: 2,
          closable: true
        })
      }).catch(err=> {
        let msg = getErrMsg(err);
        _self.$Message.error({
            content: msg,
            duration: 2,
            closable:true
        });        
      });
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
#uploader>div {
  color: #000;
  font-family: "HiraginoSansGB-W6";
  height: 30px;

  font-size: 0;
  line-height: 30px;
}
#uploader>div>*{
  display: inline-block;
  vertical-align: middle;
}
#uploader>div>img{
  width: 12px;
}
#uploader>div>span{
  /*display: inline-block;*/
  color: #000;
  font-size: 14px;
  line-height: 14px;
  /*vertical-align: middle;*/
  padding-left: 10px;
}
#upload-line {
  margin-top: 10px;
}
#upload-line>input {
  font-size: 14px;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 3px;
  width: 100px;
  /*display: inline-block;*/
  /*vertical-align: middle;*/
}

#new-input {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  overflow: hidden;
  width: 100px;
  height: 100%;

  background: #fff;
  border: 1px solid #ccc;
  border-radius: 3px;
  color: #000;
  font-family: "HiraginoSansGB-W6";
  font-size: 14px;
  line-height: 14px;
}
#new-input>span {
  display: inline-block;
  white-space: nowrap;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
#file-input {
  height: 100%;
  position: absolute;
  width: 1000px;
  right: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;
}
</style>
