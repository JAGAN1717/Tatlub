import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL


const GET_LOGIN_API=`${API_URL}/user/login`
const EMAIL_LOGIN=`${API_URL}/login-signup`
const OTP_LOGIN=`${API_URL}/send-otp`
const REGISTER_API=`${API_URL}/user/register`
const OTP_VERIFICATION_API=`${API_URL}/user/otp-check`
const GET_LANGUAGES = `${API_URL}/languages`
const LOGIN_WITH_PHONE = `${API_URL}/sms`
const EMAIL_LOGIN_REGISTER=`${API_URL}/login-or-register`
const ADD_ADDRESS = `${API_URL}/add-address`
const GET_ADDRESS = `${API_URL}/user-address`
const EDIT_ADDRESS = `${API_URL}/edit-address`

export function getLogin(phone){
  return axios.post(GET_LOGIN_API, phone)
  .then(response => response.data)
}

export function mailLogin(data){
  return axios.post(EMAIL_LOGIN, data)
  .then(response => response.data)
}

export function otpLogin(data){
  return axios.post(OTP_LOGIN, data)
  .then(response => response.data)
}

export function mailLoginregister(data){
  return axios.post(EMAIL_LOGIN_REGISTER, data)
  .then(response => response.data)
}

export function postRegister(body){
  return axios.post(REGISTER_API, body)
  .then(response => response.data)
}

export function postOTPCheck(body){
  return axios.post(OTP_VERIFICATION_API, body)
  .then(response => response.data)
}

export function getLanguages(){
  return axios.get(GET_LANGUAGES)
  .then(response => response.data)
}

export function loginWithMobile(phone){
  return axios.get(LOGIN_WITH_PHONE+'?phone='+phone)
  .then(response => response.data)
}

export function PostAddress(id,body){
  return axios.post(ADD_ADDRESS+'/'+id,body)
  .then(response => response.data)
}

export function GetAddress(id){
  return axios.get(GET_ADDRESS+'/'+id)
  .then(response => response.data)
}

export function EditAddress(id,body){
  return axios.post(EDIT_ADDRESS+'/'+id,body)
  .then(response => response.data)
}
