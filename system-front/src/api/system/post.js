import request from '@/utils/request'

const api_name = '/admin/system/sysPost'
export default {
    //列表
    getPageList(page,limit,searchObj){
        return request({
            //接口路径
            url:`${api_name}/${page}/${limit}`,
            //提交方式
            method: 'get',
            //提条的其他参数
            params:searchObj
          })
    },
    //添加
    save(post){
        return request({
            //接口路径
            url:`${api_name}/save`,
            //提交方式
            method: 'post',
            //提条的其他参数
            data:post
          })
    },
    //修改
    getPostId(id){
        return request({
            //接口路径
            url:`${api_name}/get/${id}`,
            //提交方式
            method: 'get'
          })
    },
    //修改
    update(post){
        return request({
            //接口路径
            url:`${api_name}/update`,
            //提交方式
            method: 'put',
            //提条的其他参数
            data:post
          })
    },
    //删除
    removeById(id){
        return request({
            //接口路径
            url:`${api_name}/remove/${id}`,
            //提交方式
            method: 'delete',
          })
    },
    //更改用户状态
    updateStatus(id,status){
        return request({
            //接口路径
            url:`${api_name}/updateStatus/${id}/${status}`,
            //提交方式
            method: 'get',
          })
    }
}