import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const UPDATE_PROFILE_DATA = `${API_URL}/profile-update`;
const GET_SELLER_DATA = `${API_URL}/seller-profile`;
const GET_BRANCHES_DATA = `${API_URL}/branches`;
const UPDATE_BRANCHES_DATA = `${API_URL}/branches-update`;
const POST_BRANCHES_DATA = `${API_URL}/branches-save`;
const GET_COUNTRIES_DROPDOWN = `${API_URL}/countries`;
const GET_STATE_DROPDOWN = `${API_URL}/state`;
const GET_CITY_DROPDOWN = `${API_URL}/cities`;
const UPDATE_PROFILE_1 = `${API_URL}/profile-update`;
const UPDATE_PROFILE_2 = `${API_URL}/profile-update2`;
const UPDATE_OFFEICE_ADDRESS = `${API_URL}/profile-update3`;
const UPDATE_SELLER_VIDEOS = `${API_URL}/seller-multiple-videos`;
const POST_QUOTES = `${API_URL}/get-quotes`;
const GET_TESTIMONIALS = `${API_URL}/testimonials`;
const GET_CONTACTUS = `${API_URL}/contact-us`;
const GET_BODSS = `${API_URL}/about-us?ss=1&bod=1`;
const POST_BANNER = `${API_URL}/banner-upload-addon`;
const POST_SELLERSPEC = `${API_URL}/seller-spec`

export function UpdateProfileData(id, data) {
  return axios
    .post(UPDATE_PROFILE_DATA + "/" + id, data)
    .then((response) => response.data);
}

export function UpdateSellerVidoes(id, data) {
  return axios
    .post(UPDATE_SELLER_VIDEOS + "/" + id, data)
    .then((response) => response.data);
}
export function postBanners(data) {
  return axios
    .post(POST_BANNER, data)
    .then((response) => response.data);
}
export function UpdateProfile1(id, data) {
  return axios
    .post(UPDATE_PROFILE_1 + "/" + id, data)
    .then((response) => response.data);
}

export function UpdateProfile2(id, data) {
  return axios
    .post(UPDATE_PROFILE_2 + "/" + id, data)
    .then((response) => response.data);
}

export function UpdateProfile3(id, data) {
  return axios
    .post(UPDATE_OFFEICE_ADDRESS + "/" + id, data)
    .then((response) => response.data);
}

export function GetSellerData(id) {
  return axios
    .get(GET_SELLER_DATA + "/" + id)
    .then((response) => response.data);
}

export function GetBranchesData(id) {
  return axios
    .get(GET_BRANCHES_DATA + "/" + id)
    .then((response) => response.data);
}

export function UpdateBranchesData(id, body) {
  return axios
    .patch(UPDATE_BRANCHES_DATA + "/" + id, body)
    .then((response) => response.data);
}

export function AddBranchesData(body) {
  return axios.post(POST_BRANCHES_DATA, body)
  .then((response) => response.data);
}

export function getContriesDrop() {
  return axios.get(GET_COUNTRIES_DROPDOWN)
  .then((response) => response.data);
}

export function getStateDrop(id) {
  return axios
    .get(GET_STATE_DROPDOWN + "/" + id)
    .then((response) => response.data);
}

export function getCityDrop(id) {
  return axios
    .get(GET_CITY_DROPDOWN + "/" + id)
    .then((response) => response.data);
}

export function postQuotes(body) {
  return axios.post(POST_QUOTES, body)
  .then((response) => response.data);
}

export function getTesimonials() {
  return axios.get(GET_TESTIMONIALS)
  .then((response) => response.data);
}

export function getBordOfDirect() {
  return axios.get(GET_BODSS)
  .then((response) => response.data);
}

export function getContactus() {
  return axios.get(GET_CONTACTUS)
  .then((response) => response.data);
}

export function sellerSpec(body) {
  return axios.post(POST_SELLERSPEC, body)
  .then((response) => response.data);
}
