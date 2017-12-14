<template>
<div id="uploader">
  <div v-show="!file_to_load" id="new-input">
    <span>点击载入文件</span>
    <input type="file" id="file-input" @change = "fileChange" />
  </div>

  <div v-if="file_to_load" @click="uploadFile">
    <span>点击上传文件</span>
  </div>
  <span v-if="file_to_load">{{file_to_load}}</span>
  <img v-if="file_to_load" src="../../assets/icons/home/close.png" @click="clearFile" class="close" />

  <a v-if="fileUrl && !file_to_load" @click="showImage">点击查看</a>

  <div class="cover" v-if="show_image" @click="showImage">
  </div>
  <img :src="fileUrl" v-if="show_image" @click="showImage" class="view-image" />

</div>
</template>
<script>
import {ajaxCallPromise} from '@/public/index'
import '@/public/tools'
import {SERVERCONF,getErrMsg} from '@/public/constants'

export default {
  data () {
      return {
        file_to_load: null,
        // fileUrl: null,
        res_message: null,
        show_image: false,
        image_url: ''
      }
  },
  props: {
    'fileUrl': {
      type: String,
      required: true,
      default: null
    }
  },
  watch: {
  },
  methods: {
    fileChange(){
      console.log(document.getElementById('file-input'));
      var file = document.getElementById('file-input').files[0];
      if(file){
        this.file_to_load = file.name;
      }
    },
    uploadFile(){
      var oData = new FormData();

      oData.append("upload-file", document.getElementById('file-input').files[0]);

      let param = {
        sinterface: {
          method: 'POST',
          path: '/v3/settings/account/license'
        },
        data: oData
      }
      let _self = this;
      ajaxCallPromise(param).then(res => {
        _self.$emit('update:fileUrl', res.file);
        // _self.image_url = res.url;
        document.getElementById('file-input').value = '';
        _self.file_to_load = null;

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
    },
    clearFile(){
        this.file_to_load = null;
        document.getElementById('file-input').value = '';
    },
    showImage(){
      this.show_image = this.show_image ? false : true;
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
#uploader {
  color: #4b4f56;
  font-family: "HiraginoSansGB-W6";
  height: 30px;

  font-size: 0;
  line-height: 30px;
}
#uploader>*{
  display: inline-block;
  vertical-align: middle;
  font-size: 14px;
  line-height: 14px;
}

#uploader>div {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  width: 100px;
  height: 100%;
  overflow: hidden;
  cursor: pointer;
  margin-right: 10px;

  background: #fff;
  border: 1px solid #ccc;
  border-radius: 3px;
}
#uploader>div>span {
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

#uploader>img.close{
  margin-left: 10px;
  width: 14px;
  opacity: 0.5;
}
#uploader>img:hover{
  opacity: 1;
}

#uploader>div.cover {
  background-color: black;
  opacity: 0.8;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 2000;
  border: 0;
  border-radius: 0;
}
#uploader>img.view-image {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2001;
  cursor: pointer;
}
</style>