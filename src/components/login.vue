<template>
<div id="login">
<!--  账号: <input type="text" v-model="loginForm.username">-->
<!--  密码: <input type="text" v-model="loginForm.password">-->
<!--  <button @click="submit">登录</button>-->
  <div class="top"></div>
  <div class="bottom">
    <div class="log">
      <div class="buttonList">
      <div class="text active" id="but1" @click="focusLog()">
        登录
      </div>
      <div class="text noactive" id="but2" @click="focusReg()">
        注册
      </div>
      </div>
      <div class="input">
      <div class="text2">
        用户名
      </div>
      <input type="text" v-model="loginForm.username">
      <div class="text2">
        密码
      </div>
      <input type="password" v-model="loginForm.password">
        <div class="extra" v-show=" text1 === '注'  ">
          <div class="text2">管理员:</div>
          <el-switch
              v-model="registerForm.isAdmin"
              active-color="#13ce66"
              inactive-color="#ff4949">
          </el-switch>
          <div class="text2" style="  padding-left: 4vw ">公司:</div>
          <input type="text" style=" width: 7vw " v-model="registerForm.userGroup">
        </div>
        <div class="extra2" v-if="text1 !== '注'">
            <div class="text2">
              忘记密码？
            </div>
        </div>
      </div>
      <div class="ButContent">
      <button @click="submit">
        <div class="text3">
          {{this.text1}}
        </div>
        <div class="text3">
          {{this.text2}}
        </div>
      </button>
      </div>
    </div>
    <img src="../static/login2 (1).png" alt="">
  </div>
</div>
</template>

<script>
import  {mapMutations} from 'vuex';
export default {
  name: "login",
  data(){
    return{
      text1:'登',
      changed:false,
      text2:'录',
      loginForm: {
        username: '',
        password: ''
      },
      registerForm: {
        username: '',
        password: '',
        isAdmin:"0",
        userGroup:''
      },
      usertoken: ''
    }
  },
  methods:{
    ...mapMutations(['changeLogin','changeUserGroup','changeMeetingRooms','changeIsAdmin']),
    focusReg(){
      document.getElementById('but2').classList.add('active')
      document.getElementById('but2').classList.remove('noactive')
      document.getElementById('but1').classList.remove('active')
      document.getElementById('but1').classList.add('noactive')
      this.text1 = '注'
      this.text2 = '册'
    },
    focusLog(){
      document.getElementById('but1').classList.add('active')
      document.getElementById('but1').classList.remove('noactive')
      document.getElementById('but2').classList.remove('active')
      document.getElementById('but2').classList.add('noactive')
      this.text1 = '登'
      this.text2 = '录'
    },
    submit() {
      if (this.text1 === '登') {
        let _this = this;
        if (this.loginForm.username === '' || this.loginForm.password === '') {
          this.message.error ('账号或密码不能为空');
        } else {
          let data = JSON.stringify (_this.loginForm)
          this.axios ({
            method: 'post',
            url: '/user/login',
            data: data
          }).then (res => {
            if (res.data.state === "true") {
              this.axios.get('/user/getMsg')
              .then(res=>{
                console.log (res)
                this.$store.commit('changeProfile',res.data.user)
                console.log (this.$store.state.profile)
              })
              _this.userToken = res.data.token;
              // 将用户token保存到vuex中
              _this.changeIsAdmin({isAdmin:res.data.isAdmin})
              _this.changeLogin ({Authorization: _this.userToken});
              _this.changeUserGroup ({userGroup: res.data.userGroup})
              _this.axios.get ('/meetingroom/getAll')
                  .then ((res) => {
                    this.changeMeetingRooms (res.data.meetingRooms)
                  })
                  .catch ((error) => {
                    console.log (error)
                    this.$message.error ('获取会议室错误')
                  })
              const redirect = _this.$route.query.redirect
              if (redirect) {
                this.$router.replace ({
                  path: redirect
                })
              } else {
                this.$router.replace ({
                  path: "/home"
                })
              }
              _this.$message.success ('登录成功')
            } else {
              this.$message.error (res.data.msg);
            }
          }).catch (error => {
            this.$message.error ('未知错误，回调落入了catch,请联系管理员')
            console.log (error)
          })
        }
      }else{
          this.registerForm.username = this.loginForm.username
          this.registerForm.password = this.loginForm.password
          if (this.registerForm.isAdmin === true){
            this.registerForm.isAdmin = "1";
          }
          else
            this.registerForm.isAdmin = "0";
          let _this = this;
          if (this.registerForm.username === '' || this.registerForm.password === '') {
            alert('账号或密码不能为空');
          } else{
            let data = JSON.stringify(_this.registerForm)
            this.axios({
              method: 'post',
              url:'/user/register',
              data: data
            }).then(res =>{
              if (res.data.state === true) {
                this.axios.get('/user/getMsg')
                    .then(res=>{
                      console.log (res)
                      this.$store.commit('changeProfile',res.data.user)
                      console.log (this.$store.state.profile)
                    })
                _this.userToken = res.data.token;
                // 将用户token保存到vuex中
                _this.changeIsAdmin({isAdmin:res.data.isAdmin})
                _this.changeLogin ({Authorization: _this.userToken});
                _this.changeUserGroup( {userGroup :_this.registerForm.userGroup} )
                const redirect = _this.$route.query.redirect
                if (redirect) {
                  this.$router.replace ({
                    path: redirect
                  })
                } else {
                  this.$router.replace ({
                    path: "/home"
                  })
                }
                _this.$message.success ('注册成功')
              }else{
                this.$message.error(res.data.msg)
              }
            }).catch(error=>{
              this.$message.error('未知错误')
              console.log(error)
            })
          }
      }
    },
  }
}
</script>

