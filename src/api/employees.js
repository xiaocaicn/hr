import request from '@/utils/request'

export function getEmployesSimple() {
  return request({
    url: '/sys/user/simple'
  })
}
export function getEmployesList(params) {
  return request({
    url: '/sys/user',
    params
  })
}
/**
 * 删除员工接口
 * ****/

export function delEmployee(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}
/** **
 *  新增员工的接口
 * **/
export function addEmployee(data) {
  return request({
    method: 'post',
    url: '/sys/user',
    data
  })
}
