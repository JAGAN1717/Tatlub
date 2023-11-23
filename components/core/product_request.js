import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_API_URL

const GET_PRODUCT_DETAIL_API=`${API_URL}/products`
const GET_ITEMS_DETAIL_API=`${API_URL}/items-details`
const SAVE_PRODUCT_DATA = `${API_URL}/products-save`
const UPADTE_PRODUCT = `${API_URL}/products-update`
const DELETE_PRODUCT = `${API_URL}/products-delete`
const ADD_TO_CART = `${API_URL}/add-to-cart`

export function getPRoductDetail(id) {
   return axios.get(GET_PRODUCT_DETAIL_API+'/'+id)   
   .then(respose => respose.data)
}

export function getitemsDetail(id) {
   return axios.get(GET_ITEMS_DETAIL_API+'/'+id)   
   .then(respose => respose.data)
}

export function SaveProduct(body) {
   return axios.post(SAVE_PRODUCT_DATA,body)   
   .then(respose => respose.data)
}

export function UpdateProduct(id,body) {
   return axios.post(UPADTE_PRODUCT+'/'+id,body)   
   .then(respose => respose.data)
}

export function DeleteProduct(id) {
   return axios.post(DELETE_PRODUCT+'/'+id)   
   .then(respose => respose.data)
}

export function addToCart(body) {
   return axios.post(ADD_TO_CART,body)   
   .then(respose => respose.data)
}