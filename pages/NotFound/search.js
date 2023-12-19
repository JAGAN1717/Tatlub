import React,{useState,useEffect} from 'react'
import CommonLayout from '../../components/shop/common-layout'
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import {PostNotFondForm} from "../../components/core/vendor_request"
import { useTranslation } from "react-i18next";



export default function search() {

    const router = useRouter();
    const { t } = useTranslation();

    const {search,city} = router.query

    const initialValues = {
        name: '',
        looking_for:'',
        city:'',
        area:'',
        email:'',
        mobile_number:''
    }


    const formValidation = Yup.object().shape({
        name: Yup.string().required("Enter you Name"),
        looking_for:Yup.string().required('please enter what are you looking for'),
        city:Yup.string().required('Enter your City address'),
        area:Yup.string().required('Enter your Area address'),
        email:Yup.string().email('Please Enter Valid Email Id').required('Enter your Email address'),
        mobile_number:Yup.string().required('Enter your Mobile Number').min(7, "Phone number must be at least 7 Digits")
    })

    const formik = useFormik({
        initialValues,
        validationSchema:formValidation,
        onSubmit: async (values, {setStatus, setSubmitting, resetForm}) => {
            try {
            
                const body = {
                        "name":values.name,
                        "looking_for":values.looking_for,
                        "city":values.city,
                        "area":values.area,
                        "email":values.email,
                        "mobile_number":values.mobile_number
                }
                document.getElementById('openloaderModal')?.click();
                const response = await PostNotFondForm(body)
               document.getElementById('closeloaderModal')?.click();
                if(response.status == 200){
                    toast.info("SAVE SUCCESSFULL", {
                      position: "bottom-right",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      icon:false,
                      progress: undefined,
                      theme: "dark",
                    });
                    router.push('/')
                }else{
                    toast.error('Somthing Went Wrong!', {
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
            } catch (error) {
            document.getElementById('closeloaderModal')?.click();
             console.error("err",error.message)
             setStatus('The details is incorrect');
             toast.error('The details is incorrect!', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
             setSubmitting(false)   
            }
        }
    })

    useEffect(()=> {
        formik.setFieldValue('city',city?.toString()?.split(',')[0])
    },[city])


  return (<>
    {/* <CommonLayout> */}
        <section className='p-0'>
            <div className='container'>
                <div className='d-flex flex-column justify-content-center align-items-center mb-4'>
                {/* <img src='/assets/images/tatlub-img/Manage Orders.png'  className='no_image1'/> */}
                {/* <h3 className='fw-light'>Search Not Found...</h3> */}

                <div className='mb-3 '>
                    <h3>{t("Your search for")} "{search}", {t("did not match any records")}.</h3>
                </div>
                {/* <div className='notFound_card'> */}
                <div className='form_condition_ row'>
                  <div className='col'>
                  <img src='/assets/images/tatlub-img/Enquire.png'  className='no_image1'/>
                  </div>
                <form onSubmit={formik.handleSubmit} className='col-md-8 '>
                   <div className='mb-4  mt-2'>
                   <h4 className='fw-bold fs-4'>{t("Tell us what are you looking for?")}</h4>
                   </div>
                    <div className='row'>
                    <div className="mb-3 col-md-6">
                        <label  className="form-label">{t("Full Name")}</label>
                        <input type="text" className="form-control" placeholder={t('Enter your name')}   {...formik.getFieldProps("name")} />
                        {formik.touched.name &&
                          formik.errors.name && (
                            <div className="fv-plugins-message-container">
                              <div className="fv-help-block">
                                <span role="alert" className="text-danger">
                                  {formik.errors.name}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="mb-3 col-md-6">
                        <label  className="form-label">{t("Looking For")}</label>
                        <input type="text" className="form-control" placeholder={t('what are you looking for')}  {...formik.getFieldProps("looking_for")} /> 
                         {formik.touched.looking_for &&
                          formik.errors.looking_for && (
                            <div className="fv-plugins-message-container">
                              <div className="fv-help-block">
                                <span role="alert" className="text-danger">
                                  {formik.errors.looking_for}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="mb-3 col-md-6">
                        <label  className="form-label">{t("City")}</label>
                        <input type="text" className="form-control" placeholder={t('Enter your city')} {...formik.getFieldProps("city")} /> 
                         {formik.touched.city &&
                          formik.errors.city && (
                            <div className="fv-plugins-message-container">
                              <div className="fv-help-block">
                                <span role="alert" className="text-danger">
                                  {formik.errors.city}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="mb-3 col-md-6">
                        <label  className="form-label">{t("Area")}</label>
                        <input type="text" className="form-control" placeholder={t('Enter your area')} {...formik.getFieldProps("area")} /> 
                          {formik.touched.area &&
                          formik.errors.area && (
                            <div className="fv-plugins-message-container">
                              <div className="fv-help-block">
                                <span role="alert" className="text-danger">
                                  {formik.errors.area}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="mb-3 col-md-6">
                        <label  className="form-label">{t("Email")}</label>
                        <input type="text" className="form-control" placeholder={t('Enter your email address')} {...formik.getFieldProps("email")} /> 
                         {formik.touched.email &&
                          formik.errors.email && (
                            <div className="fv-plugins-message-container">
                              <div className="fv-help-block">
                                <span role="alert" className="text-danger">
                                  {formik.errors.email}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="mb-3 col-md-6">
                        <label  className="form-label">{t("Mobile Number")}</label>
                        <input type="text" className="form-control" maxLength={15} placeholder={t('Enter your mobile number')} {...formik.getFieldProps("mobile_number")}  onChange={(e) => formik.setFieldValue("mobile_number", e.target?.value.replace(/[^0-9]/g, ""))} /> 
                         {formik.touched.mobile_number &&
                          formik.errors.mobile_number && (
                            <div className="fv-plugins-message-container">
                              <div className="fv-help-block">
                                <span role="alert" className="text-danger">
                                  {formik.errors.mobile_number}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                    </div>
                    <div className='d-flex justify-content-end align-items-center mt-2'>
                        <button type='submit' className='btn btn-notFount px-5 p-2 fw-light rounded'>
                            {t("Submit")}
                        </button>
                    </div>
                </form>
                </div>
                </div>
            </div>
        </section>
    {/* </CommonLayout> */}
  </>
  )
}
