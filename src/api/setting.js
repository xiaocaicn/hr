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
export function deleteRole(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}
