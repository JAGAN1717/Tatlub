import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/router'
import moment from 'moment';
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { potJobs } from '../../../../components/core/realestate_request';
import { getItemByLazyload } from '../../../../components/core/shop_requests';
import { useState } from 'react';
import { useId } from '../../../../IdContext';
import { mainId, setmainId } from '../../../../IDmain';
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroll-component";



export default function JobList({ Loading, Jobdata, wantedjobs, setWantedJobs, setJobData, lazyLen }) {

  const { t } = useTranslation();
  const [minSalary, setminSalary] = useState('')
  const [maxSalary, setmaxSalary] = useState('')
  const [per_shc, setper_shc] = useState('Per Month')
  const [Jobtype, setJobtype] = useState('')
  const [Jobschedule, setJobschedule] = useState('')
  const [image, setimage] = useState('')

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
          setWantedJobs(true)
          document.getElementById('clicknOnWantedjobs')?.click()
          document.getElementById('closejhfghdsdwr')?.click()
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

  const itemsListLazyLoad = async () => {
    let ids = id
    const length = Jobdata?.length;
    const response = await getItemByLazyload(ids, length)
    setJobData((e) => [...e, ...response.data])
  }

  const router = useRouter()


  return (
    <section className=''>
      <div className="modal fade" id="staticBackdrop" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="false">
        <div className="modal-dialog modal-dialog-centered my-2 modal-lg">
          <div className="modal-content">
            <div className="modal-body p-4">
              <form onSubmit={formik.handleSubmit}>
                <div className='row mb-3'>
                  <h4 className='mb-3'>{t('Provide basic information')}</h4>
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
                    <input type='text' {...formik.getFieldProps('experience')} onChange={(e) => formik.setFieldValue('experience', e.target.value.replace(/[^0-9]/g, ""))} placeholder={t('Years of Experience')} className='form-control' />
                  </div>
                </div>

                <div className='mb-3'>
                  <h4 className='mb-3'>{t('What is the job type')}*</h4>
                  <div className='row'>
                    <div className='col mb-3'>
                      <button type="button" onClick={() => setJobtype('Full-time')} className={`btn ${Jobtype == 'Full-time' ? 'btn-theme' : 'btn-outline-secondary'}  w-100 rounded px-3 text-truncate fw-light p-2`}>{t('Full-time')}</button>
                    </div>
                    <div className='col mb-3'>
                      <button type="button" onClick={() => setJobtype('Regular/Permanent')} className={`btn ${Jobtype == 'Regular/Permanent' ? 'btn-theme' : 'btn-outline-secondary'}  w-100 rounded px-3 text-truncate fw-light p-2`}>{t('Regular')}/{t('Permanent')}</button>
                    </div>
                    <div className='col mb-3'>
                      <button type="button" onClick={() => setJobtype('Fresher')} className={`btn ${Jobtype == 'Fresher' ? 'btn-theme' : 'btn-outline-secondary'}  w-100 rounded px-3 text-truncate fw-light p-2`}>{t('Fresher')}</button>
                    </div>
                    <div className='col mb-3'>
                      <button type="button" onClick={() => setJobtype('Part-time')} className={`btn ${Jobtype == 'Part-time' ? 'btn-theme' : 'btn-outline-secondary'}  w-100 rounded px-3 text-truncate fw-light p-2`}>{t('Part-time')}</button>
                    </div>
                    <div className='col mb-3'>
                      <button type="button" onClick={() => setJobtype('Internship')} className={`btn ${Jobtype == 'Internship' ? 'btn-theme' : 'btn-outline-secondary'}  w-100 rounded px-3 text-truncate fw-light p-2`}>{t('Internship')}</button>
                    </div>
                  </div>
                </div>

                <div className='mb-3'>
                  <h4 className='mb-3'>{t("What is the schedule for this job")}?</h4>
                  <div className='row'>
                    <div className='col mb-3  pe-0'>
                      <button type="button" onClick={() => setJobschedule('Day shift')} className={`btn ${Jobschedule == 'Day shift' ? 'btn-theme' : 'btn-outline-secondary'}  w-100 rounded px-3 text-truncate fw-light p-2`}>{t('Day shift')}</button>
                    </div>
                    <div className='mb-3 col'>
                      <button type="button" onClick={() => setJobschedule('Morning shift')} className={`btn ${Jobschedule == 'Morning shift' ? 'btn-theme' : 'btn-outline-secondary'}  w-100 rounded px-3 text-truncate fw-light p-2`}>{t('Morning shift')}</button>
                    </div>
                    <div className='mb-3 col'>
                      <button type="button" onClick={() => setJobschedule('Flexible shift')} className={`btn ${Jobschedule == 'Flexible shift' ? 'btn-theme' : 'btn-outline-secondary'}  w-100 rounded px-3 text-truncate fw-light p-2`}>{t('Flexible shift')}</button>
                    </div>
                    <div className='mb-3 col'>
                      <button type="button" onClick={() => setJobschedule('Rotational shift')} className={`btn ${Jobschedule == 'Rotational shift' ? 'btn-theme' : 'btn-outline-secondary'}  w-100 rounded px-3 text-truncate fw-light p-2`}>{t('Rotational shift')}</button>
                    </div>
                    <div className='mb-3 col'>
                      <button type="button" onClick={() => setJobschedule('Night shift')} className={`btn ${Jobschedule == 'Night shift' ? 'btn-theme' : 'btn-outline-secondary'}  w-100 rounded px-3 text-truncate fw-light p-2`}>{t('Night shift')}</button>
                    </div>
                    <div className='mb-3 col-3'>
                      <button type="button" onClick={() => setJobschedule('Monday to Friday')} className={`btn ${Jobschedule == 'Monday to Friday' ? 'btn-theme' : 'btn-outline-secondary'}  w-100 rounded px-3 text-truncate fw-light p-2`}>{t('Monday to Friday')}</button>
                    </div>
                    <div className='mb-3 col-3'>
                      <button type="button" onClick={() => setJobschedule('Evening shift')} className={`btn ${Jobschedule == 'Evening shift' ? 'btn-theme' : 'btn-outline-secondary'}  w-100 rounded px-3 text-truncate fw-light p-2`}>{t('Evening shift')}</button>
                    </div>
                  </div>
                </div>

                <div className='row mb-3'>
                  <h4 className='mb-3'>{t('How many people do you want to hire for this opening')}?*</h4>
                  <div className='col-12 '>
                    <input type='text' {...formik.getFieldProps('number_of_people_for_hiring')} onChange={(e) => formik.setFieldValue('number_of_people_for_hiring', e.target.value.replace(/[^0-9]/g, ""))} placeholder='' className='form-control' />
                  </div>
                </div>

                <div className='row mb-3'>
                  <h4 className='mb-3'>{t('What is the pay rate or range')}?</h4>
                  <div className='col-md-4 mb-3'>
                    <input type='text' placeholder={t('Minimum')} value={minSalary} onChange={(e) => setminSalary(e.target.value.replace(/[^0-9]/g, ""))} className='form-control' />
                  </div>
                  <div className='col-md-4 mb-3'>
                    <input type='text' placeholder={t('Maximum')} value={maxSalary} onChange={(e) => setmaxSalary(e.target.value.replace(/[^0-9]/g, ""))} className='form-control' />
                  </div>
                  <div className='col-md-4 '>
                    <select className="form-select" onChange={(e) => setper_shc(e.target.value)} aria-label="Default select example">
                      <option selected value="Per Month">{t('Per Month')}</option>
                      <option value="Per Annum">{t('Per Annum')}</option>
                    </select>
                  </div>
                </div>

                <div className='mb-3'>
                  <h4 className='mb-2'>{t('Job description')}*</h4>
                  <p className='text-muted'>{t('Describe the responsibilities of this job, required work experience, skills, or education.')}</p>
                  <div className='row'>
                    <div className='col-12'>
                      <textarea className="form-control" {...formik.getFieldProps('job_description')} id="exampleFormControlTextarea1" rows="4"></textarea>
                    </div>
                  </div>
                </div>

                <div className=''>
                  <h4 className=''>{'Upload a PDF'} / {t('DOCX or image')}</h4>
                  <div className='popup-review mt-0'>
                    <div className='file file--upload mt-0' onClick={() => document.getElementById('input-file')?.click()}>
                      <label for='input-file mt-0'>
                        <i className="fa fa-file-pdf-o" aria-hidden="true"></i>
                      </label>
                      <input id='input-file' type='file' onChange={(e) => setimage(e.target.files[0])} />
                    </div>
                  </div>
                </div>
                <div className=''>
                  <button type='submit' className='btn btn-theme px-5 p-2 fw-light rounded-3'>{t('Post Job')}</button>
                </div>
              </form>
              <button type="button" className="btn btn-secondary d-none" id='closejhfghdsdwr' data-bs-dismiss="modal"></button>
            </div>

          </div>
        </div>
      </div>

      <div className='job_list_layout'>
        <div className='d-md-flex justify-content-between '>
          <div className='d-flex align-items-center mb-2'>
            {/* <h3 className='fw-bold'>{Jobdata?.length} Listing</h3> */}
            <div className=''>
              <ul className="nav nav-pills">
                <li className="nav-item " onClick={() => setWantedJobs(false)}>
                  <a className={`nav-link tops cursor-pointer ${!wantedjobs && "active"}`} aria-current="page" >{t('OFFERED JOBS')}</a>
                </li>
                <li className="nav-item ms-2" onClick={() => setWantedJobs(true)}>
                  <a className={`nav-link tops cursor-pointer ${wantedjobs && "active"}`} >{t('WANTED JOBS')}</a>
                </li>
                {/* <li className="nav-item ms-2"  onClick={()=> setWantedJobs(true)}>
                <a className={`nav-link tops ${wantedjobs && "active"}`} href="#">APPLIED JOBS</a>
                </li> */}
              </ul>
            </div>
          </div>
          <div className='mb-2'>
            <button type="button" className='btn btn-theme px-5  rounded-3  fw-light' data-bs-toggle="modal" data-bs-target="#staticBackdrop" style={{ padding: '12px' }}>{t('Post Job')}</button>
          </div>
        </div>

        {
          !wantedjobs ?
            <InfiniteScroll
              dataLength={Jobdata?.length}
              next={itemsListLazyLoad}
              hasMore={lazyLen > Jobdata?.length}
              loader={
                <>
                  {lazyLen != Jobdata?.length && (
                    <div className='w-100 h-100'>
                      <div className='d-flex justify-content-center flex-column align-items-center '>
                        <div className="text-center">
                          <img src="/assets/images/tatlub-img/loadingGif3.gif" className="" style={{ width: '100px' }} />
                        </div>
                      </div>
                    </div>
                  )}
                </>
              }
              endMessage={
                <div className="text-center ">
                  {/* <img src="/assets/images/tatlub-img/Warning.svg"  className="w-25" />
                                  <h4 className="  my-4" >
                                  @ END OF LIST
                                  </h4> */}
                </div>
              }
            >
              <div className='row mt-3 px-1'>
                {
                  Jobdata?.map((data, index) => {
                    let day = moment(data?.created_at);
                    let fromhour = moment.utc(day).local().startOf('seconds').fromNow()

                    return (
                      <div className='col-xl-6 mb-4 ' key={index}>
                        <div className='listing_card d-flex flex-column justify-content-between h-100'>
                          <div>
                            <div className='row align-items-center mb-3'>
                              <div className='col-md-3 mb-2'>
                                <Link href={{ pathname: '/page/Hiring/Job-Details', query: { 'id': data?.id } }} >
                                  <img src={data?.item_image_medium} onClick={() => { setmainId(data?.id) }} onError={(e) => (e.currentTarget.src = "/assets/images/tatlub-img/No.jpg")} className='company-img cursor-pointer' />
                                </Link>
                              </div>
                              <div className='col-md-9'>
                                <div className='d-sm-flex justify-content-between'>
                                  <div className=''>
                                    <Link href={{ pathname: '/page/Hiring/Job-Details', query: { 'id': data?.id } }}  >
                                      <h4 className='fw-bold complete_2 cursor-pointer foot-cat text-capitalize mb-2' onClick={() => setmainId(data?.id)}>{data?.item_title}</h4>
                                    </Link>
                                    <p className='text-capitalize'>{data?.user?.name}</p>
                                    {data?.item_address &&
                                      <p className='text-muted mb-0 d-flex align-items-center'> <img src='/assets/images/tatlub-img/Companies/Icons/_Location.png' className='locaList-img me-2' /><span className="complete_2">{data?.item_address ?? data?.item_location_str}</span></p>
                                    }
                                  </div>
                                  <div className=''>
                                    <div className="d-flex profile-share_mobile">
                                      <div
                                        role="button"
                                        data-bs-toggle="modal"
                                        data-bs-target={"#delete_confirm_popup12212"}
                                      ><div className="like_profile me-2 cursor-pointer"><img className="icon_ls" src="/assets/images/tatlub-img/Companies/Icons/_Share active.png" /></div></div>
                                      {/* <div> <div className="share_profile me-2 cursor-pointer "><img className="icon_ls" src="/assets/images/tatlub-img/Companies/Icons/_Fav.png" /></div></div> */}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className='row justify-content-start align-items-center pq-img'>
                              {
                                data?.features?.length > 0 &&
                                data?.features?.filter((e) => e.item_feature_value != '[object Object]').slice(0, 3).map((valu, i) => (
                                  <div className="col px-1">
                                    <div className='d-flex  justify-content-center align-items-center mx-sm-2 listing-tags  mb-3' key={i}>
                                      <img src='/assets/images/tatlub-img/Companies/Icons/_Experience.png' />
                                      <p className="text-capitalize" >{valu?.item_feature_value}</p>
                                    </div>
                                  </div>
                                ))
                              }
                              {/* <div className='d-flex align-items-center listing-tags  mb-3'>
                            <img src='/assets/images/tatlub-img/Companies/Icons/_Salary.png' classname=" " />
                           <p classname="" >15,000-20,000 a month</p>
                          </div>
                           <div className='d-flex mx-sm-2 align-items-center listing-tags  mb-3'>
                            <img src='/assets/images/tatlub-img/Companies/Icons/_Experience.png' />
                          <p classname="" >Full-time</p>
                          </div>
                          <div className='d-flex align-items-center listing-tags  mb-3'>
                            <img src='/assets/images/tatlub-img/Companies/Icons/_Shift.png' classname=" " />
                          <p classname=" " >Day Shift</p>
                          </div> */}
                            </div>
                            {/* <div className='desc mb-3'> */}
                            <div className='desc mb-3'>
                              <h6 className='lh-base complete_4'> {data?.item_description}</h6>
                              {/* <p className='text-truncate'><i className='fa fa-angle-right pe-1 ' />  Age within 25 years..</p>
                                   <p className='text-truncate'><i className='fa fa-angle-right pe-1 ' />  with or without experience..</p>
                                   <p className='text-truncate'><i className='fa fa-angle-right pe-1 ' />  Chennai, Tamil Nadu: Reliably commute or planning to.....</p> */}
                            </div>
                          </div>
                          <div className=''>
                            <p className='text-muted'>{t('Posted')} {fromhour}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </ InfiniteScroll>
            :
            <div className='row mt-3'>
              {
                Loading ?
                  <div className="my-3">
                    <div className="loader-wrapper2">
                      {(
                        <div className="loader"></div>
                      )}
                    </div>
                  </div> :
                    Jobdata?.map((data, index) => {
                      let day = moment(data?.created_at);
                    let fromhour = moment.utc(day).local().startOf('seconds').fromNow()
                    return (
                      <div className='col-xl-6 mb-4' key={index}>
                        <div className='listing_card d-flex flex-column justify-content-between h-100'>
                          <div>
                            <div className='row align-items-center mb-3'>
                              <div className='col-md-12'>
                                <div className='d-sm-flex justify-content-between'>
                                  <div className=''>

                                    {/* <h4 className='fw-bold complete_2 cursor-pointer foot-cat pb-2 '>{data?.job_title}</h4> */}
                                    <div className='d-sm-flex justify-content-start align-items-center '>
                                      <div className='d-flex align-items-center mx-sm-2 listing-tags  mb-3' >
                                        {/* <img src='/assets/images/tatlub-img/Companies/Icons/_Experience.png' /> */}
                                        <p className="mx-2 mb-0">{data?.job_title ?? t('Not Found')}</p>
                                      </div>
                                    </div>
                                    <p className='text-muted mb-2 d-flex align-items-center'> <img src='/assets/images/tatlub-img/Companies/Icons/_Salary.png' className='locaList-img me-2' />{t('SALARY')}   <span className=' ms-3 fw-bold text-dark'>{data?.pay_rate ?? t("As Per Norms")}</span></p>
                                    <p className='text-muted mb-2 d-flex align-items-center'> <img src='/assets/images/tatlub-img/Companies/Icons/_Shift.png' className='locaList-img me-2' />{t('SCHEDULE')}   <span className=' ms-3 fw-bold text-dark'>{data?.job_schedule}</span></p>
                                    <p className='text-muted mb-2 d-flex align-items-center'> <img src='/assets/images/tatlub-img/Companies/Icons/_Experience.png' className='locaList-img me-2' />{t('EXPERIENCE')}   <span className=' ms-3 fw-bold text-dark'>{data?.experience}</span></p>
                                  </div>
                                  <div className=''>
                                    <div className="d-flex profile-share_mobile">
                                      {/* <div 
                                      role="button"
                                      data-bs-toggle="modal"  
                                      data-bs-target={"#delete_confirm_popup12212"}
                                      ><div className="like_profile me-2 cursor-pointer"><img className="icon_ls" src="/assets/images/tatlub-img/Companies/Icons/_Share active.png" /></div></div> */}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className='desc mb-3'>
                              <h6 className='lh-base complete_4'>{data?.job_description}</h6>
                            </div>
                          </div>
                          <div className=''>
                            <p className='text-muted'>{t('Posted')} {fromhour}</p>
                          </div>

                        </div>
                      </div>
                    )
                  })
              }

            </div>
        }

      </div>
    </section>
  )
}
