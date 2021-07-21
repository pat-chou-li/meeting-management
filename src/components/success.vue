<template>
  <div id="success">
    <el-table
        border
        height="65vh"
        stripe
        :data="this.$store.state.participants"
        style="width: 100%">
      <el-table-column
          prop="name"
          label="姓名"
          width="180">
      </el-table-column>
      <el-table-column
          prop="email"
          label="电子邮件">
      </el-table-column>
      <el-table-column
          prop="telephone"
          label="电话号码">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  }
}
</script>

<style>
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
</style>