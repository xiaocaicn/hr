import request from '@/utils/request'

export function getEmployesSimple() {
  return request({
    url: '/sys/user/simple'
  })
}
