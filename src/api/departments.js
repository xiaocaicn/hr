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
export function addDepartments(data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}
export function updataDepartments(data) {
  return request({
    url: '/company/department/' + data.id,
    method: 'put',
    data
  })
}
export function getDepartmentsDetail(id) {
  return request({
    url: '/company/department/' + id
  })
}
