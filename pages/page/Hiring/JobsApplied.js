import React, { useState, useEffect, useContext } from 'react';
import CommonLayout from '../../../components/shop/common-layout'
import Category from './common/Category'
import { getappliedJobs,getJobApplylist } from '../../../components/core/realestate_request';
import AuthContex from '../../../components/auth/AuthContex'
import { useRouter } from 'next/router';
import Seo from "../../../seo/seo";
import { useTranslation } from "react-i18next";



const SelectCategory = () => {
    const { t } = useTranslation();

    const router = useRouter()
    const [appliedjobs, setAppliedJons] = useState([])
    const [Loading, setLoading] = useState(false)
    const [url, setUrl] = useState();

    const { userData } = useContext(AuthContex)

    const {applyJobs} = router.query 

    const fetchAppliedJobs = () => {
        let id = userData?.id
        setLoading(true)
        getappliedJobs(id).then(res => {
            setAppliedJons(res.data)
            // setLoading(false)
        }).catch(err => console.error('err', err.message), setLoading(false))
    }

    const fetchAppliedJobs2 = () => {
        let id = userData?.id
        setLoading(true)
        getJobApplylist(id).then(res => {
            setAppliedJons(res.data)
            // setLoading(false)
        }).catch(err => console.error('err', err.message), setLoading(false))
    }


    useEffect(() => {
      !applyJobs &&  fetchAppliedJobs() 
       applyJobs && fetchAppliedJobs2()
    }, [applyJobs])




    return (
        <CommonLayout parent="home" title="Select Category">
    <Seo title={`Jobs`} />

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
                    </div> : appliedjobs?.length > 0 ?
                        <div className='applied-job row justify-content-center mb-3'>
                            {
                                appliedjobs?.map((data, index) => (
                                    <div class="card border-0 col-md-4 col-sm-6 mb-2" key={index}>
                                        <div class="card-body">
                                            <div class="card-company-fit row mb-3">
                                                <div className='col-lg-5 mb-lg-0 mb-2'>
                                                    <img className='w-100 h-100'
                                                        src=""
                                                        onError={(e) => (e.currentTarget.src = "/assets/images/tatlub-img/No.jpg")}
                                                    />
                                                </div>

                                                <div className='col '>
                                                    <h5 class="card-title text-capitalize complete_1  job-title">{data?.name}</h5>
                                                    <div class=" mt-3">
                                                        <div className='d-flex mb-3'>
                                                            <i class="fa fa-envelope-o" aria-hidden="true"></i>
                                                            <h4 className='ms-2'> {data?.email}</h4>
                                                        </div>
                                                        <div className='d-flex '>
                                                            <i class="fa fa-paper-plane" aria-hidden="true"></i>
                                                            <h4 className='ms-2 text-capitalize complete_2'>{data?.position}</h4>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>


                                            <div class="card-job-details mb-3">
                                                <div className='d-flex align-items-center'>
                                                  {data?.item_address &&  <i class="fa fa-map-marker text-color fs-18" aria-hidden="true"></i> }
                                                    <h3 className='ms-2 mb-0 complete_2 text-capitalize'>{data?.item_address ?? data?.item_location_str}</h3>
                                                </div>
                                            </div>

                                            <div class="skills-container">

                                                <div id="stats" className='row w-100 text-center'>
                                                    <div class="col">
                                                        <p class="stat ">{data?.experience}</p>
                                                        <p class="label ">{t("Experience")}</p>
                                                    </div>
                                                    <div class="col">
                                                        <p class="stat text-uppercase complete_1 ">{data?.qualification}</p>
                                                        <p class="label ">{t("Qualification")}</p>
                                                    </div>
                                                    <div class="col">
                                                        <p class="stat ">{data?.year_of_passed_out ?? '_'}</p>
                                                        <p class="label ">{t("Year")}</p>
                                                    </div>
                                                </div>
                                                {
                                                    !applyJobs &&
                                                <div className='d-flex justify-content-end'>
                                                    <button type='button' disabled={!data?.image} onClick={()=> window.open(data?.image, '_blank')} className="btn send_enquery_btn mt-3" >
                                                        {t("View Resume")}
                                                    </button>
                                                </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }

                        </div>
                        :
                        <div className='container'>
                                                    <div className="card empty-wishlist shadow-sm p-4 mb-3">
                            <div className="text-center">
                                <img src="/assets/images/tatlub-img/not_Found.png" className="" />
                                <h3 className="text-center">{t("DATA NOT FOUND")}</h3>
                            </div>
                        </div>
                        </div>
            }
        </CommonLayout>
    )
}

export default SelectCategory;