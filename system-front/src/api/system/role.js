import request from '@/utils/request'

//常量  ES6写法
const api_name = '/admin/system/sysRole/'
export default {
    //根据用户id查询用户已分配的角色
getRolesByUserId(userId) {
    return request({
      url: `${api_name}/toAssign/${userId}`,
      method: 'get'
    })
  },
  //分配角色
  assignRoles(assginRoleVo) {
    return request({
      url: `${api_name}/doAssign`,
      method: 'post',
      data: assginRoleVo
    })
  },
    //列表
    getPageList(page,limit,searchObj){
        return request({
            //接口路径
            //url: '/admin/system/sysRole/'+page+"/"+limit,
            url:`${api_name}/${page}/${limit}`,
            //提交方式
            method: 'get',
            //提条的其他参数
            params:searchObj
          })
    },
    //删除
    removeId(id){
        return request({
            //接口路径
            //url: '/admin/system/sysRole/'+page+"/"+limit,
            url:`${api_name}/remove/${id}`,
            //提交方式
            method: 'delete',
          })
    },
    //添加
    saveRole(role){
        return request({
            //接口路径
            //url: '/admin/system/sysRole/'+page+"/"+limit,
            url:`${api_name}/save`,
            //提交方式
            method: 'post',
            //传递json数据
            data : role
          })
    },
    //根据id查询
    //添加
    getRole(id){
        return request({
            //接口路径
            url:`${api_name}/findRoleById/${id}`,
            //提交方式
            method: 'post',
          })
    },
    //修改的方法
    update(role){
        return request({
            //接口路径
            url:`${api_name}/update`,
            //提交方式
            method: 'post',
            data : role
          })
    },
    //批量删除
    batchRemove(idList){
        return request({
            //接口路径
            //url: '/admin/system/sysRole/'+page+"/"+limit,
            url:`${api_name}/batchRemove`,
            //提交方式
            method: 'delete',
            //传递json数据
            data : idList
          })
    }
}
