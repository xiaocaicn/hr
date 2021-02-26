import request from '@/utils/request'

// 获取department页面的数据
export function getDepartments() {
  return request({
    url: '/company/department'
  })
}
export function delDepartments(id) {
  return request({
    url: '/company/department/' + id,
    method: 'delete'
  })
}
export function addDepartments(id) {
  return request({
    url: '/company/department',
    method: 'post'
  })
}
