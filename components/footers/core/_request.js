import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL


const GET_CATEGORY_API = `${API_URL}/categories_list`


export function getCategory(){
    return axios.get(GET_CATEGORY_API)
    .then(response =>  response.data )
 }


 
 