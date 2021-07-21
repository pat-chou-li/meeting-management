<template>
    <div class="addMeetingRoom">
      <el-form id='myform' :rules="rules" ref="form" :model="form" label-width="120px" label-position="left">
        <el-form-item label="会议室名称" prop="roomName">
          <el-input placeholder="请输入会议室名称" v-model="form.roomName" ></el-input>
        </el-form-item>
        <div class="line"></div>
        <el-form-item label="会议室位置" prop="location">
          <el-input placeholder="请输入会议室位置" v-model="form.location" ></el-input>
        </el-form-item>
        <div class="line"></div>
        <el-form-item label="会议室楼层" prop="floor">
          <el-input placeholder="请输入会议室楼层" v-model.number="form.floor" ></el-input>
        </el-form-item>
        <div class="line"></div>
        <el-form-item label="容纳人数" prop="capacity">
          <el-input placeholder="请输入容纳人数" v-model.number="form.capacity" ></el-input>
        </el-form-item>
        <div class="line"></div>
        <el-form-item label="会议室门牌"  prop="plateNum">
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
  name: "addMeetingRoom",
    data() {
      return {
        form: {
          roomName: '',
          location: '',
          floor: '',
          plateNum: '',
          equipment: [],
          equipmentState: '',
          capacity: '',
          state: 1,
          description : '无'
        },
        rules:{
          roomName: [
            { required: true, message: '会议名称不能为空', trigger: 'blur' },
          ],
          location: [
            { required: true, message: '会议室位置不能为空', trigger: 'blur' },
          ],
          floor: [
            { required: true, message: '会议室楼层不能为空', trigger: 'blur' },
          ],
          plateNum: [
            { required: true, message: '会议室门牌不能为空', trigger: 'blur' },
          ],
          capacity: [
            { required: true, message: '容纳人数不能为空', trigger: 'blur' },
            { type: 'number' ,message: '请填入数字' ,trigger: 'blur'},
          ],
          plate: [
            { required: true, message: '请选择会议室', trigger: 'blur' },
          ],
        }
      }
    },
    methods:{
      onSubmit() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            let _form = JSON.parse(JSON.stringify(this.form))
            if (_form.equipmentState === '可用')
              _form.equipmentState = 1;
            else
              _form.form.equipmentState = 0;
            _form.capacity = parseInt(this.form.capacity)
            _form.floor = this.form.floor + '楼'
            _form.equipment = this.form.equipment.toString()
            let data = JSON.stringify(_form)
            this.axios({
              url:'/meetingroom/add',
              method: "post",
              data: data
            }).then(res=>{
              if (res.data.state === true){
                this.$message.success('添加成功')
              }
              else
                this.$message.error(res.data.msg)
            }).catch(error=>{
              console.log (error)
              this.$message.error('发生未知错误')
            })
          } else {
            this.$message.error('表单内容不正确')
            return false;
          }
        });
      }
    }
  }
</script>


<style scoped>
.addMeetingRoom{
  background-color: #eef1f7;
  height: 76vh;
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
.el-form-item__error{
  padding-top: 0;
  padding-left: 1vw !important;
}
.el-form-item__label:before{
  content:'' !important;
  margin-right: 0 !important;
}
#myform{
  box-sizing: border-box;
  height: 100%;
  overflow: auto;
}
</style>