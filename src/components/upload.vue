<template>
  <div id="uploa">
    <div class="wrapper" style="z-index: 5;" v-show="flag"></div>
    <el-table
        border
        height="65vh"
        stripe
        :data="meetings"
        style="width: 100%">
      <el-table-column
          prop="roomName"
          label="会议室"
      >
      </el-table-column>
      <el-table-column
          prop="location"
          label="地点">
      </el-table-column>
      <el-table-column
          prop="floor"
          label="楼层">
      </el-table-column>
      <el-table-column
          prop="plateNum"
          label="门牌号">
      </el-table-column>
      <el-table-column
          label="文件">
        <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium" @click="showDialog(scope.$index)">查看详情</el-tag>
            </div>
          <input type="file" :name="'upload' + scope.$index" :id="'upload' + scope.$index" style="display: none" @change="addFile($event,scope.row)" multiple="multiple" />
          <div class="upload">
          <img src="../static/add.png" @click="myClick(scope.$index)" alt="">
          </div>
          <el-dialog :modal="false" @close="close" :key="unuse" title="文件详情" :visible.sync ="vis[scope.$index]">
            <el-table :data="meetingRoomsFiles[scope.$index]" max-height="400">
              <el-table-column property="name" label="文件名称" width="550"></el-table-column>
              <el-table-column property="telephone" width="160" label="操作">
                <template slot-scope="scopeIn" >
                  <el-button
                      size="mini"
                      type="success"
                      @click="handleDownload(scopeIn.$index, scopeIn.row)">下载</el-button>
                  <el-button
                      size="mini"
                      type="danger"
                      @click="handleDelete(scopeIn.$index, scopeIn.row ,scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name:'notice',
  data() {
    return {
      dialogTableVisible:false,
      meetings:[],
      fileList:[],
      vis:[],
      op:0,
      unuse:1,
      flag:false,
      meetingRoomsFiles:[],
      uploadFile:{
        mrid:'',
        multipartFiles:'',
      }
    }
  },
  methods:{
    close(){
      this.flag = false
    },
    showDialog(index){
      this.vis[index] = true
      this.unuse++;
      this.flag = true
    },
    myClick(index){
      let str = 'upload'+index
      document.getElementById(str).click()
    }
    ,
    addFile(e,row){
      this.fileList = e.target.files
      if (this.fileList.length === 0)
        return
      for (let i = 0;i<this.fileList.length;i++){
      let formData = new FormData()
      formData.append('mrid',row.mrid)
      formData.append('multipartFiles', this.fileList[i])
        console.log (this.fileList[i])
      let config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        onUploadProgress: (progressEvent) => {
          this.pro = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        }
      }
      this.axios.post('/meetingroom/addFiles', formData, config)
      .then((res)=>{
        if(res.data.state === true){
        this.$message.success('上传' + this.fileList[i].name  + '成功')
        this.axios.get('/meetingroom/getAll')
            .then(res=>{
              this.meetingRoomsFiles = [];
              this.meetings = res.data.meetingRooms
              for (let i = 0;i<this.meetings.length ;i++){
                this.meetingRoomsFiles.push(this.meetings[i].meetingRoomFiles)
                for (let j = 0;j<this.meetingRoomsFiles[i].length;j++){
                  this.meetingRoomsFiles[i][j].name = this.meetingRoomsFiles[i][j].url.substr(this.meetingRoomsFiles[i][j].url.lastIndexOf('/')+1)
                }
              }
            })
            .catch(error=>{
              this.$message.error(error + ',发生未知错误,请联系管理员')
            })
      }
            else{
              this.$message.error('上传失败，请重试')
        }
      })
      .catch(error=>{
        console.log (error)
        this.$message.error('上传' + this.fileList[i].name + '失败,' + error + '请重试' )
      })
    }},
    handleDownload(index,row){
      window.open('http://'+row.url)
    },
    handleDelete(index, row ,indexOut) {
      let data = JSON.stringify({mrfid:row.mrfid})
      this.$confirm ('是否删除文件？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then (() => {
            this.axios.post('/meetingroom/deleteFile', data)
                .then(res=>{
                  if (res.data.state != false) {
                    this.$message.success ('删除成功')
                    this.meetingRoomsFiles[indexOut].splice(index,1)
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
  mounted() {
    this.meetingRoomsFiles = []
    this.axios.get('/meetingroom/getAll')
        .then(res=>{
          this.meetings = res.data.meetingRooms
          for (let i = 0;i<this.meetings.length ;i++){
            this.vis[i] = false
            this.meetingRoomsFiles.push(this.meetings[i].meetingRoomFiles)
            for (let j = 0;j<this.meetingRoomsFiles[i].length;j++){
              this.meetingRoomsFiles[i][j].name = this.meetingRoomsFiles[i][j].url.substr(this.meetingRoomsFiles[i][j].url.lastIndexOf('/')+1)
            }
          }
        })
        .catch(error=>{
          this.$message.error(error + ',发生未知错误,请联系管理员')
        })
  },
  watch:{

  }
}
</script>

<style scoped>
#uploa .name-wrapper{
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
.wrapper{
  background-color: rgba(0,0,0,0.5);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  margin: 0;
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
.el-dialog .el-form,
.el-dialog .el-table{
  padding-left: 0 !important;
  margin: 0 0 0 0 !important;
  padding-right: 0 !important;
  width: 100% !important;
  z-index: 2018 !important;
}
</style>