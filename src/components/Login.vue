<template>
    <div>
        this is login!
        <input type="button" class="ad-form-control" value="登录" @click="login">
    </div>
</template>
<script>
export default {
    name: 'login',
    methods: {
        login(){
            localStorage.setItem('name','user');
            this.$router.replace({name:'main'});
        }
    }
}
</script>