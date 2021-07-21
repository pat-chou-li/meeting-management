<template>
  <transition name="slide-left">
<div class="home" >
  <div class="right">
    <img src="../static/1.png" alt="">
  </div>
  <div class="top2">
    <div id="te">
    <div class="text">
      会议室管理系统
      <br>
    </div>
    <div class="text2">
      Conference Room Management System
    </div>
      <button @click="start()">开始使用</button>
    </div>
  </div>
</div>
  </transition>
</template>

<script>
export default {
  name: "home",
  data(){
    return{
      transitionName:''
    }
  },
  methods:{
    start(){
      this.$router.push('/checkMeetingRoom');
    }
  }
}
</script>

<style scoped>
.home{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}
.right,
.right img{
  position: fixed;
  width: 200vh;
  right: 0;
  bottom: 0;
}
#te{
  display: inline-block;
  box-sizing: content-box;
  position: relative;
  width: 80vw;
  top: 25vh;
  left: 12vw;
}
.text{
  display: inline-block;
  font-size: 12vh;
  color: white;
  font-family: myFirstFont;
  position: relative;
  top: -2vh;
}
.text2{
  font-size: 4.4vh;
  position: relative;
  left: 1vw;
  color: white;
}
.top2{
  height: 100vh;
  width: 100vw;
  background-color: rgb(76,127,219);
}
@font-face {
  font-family: myFirstFont;
  src:url(../static/Slideqiuhong-Regular.ttf);
}
button{
  position: relative;
  top: 15vh;
  left: 4vw;
  width: 15vw;
  height: 10vh;
  color: rgb(77,128,219);
  font-size: 5vh;
  border-radius: 15px;
  background-color: white;
  border: none;
}
.slide-left-enter {
  opacity:0;
}

.slide-left-leave{
  opacity:1;
}

.slide-left-enter-active{
  transition:opacity 2s;
}

.slide-left-leave-active{
  opacity:0;
  transition:opacity 2s;
}
.slide-right-enter {
  opacity:0;
}

.slide-right-leave{
  opacity:1;
}

.slide-right-enter-active{
  transition:opacity 2s;
}

.slide-right-leave-active{
  opacity:0;
  transition:opacity 2s;
}
</style>