import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL

const GET_ORDERLIST = `${API_URL}/order-list`
const GET_MANAGEORDERS = `${API_URL}/ordered-products`
const GET_MASTERSTATUS = `${API_URL}/order-status`
const GET_UPDATESTATUS = `${API_URL}/order-status-change`
const GET_DETAILS = `${API_URL}/order-details`


export function getOrderList(id) {
    return axios.get(GET_ORDERLIST+'/'+id)   
    .then(respose => respose.data)
 }
 
 
export function getManageOrderList(id) {
    return axios.get(GET_MANAGEORDERS+'/'+id)   
    .then(respose => respose.data)
 }

export function getOrderDetails(id,sId) {
   return axios.get(GET_DETAILS+'/'+id+'?sellerId='+sId ?? '')   
   .then(respose => respose.data)
}

export function getMyOrderDetails(id,oId) {
   return axios.get(GET_DETAILS+'/'+id+"?orderDetailId="+oId)   
   .then(respose => respose.data)
}

export function getOrderStatus() {
    return axios.get(GET_MASTERSTATUS)   
    .then(respose => respose.data)
 }

 export function UpdateStatus(body) {
    return axios.post(GET_UPDATESTATUS,body)   
    .then(respose => respose.data)
 }