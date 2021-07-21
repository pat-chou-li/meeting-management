<template>
  <div id="record">
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
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="success"
              @click="handleShare(scope.$index, scope.row)">分享</el-button>
          <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">取消</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import swal from "sweetalert";

export default {
  name: 'myMeeting',
  data() {
    return {
      meetings: []
    }
  },
  methods: {
    handleShare(index,row){
      this.shareUrl =  window.location.href.substr(0,window.location.href.lastIndexOf('/'))
      this.shareUrl =  window.location.href.substr(0,window.location.href.lastIndexOf('/'))
      this.shareUrl = this.shareUrl + '/addperson' + '?meid=' + row.meid
      swal({
        title: '请复制链接分享会议',
        text:this.shareUrl,
        icon: 'success'
      })
    },
    handleDelete(index, row) {
      this.$confirm ('是否删除会议？', '提示', {
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
  },
  // activated() {
  //   this.axios.get('/meeting/getAllMeetings')
  //       .then(res=>{
  //         console.log (res.data)
  //         this.meetings = res.data.meetings
  //         for (let i = 0;i<this.meetings.length ;i++){
  //           this.meetings[i].Time = this.meetings[i].startTime.substring(0,10) + '\n' + this.meetings[i].startTime.substring(11,16) + '-' +  this.meetings[i].endTime.substring(11,16)
  //         }
  //       })
  //       .catch(error=>{
  //         this.$message.error(error + ',发生未知错误,请联系管理员')
  //       })
  // }
}
</script>

<style scoped>
#record .name-wrapper{
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