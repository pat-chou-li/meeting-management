<template>
  <div id="nav">
    <div class="logo">
<!--      <svg class="icon" aria-hidden="true" id="M">-->
<!--        <use xlink:href="#icon-M"></use>-->
<!--      </svg>-->
      <img src="../static/logo2.png" alt="">
    </div>
    <div class="head">
      <img id='avatar' :src="$store.state.profile.profileUrl" alt="">
      <div class="userid">
        {{userid}}
      </div>
    </div>

    <div class="below">
      <div class="me">
        <h3>个人中心</h3>
<!--        <svg class="icon" aria-hidden="true">-->
<!--            <use xlink:href="#icon-jishiben"></use>-->
<!--        </svg>-->
<!--        <router-link to="/myReserve">我的预定</router-link>-->
<!--        <br>-->
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-daohanglan"></use>
        </svg>
        <router-link to="/myMeeting">我的会议</router-link>
        <br>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-gerenxinxi"></use>
        </svg>
        <router-link to="/profile">个人信息</router-link>
      </div>
      <div class="meetingroom">
        <div class="me">
          <h3>会议管理</h3>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-yuyue"></use>
          </svg>
          <router-link to="/reserveMeetingRoom">预约会议</router-link>
          <br>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-notice"></use>
          </svg>
          <router-link to="/notice">会议通知</router-link>
          <br>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-jilu"></use>
          </svg>
          <router-link to="/record">会议记录</router-link>
        </div>
      </div>
      <div class="meeting">
        <div class="me">
          <h3>会议室管理</h3>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-tianjiawendang"></use>
          </svg>
          <router-link to="/uploadFile">上传文件</router-link>
          <br>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-tianjiahuiyishi"></use>
          </svg>
          <router-link to="/addMeetingRoom">添加会议室</router-link>
          <br>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-chakan"></use>
          </svg>
          <router-link to="/checkMeetingRoom">查看会议室</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "nav",
  data(){
    return{
      avatar:this.$store.state.profile.profileUrl,
      userid:''
    }
  },
  mounted() {
    if (this.$store.state.isAdmin === 1)
      this.userid = '管理员'
    else
      this.userid = '非管理员'
    if (this.$store.state.profile.profileUrl !== null )
      this.avatar = this.$store.state.profile.profileUrl
      console.log (this.avatar)
  }
}
</script>

<style scoped>
*{
  margin:0;
  padding: 0;
}
#nav{
  background-color: white;
  height: 100%;
}
a{
  text-decoration: none;
  color: black;
  display: inline-block;
  margin-top: 2vh;
  position: relative;
}
a:hover, a:visited, a:link, a:active {
  color: black;
}
a:before{
  transition: .2s;
  transition-property: all;
  transition-duration: 0.2s;
  transition-timing-function: ease;
  transition-delay: 0s;
  content: "";
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 0;
  height: 1px;
  background-color: #1e90ff;
}
a:hover:before{
  left: 0%;
  width: 100%;
}
.icon {
  width: 1em; height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  margin-right: 0.5vw;
}
#nav{
  width: 15vw;
  height: 100vh;
  border-right: 0.2px solid skyblue;
}
.logo{
  background-color: #366cc9;
  height: 10vh;
}
.logo img{
  height: 5vh;
  position: relative;
  top: 2.5vh;
  left: 1vw;
}
#M{
  width: 8vh;
  height: 8vh;
  padding-top: 1vh;
  padding-left: 1vw;
}
.head{
  background-color: white;
  height: 13.5vh;
}
.head{
  display: flex;
  align-items: center;
  border-bottom: solid 1px #ddd;
}
.head img{
  border-radius: 50px;
  width: 8vh;
  height: 8vh;
  margin-left: 1vw;
  border: solid 1px gray;
}
.userid{
  display: block;
  margin-left: 1vw;
}
.me{
  margin-left: 2vw;
  margin-top: 5vh;
}
.router-link-exact-active{
  color: #4c80db !important;
}
a:hover{
  color: skyblue;
}
</style>