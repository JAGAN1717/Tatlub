import Link from 'next/link';
import React, { useState, lazy, Suspense, useEffect, useContext } from 'react';
// import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { getFilterbyCategory } from '../../../../components/core/shop_requests';
import moment from 'moment';
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { potJobs, getappliedJobs } from '../../../../components/core/realestate_request';
import { useId } from '../../../../IdContext';
import { setmainId } from '../../../../IDmain';
import { useTranslation } from "react-i18next";
import AuthContex from "../../../../components/auth/AuthContex";


const Category = () => {

  const router = useRouter()
  const { t } = useTranslation();
  const { userData } = useContext(AuthContex);

  const { id } = router.query
  const { ids, setIds } = useId()
  const [url, setUrl] = useState();
  const [Loading, setLoading] = useState(false)
  const [Category, setCategory] = useState([])

  // console.log("khgjhgkjjhk",id)

  const [minSalary, setminSalary] = useState('')
  const [maxSalary, setmaxSalary] = useState('')
  const [per_shc, setper_shc] = useState('Per Month')
  const [Jobtype, setJobtype] = useState('')
  const [Jobschedule, setJobschedule] = useState('')
  const [appliedjobs, setAppliedJons] = useState([])
  const [image, setimage] = useState('')
  const [preview, setPreview] = useState('')
  

  console.log("shhfdsjdsd", image)

  const initialValues = {
    job_title: '',
    experience: "",
    job_schedule: '',
    job_type: '',
    number_of_people_for_hiring: '',
    pay_rate: '',
    job_description: ''
  };




  const formValidation = Yup.object().shape({
    job_title: Yup.string().required("Enter you Job Title"),
    experience: Yup.string(),
    job_type: Yup.string(),
    job_schedule: Yup.string(),
    number_of_people_for_hiring: Yup.string(),
    pay_rate: Yup.string(),
    job_description: Yup.string()
  });

  const formik = useFormik({
    initialValues,
    validationSchema: formValidation,
    onSubmit: async (values, { setStatus, setSubmitting, resetForm }) => {
      try {
        const body = {
          job_title: values.job_title,
          experience: values.experience,
          job_schedule: Jobschedule,
          job_type: Jobtype,
          number_of_people_for_hiring: values.number_of_people_for_hiring,
          pay_rate: minSalary + '-' + maxSalary + ' ' + per_shc,
          job_description: values.job_description,
          image: image
        };
        var formdata = new FormData();
        Object.entries(body)?.forEach(([key, value]) => {
          formdata.append(`${key}`, value);
        })

        const response = await potJobs(formdata);

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



  // const {isLoading,data:Category,error,refetch} = useQuery(
  //   ['subCategory',id],
  //   () => getFilterbyCategory(id)
  // )



  const fetchJobcategory = () => {
    setLoading(true)

    getFilterbyCategory(id ?? 14).then(res => {
      setCategory(res)
      setLoading(false)
    }).catch(err => {
      console.error("err", err.message)
      setLoading(false)
    })
  }

  useEffect(() => {
    fetchJobcategory()
  }, [id])



  return (<>

    <div className="modal fade" id="staticBackdrop" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="false">
      <div className="modal-dialog modal-dialog-centered my-2 modal-lg">
        <div className="modal-content">
          {/* <div className="modal-header">
        <h5 className="modal-title" id="staticBackdropLabel">Modal title</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div> */}
          <div className="modal-body p-4">
            <form onSubmit={formik.handleSubmit}>
              <div className='row mb-3'>
                <h4 className='mb-3'>Provide basic information</h4>
                <div className='col-md-6 mb-3'>
                  <input type='text' {...formik.getFieldProps('job_title')} placeholder={t('Job title')} className='form-control' />
                  {formik.touched.job_title && formik.errors.job_title && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>
                        <span role='alert' className='text-danger'>{formik.errors.job_title}</span>
                      </div>
                    </div>
                  )}
                </div>
                <div className='col-md-6 '>
                  {/* <select className="form-select" aria-label="Default select example">
            <option selected>Years of Experience*</option>
            <option value="1">One years</option>
            </select> */}
                  <input type='text' {...formik.getFieldProps('experience')} onChange={(e) => formik.setFieldValue('experience', e.target.value.replace(/[^0-9]/g, ""))} placeholder={t('Years of Experience')} className='form-control' />
                </div>
              </div>

              <div className='mb-3'>
                <h4 className='mb-3'>What is the job type?*</h4>
                <div className='row'>
                  <div className='col mb-3'>
                    <button type="button" onClick={() => setJobtype('Full-time')} className={`btn ${Jobtype == 'Full-time' ? 'btn-theme' : 'btn-outline-secondary'}  w-100 rounded px-3 text-truncate fw-light p-2`}>Full-time</button>
                  </div>
                  <div className='col mb-3'>
                    <button type="button" onClick={() => setJobtype('Regular/Permanent')} className={`btn ${Jobtype == 'Regular/Permanent' ? 'btn-theme' : 'btn-outline-secondary'}  w-100 rounded px-3 text-truncate fw-light p-2`}>Regular/Permanent</button>
                  </div>
                  <div className='col mb-3'>
                    <button type="button" onClick={() => setJobtype('Fresher')} className={`btn ${Jobtype == 'Fresher' ? 'btn-theme' : 'btn-outline-secondary'}  w-100 rounded px-3 text-truncate fw-light p-2`}>Fresher</button>
                  </div>
                  <div className='col mb-3'>
                    <button type="button" onClick={() => setJobtype('Part-time')} className={`btn ${Jobtype == 'Part-time' ? 'btn-theme' : 'btn-outline-secondary'}  w-100 rounded px-3 text-truncate fw-light p-2`}>Part-time</button>
                  </div>
                  <div className='col mb-3'>
                    <button type="button" onClick={() => setJobtype('Internship')} className={`btn ${Jobtype == 'Internship' ? 'btn-theme' : 'btn-outline-secondary'}  w-100 rounded px-3 text-truncate fw-light p-2`}>Internship</button>
                  </div>
                </div>
              </div>

              <div className='mb-3'>
                <h4 className='mb-3'>What is the schedule for this job?</h4>
                <div className='row'>
                  <div className='col mb-3  pe-0'>
                    <button type="button" onClick={() => setJobschedule('Day shift')} className={`btn ${Jobschedule == 'Day shift' ? 'btn-theme' : 'btn-outline-secondary'}  w-100 rounded px-3 text-truncate fw-light p-2`}>Day shift</button>
                  </div>
                  <div className='mb-3 col'>
                    <button type="button" onClick={() => setJobschedule('Morning shift')} className={`btn ${Jobschedule == 'Morning shift' ? 'btn-theme' : 'btn-outline-secondary'}  w-100 rounded px-3 text-truncate fw-light p-2`}>Morning shift</button>
                  </div>
                  <div className='mb-3 col'>
                    <button type="button" onClick={() => setJobschedule('Flexible shift')} className={`btn ${Jobschedule == 'Flexible shift' ? 'btn-theme' : 'btn-outline-secondary'}  w-100 rounded px-3 text-truncate fw-light p-2`}>Flexible shift</button>
                  </div>
                  <div className='mb-3 col'>
                    <button type="button" onClick={() => setJobschedule('Rotational shift')} className={`btn ${Jobschedule == 'Rotational shift' ? 'btn-theme' : 'btn-outline-secondary'}  w-100 rounded px-3 text-truncate fw-light p-2`}>Rotational shift</button>
                  </div>
                  <div className='mb-3 col'>
                    <button type="button" onClick={() => setJobschedule('Night shift')} className={`btn ${Jobschedule == 'Night shift' ? 'btn-theme' : 'btn-outline-secondary'}  w-100 rounded px-3 text-truncate fw-light p-2`}>Night shift</button>
                  </div>
                  <div className='mb-3 col-3'>
                    <button type="button" onClick={() => setJobschedule('Monday to Friday')} className={`btn ${Jobschedule == 'Monday to Friday' ? 'btn-theme' : 'btn-outline-secondary'}  w-100 rounded px-3 text-truncate fw-light p-2`}>Monday to Friday</button>
                  </div>
                  <div className='mb-3 col-3'>
                    <button type="button" onClick={() => setJobschedule('Evening shift')} className={`btn ${Jobschedule == 'Evening shift' ? 'btn-theme' : 'btn-outline-secondary'}  w-100 rounded px-3 text-truncate fw-light p-2`}>Evening shift</button>
                  </div>
                </div>
              </div>

              <div className='row mb-3'>
                <h4 className='mb-3'>{t('How many people do you want to hire for this opening?')}</h4>
                <div className='col-12 '>
                  {/* <select className="form-select" aria-label="Default select example">
            <option selected>9</option>
            <option value="1">One years</option>
            </select> */}
                  <input type='text' {...formik.getFieldProps('number_of_people_for_hiring')} onChange={(e) => formik.setFieldValue('number_of_people_for_hiring', e.target.value.replace(/[^0-9]/g, ""))} placeholder='' className='form-control' />
                </div>
              </div>

              <div className='row mb-3'>
                <h4 className='mb-3'>What is the pay rate or range?</h4>
                <div className='col-md-4 mb-3'>
                  <input type='text' placeholder={t('Minimum')} value={minSalary} onChange={(e) => setminSalary(e.target.value.replace(/[^0-9]/g, ""))} className='form-control' />
                </div>
                <div className='col-md-4 mb-3'>
                  <input type='text' placeholder={t('Maximum')} value={maxSalary} onChange={(e) => setmaxSalary(e.target.value.replace(/[^0-9]/g, ""))} className='form-control' />
                </div>
                <div className='col-md-4 '>
                  <select className="form-select" onChange={(e) => setper_shc(e.target.value)} aria-label="Default select example">
                    <option selected value="Per Month">{t("Per Month")}</option>
                    <option value="Per Annum">{t("Per Annum")}</option>
                  </select>
                </div>
              </div>

              <div className='mb-3'>
                <h4 className='mb-2'>{t("Job description")}</h4>
                <p className='text-muted'>{t("Describe the responsibilities of this job, required work experience, skills, or education.")}</p>
                <div className='row'>
                  <div className='col-12'>
                    <textarea className="form-control" {...formik.getFieldProps('job_description')} id="exampleFormControlTextarea1" rows="4"></textarea>
                  </div>
                </div>
              </div>

              <div className=''>
                <h4 className=''>{t("Upload a PDF")} / {t("DOCX or image")}</h4>
                <div className='d-flex align-items-center'>
                  <div className='popup-review mt-0'>
                    <div className='file file--upload mt-0' onClick={() => document.getElementById('input-file')?.click()}>
                      <label for='input-file mt-0'>
                        <i className="fa fa-file-pdf-o" aria-hidden="true"></i>
                      </label>
                      <input type='file' id='input-file' onChange={(e) => { setimage(e.target.files[0]); setPreview(URL.createObjectURL(e.target.files[0])) }} />
                    </div>
                  </div>


                  <div class='w-full rounded-2xl flex flex-col gap-2 '>
                    {/* <p class='text-gray-500'>Uploaded Files</p> */}
                    <div class='flex flex-col gap-3'> 

                    {
                      image &&
                      <div class='flex items-end gap-2 cursor-pointer' onClick={()=> window.open(preview,'_blank')}>

                        {/* <svg class='w-10 aspect-square' width={50} viewBox="0 0 791.454 791.454" xmlns="http://www.w3.org/2000/svg">
                          <g>
                            <g id="Vrstva_x0020_1_4_">
                              <path d="m202.718 0h264.814l224.164 233.873v454.622c0 56.868-46.092 102.959-102.959 102.959h-386.019c-56.868 0-102.959-46.092-102.959-102.959v-585.536c0-56.867 46.091-102.959 102.959-102.959z" fill="#0263d1" />
                              <g fill="#fff">
                                <path clip-rule="evenodd" d="m467.212 0v231.952h224.484z" fill-rule="evenodd" opacity=".302" />
                                <path d="m195.356 564.73v-131.02h46.412c9.282 0 17.925 1.387 25.927 3.948 8.002 2.667 15.257 6.508 21.766 11.63 6.508 5.121 11.63 11.95 15.364 20.485s5.655 18.351 5.655 29.447-1.921 20.912-5.655 29.447-8.856 15.364-15.364 20.485-13.764 8.962-21.766 11.63c-8.002 2.561-16.644 3.948-25.927 3.948zm32.755-28.487h9.709c5.228 0 10.136-.64 14.51-1.814 4.481-1.28 8.535-3.307 12.376-5.975s6.828-6.508 8.962-11.523c2.241-4.908 3.307-10.883 3.307-17.711s-1.067-12.803-3.307-17.818c-2.134-4.908-5.121-8.749-8.962-11.416-3.841-2.774-7.895-4.694-12.376-5.975-4.374-1.174-9.282-1.814-14.51-1.814h-9.709zm161.855 29.981c-19.738 0-36.062-6.402-48.972-19.098-12.91-12.697-19.312-28.701-19.312-47.905 0-19.205 6.402-35.209 19.312-47.905 12.91-12.697 29.234-19.098 48.972-19.098 19.418 0 35.529 6.402 48.439 19.098 12.803 12.697 19.205 28.701 19.205 47.905s-6.402 35.209-19.205 47.905c-12.91 12.696-29.021 19.098-48.439 19.098zm-25.18-39.37c6.508 7.255 14.83 10.883 24.966 10.883s18.351-3.628 24.86-10.883c6.508-7.362 9.709-16.538 9.709-27.634s-3.201-20.272-9.709-27.634c-6.508-7.255-14.724-10.883-24.86-10.883s-18.458 3.628-24.966 10.883c-6.508 7.362-9.816 16.538-9.816 27.634s3.308 20.272 9.816 27.634zm170.71 39.37c-19.098 0-34.996-5.975-47.585-17.711-12.697-11.843-18.991-28.274-18.991-49.293 0-20.912 6.402-37.343 19.205-49.186 12.91-11.843 28.594-17.818 47.372-17.818 16.964 0 30.834 4.161 41.824 12.59 10.883 8.322 17.178 19.418 18.778 33.288l-33.075 6.722c-1.387-7.255-4.695-13.123-9.816-17.498s-11.096-6.615-17.925-6.615c-9.389 0-17.178 3.308-23.473 10.029-6.295 6.828-9.496 16.217-9.496 28.487s3.201 21.659 9.389 28.381c6.295 6.828 14.084 10.136 23.579 10.136 6.828 0 12.697-1.92 17.498-5.761s7.789-8.962 9.069-15.364l33.822 7.682c-3.094 13.23-9.923 23.473-20.592 30.834-10.562 7.363-23.792 11.097-39.583 11.097z" />
                              </g>
                            </g>
                          </g>
                        </svg>  */}
                        {
                          ['pdf'].includes(image?.type.split("/")[1]) ? 
                          <i class="fa fa-file-pdf-o fs-1 text-danger" aria-hidden="true"></i> 
                          : ["jpeg", "jpg"].includes(image?.type.split("/")[1]) ? 
                           <i class="fa fa-picture-o fs-1 text-primary" aria-hidden="true"></i>  :
                           <i class="fa fa-file fs-1 text-info" aria-hidden="true"></i>
                        }

                        <div class='w-full space-y-1 mt-2'>
                          <div class='flex justify-between'>  
                            <span className='foot-cat'>{image?.name}</span>
                            {/* <span class='font-normal text-gray-500'>100%</span> */}
                          </div>

                          <div class=' h-2 w-full bg-gray-300 rounded-md '>
                            <div class=' h-2 w-full bg-green-600 rounded-md '></div>
                          </div>

                        </div>
                      </div>
                    }


                    </div>
                  </div>
                </div>

              </div>

              <div className=''>
                <button type='submit' className='btn btn-theme px-5 p-2 fw-light rounded-3'>{t('Post Job')}</button>
              </div>
            </form>
          </div>
          {/* <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Understood</button>
      </div> */}
        </div>
      </div>
    </div>

    {
      Loading ?
        <div className="my-3 container">
          <div className="loader-wrapper2 rounded-4 ">
            {url === "Christmas" ? (
              <div id="preloader"></div>
            ) : (
              <div className="loader"></div>
            )}
          </div>
        </div> : Category?.data?.length > 0 ?
          <section className='my-4'>
            <div className='container'>
              <div className='hiring_card'>
                <div className='d-flex justify-content-between '>
                  <h3 className='fs-4 '>{t('Select Category')}</h3>
                  <div className=''>
                    {/* <button type="button" className='btn btn-theme px-5  rounded-3  fw-light' style={{ padding: '12px' }}>Applied List</button> */}
                    <button type="button" className='btn btn-theme px-5 ms-2  rounded-3  fw-light' data-bs-toggle="modal" data-bs-target="#staticBackdrop" style={{ padding: '12px' }}>{t("Post a Job")}</button>
                  </div>
                </div>

                <div className='row mt-4' id="vedio_show">
                  {
                    Category?.data?.map((data, index) => (
                      <div className='col-lg-3 mb-3 px-2 col-sm-6 col-md-4 ' key={index}>
                        <Link href={{
                          pathname: `/page/Hiring/${data?.category_slug}`,
                          // query: { 'id': data?.id }
                        }}  >
                          {/* <Link href={`/page/Hiring/Job-list/?id=${data?.id }`} as={'/page/Hiring/Job-list/'}> */}
                          <div className="card_vedio_section1 text-center" onClick={() => setmainId(data?.id)}>
                            <div className="img_gallery_company_icon cursor-pointer cursor-pointer ">
                              <img className="img_gallery_company1" src={data?.new_image ?? data?.category_image} onError={(e) => (e.currentTarget.src = "/assets/images/tatlub-img/No.jpg")} />
                              {/* <div className="img-bg-projj">
                                    <img className="icon_click" src="/assets/images/tatlub-img/s-5.jpg" />
                                  </div> */}
                            </div>
                            <h4 className=" mt-3  text-truncate foot-cat cursor-pointer text-capitalize">{data?.category_name}</h4>
                          </div>
                        </Link>
                      </div>
                    ))
                  }

                  {/* <div className='col-lg-3 mb-3 px-2 col-sm-4 col-md-4 col-6' >
                              <div className="card_vedio_section1 text-center">
                                <div className="img_gallery_company_icon cursor-pointer ">
                                  <img className="img_gallery_company1" src="/assets/images/tatlub-img/Categories/9.jpg" />
                                  <div className="img-bg-projj">
                                    <img className="icon_click" src="/assets/images/tatlub-img/s-5.jpg" />
                                  </div>
                                </div>
                                <h4 className=" mt-3  text-truncate foot-cat cursor-pointer ">Training and Quality</h4>
                              </div>
                            </div> */}
                </div>

              </div>
            </div>
          </section> :
          <div className='container'>
            <div className="card empty-wishlist shadow-sm p-4 mb-3">
              <div className="text-center">
                <img src="/assets/images/tatlub-img/not_Found.png" className="" />
                <h3 className="text-center">{t("DATA NOT FOUND")}</h3>
              </div>
            </div>
          </div>
    }


  </>)
}

export default Category