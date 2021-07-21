<template>
  <div class="addMeetingRoom">
    <el-form id='myform' :rules="rules" ref="form" :model="form" label-width="120px" label-position="left">
      <el-form-item prop="meetingName" label="会议名称">
        <el-input  v-model="form.meetingName" placeholder="请输入会议名称"></el-input>
      </el-form-item>
      <div class="line"></div>
      <el-form-item prop="date"  label="申请日期">
        <el-date-picker
            v-model="form.date"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <div class="line"></div>
      <div class="lastTime">
      <el-form-item label="预计开始时间" prop="startTime">
      <el-time-select
          placeholder="起始时间          ▽"
          v-model="form.startTime"
          :picker-options="{
      start: '00:00',
      step: '00:30',
      end: '24:00'
    }">
      </el-time-select>
      </el-form-item>
      <el-form-item label="预计结束时间" prop="endTime">
        <el-time-select
            placeholder="结束时间          ▽"
            v-model="form.endTime"
            :picker-options="{
      start: '00:00',
      step: '00:30',
      end: '24:00'
    }">
        </el-time-select>
      </el-form-item>
      </div>
      <div class="line"></div>
      <el-form-item label="预计人数" prop="personNum">
        <el-input v-model.number="form.personNum" placeholder="请输入本次会议预计人数" ></el-input>
      </el-form-item>
      <div class="line"></div>
      <el-form-item label="会议室" prop="plate">
        <el-select v-model="form.plate" placeholder="请先选定时间" @change="selectMrid(form.plate)">
          <el-option
              v-for="item in this.$store.state.availableMeetingRooms"
              size = "medium"
              :key="item.mrid"
              :value="item.roomName">
          </el-option>
        </el-select>
      </el-form-item>
      <div class="line"></div>
        <el-form-item label="会议描述">
          <el-input type='textarea' v-model="form.meetingDescription" placeholder="请输入您要描述的内容"></el-input>
        </el-form-item>
      <div class="line"></div>
      <div class="addperson">
      <el-form-item label="参会人员" prop="participants.length">
        <div id='person' v-for="item in form.participants.slice(0,4)" :key="item.index">
          <div class="head">
            <svg class="icon" aria-hidden="true" id="M">
              <use xlink:href="#icon-chengyuan"></use>
            </svg>
          </div>
          <div class="text">
          {{item.name}}
          </div>
        </div>
        <div class="addper">
        <div class="head">
          <svg class="icon" aria-hidden="true" id="M" @click="dialogFormVisible = true">
            <use xlink:href="#icon-tianjiachengyuan"></use>
          </svg>
        </div>
          <div class="text" @click="dialogFormVisible = true">
            添加成员
          </div>
        </div>
        <div class="addper">
          <div class="head">
            <svg class="icon" aria-hidden="true" id="M" @click="dialogTableVisible = true">
              <use xlink:href="#icon-member"></use>
            </svg>
          </div>
          <div class="text" @click="dialogTableVisible = true">
            成员一览
          </div>
        </div>
      </el-form-item>
        <el-dialog  title="添加新成员" :visible.sync="dialogFormVisible">
          <el-form ref="newperson" :close-on-click-modal="false" :rules="addpersonRules" :model="newperson">
            <el-form-item label="名称" prop="name" >
              <el-input v-model="newperson.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="newperson.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="手机号码" prop="telephone" >
              <el-input v-model="newperson.telephone" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button @click="addNewperson('newperson')">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="删除成员" :visible.sync="dialogTableVisible">
          <el-table :data="this.form.participants"  max-height="400">
            <el-table-column property="name" label="姓名" width="150"></el-table-column>
            <el-table-column property="email" label="邮箱" width="200"></el-table-column>
            <el-table-column property="telephone" label="手机号"></el-table-column>
            <el-table-column property="telephone" label="操作">
            <template slot-scope="scope" >
              <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
            </el-table-column>
          </el-table>
        </el-dialog>
      </div>
      <div class="choosed_par">
      <div class="choosed">
        已选择{{form.participants.length}}人
      </div>
      </div>
      <div class="line"></div>
      <div class="subm">
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import {mapMutations} from "vuex";
import swal from "sweetalert";
export default {
  name: "reserveMeetingRoom",
  data() {
    var checkPhone = (rule, value, callback) => {
      const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
      if (!value) {
        return callback(new Error('电话号码不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(+value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (phoneReg.test(value)) {
            callback()
          } else {
            callback(new Error('电话号码格式不正确'))
          }
        }
      }, 100)
    }
    var checkEmail = (rule,value,cb) => {
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      if (regEmail.test(value)){
        return cb()
      }
      cb(new Error('请输入合法的邮箱'))
    }
    return {
      dialogFormVisible:false,
      dialogTableVisible:false,
      form: {
        meetingName: '',
        date: '',
        startTime: '',
        endTime: '',
        personNum: '',
        mrid:'',
        plate:'',
        meetingDescription:'',
        participants: [],
      },
      newperson:{
        name:'',
        email:'',
        telephone:''
      },
      rules:{
        meetingName: [
          { required: true, message: '请输入会议名称', trigger: 'blur' },
        ],
        date: [
          { required: true, message: '请选择日期', trigger: 'blur' },
        ],
        startTime: [
          { required: true, message: '请选择开始时间', trigger: 'blur' },
        ],
        endTime: [
          { required: true, message: '请选择结束时间', trigger: 'blur' },
        ],
        personNum: [
          { required: true, message: '清填写参加人数', trigger: 'blur' },
        ],
        plate: [
          { required: true, message: '请选择会议室', trigger: 'blur' },
        ],
     },
      addpersonRules:{
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator:checkEmail, trigger: 'blur'}
        ],
        telephone: [
          { required: true, message: '请输入手机', trigger: 'blur'},
          { validator:checkPhone , trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    ...mapMutations(['changeAvailableMeetingRooms']),
    onSubmit() {
      let st = this.form.startTime.replace(':','');
      let et = this.form.endTime.replace(':','')
      if (st>=et){
        this.$message.error('开始时间必须小于结束时间')
        return
      }
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.$store.commit ("changeParticipants", this.form.participants)
          this.$confirm ('是否预约会议？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then (() => {
            let st = this.form.date +' '+ this.form.startTime +":00"
            let et = this.form.date +' '+ this.form.endTime + ":00"
            let _form = JSON.parse(JSON.stringify(this.form))
            _form.startTime = st;
            _form.endTime   = et;
            _form.mrid = this.form.mrid
            delete _form.date
            delete _form.plate
            _form.mrid = _form.mrid.toString()
            _form.personNum = parseInt(_form.personNum)
            let _data = JSON.stringify(_form)
            this.axios.post('/meeting/bookMeeting',
                _data
            ).then(res=>{
              swal({
                title: '预约成功',
                icon: 'success',
                buttons: ["查看参会人员", "分享本次会议"],
              }).then(value=>{
                if (value){
                  this.shareUrl =  window.location.href.substr(0,window.location.href.lastIndexOf('/'))
                  this.shareUrl =  window.location.href.substr(0,window.location.href.lastIndexOf('/'))
                  this.shareUrl = this.shareUrl + '/addperson' + '?meid=' + res.data.meid
                  console.log (this.shareUrl)
                  swal({
                    title: '请复制链接分享会议',
                    text:this.shareUrl,
                    icon: 'success'
                  })
                }
              })
              this.$router.push ('/success')
            }).catch(()=>{
              this.$message.error('预约失败，请重试')
            })
          }).catch (() => {
            this.$message ({
              type: 'info',
              message: '已取消预定'
            });
          });
        } else {
          this.$message.error('表单内容不正确')
        }
      });
    },
    selectMrid(plate) {
        let rooms = this.$store.state.availableMeetingRooms
        for (let i = 0; i < rooms.length; i++) {
          if (plate === rooms[i].roomName) {
            this.form.mrid = rooms[i].mrid;
            break;
        }
      }
    },
    addNewperson(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false;
          let temp = JSON.parse(JSON.stringify(this.newperson))
          this.form.participants.push(temp)
          this.$message.success('添加成功')
        } else {
          this.$message.error('表单内容不正确')
          return false;
        }
      });
    },
    handleDelete(index){
      this.form.participants.splice(index,1)
      this.$message.success('删除成功')
    }
  },
  watch: {
    "form.startTime": function () {
      let st = this.form.date +' '+ this.form.startTime +":00"
      let et = this.form.date +' '+ this.form.endTime + ":00"
      if (this.form.endTime&&this.form.date) {
        this.axios.get('/meetingroom/getAvailableRooms',{
          params: {
            startTime : st,
            endTime   : et
          }
        }).then(res=>{
          this.changeAvailableMeetingRooms(res.data.meetingRooms);
        }).catch((error)=>{
          this.$message.error('请求可用会议室发生未知错误，落入catch')
          console.log (error)
        })
      }
    },
    "form.endTime": function () {
      let st = this.form.date +' '+ this.form.startTime +":00"
      let et = this.form.date +' '+ this.form.endTime + ":00"
      if (this.form.startTime&&this.form.date) {
        this.axios.get('/meetingroom/getAvailableRooms',{
          params: {
            startTime : st,
            endTime   : et
          }
        }).then(res=>{
          this.changeAvailableMeetingRooms(res.data.meetingRooms);
        }).catch((error)=>{
          this.$message.error('请求可用会议室发生未知错误，落入catch')
          console.log (error)
        })
      }
    },
    "form.date": function () {
      let st = this.form.date +' '+ this.form.startTime +":00"
      let et = this.form.date +' '+ this.form.endTime + ":00"
      if (this.form.startTime&&this.form.endTime) {
        this.axios.get('/meetingroom/getAvailableRooms',{
          params: {
            startTime : st,
            endTime   : et
          }
        }).then(res=>{
          this.changeAvailableMeetingRooms(res.data.meetingRooms);
        }).catch((error)=>{
          this.$message.error('请求可用会议室发生未知错误，落入catch')
          console.log (error)
        })
      }
    }
  },
  created() {
    this.changeAvailableMeetingRooms('')
    if (this.$route.query){
      this.form.plate = this.$route.query.roomName
      this.form.date = this.$route.query.date
      this.form.startTime = this.$route.query.startTime
      this.form.endTime = this.$route.query.endTime
      this.form.mrid = this.$route.query.mrid
    }
  }
}
</script>


