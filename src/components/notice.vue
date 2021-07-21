<template>
  <div id="notice">
    <el-table
        border
        height="65vh"
        stripe
        :data="meetings"
        style="width: 100%">
      <el-table-column
          prop="meetingName"
          label="会议名称"
      >
      </el-table-column>
      <el-table-column
          prop="roomName"
          label="会议室">
      </el-table-column>
      <el-table-column
          prop="Time"
          label="申请时间">
      </el-table-column>
      <el-table-column
          prop="participants.length"
          label="参会人数">
      </el-table-column>
      <el-table-column label="通知状态">
        <template slot-scope="scope">
          <div v-if="(Date.parse(scope.row.startTime) - nowTime)<=1800000">
            <img  src="../static/normal.png" alt="">已通知
          </div>
          <div v-if="(Date.parse(scope.row.startTime) - nowTime)>1800000">
            <img  src="../static/error.png" alt="">未通知
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="text">注:会议通知在会议开始前30分钟发出</div>
  </div>
</template>

<script>
export default {
  name: 'myMeeting',
  data() {
    return {
      nowTime:'',
      meetings: []
    }
  },
  methods: {
    handleDelete(index, row) {
      this.$confirm ('是否删除会议室？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then (() => {
            this.axios.post('/meeting/delete',{meid:row.meid})
                .then(res=>{
                  if (res.data.state != false) {
                    this.meetings.splice(index,1)
                    this.$message.success ('删除成功')
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
    this.nowTime = Date.parse(new Date())
    this.axios.get('/meeting/getAllMeetings')
        .then(res=>{
          this.meetings = res.data.meetings
          for (let i = 0;i<this.meetings.length ;i++){
            this.meetings[i].Time = this.meetings[i].startTime.substring(0,10) + '\n' + this.meetings[i].startTime.substring(11,16) + '-' +  this.meetings[i].endTime.substring(11,16)
          }
        })
        .catch(error=>{
          this.$message.error(error + ',发生未知错误,请联系管理员')
        })
  }
}
</script>

<style scoped>
#notice .name-wrapper{
  display: inline-block;
}
.upload{
  display: inline-block;
  margin-left: 0.5vw;
  position: relative;
  top: 0.8vh;
}
.upload:hover{
  box-shadow: skyblue 0 0 10px;
  transition: 0.5s;
}
.upload img{
  display: inline-block;
  width: 20px;
  height: 20px;
}
#notice img{
  display: inline-block;
  width: 30px;
  height: 30px;
  position: relative;
  top: 8px;
}
#notice .text{
  color: blue;
  position: absolute;
  left: 25vw;
}
</style>

<style>
.el-tag--medium{
  display: inline-block !important;
}
.cell{
  font-weight: bolder !important;
  color: black !important;
  text-align: center !important;
}
.el-table{
  width: 80% !important;
  margin-left: 10vw;
  margin-top: 5vh;
  box-shadow: 0 0 10px skyblue;
}
.is-leaf,
.gutter{
  background: #FAFAFA !important;
}

.el-table .cell {
  white-space: pre-line !important;
}
</style>