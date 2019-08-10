<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png">
        <HelloWorld msg="Welcome to Your Vue.js App" abc="ACD"/>
        <!--<HelloWorld :msg="msg" />-->
    </div>
</template>

<script>
    // @ is an alias to /src
    import HelloWorld from '@/components/HelloWorld.vue'

    export default {
        name: 'home',
        // data() {
        //     return {msg: "abc"}
        // },
        components: {
            HelloWorld
        }
    }
</script>
