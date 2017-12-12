<template>
    <div>
      <form id="upload-form" enctype="multipart/form-data">
      <input type="file" id="upload"></input>
    </form>
      <input type="button" value="提交" @click="uploadFile"></input>
    </div>
</template>
<script>
import {ajaxCallPromise} from '@/public/index'
import '@/public/tools'
import {SERVERCONF,getErrMsg} from '@/public/constants'

export default {
  data () {
      return {
      }
  },
  methods: {
    uploadFile(){
      let param = {
        sinterface: {
          method: 'POST',
          path: '/v3/settings/account/license'
        },
        data: {
          'upload-file': document.getElementById('upload-form')[0]
        }
      }
      let _self = this;
      ajaxCallPromise(param).then(res => {
        _self.$Message.info({
          content: '提交成功！',
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
