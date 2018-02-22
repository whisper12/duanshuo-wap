
import axios from 'axios';
export function fetch(url) {
  return new Promise((resolve, reject)=> {
    axios.get(url)
        .then(response => {
          resolve(response.data);
        })
  })
}

export function post(url,data,header){
  return new Promise((resolve, reject)=> {
    axios.post(url,data,{'headers':header})
        .then(response => {
          resolve(response.data);
        })
  })
}

// 章节api
export function get_by_seriesId(id) {
  return fetch(`/ppstory/story/get_by_seriesId?seriesId=${id}`);
}

export function get_element(id, page = 1, size = 10) {
  return fetch(`/ppstory/story/element?storyId=${id}&page=${page}&size=${size}`)
}

//热门故事
export function hot_story(){
  return fetch('/ppstory/story/hot')
}

//首页api
export function get_home(page,size){
  return fetch(`/ppstory/story/home?page=${page}&size=${size}`)
}

//首页目录
export function get_category(){
	return fetch('/ppstory/story/category')
}

//获取分类
export function get_series_by_category(id,page,size){
  return fetch(`/ppstory/story/get_series_by_category?categoryId=${id}&page=${page}&size=${size}`)
}

//搜索
export function get_search(key,page,size){
  return fetch(`/ppstory/story/search?keyword=${key}&page=${page}&size=${size}`)
}

//获取验证码
export function get_sms_code(phone){
  return fetch(`/ppstory/login/get_sms_code?mobile=${phone}`)
}

//验证验证码登录
export function validate_sms_code(phone,code,source) {
  let data=`mobile=${phone}&sms_code=${code}&source=2`
  let url = '/ppstory/login/validate_sms_code'
  let header = {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
  return post(url,data,header)
}


//获取个人信息
export function get_profile(){
	return fetch(`/ppstory/user/profile`)
}

//退出登录
export function logout(){
  return fetch('/ppstory/logout')
}

//上传阅读记录
export function upload_record(item){
  let url = '/ppstory/record/upload'
  let header = {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
  let data = 'stories=' + JSON.stringify(item)
  return post(url,data,header)
}