<template>
<div>
  <uploader :file-loaded.sync="file_loaded"></uploader>
</div>
</template>
<script>
import {ajaxCallPromise} from '@/public/index'
import '@/public/tools'
import {SERVERCONF,getErrMsg} from '@/public/constants'
import uploader from '@/components/public/uploader'

export default {
  data () {
      return {
        file_loaded: 'portrait.jpg',
      }
  },
  props: {
  },
  watch: {
  },
  methods: {
  },
  components: {
    uploader
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
</style>

