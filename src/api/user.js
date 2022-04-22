import request from '@/utils/request'
import qs from 'qs'
import Cookies from 'js-cookie'
export function login(data) {
  return request({
    headers: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
    url: '/login',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get'
    // params: { token }
  })
}

export function logout() {
  let url = '/logout'
  const isSaml = Cookies.get('saml-login') | false
  if (isSaml) {
    url = 'saml/logout'
  }
  Cookies.set('saml-login', false)
  return request({
    url: url,
    method: 'get'
  })
}

export function findAll() {
  return request({
    url: '/user/list',
    method: 'get'
  })
}

export function remove(id) {
  return request({
    url: '/user/remove/' + id,
    method: 'delete'
  })
}

export function add(data) {
  return request({
    url: '/user/add',
    method: 'post',
    data
  })
}
