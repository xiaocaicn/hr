import request from '@/utils/request'
export function startProcess(data) {
  return request({
    url: `/user/process/startProcess`,
    data,
    method: 'post'
  })
}
