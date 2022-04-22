import request from '@/utils/request'

export function findAll() {
  return request({
    url: '/classRoom/findAll',
    method: 'get'
  })
}

export function add(data) {
  return request({
    url: '/classRoom/add',
    method: 'post',
    data
  })
}

export function remove(id) {
  return request({
    url: '/classRoom/remove/' + id,
    method: 'delete'
  })
}

export function update(data) {
  return request({
    url: '/classRoom/update',
    method: 'put',
    data
  })
}
