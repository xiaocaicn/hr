import request from '@/utils/request'

/**
 * 获取公司信息
 * **/
export function getCompanyInfo(companyId) {
  return request({
    url: `/company/${companyId}`
  })
}
export function getRoleList(params) {
  return request({
    url: '/sys/role',
    params
  })
}
// 删除员工信息
export function deleteRole(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}
// 更新员工信息
export function updataRole(data) {
  return request({
    url: `/sys/role/${data.id}`,
    method: 'put',
    data
  })
}
// 获取详细员工信息
export function getRoleDetail(id) {
  return request({
    url: `/sys/role/${id}`
  })
}
// 新增
export function addRole(data) {
  return request({
    url: '/sys/role',
    method: 'post',
    data
  })
}
// 给角色分配权限
export function assignPerm(data) {
  return request({
    url: '/sys/role/assignPrem',
    method: 'put',
    data
  })
}
