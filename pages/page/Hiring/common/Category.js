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
  const { ids,setIds } = useId()
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
    
    getFilterbyCategory(id).then(res => {
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
                <div className='popup-review mt-0'>
                  <div className='file file--upload mt-0' onClick={() => document.getElementById('input-file')?.click()}>
                    <label for='input-file mt-0'>
                      <i className="fa fa-file-pdf-o" aria-hidden="true"></i>
                    </label>
                    <input type='file' id='input-file' onChange={(e) => setimage(e.target.files[0])} />
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
        <div className="my-3">
          <div className="loader-wrapper2">
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
                        <Link href={{ pathname: '/page/Hiring/Job-list',  query: { 'id': data?.id } }}  >
                        {/* <Link href={`/page/Hiring/Job-list/?id=${data?.id }`} as={'/page/Hiring/Job-list/'}> */}
                          <div className="card_vedio_section1 text-center" onClick={()=>setmainId(data?.id)}>
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