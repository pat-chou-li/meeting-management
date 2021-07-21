<template>
  <div id="record">
    <el-form :label-position="labelPosition" label-width="80px" :model="form">
      <el-form-item label="会议名称">
        <el-input v-model="form.meetingName"></el-input>
      </el-form-item>
      <el-form-item label="会议时间">
        <el-input v-model="form.meetingTime"></el-input>
      </el-form-item>
      <el-form-item label="会议地点">
        <el-input v-model="form.location"></el-input>
      </el-form-item>
      <el-form-item label="会议内容">
        <el-input type="textarea" v-model="form.meetingContent"></el-input>
      </el-form-item>
    </el-form>
    <el-button class="save" type="primary" @click="onSubmit">保存</el-button>
  </div>
</template>

<script>
export default {
  name: "changeRecord",
  data() {
    return {
      labelPosition: 'left',
      mreid:'',
      form: {
        meid:'',
        meetingName: '',
        meetingTime:'',
        location: '',
        meetingContent: '',
        participants:'',
        absencePerson:'',
      }
    }
  },
  methods:{
    onSubmit() {
      console.log (this.mreid)
      if (!this.mreid) {
        let _data = JSON.stringify (this.form)
        this.axios.post ('/meeting/addRecodingMeeting',
            _data).then (() => {
          this.$message.success ('保存成功')
          this.$router.push ('/record')
        })
      }
      else{
        let _data = this.form
        _data.mreid = this.mreid;
        _data = JSON.stringify(_data)
        this.axios.post ('/meeting/updateRecodingMeeting',
            _data).then (() => {
          this.$message.success ('保存成功')
          this.$router.push ('/record')
        })
      }
    }
  },
  created() {
    this.form.meid = this.$route.query.meid
    this.axios.get('/meeting/getRecodingMeeting',{
      params:{
        meid:this.form.meid
      }
    }).then(res=>{
      this.form.location = res.data.meetingRecoding.location;
      this.form.meetingName = res.data.meetingRecoding.meetingName;
      this.form.meetingContent = res.data.meetingRecoding.meetingContent;
      this.form.meetingTime = res.data.meetingRecoding.meetingTime;
      this.mreid = res.data.meetingRecoding.mreid
    }).catch(()=>{
      this.$message.success('初次编写会议记录')
    })
  }
}
</script>

<style scoped>
#record{
  width: 60vw ;
  height: 60vh;
  margin-left: 10vw;
  margin-top: 5vh;
  box-shadow: 0 0 10px skyblue;
  background: white;
  padding: 20px 20px 20px 20px;
}

</style>

<style>
#record .el-button--primary{
  position: relative;
  left: 28vw;
}
#record .el-input__inner{
  border: 1px solid #DCDFE6 !important;
  background: white !important;
}
#record .el-textarea__inner{
  background: white !important;
  resize: none;
  height: 25vh;
}
</style>