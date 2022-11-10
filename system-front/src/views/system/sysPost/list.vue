<template>
  <div class="app-container">
    <div class="search-div">
      <el-form label-width="70px" size="small">
        <el-row>
          <el-col :span="8">
            <el-form-item label="岗位名称">
              <el-input style="width: 95%" v-model="searchObj.name" placeholder="岗位名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="岗位编码">
              <el-input style="width: 95%" v-model="searchObj.postCode" placeholder="岗位编码"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="display:flex">
          <el-button type="primary" icon="el-icon-search" size="mini"  @click="fetchData()">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetData">重置</el-button>
        </el-row>
      </el-form>
    </div>

    <!-- 工具条 -->
    <div class="tools-div">
      <el-button type="success" icon="el-icon-plus" size="mini" :disabled="$hasBP('bnt.sysPost.add')  === false" @click="add">添 加</el-button>
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

      <el-table-column prop="name" label="岗位名称" width="180"/>
      <el-table-column prop="postCode" label="岗位编码" width="110"/>
      <el-table-column label="状态" width="80">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status === 1"
            @change="switchStatus(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" />

      <el-table-column label="操作"  align="center" fixed="right">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" :disabled="$hasBP('bnt.sysPost.update')  === false" @click="edit(scope.row.id)" title="修改"/>
          <el-button type="danger" icon="el-icon-delete" size="mini" :disabled="$hasBP('bnt.sysPost.remove')  === false" @click="removeDataById(scope.row.id)" title="删除" />
        </template>
      </el-table-column>
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
    <el-dialog title="添加/修改" :visible.sync="dialogVisible" width="40%" >
      <el-form ref="dataForm" :model="sysPost"  label-width="100px" size="small" style="padding-right: 40px;">
        <el-form-item label="岗位名称" prop="name">
          <el-input v-model="sysPost.name"/>
        </el-form-item>
        <el-form-item label="岗位编码" prop="postCode">
          <el-input v-model="sysPost.postCode"/>
        </el-form-item>
        <el-form-item label="岗位描述">
          <el-input
  type="textarea"
  :rows="4"
  placeholder="请输入内容"
  v-model="sysPost.description">
</el-input>
        </el-form-item>
        <el-form-item label="状态" prop="type">
          <el-radio-group v-model="sysPost.status">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="0">停用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small" icon="el-icon-refresh-right">取 消</el-button>
        <el-button type="primary" icon="el-icon-check" @click="saveOrUpdate()" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import api from '@/api/system/post'
export default {
  data(){
    return {
      listLoading: true, // 数据是否正在加载
      list: null, // banner列表
      total: 0, // 数据库中的总记录数
      page: 1, // 默认页码
      limit: 3, // 每页记录数
      searchObj: {}, // 查询表单对象
      dialogVisible: false,
      sysPost: {},
    }
  },
  created(){
    //调用列表方法
    this.fetchData()
  },
  methods:{
    //更改用户状态
    switchStatus(row){
      //判断，如果当前用户可用，修改禁用
      row.status=row.status===1?0:1
      api.updateStatus(row.id,row.status).then(response=>{
          //提示
          this.$message({
                type: 'success',
                message: '修改成功!'
          });
          this.fetchData()
      })
    },
    //删除
    removeDataById(id){
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //调用方法进行删除
          api.removeById(id).then(response=>{
            //提示
             this.$message({
                type: 'success',
                message: '删除成功!'
          });
          //刷新页面
          this.fetchData()
          })
         
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    //根据id查询，数据回显
    edit(id){
      //弹出框
      this.dialogVisible=true
      //调用接口查询
      api.getPostId(id).then(response=>{
        this.sysPost=response.data
      })
    },
    //添加或者修改
    saveOrUpdate(){
      if(!this.sysPost.id){
        this.save()
      }else{
        this.update()
      }
    },
    //修改方法
    update(){
      api.update(this.sysPost).then(response=>{
        //提示
          this.$message({
                type: 'success',
                message: '修改成功!'
          });
          //关闭弹框
          this.dialogVisible=false
          this.sysPost={}
          //刷新页面
          this.fetchData();
      })
    },
    //添加方法
    save(){
      api.save(this.sysPost).then(response=>{
        //提示
          this.$message({
                type: 'success',
                message: '添加成功!'
          });
          //关闭弹框
          this.dialogVisible=false
          this.sysPost={}
          //刷新页面
          this.fetchData();
      })
    },
    //添加弹框的方法
    add(){
        this.dialogVisible=true
        this.sysPost={}
    },
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