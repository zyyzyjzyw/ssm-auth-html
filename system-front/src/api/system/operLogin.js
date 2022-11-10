import request from '@/utils/request'

const api_name = '/admin/system/sysOperLog'
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
    }
}