<style scoped>
#login{
  width: 100vw;
  height: 100vh;
  background-image: url("../static/login2 (2).png") ;
  background-repeat: round;
  background-color: rgb(233,243,255);
}
.top{
  height: 7vh !important;
}
.bottom img{
  width: 70vh;
  float: right;
  position: relative;
  top: 10vh;
  right: 10vw;
}
.log{
  top: 16vh;
  left: 8vw;
  position: absolute;
  width: 30vw;
  height: 73vh;
  background-color: white;
  box-shadow: 2px 2px 2px rgb(185,202,222);
  border-radius: 10px;
}
.buttonList{
  height: 10vh;
}
.text{
  position: relative;
  width: 4vw;
  display: inline-block;
  margin-left: 5vw;
  margin-top: 4vh;
  font-size: 2vw;
  cursor: pointer;
  transition: .2s;
  transition-property: all;
  transition-duration: 0.2s;
  transition-timing-function: ease;
  transition-delay: 0s;
}
.noactive{
  width: 3.2vw;
  font-size: 1.6vw;
  color: gray;
}
.noactive:before{
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
.noactive:hover:before{
  left: 0%;
  width: 100%;
}
.active{
  color: rgb(75,129,220);
}
.active:before{
  content: "";
  position: absolute;
  left: -0.5vw;
  bottom: -0.5vh;
  width: 120%;
  height: 3px;
  background-color: #1e90ff;
}
.input{
  margin-left: 3vw;
  margin-top: 6vh;
}
.text2{
  font-size: 2.5vh;
  color: rgb(101,101,101);
}
input{
  width: 80%;
  border-style: solid;
  border-top-width: 0px;
  border-right-width: 0px;
  border-bottom-width: 1.3px;
  border-left-width: 0px;
  margin-top: 3vh;
  margin-bottom: 4vh;
  margin-left: 0.2vw;
  font-size: 2.8vh;
  line-height: 2vh;
  transition:all 0.5s;
}
input:focus{
  outline: none;
  color: rgb(83,124,214);
  transition:all 0.5s;
}
.ButContent{
  width: 100%;
  display: flex;
  align-items:center;
  justify-content:center;
  position: relative;
  top: 10vh;
}
button{
  width: 10vw;
  height: 6vh;
  color: white;
  font-size: 3vh;
  border-radius: 5px;
  background-color: rgb(77,128,219);
  border: none;
  transition: all .5s;
}
button:hover{
  cursor: pointer;
  transition: all .5s;
  background-color: rgb(29, 95, 212);
}
.text3{
  display: inline-block;
  margin-left: 0.5vw;
  padding-right: 0.5vw;
}
.extra input,
.extra .text2{
  display: inline-block;
}
.extra .text2{
  width: 18%;
}
.extra input{
  width: 10px;
}
.extra{
  height: 5vh;
  transition: all 2s;
}
.extra2{
  height: 5vh;
}
.extra2 .text2{
  position: relative;
  left: 18vw;
  top: 3vh;
}
</style>