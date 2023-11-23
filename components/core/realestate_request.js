import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_API_URL

const GET_BANNER=`${API_URL}/category-banner`
const GET_PROPERTYLIST=`${API_URL}/properties`
const GET_SEARCHLIST=`${API_URL}/search`
const GET_BUILDERS=`${API_URL}/popular-builders`
const GET_SLOTE=`${API_URL}/taken-appointment-slots`
const GET_DOCTORSLOTE=`${API_URL}/doctors-appointment-get`
const GET_APPOINTMENTLIST=`${API_URL}/doctors-user-appointment`
const GET_JOBAPPLYLIST=`${API_URL}/get-user-applied-jobs`
const POST_APPOINMENT=`${API_URL}/doctors-appointment`
const POST_JOBS=`${API_URL}/post-job`
const APPLY_JOBS=`${API_URL}/apply-job`
const WANTED_JOBS=`${API_URL}/get-wanted-job`
const APPLIED_JOBS =`${API_URL}/get-applied-jobs`


export function getBanner() {
    return axios.get(GET_BANNER)   
    .then(respose => respose.data)
 }


 export function getProperty() {
    return axios.get(GET_PROPERTYLIST)   
    .then(respose => respose.data)
 }
 export function getBuilders() {
   return axios.get(GET_BUILDERS)   
   .then(respose => respose.data)
}

 export function getSearchList(searchkey) {
    return axios.get(GET_SEARCHLIST+'?realEstate=1&search='+searchkey)   
    .then(respose => respose.data)
 }

//  doctor 

export function getTimeSlot(id) {
   return axios.get(GET_DOCTORSLOTE+'/'+id)   
   .then(respose => respose.data)
}

export function getAppointmentList(id) {
   return axios.get(GET_APPOINTMENTLIST+'/'+id)   
   .then(respose => respose.data)
}


export function potAppointmet(body) {
   return axios.post(POST_APPOINMENT,body)   
   .then(respose => respose.data)
}


// Job 

export function potJobs(body) {
   return axios.post(POST_JOBS,body)   
   .then(respose => respose.data)
}

export function getJobApplylist(id) {
   return axios.get(GET_JOBAPPLYLIST+'/'+id)   
   .then(respose => respose.data)
}

export function getwantedJobs() {
   return axios.get(WANTED_JOBS)   
   .then(respose => respose.data)
}

export function getappliedJobs(id) {
   return axios.get(APPLIED_JOBS+'/'+id)   
   .then(respose => respose.data)
}

export function applyJobs(body) {
   return axios.post(APPLY_JOBS,body)   
   .then(respose => respose.data)
}
