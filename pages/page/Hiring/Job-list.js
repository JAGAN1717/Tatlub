import React, { useState, lazy, Suspense, useEffect } from 'react';
import CommonLayout from '../../../components/shop/common-layout'
import Seo from '../../../seo/seo'
import JobList from './common/JobList';
import CategoryType from './common/categoryType';
import { getItemByLazyload, getFilterbyCategory } from '../../../components/core/shop_requests';
import { getwantedJobs } from '../../../components/core/realestate_request';
import { mainId } from '../../../IDmain';
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";



const ListJobs = () => {

  const router = useRouter()
  const { id } = router.query;
  const [Jobdata, setJobData] = useState([])
  const [url, setUrl] = useState();
  const [Loading, setLoading] = useState(false)
  const [IsLoading, setIsLoading] = useState(false)
  const [wantedjobs, setWantedJobs] = useState(false)
  const [lazyLen, setlazyLen] = useState()
  const [Category, setCategory] = useState([])
  const [categoryId, setcategoryId] = useState()
  const { t } = useTranslation();

  const fetchJobcategory = () => {
    setLoading(true)
    getFilterbyCategory(14).then(res => {
      setCategory(res.data)
      setLoading(false)
    }).catch(err => {
      console.error("err", err.message)
      setLoading(false)
    })
  }

  useEffect(() => {
    fetchJobcategory()
  }, [])


  const fetchwantedJobs = () => {
    setIsLoading(true)
    getwantedJobs().then(res => {
      setIsLoading(false)
      setJobData(res.data?.filter(prp => prp?.job_title != null))
    }).catch(err => {
      console.error('err', err.message)
      setIsLoading(false)
    })
  }

  // const {isLoading,data:jobs,error,isError,refetch} = useQuery(
  //   ['doctor'],
  //   () => getItemByLazyload(id,0)
  // )

  const fetchJobList = () => {
    setLoading(true)
    let ids = categoryId ?? id
    getItemByLazyload(ids, 0).then(res => {
      setJobData(res.data)
      setlazyLen(res.count)
      setLoading(false)
    }).catch(err => {
      console.error("err", err.message)
      setLoading(false)
    })
  }



  const fetchJobList2 = () => {
    getItemByLazyload(categoryId, 0).then(res => {
      setJobData(res.data)
      setlazyLen(res.count)
    }).catch(err => {
      console.error("err", err.message)
    })
  }


  // const itemsListLazyLoad = async () => {
  //   let ids = id
  //   const length = Jobdata?.length;
  //   const response = await getItemByLazyload(ids, length)
  //   setJobData((e) => [...e, ...response.data])
  // }


  useEffect(() => {
    categoryId && fetchJobList2()
  }, [categoryId])


  useEffect(() => {
    // setJobData(jobs?.data)
    let ids = id ?? mainId()
    wantedjobs && fetchwantedJobs()
    !wantedjobs && fetchJobList()
  }, [id, wantedjobs])


  const openSetting = () => {
    if (process.browser) {
      document.getElementById("setting_box1").classList.add("open-setting");
      document.getElementById("setting-icon1").classList.add("open-icon");
    }
  };

  const closeSetting = () => {
    if (process.browser) {
      document.getElementById("setting_box1").classList.remove("open-setting");
      document.getElementById("setting-icon1").classList.remove("open-icon");
    }
  };

  return (
    <>
      <button type='button' onClick={() => fetchwantedJobs()} id='clicknOnWantedjobs' className='d-none' />
      <CommonLayout parent="home" title="Jobs">
        <Seo title={'Jobs'} url={'Category'} />
        <div className='container mt-lg-5 mt-3 mb-lg-5 mb-3'>
          {
            Loading ?
              <div className="my-3">
                <div className="loader-wrapper2 rounded-4">
                  {url === "Christmas" ? (
                    <div id="preloader"></div>
                  ) : (
                    <div className="loader"></div>
                  )}
                </div>
              </div> : Jobdata?.length > 0 ?
                <div className='row'>
                  <div className='col-md-3 d-lg-block d-none'>
                    <CategoryType Category={Category} categoryId={categoryId} wantedjobs={wantedjobs} setcategoryId={setcategoryId} />
                  </div>
                  <div className="col-lg-9">
                    <JobList Loading={IsLoading} Jobdata={Jobdata} wantedjobs={wantedjobs} setWantedJobs={setWantedJobs} lazyLen={lazyLen} setJobData={setJobData} />
                  </div>
                </div> :
                <div className="card empty-wishlist shadow-sm p-4">
                  <div className="text-center">
                    <img src="/assets/images/tatlub-img/not_Found.png" className="" />
                    <h3 className="text-center">{t("DATA NOT FOUND")}</h3>
                  </div>
                </div>
          }

          <div>
            <a href={null} onClick={() => openSetting()}>
              <div className="setting-sidebar1 d-lg-none " id="setting-icon1">
                <div>
                  <i className="fa fa-filter" aria-hidden="true"></i>
                </div>
              </div>
            </a>

            <div id="setting_box1" className="setting-box1 d-lg-none">
              <div className="setting_box_body">
                <div onClick={() => closeSetting()}>
                  <div className="sidebar-back text-start">
                    <i className="fa fa-angle-left pe-2" aria-hidden="true"></i>{" "}
                    {t("Back")}
                  </div>
                </div>
                <div className="setting-body">
                  <div className="p-3">
                    <h3 className="mb-md-4 mb-3">{t("Categories")}</h3>
                    <ul className="d-block ">
                      {
                        Category?.length > 0 ?
                          Category?.map((data, index) => (
                            <li className="cursor-pointer foot-cat text-truncate w-100" key={index}>
                              <div class="form-check ms-2" onClick={() => setcategoryId(data?.id)}>
                                <input class="form-check-input" type="checkbox" checked={categoryId == data.id ? true : false} value="" id={`flexCheckCat${index}`} />
                                <label class="form-check-label text-capitalize" for={`flexCheckCat${index}`}>
                                  {data?.category_name}
                                </label>
                              </div>
                            </li>
                          )) :
                          <li className="cursor-pointer foot-cat text-truncate w-100">
                            <label class="form-check-label" >
                              {t("No data Found")}
                            </label>
                          </li>
                      }
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CommonLayout>
    </>
  )
}

export default ListJobs;