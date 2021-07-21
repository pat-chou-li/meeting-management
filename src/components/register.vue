<template>
  <div id="register">
    账号: <input type="text" v-model="registerForm.username">
    密码: <input type="text" v-model="registerForm.password">
    管理员:<input type="text" v-model="registerForm.isAdmin">
    公司名称:<input type="text" v-model="registerForm.userGroup">
    <button @click="submit">注册</button>
  </div>
</template>

<script>
import  {mapMutations} from 'vuex';
export default {
  name: "register",
  data(){
    return{
      registerForm: {
        username: '',
        password: '',
        isAdmin:'',
        userGroup:''
      },
      usertoken: ''
    }
  },
  methods:{
    ...mapMutations(['changeLogin','changeUserGroup']),
    submit(){
      let _this = this;
      if (this.registerForm.username === '' || this.registerForm.password === '') {
        alert('账号或密码不能为空');
      } else{
        // if (_this.registerForm.isAdmin === true){
        //   _this.registerForm.isAdmin = "1";
        // }
        // else
        //   _this.registerForm.isAdmin = "0";
        let data = JSON.stringify(_this.registerForm)
        this.axios({
          method: 'post',
          url:'/user/register',
          data: data
        }).then(res =>{
          if (res.data.state === true) {
            _this.userToken = res.data.token;
            // 将用户token保存到vuex中
            _this.changeLogin ({Authorization: _this.userToken});
            _this.changeUserGroup( {userGroup :_this.registerForm.userGroup} )
            const redirect = _this.$route.query.redirect
            if (redirect) {
              this.$router.replace ({
                path: redirect
              })
            } else {
              this.$router.replace ({
                path: "/addMeetingRoom"
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
  }
}
</script>

<style scoped>

</style>