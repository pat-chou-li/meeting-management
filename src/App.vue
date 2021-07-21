<template>
  <div id="app">
    <div class="team"  v-show=" this.$route.path !== '/login' && this.$route.path !== '/register' && this.$route.path != '/home' && this.$route.path != '/addperson' ">
    <div class="nav">
      <Nav></Nav>
    </div>
    </div>
    <div class="middle"></div>
    <div class="right">
      <div v-show=" this.$route.path !== '/login' && this.$route.path !== '/register' && this.$route.path != '/home' && this.$route.path != '/addperson' " >
      <div class="top">
        <div class="text">
        会 议 管 理 系 统
        </div>
        <div class="log_off" @click="logoff">
        <svg class="icon" aria-hidden="true" id="off">
          <use xlink:href="#icon-zhuxiao"></use>
        </svg>
          <div class="text">
            注销
          </div>
        </div>
      </div>
      <div class="route">
        <div class="text">
          <p> >> </p>
        {{this.$route.name}}
        </div>
      </div>
      </div>
      <div class="now">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"/>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "./components/nav";
import {mapMutations} from 'vuex'
export default {
  name: "App",
  data(){
    return{

    }
  },
  methods:{
    ...mapMutations(['changeLogin','changeUserGroup']),
    logoff(){
      window.sessionStorage.clear()
      window.localStorage.clear()
      this.$store.commit('changeLogin',{Authorization: ''})
      this.$store.commit('changeUserGroup',{userGroup : ''})
      this.$message.success('注销成功')
      this.$router.push('/login')
    }
  },
  computed:{
  },
  components:{
    Nav
  }
}
</script>

<style>
*{
  margin:0;
  padding: 0;
}
body{
  /*background-color: #eef1f7;*/
  background: #eef1f7;
}
html,body,.team,#app,.nav{
  height: 100%;
}
#app{
  display: flex;
  width: 100%;
  height: 100%;
}
.nav{
  flex: 10;
}
.right{
  display: inline-block;
  height: 100vh;
  flex: 90;
}
.log_off{
  float: right;
  padding-right: 2vw;
  cursor: pointer;
}
.log_off .text{
  font-size: 20px !important;
  display: inline-block;
  padding-left: 1vw !important;
}
#off{
  display: inline-block;
  height: 20px;
  width: 20px;
  top: 0.4vh;
  position: relative;
}
.top{
  background-color: rgba(76, 128, 219,0.95);
  height: 10vh;
  width: 100%;
  color: white;
  line-height: 10vh;
}
.top .text{
  padding-left: 3vw;
  font-size: 3vh;
  display: inline-block;
}
.route{
  height: 13.5vh;
  width: 100%;
  border-bottom: 3px solid #bdc4d1;
  line-height: 13.5vh;
  background-color: white;
}
.route .text{
  padding-left: 10vw;
  font-size: 3vh;
}
.route p{
  display: inline;
  color: skyblue;
  font-size: 3vh;
}
</style>

<!--<style>-->
<!--@font-face {-->
<!--  font-family: myFirstFont;-->
<!--  src:url(./static/Slideqiuhong-Regular.ttf);-->
<!--}-->
<!--body{-->
<!--  font-family: myFirstFont;-->
<!--  font-size: 20px;-->
<!--}-->
<!--</style>-->