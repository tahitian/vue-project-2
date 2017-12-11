<template>
   <div id="demo">
      <span></span>
      <div>
        
        <img src="../assets/icons/home/drop_down.png">
      </div>
      <div></div>
    </div>
</template>

<script>
export default {
    name: 'demo'
} 
</script>

<style type="text/css">
#demo{
  height: 50px;
  line-height: 50px;
}
#demo>* {
  display: inline-block;
  background-color: green;
  height: 100%;
  overflow: hidden;
  width: 40px;
}
#demo {
  word-spacing: 0;
  letter-spacing: 0;
  font-size: 0;
}
</style>
