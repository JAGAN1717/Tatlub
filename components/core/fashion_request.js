import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL


 const GET_CATEGORY_API = `${API_URL}/categories_list`
 const GET_MAIN_CATEGORY_API = `${API_URL}/homepage-main-categories`
 const GET_PRODUCT_CATEGORY_API = `${API_URL}/products-against-cat`
 const GET_FAV_API = ``
 const GET_BRAND_APi =`${API_URL}/brands`
 const GET_POPULOR_PRODUCT_API =`${API_URL}/products/featured`
 const GET_HOME_BANNER = `${API_URL}/home-page-banners`
 const GET_HOME_PAGE_SEC = `${API_URL}/home-page-section-banners`
 const GET_POPULAR_PRODUCTC = `${API_URL}/popular-products`
 const GET_RECOMMENDED_PRODUCTC = `${API_URL}/recommended-products`
 const GET_RECENT_ACTIVITY = `${API_URL}/recent-activity`
 const GET_TRENDING_PROPERTY = `${API_URL}/trending-projects`
 const GET_RECOMMENDED_PROPERTY = `${API_URL}/recommended-properties`
 const GET_SOCIAL_MEDIA_LINKS = `${API_URL}/social-media`
 const GET_SEARCH_LIST = `${API_URL}/search`
 const GET_CUSTOMER_VIDEOS = `${API_URL}/videos-list`
 const GET_SUBCATEGORY = `${API_URL}/all-subcategories`
 const ADD_TO_CART = `${API_URL}/add-to-cart`
 const CLAIM_BUSSINESS = `${API_URL}/claim-business`
 const SENDOTP_BUSSINESS = `${API_URL}/otp-send`

 
export function getCategory(){
   return axios.get(GET_CATEGORY_API)
   .then(response => response.data )
}

export function getMainCategory(){
   return axios.get(GET_MAIN_CATEGORY_API)
   .then(response => response.data )
}

export function getProductCategory(){
   return axios.get(GET_PRODUCT_CATEGORY_API)
   .then(response => response.data )
}

export function getAddToCart(body) {
   return axios.post(ADD_TO_CART, body)
   .then(response => response.data )
}

export function getSubcategory(){
    return axios.get(GET_SUBCATEGORY)
    .then(response => response.data )
 } 

export function getfav(){
   return axios.get(GET_FAV_API)
   .then(response => response.data )
}

export function getBrand(){
    return axios.get(GET_BRAND_APi)
    .then(response => response.data)
}

export function getBanners(){
    return axios.get(GET_HOME_BANNER)
    .then(response => response.data)
}

export function getSection(){
    return axios.get(GET_HOME_PAGE_SEC)
    .then(response => response.data)
}

export function getPopular(){
    return axios.get(GET_POPULAR_PRODUCTC)
    .then(response => response.data)
}

export function getRecommended(){
    return axios.get(GET_RECOMMENDED_PRODUCTC)
    .then(response => response.data)
}

export function getRecentActivity(){
    return axios.get(GET_RECENT_ACTIVITY)
    .then(response => response.data)
}

export function getTrendingProperty(){
    return axios.get(GET_TRENDING_PROPERTY)
    .then(response => response.data)
}

export function getRecommendedProperty(){
    return axios.get(GET_RECOMMENDED_PROPERTY)
    .then(response => response.data)
}

export function getSocialmedia(){
    return axios.get(GET_SOCIAL_MEDIA_LINKS)
    .then(response =>  response.data )
 }


export function getSearchlist(trans){
    return axios.get(GET_SEARCH_LIST+'?search='+trans)
    .then(response =>  response.data )
}

export function getSearchProductlist(trans){
    return axios.get(GET_SEARCH_LIST+'?search='+trans+'&product=1')
    .then(response =>  response.data )
}

export function getCustomerVideo(){
    return axios.get(GET_CUSTOMER_VIDEOS)
    .then(response =>  response.data )
}

export function PostClaimBussiness(body){
    return axios.post(CLAIM_BUSSINESS,body)
    .then(response =>  response.data )
}

export function PostSendOtp(body){
    return axios.post(SENDOTP_BUSSINESS,body)
    .then(response =>  response.data )
}