<template>
  <div class="page">
  <div id="addperson" :class="{daylightadd:!night}">
    <h2>参加{{meetingname}}</h2>
    <form v-if="!submmited">
      <label>姓名</label>
      <input type="text" v-model="form.name">
      <label>电话</label>
      <input type="text" v-model="form.telephone">
      <label>邮箱</label>
      <input type="text" v-model="form.email">
      <button @click.prevent="post">参加会议</button>
    </form>
  </div>
  </div>
</template>

<script>
export default {
  name: "addperson",
  data() {
    return {
      form:{
        meid:'',
        name:'',
        email:'',
        telephone: '',
      },
      submmited:false,
      night:false,
      meetingname:'会议'
    }
  },
  computed:{
    verify: function (){
      if (!this.form.name){
        return {flag:false , msg:'请填写有效用户名'}
      }
      if(!/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(this.form.email)){
        return {flag:false,msg:'请填写有效的邮箱'};
      }
      if(!(/^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/.test(this.form.telephone))){
        return {flag:false,msg:'请填写有效的手机号码'}
      }
      return  {flag:true}
    }
  },
  methods:{
    post(){
      if(this.verify.flag){
      this.axios('/meeting/addParticipant',{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'//表单类型
        },
        method: 'get',
        params : this.form
      })
        .then((res)=>{
          if(res.data.state === true) {
            this.$message.success ('提交成功')
          }
          else{
            this.$message.error('提交失败')
          }
        })
        .catch((error)=>{
          this.$message.error(error)
        })
     }else{
        this.$message.error(this.verify.msg);
      }
    }
  },
  created() {
    this.meetingname = this.$route.query.meetingname
    this.form.meid = this.$route.query.meid
  }
}
</script>

<style scoped>
.daylightadd,
.daylightadd input,
.daylightadd textarea,
.daylightadd label,
.daylightadd h1,
.daylightadd h2,
.daylightadd h3,
.daylightadd p{
  background:white !important;
  color: black !important;
}
#addperson *{
  box-sizing: border-box;
  color: white;
}
#addperson{
  height: 93vh;
  box-shadow: 0 0 10px skyblue;
  background: rgba(27,31,46,.95);
  margin:auto;
  max-width: 600px;
  padding: 20px;
  position: relative;
}
label{
  display: block;
  margin:20px 0 10px;
}
input[type="text"],textarea,select{
  display: block;
  width: 100%;
  padding: 8px;
  background: #999;
}
textarea{
  height: 200px;
}

#checkboxes label{
  display: inline-block;
  margin-top: 0;
}
#checkboxes input{
  display: inline-block;
  margin-right: 10px;
}
button{
  display: block;
  margin: 20px 0;
  background: skyblue;
  border: 0;
  padding: 14px;
  border-radius: 4px;
  font-size: 18px;
  cursor:pointer;
  box-shadow: 0 0 10px skyblue;
  color: #3ca1ff;
}
#previre{
  padding: 10px 20px;
  border: 1px dotted #ccc;
  margin: 30px 0;
}
h3{
  margin-top: 10px;
}
.page{
  background-image:url(../static/qwq.png);
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
}
</style>