<style scoped>
.addMeetingRoom{
  background-color: #eef1f7;
}
.el-form{
  box-sizing: content-box;
  padding: 2vh 0 2vh 10vw;
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
.choosed_par{
  position: relative;
}
.choosed{
  color: gray ;
  position: absolute;
  top: -8vh;
}
#person{
  display: inline-block;
}
.head {
  border: 1px solid rgb(119, 119, 119);
  width: 60px;
  height: 60px;
  box-sizing: border-box;
  margin-right: 20px;
  border-radius: 60px;
  display: flex;
  align-items: center;
}

#person .head img{
  margin: auto 0;
  height: 40px;
  width:  40px;
}
#person .text,
.addper .text{
  text-align: center;
  padding-right: 22px;
}
.addper{
  display: inline-block;
}
</style>

<style>
.swal-footer{
  text-align: center !important;
}
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
.addperson .el-button--primary{
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
.lastTime .el-form-item{
  display: inline-block;
  width: 40%;
}
.el-textarea__inner{
  background-color: #eef1f7 !important;
}
.addperson .el-button--primary{
  position: unset;
}
.addperson .el-button--primary:hover{
  background-color: #366cc9 !important;
}
.el-dialog .el-form,
.el-dialog .el-table{
  padding-left: 0 !important;
  margin: 0 0 0 0 !important;
  padding-right: 0 !important;
  width: 100% !important;
}
.subm .el-button--primary{
  background-color: #4c80db !important;
  width: 150px;
  border-radius: 30px !important;
  position: absolute;
  left: 20vw;
}
.el-form-item__error{
  padding-top: 0 !important;
  padding-left: 1vw;
}
.el-form-item__label:before{
  content:'' !important;
  margin-right: 0 !important;
}
</style>