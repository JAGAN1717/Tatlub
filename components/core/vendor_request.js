import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL


 const GET_SELLER_PROFILE = `${API_URL}/seller-profile`
 const POST_REVIEW_FOR_SELLER = `${API_URL}/review-for-seller`
 const POST_REVIEW_FOR_ITEMS = `${API_URL}/review-for-seller`
 const GET_REVIEW_FOR_SELLER = `${API_URL}/get-review`
 const GET_ABOUT_US = `${API_URL}/about-us`
 const POST_FEEDBACK = `${API_URL}/feedback`
 const GET_SELLER_CATEGORY = `${API_URL}/seller-categories`
 const NOT_FOUND_FORM = `${API_URL}/not-found-form`
 const POST_ENQUIRY = `${API_URL}/enquiry-form`
 const GET_ENQUIRY = `${API_URL}/get-user-quotes`
 const GET_LEAD_LIST = `${API_URL}/leads`
 const GET_LEAD_FILTER = `${API_URL}/filter-lead`


 export function getSellerProfile(id){
    return axios.get(GET_SELLER_PROFILE+'/'+id)
    .then(response =>  response.data )
 }

 export function reviewForSeller(review){
   return axios.post(POST_REVIEW_FOR_SELLER,review)
   .then(response =>  response.data )
}

export function reviewForItems(review){
   return axios.post(POST_REVIEW_FOR_ITEMS,review)
   .then(response =>  response.data )
}

export function getReview(id,sort){
   return axios.get(GET_REVIEW_FOR_SELLER+'?id='+id+'&high='+sort)
   .then(response =>  response.data )
}

export function getAboutus(){
   return axios.get(GET_ABOUT_US)
   .then(response =>  response.data)
}

export function postFeedback(body){
   return axios.post(POST_FEEDBACK,body)
   .then(response =>  response.data)
}

export function getSellerCtegory(id){
   return axios.get(GET_SELLER_CATEGORY+'/'+id)
   .then(response =>  response.data )
}

export function PostNotFondForm(body){
   return axios.post(NOT_FOUND_FORM,body)
   .then(response =>  response.data )
}

export function postEnquiry(body){
   return axios.post(POST_ENQUIRY,body)
   .then(response =>  response.data )
}

export function getEnquiry(id){
   return axios.get(GET_ENQUIRY+'?user_id='+id)
   .then(response =>  response.data )
}

export function getLeadslist(id,start,end){
   return axios.get(GET_LEAD_LIST+'/'+id+`?startDate=${start ?? ''}&endDate=${end ?? ''}`)
   .then(response =>  response.data )
}

export function getFilteredlead(id,body){
   return axios.post(GET_LEAD_FILTER+'/'+id,body)
   .then(response =>  response.data )
}