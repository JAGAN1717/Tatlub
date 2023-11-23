import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL


const GET_USER_SEARCH_LIST=`${API_URL}/user_search` 
const GET_SELLER_MAIL =`${API_URL}/seller_email_against_item` 
const SUGGESTIONS = `${API_URL}/get-items` 
const POST_REQUIRMENT  = `${API_URL}/post-your-requirements` 
const POPULAR_SEARCH  = `${API_URL}/popular-search` 
// const DETELE_TIME = `${API_URL}/delete-listing-timings` 

// export function deletetime(id){
//   return axios.get(DETELE_TIME+'/'+id)
//   .then(response => response.data)
// }

export function getUserSearchList(body){
    return axios.post(GET_USER_SEARCH_LIST, body)
    .then(response => response.data)
  }

  export function getSellerMail(lisytingId){
    return axios.get(GET_SELLER_MAIL+"?id="+lisytingId)
    .then(response => response.data)
  }

  export function getPopularSearch(){
    return axios.get(POPULAR_SEARCH)
    .then(response => response.data)
  }

  export function getSuggestions(){
    return axios.get(SUGGESTIONS)
    .then(response => response.data)
  }

  export function postRequirement(body){
    return axios.post(POST_REQUIRMENT,body)
    .then(response => response.data)
  }
