<template>
  <div class="app-container">
    <div class="search-div">
      <el-form label-width="70px" size="small">
        <el-row>
          <el-col :span="8">
            <el-form-item label="操作模块">
              <el-input style="width: 95%" v-model="searchObj.title" placeholder="操作模块"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="操作人">
              <el-input style="width: 95%" v-model="searchObj.operName" placeholder="操作人"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="display:flex">
          <el-button type="primary" icon="el-icon-search" size="mini"  @click="fetchData()">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetData">重置</el-button>
        </el-row>
      </el-form>
    </div>
	<!-- 列表 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      stripe
      border
      style="width: 100%;margin-top: 10px;">

      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="title" label="系统模块" width="100"/>
      <el-table-column prop="businessType" label="操作类型" width="110">
      </el-table-column>
      <el-table-column prop="requestMethod" label="请求方式" width="110"/>
      <el-table-column prop="operName" label="操作人员" width="80"/>
      <el-table-column prop="operIp" label="操作Ip" width="80" />
      <el-table-column prop="method" label="请求方法" />
      <el-table-column prop="operatorType" label="操作状态" width="110">
        <template v-slot="scope">
        <span v-if="scope.row.status === 0">失败</span>
        <span v-if="scope.row.status === 1">成功</span>
    </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" />
    </el-table>

    <!-- 分页组件 -->
    <el-pagination
      :current-page="page"
      :total="total"
      :page-size="limit"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="fetchData"
    />
  </div>
</template>
<script>
import api from '@/api/system/operLogin'
export default {
  data(){
    return {
      listLoading: true, // 数据是否正在加载
      list: null, // banner列表
      total: 0, // 数据库中的总记录数
      page: 1, // 默认页码
      limit: 8, // 每页记录数
      searchObj: {} // 查询表单对象
    }
  },
  created(){
    //调用列表方法
    this.fetchData()
  },
  methods:{
    //列表
    fetchData(page=1){
        this.page=page
        api.getPageList(this.page,this.limit,this.searchObj).then(response=>{
          this.listLoading=false
          this.list = response.data.records
          this.total = response.data.total
        })
    },
    // 重置查询表单
    resetData() {
      console.log('重置查询表单')
      this.searchObj = {}
      this.fetchData()
    }
    
  }
}
</script>