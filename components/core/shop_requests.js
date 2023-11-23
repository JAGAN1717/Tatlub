import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL

const GET_ABOUT_US_API = `${API_URL}/about-us`
const GET_ITEMS_LIST = `${API_URL}/all-items`
const GET_ITEMS_BY_CATEGORY_LIST = `${API_URL}/get-items-by-category`
const GET_ITEMS_BY_BRAND_LIST = `${API_URL}/listings_against_brands`
const GET_PRODUCT_BY_BRAND_LIST = `${API_URL}/products-against-brands`
const GET_PRODUCT_BY_CATEGORY_LIST = `${API_URL}/products-against-categories`
const POST_LISTING = `${API_URL}/listing-save`
const LISTING_CUSTOM_FIELD = `${API_URL}/load-listing-form`
const GET_MY_BUSSINESS = `${API_URL}/my-bussiness`
const GET_ITEMS_DETAILS = `${API_URL}/items-details`
const UPDATE_LISTING_DATA = `${API_URL}/user-listing/update`
const BRAND_BY_CATEGORY = `${API_URL}/brands-by-category`
const FILTER_BY_CATEGORY = `${API_URL}/categories-against-subcategory`
const FILTER_BY_BRAND =  `${API_URL}/related-brands`
const GET_COUNTRIES_DROPDOWN = `${API_URL}/countries`
const GET_STATE_DROPDOWN = `${API_URL}/state`
const GET_CITY_DROPDOWN = `${API_URL}/cities`
const LISTING_SAVE_VIDEO  = `${API_URL}/listings-multiple-videos`
const LISTING_UPDATE_VIDEO  = `${API_URL}/multiple_videos_update`
const All_PRODUCT = `${API_URL}/products`
const BRANCH_GET = `${API_URL}/branches`
const BRANCH_UPDATT_API = `${API_URL}/branches-update`
const BRANCH_DELETE_API = `${API_URL}/branches-delete`
const BRANCH_SAVE_API = `${API_URL}/branches-save`
const PRODUCT_GET = `${API_URL}/get-products`
const All_ITEMS = `${API_URL}/all-items`
const DELETE_ITEMS_GALLERY = `${API_URL}/items-gallery-delete`
const UPDATING_HOURS = `${API_URL}/items/hours/update` 
const SearchLocation = 'https://geocode.maps.co/search?q={manali,chennai}'


export function getAllListing(id,limit){
   return axios.get(All_ITEMS+'?limit='+limit+'&id='+id)
   .then(response =>  response.data )
}

export function getSearchlocate(searchKey){
   return axios.post(`https://geocode.maps.co/search?q=${searchKey}`)
   .then(response =>  response.data )
}

export function getproduct(id){
   return axios.get(PRODUCT_GET+'/'+id)
   .then(response =>  response.data )
}


 export function deletebranch(id){
   return axios.post(BRANCH_DELETE_API+'/'+id)
   .then(response =>  response.data )
}

export function savebranch(id){
   return axios.post(BRANCH_SAVE_API+'/'+id)
   .then(response =>  response.data )
}

export function updatebranch(id, body){
   return axios.post(BRANCH_UPDATT_API+'/'+id, body)
   .then(response =>  response.data )
}

export function getbranch(id){
   return axios.get(BRANCH_GET+'/'+id)
   .then(response =>  response.data )
}

 export function getAboutUs(){
    return axios.get(GET_ABOUT_US_API)
    .then(response =>  response.data )
 }

 export function getAllproducts(){
   return axios.get(All_PRODUCT)
   .then(response =>  response.data )
}

 export function getContriesDrop(){
   return axios.get(GET_COUNTRIES_DROPDOWN)
   .then(response =>  response.data )
}

export function getStateDrop(id){
   return axios.get(GET_STATE_DROPDOWN+'/'+id)
   .then(response =>  response.data )
}

export function getCityDrop(id){
   return axios.get(GET_CITY_DROPDOWN+'/'+id)
   .then(response =>  response.data )
}

 export function getItemsList(){
   return axios.get(GET_ITEMS_LIST)
   .then(response =>  response.data )
}

export function getAllitemsLazyload(limit){
   return axios.get(GET_ITEMS_LIST+'/'+'?limit='+limit )
   .then(response =>  response.data )
}

export function getItemByCategory(id){
   return axios.get(GET_ITEMS_BY_CATEGORY_LIST+`/${id}`)
   .then(response =>  response.data )
}

export function getItemBybrand(id,limit){
   return axios.get(GET_ITEMS_BY_BRAND_LIST+'?limit='+limit+'&id='+id)
   .then(response =>  response.data )
}

export function getProductBybrand(id,limit){
   return axios.get(GET_PRODUCT_BY_BRAND_LIST+'/'+id+'?limit='+limit)
   .then(response =>  response.data )
}

export function getProductBycategory(id,limit){
   return axios.get(GET_PRODUCT_BY_CATEGORY_LIST+'/'+id+'?limit='+limit)
   .then(response =>  response.data )
}

export function getItemByLazyload(id,limit){
   // return axios.get(GET_ITEMS_BY_CATEGORY_LIST+'?limit='+limit+'&id='+id) 
   return axios.get(GET_ITEMS_BY_CATEGORY_LIST+'?limit='+limit+'&slug='+id)
   .then(response =>  response.data )
}

export function getAllItemByLazyload(limit){
   return axios.get(All_PRODUCT+'?limit='+limit)
   .then(response =>  response.data )
}

export function postListingSave(data){
   return axios.post(POST_LISTING,data)
   .then(response =>  response.data )
}

export function getCustomField(ids){
   return axios.get(LISTING_CUSTOM_FIELD+'?category_id='+ids)
   .then(response =>  response.data )
}

export function getMyBussiness(id){
   return axios.get(GET_MY_BUSSINESS+'/'+id)
   .then(response =>  response.data )
}

export function getItemsDetails(id){
   return axios.get(GET_ITEMS_DETAILS+'/'+id)
   .then(response =>  response.data )
}

export function UpdateListingdata(id,body){
   return axios.post(UPDATE_LISTING_DATA+'/'+id,body)
   .then(response =>  response.data )
}
export function getBrandbyCategory(){
   return axios.get(BRAND_BY_CATEGORY)
   .then(response =>  response.data )
}

export function getFilterbyCategory(id){
   return axios.get(FILTER_BY_CATEGORY+'/'+id)
   .then(response =>  response.data )
}

export function SaveListingVideo(id,body){
   return axios.post(LISTING_SAVE_VIDEO+'/'+id,body)
   .then(response =>  response.data )
}

export function UpdateListingVideo(id,body){
   return axios.post(LISTING_UPDATE_VIDEO+'/'+id,body)
   .then(response =>  response.data )
}

export function DeleteItemsGallery(id){
   return axios.get(DELETE_ITEMS_GALLERY+'/'+id)
   .then(response =>  response.data )
}

export function getFilterbyBrand(id){
   return axios.get(FILTER_BY_BRAND+'?slug='+id)
   .then(response =>  response.data )
}

export function updatingHours(body){
   return axios.post(UPDATING_HOURS,body)
   .then(response =>  response.data )
}