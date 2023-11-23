import moment from 'moment';
import React from 'react';
import { useEffect } from 'react';
import { useState, useContext } from 'react';
import {
  Container,
  Row,
  Form,
  Label,
  Input,
  Col,
  InputGroup,
  InputGroupText,
  Button,
  Link,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { getappliedJobs, applyJobs } from '../../../../components/core/realestate_request';
import AuthContex from '../../../../components/auth/AuthContex'
import { useRouter } from 'next/router';
import { useTranslation } from "react-i18next";


export default function JobDetails({ JobData }) {
  const { t } = useTranslation();

  const { userData } = useContext(AuthContex)
  const router = useRouter()

  // const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  // function generateString(length) {
  //   let result = '';
  //   const charactersLength = characters.length;
  //   for (let i = 0; i < length; i++) {
  //     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  //   }
  //   setCaptch(result);
  // }

  function isValidURL(url) {
    const pattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return pattern.test(url);
  }

  
  const [captch, setCaptch] = useState('')
  const [verify, setVerify] = useState('')
  const [appliedjobs, setAppliedJons] = useState([])
  const [image, setimage] = useState('')
  const [openHrs,setOpenHrs] = useState()
const [closeHrs,setcloseHrs] = useState()
const [showContact, setSContact] = useState(true)


  // useEffect(()=> {
  //   if(JobData?.item_hours?.length > 0){
  //     let open = moment( JobData?.item_hours[0]?.item_hour_open_time, "hh:mm" );

  //     var formatedTime = open.format("hh:mm a");

  //     setOpenHrs(formatedTime)
  
  //     let close = moment(JobData?.item_hours[0]?.item_hour_close_time,"hh:mm");

  //     var formatedTime2 = close.format("hh:mm a");

  //     setcloseHrs(formatedTime2)
  //   }

  // },[JobData])

  const fetchAppliedJobs = () => {
    let id = JobData?.user_id
    getappliedJobs(id).then(res => {
      setAppliedJons(res.data)
    }).catch(err => console.error('err', err.message))
  }

  // useEffect(() => {
  //   fetchAppliedJobs()
  // }, [])


  // useEffect(() => {
  //   generateString(6);
  // }, [])


  const initialValues = {
    position: "",
    preferred_location: "",
    listing_id: "",
    name: "",
    phone: "",
    email: "",
    qualification: "",
    experience: "",
    year_of_passed_out: ""
  };

  const formValidation = Yup.object().shape({
    name: Yup.string().required(`Name is required`),
    email: Yup.string().email('Invalid email format').required(`Email is required`),
    phone: Yup.string().min(7, "Phone number must be at least 7 Digits").required(`Phone Number is required`),
    qualification: Yup.string(),
    experience: Yup.string(),
    position: Yup.string(),
    preferred_location: Yup.string(),
    listing_id: Yup.string(),
    year_of_passed_out: Yup.string(),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: formValidation,
    onSubmit: async (values, { setStatus, setSubmitting, resetForm }) => {
      try {
        const user_id =
          JSON.parse(sessionStorage.getItem("data"))?.id ??
          JSON.parse(localStorage.getItem("data"))?.id;

        const body = {
          position: values.position,
          preferred_location: values.preferred_location,
          listing_id: JobData?.id,
          name: values.name,
          phone: values.phone,
          email: values.email,
          qualification: values.qualification,
          experience: values.experience,
          user_id: user_id,
          year_of_passed_out: values.year_of_passed_out,
          image: image
        };

        let formdata = new FormData()

        Object.entries(body).forEach(([key, valu]) => {
          formdata.append(key, valu)
        })

        const response = await applyJobs(formdata);

        if (response.status == 200) {
          toast.info("SAVE SUCCESSFULL", {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            icon: false,
            progress: undefined,
            theme: "dark",
          });
          document.getElementById('closejhfghdsd')?.click();
        } else {
          toast.error("Somthing Went Wrong!", {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
        resetForm()
      } catch (error) {
        console.error("err", error.message);
        setStatus("The details is incorrect");
        toast.error("The details is incorrect!", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setSubmitting(false);
      }
    },
  });




  // useEffect(()=> {
  //   if(captch === verify){
  //     alert()
  //   }else{
  //     console.log('captch === verify',captch == verify)
  //   }
  // },[verify])



  return (
    <>


      <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered my-2 modal-lg">
          <div className="modal-content ">
            <div className="modal-body p-4 job_popup">
              <form onSubmit={formik.handleSubmit}>
                <div className='row mb-3 '>
                  <h4 className='mb-3'>{t('Position Applied for')}</h4>
                  <div className='col-md-6 mb-3'>
                    {/* <select className="form-select" aria-label="Default select example">
                      <option selected disabled>Select Position*</option>
                      <option value="1">One years</option>
                    </select> */}
                    <input type='text' placeholder={t('Enter Position')} {...formik.getFieldProps('position')} className='form-control' />
                    {formik.touched.position && formik.errors.position && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert' className='text-danger'>{formik.errors.position}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className='col-md-6 '>
                    {/* <select className="form-select" aria-label="Default select example">
                      <option selected disabled>Preferred Location*</option>
                      <option value="1">One years</option>
                    </select> */}
                    <input type='text' placeholder={t('Enter your Location')} {...formik.getFieldProps('preferred_location')} className='form-control' />
                    {formik.touched.preferred_location && formik.errors.preferred_location && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert' className='text-danger'>{formik.errors.preferred_location}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className='row mb-3'>
                  <h4 className='mb-3'>{t('Personal Details')}</h4>
                  <div className='col-md-6 mb-3'>
                    <input type='text' placeholder={t('Full Name')} {...formik.getFieldProps('name')} className='form-control' />
                    {formik.touched.name && formik.errors.name && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert' className='text-danger'>{formik.errors.name}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className='col-md-6 mb-3'>
                    {/* <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1" >
                        <img
                          src="/assets/images/contact-us/3.png"
                          className="img-fluid contact_icon_  me-2"
                        />{" "}
                        <div className="no_mob">+974</div></span>
                      <input type="text" className="form-control border-start-0" placeholder="Enter Mobile Number" aria-label="Username" aria-describedby="basic-addon1" />
                    </div> */}
                    <input type='text' placeholder={t('Enter Mobile Numbe')} {...formik.getFieldProps('phone')} maxLength={15} onChange={(e) => formik.setFieldValue('phone', e.target.value.replace(/[^0-9]/g, ""))} className='form-control' />
                    {formik.touched.phone && formik.errors.phone && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert' className='text-danger'>{formik.errors.phone}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className='col-12 '>
                    <input type='text' placeholder={('Email ID')} {...formik.getFieldProps('email')} className='form-control' />
                    {formik.touched.email && formik.errors.email && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert' className='text-danger'>{formik.errors.email}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className='row mb-3'>
                  <h4 className='mb-3'>{t('Educational')} & {t('Experience Details')}</h4>
                  <div className='col-md-6 mb-3'>
                    {/* <select className="form-select" aria-label="Default select example">
                      <option selected disabled>Highest Completed Qualification*</option>
                      <option value="1">One years</option>
                    </select> */}
                    <input type='text' placeholder={t('Highest Completed Qualification')} {...formik.getFieldProps('qualification')} className='form-control' />
                    {formik.touched.qualification && formik.errors.qualification && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert' className='text-danger'>{formik.errors.qualification}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className='col-md-6 '>
                    {/* <select className="form-select" aria-label="Default select example">
                      <option selected disabled>Years of Experience*</option>
                      <option value="1">One years</option>
                    </select> */}
                    <input type='text' placeholder={t('Years of Experience')} {...formik.getFieldProps('experience')} onChange={(e) => formik.setFieldValue('experience', e.target.value.replace(/[^0-9]/g, ""))} className='form-control' />
                    {formik.touched.experience && formik.errors.experience && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert' className='text-danger'>{formik.errors.experience}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className='col-md-6 '>
                    <input type='text' placeholder={t('Years of Passed out')} {...formik.getFieldProps('year_of_passed_out')} onChange={(e) => formik.setFieldValue('year_of_passed_out', e.target.value.replace(/[^0-9]/g, ""))} className='form-control' />
                    {formik.touched.year_of_passed_out && formik.errors.year_of_passed_out && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert' className='text-danger'>{formik.errors.year_of_passed_out}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* <div className='col-12 mb-3'>
                    <div className='w-100 captcha d-flex justify-content-center align-items-center' >
                      <h3 className=''>{captch}</h3>
                    </div>
                  </div>
                  <div className='col-12 mb-2'>
                    <input type='text' onChange={(e)=> setVerify(e.target.value)} placeholder='Enter capcha' className='form-control' />
                  </div>
                  <div className=''>
                    <p>Unable to view the image, to reload <a href='#' className='text-decoration-underline' onClick={() => generateString(6)}>Click Here</a></p>
                  </div> */}
                </div>
                <div className=''>
                  <h4 className=''>{t('Upload a PDF')} / {t("DOCX or image")}</h4>
                  <div className='popup-review mt-0'>
                    <div className='file file--upload mt-0' onClick={() => document.getElementById('input-file12')?.click()}>
                      <label for='input-file mt-0'>
                        <i className="fa fa-file-pdf-o" aria-hidden="true"></i>
                      </label>
                      <input type='file' id='input-file12' onChange={(e) => setimage(e.target.files[0])} />
                    </div>
                  </div>
                </div>
                <div className=''>
                  <button type='submit' disabled={Object.keys(formik.errors).length > 0} className='btn btn-theme px-5 p-2 fw-light rounded-3'>{t('Submit')}</button>
                </div>
              </form>
              <button type="button" className="btn btn-secondary d-none" id='closejhfghdsd' data-bs-dismiss="modal"></button>
            </div>
          </div>
        </div>
      </div>



      <div className=" pt-0">
        <div className='row'>
          <div className="col-lg-12 mb-3 mb-md-4">
            <div className="review_card shadow-none">
              <div className='row'>
                <div className='col-lg-3 pe-lg-4 mb-lg-0 mb-2'>
                  <div className="profile-image">
                    <img
                      src={JobData?.item_image_medium}
                      onError={(e) => (e.currentTarget.src = "/assets/images/tatlub-img/No.jpg")}
                      alt=""
                      className="company-logo h-100"
                    />
                  </div>
                </div>
                <div className='col mb-lg-0 mb-2'>
                  <div className="d-md-flex justify-content-between">
                    <div className="fs-vp-pg">
                      <div className="d-flex align-items-center mb-3">
                        <h4 className="fw-600 mb-0 vendor-profile-title fs-18 text-capitalize pe-1">
                          {t(JobData?.item_title)}{" "}
                        </h4>
                        <img
                          className="me-2 company_detail_icon"
                          src="/assets/images/company/1.png"
                          alt='verify'
                        />
                      </div>
                      <div >
                        <p className='text-capitalize'>{JobData?.user?.name}</p>
                      </div>
                      <div className="d-flex">
                        {
                          JobData?.item_address &&
                          <img
                            className="me-2 mb-3 company_detail_icon"
                            src="/assets/images/tatlub-img/Companies/Icons/_Location.png"
                          />
                        }
                        <p className='text-muted text-capitalize'>{JobData?.item_address ?? JobData?.item_location_str}</p>
                      </div>
                      <div className="d-flex align-items-center">
                        <p className="">
                          <img
                            className="me-2 company_detail_icon"
                            src="/assets/images/tatlub-img/Icon 8.png"
                          />
                          <span className="text-dark">{JobData?.rating ?? 0} {t('Rating')}</span>
                        </p>
                        <p className="ms-3 ">
                          <span className="custom_ratng_text">
                            {JobData?.reviews?.length ?? 0} {t('Reviews')}
                          </span>
                        </p>
                      </div>
                      <div className="d-flex justify-content-start">
                        <p className=' cursor-pointer foot-cat text-capitalize' onClick={() =>{ window.open('https://'+JobData?.item_website, '_blank') }}>{JobData?.item_website}</p>
                        <p className='ms-5 cursor-pointer foot-cat text-capitalize' onClick={() => window.open('https://'+JobData?.user?.user_details?.website, '_blank')}>{JobData?.user?.user_details?.website ?? ''}</p>
                      </div>
                    </div>

                    <div className="d-flex profile-share_mobile">
                      {/* <div>
                        <div className="like_profile me-2">
                          <img
                            className="icon_ls"
                            src="/assets/images/tatlub-img/icon-2.png"
                          />
                        </div>
                      </div> */}
                      <div>
                        {" "}
                        <div className="share_profile me-2"
                          title="Share"
                          role="button"
                          data-bs-toggle="modal"
                          data-bs-target={"#delete_confirm_popup12212"}
                        >
                          <img
                            className="icon_ls"
                            src="/assets/images/tatlub-img/icon-3.png"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-lg-flex justify-content-between ">
                  <div className="d-flex mt-4">
                    {/* https://wa.me/<number> */}
                    {
                      JobData.item_social_whatsapp &&
                      <div className="vendor-icon-img mx-1" onClick={() => window.open(`https://wa.me/${JobData.item_social_whatsapp}`, '_blank')}>
                        <img src="/assets/images/tatlub-img/s-6.jpg" />
                      </div>
                    }
                    {
                      JobData.item_social_facebook &&
                      <div className="vendor-icon-img mx-1" onClick={() => window.open(JobData.item_social_facebook, '_blank')}>
                        <img src="/assets/images/tatlub-img/s-7.jpg" />
                      </div>
                    }
                    {
                      JobData.item_social_linkedin &&
                      <div className="vendor-icon-img mx-1" onClick={() => window.open(JobData.item_social_linkedin, '_blank')}>
                        <img src="/assets/images/tatlub-img/s-8.jpg" onClick={() => window.open(JobData.item_social_whatsapp, '_blank')} />
                      </div>
                    }
                    {
                      JobData.item_social_twitter &&
                      <div className="vendor-icon-img mx-1">
                        <img src="/assets/images/tatlub-img/s-9.jpg" onClick={() => window.open(JobData.item_social_twitter, '_blank')} />
                      </div>
                    }
                    {/* <div className="vendor-icon-img mx-1">
                      <img src="/assets/images/tatlub-img/s-5.jpg" onClick={()=> window.open(item_social_whatsapp,'_blank')} />
                    </div> */}
                  </div>
                  <div className="d-sm-flex">
                    {" "}
                    {
                      showContact ? 
                      <button className="btn d-flex align-items-center justify-content-center contact_suplier_btn me-2 mt-3" onClick={()=>setSContact(false)}>
                      {/* <img src="/assets/images/tatlub-img/call-1.png"  className="btn-img"/> */}
                      <i class="fa fa-phone fs-4  me-3 mb-0 pb-0" aria-hidden="true"></i>
                      {t('Show Number')}
                    </button>
                      :
                    <a href={"tel:" + JobData?.item_phone ?? JobData?.user?.phone}>
                      <button className="btn d-flex align-items-center justify-content-center contact_suplier_btn me-2 mt-3">
                        {/* <img src="/assets/images/tatlub-img/call-1.png"  className="btn-img"/> */}
                        <i class="fa fa-phone fs-4  me-3 mb-0 pb-0" aria-hidden="true"></i>
                        {JobData?.item_phone ?? JobData?.data?.user?.phone ?? 'Call Now'}
                      </button>
                    </a>
                    }

                    {/* <Link href={'/shop/Booking'}> */}
                    {
                      appliedjobs?.length > 0 ?
                        <button type='button' className="btn send_enquery_btn mt-3" onClick={() => router.push({ pathname: '/page/Hiring/JobsApplied', query: { 'id': '' } })} >
                          {t('Applied list')}
                        </button> :
                        <button type='button' className="btn send_enquery_btn mt-3" disabled={userData ? JobData?.user_id == userData?.id : !userData} data-bs-toggle="modal" data-bs-target="#exampleModal1">
                          {t('Apply Job')}
                        </button>
                    }
                    {/* </Link> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-0 b2c-2 mb-4 d-none">
        <div className="review_card shadow-none p-4">
          <div className='row'>
            <div className='col-lg-6' >
              {
                JobData?.founded_by ?
                  <div className="">
                    <h5 className=" fs-18 fw-bolder mb-2">{t('Year Of Experience')}</h5>
                    <p className="">{JobData?.founded_by}</p>
                  </div> :
                  <div className="">
                   <h3 className="text-center">{t("DATA NOT FOUND")}</h3>
                  </div>
               }
            </div>
            <div className="col-lg-5 divider">
              <h4 className="fw-bolder mx-lg-3 mb-3 fs-18 ">{t('Timing')}</h4>
              {/* 
              <div className="d-flex justify-content-between mx-3 ">
                <div>
                  <h5 className="custom_timing">Mon - Fri</h5>
                  <h5 className="custom_timing">Sat - Sun</h5>
                </div>

                <div>
                  <h5>8:00 am - 5:00 pm</h5>
                  <h5>Closed Closed</h5>
                </div>
              </div> */}

              {/* {JobData?.item_hours
                ?.slice(0, 7)
                .map((time, index) => {
                  let open = moment(
                    time?.item_hour_open_time,
                    "hh:mm"
                  );
                  var formatedTime = open.format("hh:mm a");

                  let close = moment(
                    time?.item_hour_close_time,
                    "hh:mm"
                  );
                  var formatedTime2 = close.format("hh:mm a");

                  return (
                    <div className="d-flex justify-content-between" key={index}>
                      <div>
                        <h5 className="custom_timing fs-5">
                          {time?.item_hour_day_of_week == 1 &&
                            "Modnay"}{" "}
                          {time?.item_hour_day_of_week == 2 &&
                            "Tuesday"}{" "}
                          {time?.item_hour_day_of_week == 3 &&
                            "Wendesday"}{" "}
                          {time?.item_hour_day_of_week == 4 &&
                            "Thurday"}{" "}
                          {time?.item_hour_day_of_week == 5 &&
                            "Friday"}{" "}
                          {time?.item_hour_day_of_week == 6 &&
                            "Saturday"}{" "}
                          {time?.item_hour_day_of_week == 7 &&
                            "Sunday"}
                        </h5>
                      </div>

                      <div>
                        <h5 className="fs-5">
                          {formatedTime} - {formatedTime2}
                        </h5>
                      </div>
                    </div>
                  );
                })} */}  

                                {/* {
                                  JobData?.item_hours?.length > 0 && 
                                  <div className="d-flex justify-content-between mx-3 ">
                                    <div>
                                    <h5 className="custom_timing fs-5">
                                        {JobData?.item_hours[0]?.item_hour_day_of_week == 1 &&
                                            "Mon"}{" "}
                                          {JobData?.item_hours[0]?.item_hour_day_of_week == 2 &&
                                            "Tue"}{" "}
                                          {JobData?.item_hours[0]?.item_hour_day_of_week == 3 &&
                                            "Wed"}{" "}
                                          {JobData?.item_hours[0]?.item_hour_day_of_week == 4 &&
                                            "Thu"}{" "}
                                          {JobData?.item_hours[0]?.item_hour_day_of_week == 5 &&
                                            "Fri"}{" "}
                                          {JobData?.item_hours[0]?.item_hour_day_of_week == 6 &&
                                            "Sat"}{" "}
                                          {JobData?.item_hours[0]?.item_hour_day_of_week == 7 &&
                                            "Sun"} - 
                                           {JobData?.item_hours[JobData?.item_hours?.length-1]?.item_hour_day_of_week == 1 &&
                                            "Mod"}{" "}
                                          {JobData?.item_hours[JobData?.item_hours?.length-1]?.item_hour_day_of_week == 2 &&
                                            "Tue"}{" "}
                                          {JobData?.item_hours[JobData?.item_hours?.length-1]?.item_hour_day_of_week == 3 &&
                                            "Wed"}{" "}
                                          {JobData?.item_hours[JobData?.item_hours?.length-1]?.item_hour_day_of_week == 4 &&
                                            "Thu"}{" "}
                                          {JobData?.item_hours[JobData?.item_hours?.length-1]?.item_hour_day_of_week == 5 &&
                                            "Fri"}{" "}
                                          {JobData?.item_hours[JobData?.item_hours?.length-1]?.item_hour_day_of_week == 6 &&
                                            "Sat"}{" "}
                                          {JobData?.item_hours[JobData?.item_hours?.length-1]?.item_hour_day_of_week == 7 &&
                                            "Sun"}
                                      </h5>
                                    </div>

                                    <div>
                                      <h5 className="5">{openHrs ?? "00:00"}- {closeHrs ?? '00:00'} </h5>
                                    </div>
                                  </div>
                                } */}


              {!JobData?.item_hours ||
                (JobData?.item_hours?.length == 0 && (
                  <div className="d-flex justify-content-between mx-3 ">
                    <div>
                      <h5 className="custom_timing fs-5">
                        Mon - Sun
                      </h5>
                      {/* <h5 className="custom_timing">Sat - Sun</h5> */}
                    </div>

                    <div>
                      <h5 className="5">00:00 - 00:00 </h5>
                      {/* <h5>Closed Closed</h5> */}
                    </div>
                  </div>
                ))}
            </div>
          </div >
        </div>
      </div>


               {
                    JobData?.features?.length > 0 && 
                    <div className="review_card p-4 mb-4">
                      <div className="mb-4">
                        <h4 className="fs-5 text-capitalize">{t('quick informations')}</h4>
                      </div>

                      <div className="row justify-content-start align-items-center pq-img">
                        { 
                        JobData?.features?.filter((e) => e.item_feature_value != "[object Object]" && e.item_feature_value != null)?.length > 0 ?
                          JobData?.features?.filter((e) => e.item_feature_value != "[object Object]" && e.item_feature_value != null).map((valu, i) => (
                            <div className="px-1 col-md-4 mb-2" key={i}>
                              <div className='d-flex  justify-content-center align-items-center  listing-tags  mb-2' key={i}>
                                <img src='/assets/images/tatlub-img/Companies/Icons/_Experience.png' />
                                {/* <p classname="text-capitalize" ><span className="text-capitalize">{valu?.custom_field?.custom_field_name ?? 'note'}</span> : <span className="text-capitalize"> {valu?.custom_field?.custom_field_name == 'Doctor fee' ? valu?.item_feature_value + t("QAR") : valu?.item_feature_value}</span></p> */}
                                <p classname="text-capitalize" ><span className="text-capitalize"> {valu?.item_feature_value}</span></p>
                              </div>
                            </div>
                          ))  :  
                          <div className="">
                          <h3 className="text-start">{t("DATA NOT FOUND")}</h3>
                         </div>

                        } 
                      </div>

                    </div>
                    }


      <div className='review_card job-d shadow-none'>
        {/* <div className='mb-3'>
          <h4 className="fw-bolder  mb-3">Quick Information</h4>

          <p >{JobData?.item_description}.</p>
        </div> */}

        <div className='mb-3'>
          <h4 className="fw-bolder fs-18  mb-3">{t('Job Description')}:</h4>

          <p>{JobData?.item_description}</p>
          {/* <ul>
            <li>• Conduct user research and testing to gather insights and validate design decisions</li><br />
            <li>• Continuously iterate and improve upon the design of our products</li><br />
            <li>• Stay up-to-date with the latest design trends and techniques</li><br />
          </ul> */}
        </div>

        <div className='mb-3'>
         {JobData?.item_specification?.length > 0 && <h4 className="fw-bolder fs-18  mb-3">{t('Required skill')}:</h4> }
          {
            JobData?.item_specification?.length > 0 &&
            JobData?.item_specification?.map((val, i) => (<div key={i}>
              <ul>
                {
                  val?.values?.split(",")?.map(jobs => (<>
                    <li><span className='text-dark text-capitalize fw-bold'>{val?.name}</span> - {jobs}</li><br />
                  </>))
                }
              </ul>
            </div>))
          }
        </div>
      </div>

    </>
  )
}
