<template>
  <div class="addMeetingRoom">
    <el-form id='myform' ref="form" :model="form" label-width="120px" label-position="left">
      <el-form-item label="会议室名称">
        <el-input placeholder="请输入会议室名称"  v-model="form.roomName" ></el-input>
      </el-form-item>
      <div class="line"></div>
      <el-form-item label="会议室位置">
        <el-input placeholder="请输入会议室位置" v-model="form.location" ></el-input>
      </el-form-item>
      <div class="line"></div>
      <el-form-item label="会议室楼层">
        <el-input placeholder="请输入会议室楼层" v-model="form.floor" ></el-input>
      </el-form-item>
      <div class="line"></div>
      <el-form-item label="容纳人数">
        <el-input placeholder="请输入容纳人数" v-model="form.capacity" ></el-input>
      </el-form-item>
      <div class="line"></div>
      <el-form-item label="会议室门牌">
        <el-input placeholder="请输入会议室门牌" v-model="form.plateNum" ></el-input>
      </el-form-item>
      <div class="line"></div>
      <el-form-item label="会议室设备">
        <el-checkbox-group v-model="form.equipment">
          <el-checkbox-button label="摄像头" name="type"></el-checkbox-button>
          <el-checkbox-button label="投影仪" name="type"></el-checkbox-button>
          <el-checkbox-button label="网络" name="type"></el-checkbox-button>
          <el-checkbox-button label="白板" name="type"></el-checkbox-button>
          <el-checkbox-button label="电视" name="type"></el-checkbox-button>
        </el-checkbox-group>
      </el-form-item>
      <div class="line"></div>
      <el-form-item label="设备状态">
        <el-radio-group v-model="form.equipmentState">
          <el-radio-button label="可用"></el-radio-button>
          <el-radio-button label="停用"></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <div class="line"></div>
      <div class="subm">
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "changeMeetingRoom",
  data() {
    return {
      form: {
        mrid:'',
        roomName: '',
        location: '',
        floor: '',
        plateNum: '',
        equipment: [],
        equipmentState: '',
        capacity: '',
        state: 1,
        description : '无'
      }
    }
  },
  methods:{
    onSubmit() {
      if (this.form.equipmentState === '可用')
        this.form.equipmentState = 1;
      else
        this.form.equipmentState = 0;
      this.form.capacity = parseInt(this.form.capacity)
      this.form.equipment = this.form.equipment.toString()
      let data = JSON.stringify(this.form)
      this.form.equipment = []
      this.axios({
        url:'/meetingroom/update',
        method: "post",
        data: data
      }).then(res=>{
        if (res.data.state === true){
          this.$message.success('修改成功')
        }
        else
          this.$message.error(res.data.msg)
        this.$router.back(0)
      }).catch(error=>{
        console.log (error)
        this.$message.error('发生未知错误')
      })
    }
  },
  created() {
    let t = this.$route.query
    this.form.mrid = t.mrid
    this.form.roomName = t.roomName
    this.form.location = t.location
    this.form.floor = t.floor
    this.form.plateNum = t.plateNum
    this.form.description = t.description
    this.form.equipmentState = window.parseInt(t.equipmentState)
    if (this.form.equipmentState === 1)
      this.form.equipmentState = "可用"
    else
      this.form.equipmentState = "停用"
    this.form.capacity = window.parseInt(t.capacity)
    this.form.state = window.parseInt(t.state)
    this.form.equipment = t.equipment.split(",")
  }
}
</script>


<style scoped>
.addMeetingRoom{
  background-color: #eef1f7;
}
.el-form{
  box-sizing: content-box;
  padding: 2vh 10vw 2vh 10vw;
}
label{
  font-size: 20px !important;
  color: skyblue !important;
}
.line{
  background-color: rgb(212, 196, 196);
  width: 100%;
  height: 0.1vh;
  position: relative;
  top: -1.5vh;
}
</style>

<style>
.el-input__inner{
  border: none !important;
  background-color: #eef1f7 !important;
}
.el-form-item__label {
  font-weight: bolder !important;
  color: black !important;
  font-size: 17px !important;
}
.el-checkbox-button__inner,.el-radio-button__inner{
  margin-left: 20px !important;
  width: 150px;
  border-radius: 30px !important;
}
.el-checkbox-button.is-checked .el-checkbox-button__inner,
.el-radio-button__orig-radio:checked+.el-radio-button__inner{
  background-color: #4c80db !important;
}
.subm .el-button--primary{
  background-color: #4c80db !important;
  width: 150px;
  border-radius: 30px !important;
  position: absolute;
  left: 20vw;
}
.el-input__inner{
  font-size: 18px !important;
}
.el-checkbox-button__inner,
.el-radio-button__inner{
  background-color: #dee6f5 !important;
}
</style>