import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL


const GET_MY_CART = `${API_URL}/get-user-cart` 
const REMOVE_MY_CART = `${API_URL}/remove-cart` 
const POST_ORDER = `${API_URL}/order-save`
const GET_QNT =  `${API_URL}/quantity-update`


export function getMyCart(id){
    return axios.get(GET_MY_CART+'?user_id='+id)
    .then(response =>  response.data )
 }
 

 export function removeCart(id){
    return axios.get(REMOVE_MY_CART+'?cart_id='+id)
    .then(response =>  response.data )
 }
 

 export function PostOrder(body){
   return axios.post(POST_ORDER,body)
   .then(response =>  response.data )
}

export function getquantity(body){
   return axios.post(GET_QNT,body)
   .then(response =>  response.data )
}


