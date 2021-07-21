<template>
  <div id="check">
    <div id="top">
      <div class="item timing">
      <div class="text">查询时间:</div>
      <el-date-picker
          v-model="form.date"
          type="date"
          id="dat"
          value-format="yyyy-MM-dd"
          placeholder="选择日期">
      </el-date-picker>
    <div class="lastTime" >
        <el-time-select
            placeholder="起始时间"
            v-model="form.startTime"
            :picker-options="{
      start: '00:00',
      step: '00:30',
      end: '24:00'
    }">
        </el-time-select>
      <div class="text text2">至</div>
        <el-time-select
            placeholder="结束时间"
            v-model="form.endTime"
            :picker-options="{
      start: '00:00',
      step: '00:30',
      end: '24:00'
    }">
        </el-time-select>
    </div>
      </div>
        <div class="item">
      <div class="text ele">设备:</div>
      <el-checkbox-group v-model="form.equipment">
        <el-checkbox-button label="摄像头" name="type"></el-checkbox-button>
        <el-checkbox-button label="投影仪" name="type"></el-checkbox-button>
        <el-checkbox-button label="网络" name="type"></el-checkbox-button>
        <el-checkbox-button label="白板" name="type"></el-checkbox-button>
        <el-checkbox-button label="电视" name="type"></el-checkbox-button>
      </el-checkbox-group>
      </div>
        <div class="item">
          <div class="text">状态:</div>
          <el-radio-group v-model="form.state">
            <el-radio-button label="可用"></el-radio-button>
            <el-radio-button label="不可用"></el-radio-button>
          </el-radio-group>
        </div>
        <div class="item">
          <div class="text">可容纳人数:</div>
          <input id="capa" type="text" v-model="form.capacity">
          <div class="text">人</div>
        </div>
  </div>
    <div class="bottom">
      <el-table
          :data="this.$store.state.nowMeetingRooms"
          style="width: 100%"
          max-height="350">
        <el-table-column
            label="楼层"
            prop="floor">
        </el-table-column>
        <el-table-column
            label="会议室"
            prop="roomName">
        </el-table-column>
        <el-table-column
            label="会议室状态"
            prop="state">
        </el-table-column>
        <el-table-column
            label="设备状态"
            prop="equipmentState">
        </el-table-column>
        <el-table-column
            width="300"
            align="right">
          <template slot-scope="scope" id="edit" >
            <el-button
                size="mini"
                type="info"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            <el-button
                size="mini"
                type="success"
                @click="handleReserve(scope.$index, scope.row)">预约</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  name: "checkMeetingRoom",
  data(){
    return{
      form:{
        date:'',
        startTime:'00:00',
        endTime:'24:00',
        equipment:[],
        state:'可用',
        capacity:'1'
      }
    }
  },
  methods:{
    ...mapMutations(['changeNowMeetingRooms','deleteNowMeetingRooms']),
    handleReserve(index, row) {
      this.$router.push({path:'/reserveMeetingRoom',
        query:{
          roomName:row.roomName,
          date:this.form.date,
          startTime:this.form.startTime,
          endTime:this.form.endTime,
          mrid:row.mrid
        }})
    },
    handleEdit (index){
      let mrid3 = this.$store.state.nowMeetingRooms[index].mrid
      var row2;
      this.axios.get('/meetingroom/getById',{params:{
        mrid:mrid3
      }}).then(res=>{
        row2 = res.data.meetingRoom
        this.$router.push({path:'/changeMeetingRoom',
          query:{
            mrid:row2.mrid,
            roomName: row2.roomName,
            location: row2.location,
            floor: row2.floor,
            plateNum: row2.plateNum,
            equipment: row2.equipment,
            equipmentState: row2.equipmentState,
            capacity: row2.capacity,
            state: row2.state,
            description : row2.description
          }})
      }).catch(()=>{
        this.$message.error('编辑失败，请重试')
      })
    },
    handleDelete(index, row) {
      this.$confirm ('是否删除会议室？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then (() => {
            this.axios.post('/meetingroom/delete',{mrid:row.mrid})
                .then(res=>{
                  if (res.data.state != false) {
                    this.$message.success ('删除成功')
                    this.deleteNowMeetingRooms(row.mrid)
                  }
                  else if (res.data.msg == "不是管理员，不具有该权限"){
                    this.$message.error("不是管理员，不具有该权限");
                  }else{
                    this.$message.error("会议室不存在")
                  }
                })
                .catch(error=>{
                  this.$message.error(error + ",请联系管理员")
                })
          }
        )
          .catch (() => {
        this.$message ({
          type: 'info',
          message: '已取消'
        });
      });
    }
  },
  created() {
    this.changeNowMeetingRooms({form:this.form,rooms:[]});
    var now = new Date();
    this.form.date = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())).toISOString().slice(0, 10);
  },
  activated(){
    let st = this.form.date + ' ' + this.form.startTime + ":00"
    let et = this.form.date + ' ' + this.form.endTime + ":00"
    this.axios.get ('/meetingroom/getAvailableRooms',{
      params:{
        startTime : st,
        endTime   : et
      }
    }).then(res=>{
      for (let i = 0;i<res.data.meetingRooms.length;i++){
        if (res.data.meetingRooms[i].state == 1){
          res.data.meetingRooms[i].state = "可用"
        }else{
          res.data.meetingRooms[i].state = "不可用"
        }
        if (res.data.meetingRooms[i].equipmentState == 1){
          res.data.meetingRooms[i].equipmentState = "可用"
        }else{
          res.data.meetingRooms[i].equipmentState = "停用"
        }
      }
      this.changeNowMeetingRooms({form:this.form, rooms:res.data.meetingRooms})
    })
  },
  watch:{
    form:{
      handler() {
        if (this.form.equipment.length >= 0 && this.form.capacity != '') {
          let st = this.form.date + ' ' + this.form.startTime + ":00"
          let et = this.form.date + ' ' + this.form.endTime + ":00"
          this.axios.get ('/meetingroom/getAvailableRooms',{
            params:{
              startTime : st,
              endTime   : et
            }
          }).then(res=>{
            for (let i = 0;i<res.data.meetingRooms.length;i++){
              if (res.data.meetingRooms[i].state == 1){
                res.data.meetingRooms[i].state = "可用"
              }else{
                res.data.meetingRooms[i].state = "不可用"
              }
              if (res.data.meetingRooms[i].equipmentState == 1){
                res.data.meetingRooms[i].equipmentState = "可用"
              }else{
                res.data.meetingRooms[i].equipmentState = "停用"
              }
            }
            this.changeNowMeetingRooms({form:this.form,rooms:res.data.meetingRooms})
          })
        }
      },
      deep:true
    }
  }
}
</script>

