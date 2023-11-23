import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL

const GET_PLANSLIST = `${API_URL}/all-plans`
const GET_ADONSLIST = `${API_URL}/addons`
const POST_SUBSCRIPTION = `${API_URL}/plan-buy`
const GET_SUBSCRIPTION = `${API_URL}/plans_by_user`

export function getPlanList() {
    return axios.get(GET_PLANSLIST)   
    .then(respose => respose.data)
 }
 
 export function getAddonslist(id) {
    return axios.get(GET_ADONSLIST+'?'+id)
    .then(respose => respose.data)
 }
 
 export function buySubscriptio(body) {
    return axios.post(POST_SUBSCRIPTION,body)   
    .then(respose => respose.data)
 }
 
 export function getSubscription(id) {
    return axios.get(GET_SUBSCRIPTION+'/'+id)   
    .then(respose => respose.data)
 }