<style scoped>
#top{
  background: white;
  width: 68vw;
  padding-bottom: 3vh;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.4);
  margin: 0 auto;
  position: relative;
  top: 3vh;
}
.timing{
  width: 100%;
}
.text2{
  padding-left: 0 !important;
  padding-right: 4vw !important;
}
.item{
  width: 100%;
  padding-top: 0.5vh;
}
.text{
  display: inline-block;
  padding-left: 1vw;
  padding-right: 3vw;
  height: 100%;
}
.ele{
  height: 30px !important;
  top: 4px;
  position: relative;
}
</style>

<style>
#check .el-input__inner,
#check .el-date-editor.el-input{
  background: white !important;
  display: inline-block;
  height: 30px;
  width: 10vw;
}
#check #dat{
  width: 10vw;
}
#check #top .lastTime{
  display: inline-block;
}
#check #top .el-checkbox-button__inner,
#check #top .el-radio-button__inner{
  display: inline-block !important;
  width: 110px !important;
  height: 30px !important;
  line-height: 5px !important;
  background-color: #dee6f5 ;
  margin-left: 20px !important;
  border-radius: 30px !important;
}
#check #top .el-checkbox-group{
  display: inline-block;
}
#capa{
  border: none;
  border-bottom: #4c80db 1px solid !important;
  outline: none;
  width: 100px;
}
#check .el-table{
 margin: 0 auto !important;
  top: 5vh;
}
#check .el-input__icon{
  line-height: 0 !important;
}
#check .el-checkbox-button.is-checked .el-checkbox-button__inner,
#check .el-radio-button__orig-radio:checked+.el-radio-button__inner{
  background-color: #4c80db !important;
}
</style>