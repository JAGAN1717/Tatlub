import React, { useEffect, useState } from "react";
import CommonLayout from "../../components/shop/common-layout";
import { Row, Container, Col, Button } from "reactstrap";
import Link from "next/link";
// import { useQuery } from 'react-query'
import { getIDByLazyload } from "../../components/core/shop_requests";
import { useRouter } from "next/router";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Seo from "../../seo/seo";
import { useTranslation } from "react-i18next";
import FilterCategory from './common/category'
import { getFilterbyCategory, getItemByCategory } from "../../components/core/shop_requests";
import InfiniteScroll from "react-infinite-scroll-component";
import { Skeleton } from "primereact/skeleton";



export default function Doctors_list() {
  const { t } = useTranslation();

  const [url, setUrl] = useState();
  const router = useRouter()
  const [doctorsData, setDoctersData] = useState([])
  const [viewMore, setViewMore] = useState(4)
  const [Loading, setLoading] = useState(false)
  const [IsLoading, setIsLoading] = useState(false)
  const [sidebarView, setSidebarView] = useState(false)
  const [filter, setFilter] = useState(17);
  const [filterBycategory, setfilterBycategory] = useState([])
  const [lazyLen, SetLazyLen] = useState([])
  const [showContact, setSContact] = useState(true)


  const openCloseSidebar = () => {
    if (sidebarView) {
      setSidebarView(!sidebarView)
    } else {
      setSidebarView(!sidebarView)
    }
  } 

  useEffect(()=> {
    setSContact(Array(doctorsData.length)?.fill(true))
  },[doctorsData])

  // const { isLoading,data,error, isError, } = useQuery(
  //   ['doctor'],
  //   () => getIDByLazyload(17,0)
  // )

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

  const fetchDoctersInfo = () => {
    setLoading(true)
    const id = filter ?? 17
    getIDByLazyload(id, 0).then(res => {
      // setDoctersData((e)=>[...e,...res.data])
      setDoctersData(res.data)
      SetLazyLen(res?.count)
      setLoading(false)
    }).catch(err => {
      console.error("err", err.message)
      setLoading(false)
    })
  }

  const fetchDoctersFilter = () => {
    setIsLoading(true)
    const id = filter ?? 17
    getIDByLazyload(id, 0).then(res => {
      // setDoctersData((e)=>[...e,...res.data])
      setDoctersData(res.data)
      SetLazyLen(res?.count)
      setIsLoading(false)
    }).catch(err => {
      console.error("err", err.message)
      setIsLoading(false)
    })
  }

  const itemsListLazyLoad = async () => {
    const length = doctorsData?.length;
    const response = await getIDByLazyload(17, length)
    setDoctersData((e) => [...e, ...response.data])
  }


  const fetchCategoryList = async () => {
    try {
      const id = 17
      const response = await getFilterbyCategory(id)
      setfilterBycategory(response.data)
    } catch (error) {
      console.log('error', error.message)
    }
  }

  useEffect(() => {
    if (filter) {
      fetchDoctersFilter()
    } else {
      fetchDoctersInfo()
    }
  }, [filter, lazyLen])


  useEffect(() => {
    fetchCategoryList()
  }, [])

  // useEffect(()=>{
  //   setDoctersData(data?.data)
  // },[data])

  return (
    <CommonLayout title="collection" parent="home">
      <Seo title={`Doctors`} />

      <section className="doctor mb-3">
        <Container>
          {Loading ?
            <div className="my-3">
              <div className="loader-wrapper2">
                {url === "Christmas" ? (
                  <div id="preloader"></div>
                ) : (
                  <div className="loader"></div>
                )}
              </div>
            </div> :
            <Row>
              <Col lg="9">
                {
                  IsLoading ?
                    <div className="my-3">
                      <div className="loader-wrapper2 rounded-4">
                        {url === "Christmas" ? (
                          <div id="preloader"></div>
                        ) : (
                          <div className="loader"></div>
                        )}
                      </div>
                    </div> :
                    <section className="doctorsList">
                      {doctorsData?.length == 0 &&
                        <div className="card empty-wishlist shadow-sm p-4 mb-5">
                          <div className="text-center">
                            <img src="/assets/images/tatlub-img/not_Found.png" className="" />
                            <h3 className="text-center">{t("DATA NOT FOUND")}</h3>
                          </div>
                        </div>
                      }
                      <InfiniteScroll
                        dataLength={doctorsData?.length}
                        next={itemsListLazyLoad}
                        hasMore={lazyLen > doctorsData?.length}
                        loader={
                          <>
                            {lazyLen != doctorsData?.length && (
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
                        {
                          doctorsData?.map((value, index) => (
                            <div className="pt-0" key={index}>
                              <Row>
                                <Col lg="12" className=" mb-3 mb-md-4">
                                  <div className="review_card">
                                    <Row>
                                      <Col md="4">
                                        <img
                                          src={value?.item_image_medium}
                                          alt=""
                                          className="doc-img cursor-pointer"
                                          onError={(e) => (e.currentTarget.src = "/assets/images/tatlub-img/No.jpg")}
                                          onClick={() => router.push({ pathname: `/medical/${value?.item_slug}`,
                                          //  query: { 'clinicId': value?.id } 
                                          })}
                                        />
                                      </Col>
                                      <Col md="8 mt-md-0 mt-3">
                                        <div className="d-md-flex justify-content-between h-100">
                                          <div className="fs-vp-pg d-flex flex-column ">
                                            <div className="mb-auto">
                                              <div className="d-flex align-items-center mb-3">
                                                <Link href={{ pathname: `/medical/${value?.item_slug}`,
                                                //  query: { 'clinicId': value?.id }
                                                  }}>
                                                  <h4 className="fw-600 mb-0 text-capitalize foot-cat cursor-pointer vendor-profile-title pe-1">
                                                    {t(value?.item_title)}
                                                  </h4>
                                                </Link>
                                                <img
                                                  className="me-2 company_detail_icon"
                                                  src="/assets/images/company/1.png"
                                                />
                                              </div>
                                              {
                                                value?.rating ?
                                                  <div className="d-flex align-items-center mb-2">
                                                    {/* <p> */}
                                                    {/* 3.5{" "} */}
                                                    {/* <img
                                              className="mx-1 pb-1 company_detail_icon"
                                              src="/assets/images/company/star-icon.png"
                                            />{" "}
                                            <img
                                              className="mx-1 pb-1 company_detail_icon"
                                              src="/assets/images/company/star-icon.png"
                                            />
                                            <img
                                              className="mx-1 pb-1 company_detail_icon"
                                              src="/assets/images/company/star-icon.png"
                                            />
                                            <img
                                              className="mx-1 pb-1 company_detail_icon"
                                              src="/assets/images/company/icon-8.png"
                                            />
                                            <img
                                              className="mx-1 pb-1 company_detail_icon"
                                              src="/assets/images/company/icon-8.png"
                                            /> */}

                                                    <Stack spacing={1}>
                                                      <Rating
                                                        name="size-large star_rate"
                                                        value={value?.rating}
                                                        // onChange={(e) =>
                                                        //   setRating(e.target.value)
                                                        // }
                                                        readOnly={true}
                                                        defaultValue={1}
                                                        size="small"
                                                      />
                                                    </Stack>
                                                    <span className="custom_ratng_text ms-3">
                                                      {value?.rating + " " + t('Rating')}
                                                    </span>
                                                    {/* </p>{" "} */}
                                                  </div> : ''
                                              }
                                              <div className="d-flex">
                                                <img
                                                  className="me-2 mb-3 company_detail_icon"
                                                  src="/assets/images/tatlub-img/icon-11.png"
                                                />{" "}
                                                <p className="complete_3 text-capitalize">{value?.item_address ?? value?.item_location_str}</p>
                                              </div>
                                              <div className="d-none">
                                                <img
                                                  className="me-2 mb-3 company_detail_icon"
                                                  src="/assets/images/tatlub-img/Icon 10.png"
                                                />{" "}
                                                <p>
                                                  <span className="text-success">
                                                    Open 24 Hrs{" "}
                                                  </span>{" "}
                                                  . {t('Experience')} : 28 years
                                                </p>{" "}
                                              </div>

                                              <div className="row justify-content-start align-items-center pq-img mb-3">
                                                {
                                                  value?.features?.length > 0 &&
                                                  value?.features?.filter((e) => e.item_feature_value != "[object Object]" && e.item_feature_value != null).slice(0, 6).map((valu, i) => (
                                                    <div className="px-1 col-md-4 col-sm-6 mb-2">
                                                      <div className='d-flex  align-items-center  listing-tags  mb-2' key={i}>
                                                        {/* <img src='/assets/images/tatlub-img/Companies/Icons/_Experience.png' /> */}
                                                        <p classname="text-capitalize" ><span className="text-capitalize">{valu?.custom_field?.custom_field_name}</span> : <span className="text-capitalize"> {valu?.custom_field?.custom_field_name == 'Doctor fee' ? valu?.item_feature_value + t("QAR") : valu?.item_feature_value}</span></p>
                                                      </div>
                                                    </div>
                                                  ))
                                                }
                                              </div>
                                            </div>

                                            <div className="d-sm-flex ">
                                              <div className="d-flex ">
                                                {
                                                  showContact[index] ?
                                                      <button
                                                        type="button"
                                                        onClick={()=> {setSContact((pre)=> {
                                                          const old  = [...pre];
                                                          old[index] = false 
                                                          return old
                                                        })}}
                                                        className="btn btn-lead1  d-flex align-items-center justify-content-center"
                                                      >
                                                        <i class="fa fa-phone fs-4  me-2 mb-0 pb-0" aria-hidden="true"></i>
                                                        {/* <img src="/assets/images/tatlub-img/call-2.png " className="btn-img1" /> */}
                                                        {t('Show Number')}
                                                      </button>
                                                     :
                                                    <a href={"tel:" + value?.item_phone ?? value?.user?.phone}>
                                                      <button
                                                        type="button"
                                                        className="btn btn-lead1  d-flex align-items-center justify-content-center"
                                                      >
                                                        <i class="fa fa-phone fs-4  me-3 mb-0 pb-0" aria-hidden="true"></i>
                                                        {/* <img src="/assets/images/tatlub-img/call-2.png " className="btn-img1" /> */}
                                                        {value?.item_phone ?? value?.user?.phone ?? 'Call Now'}
                                                      </button>
                                                    </a>
                                                }
                                              </div>
                                              <div className="d-flex ">
                                                <Link href={{ pathname: `/medical/${value?.item_slug}`, 
                                                // query: { 'clinicId': value?.id }
                                                 }}>
                                                  <button
                                                    type="button"
                                                    className="btn btn-lead1 mx-sm-2"
                                                    disabled={true}
                                                  >
                                                    {t('Book Appointment')}{" "}
                                                  </button>
                                                </Link>
                                              </div>
                                            </div>
                                          </div>

                                          <div className="d-flex profile-share_mobile">
                                            <div>
                                              <div className="like_profile me-2 d-none">
                                                <img
                                                  className="icon_ls"
                                                  src="/assets/images/tatlub-img/icon-2.png"
                                                />
                                              </div>
                                            </div>
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
                                      </Col>
                                    </Row>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          ))
                        }
                      </InfiniteScroll>


                      {/* {
                      // doctorsData?.length > 4 && lazyLen  <  doctorsData?.length &&
                      doctorsData?.length > 4 && viewMore != doctorsData?.length &&
                      <div className="text-center my-md-4 py-3">
                        <button type="button" className="btn_hover fw-bolder p-2 px-4" onClick={() => { 
                          setViewMore(doctorsData?.length) 
                          // setViewMore((e)=>e+4) 
                          // SetLazyLen(doctorsData?.length) 
                        }}>
                          {t('Load More')}
                        </button>
                      </div>
                    } */}
                    </section>
                }
              </Col>

              <Col lg="3" className="d-none d-lg-block">
                {
                  <section className="doctors_sidebar">
                    <div className="review_card doc-form mb-4">
                      <FilterCategory setFilters={setFilter} filters={filter} filterCategory={filterBycategory} />
                    </div>

                    <div className="review_card doc-form mb-4 d-none">
                      <div className="mb-3 ">
                        <h5 className="fw-bolder">Related categories in Chennai</h5>
                      </div>
                      <ul>
                        <li>Cardiologists   </li>
                        <li>Cardiac Hospitals</li>
                        <li>Eecp Therapy Doctors</li>
                        <li>Echocardiologists</li>
                        <li>Eecp Treatment Centers</li>
                        <li>Cardiologists in Vada Palani</li>
                        <li>Cardiologists in Kodambakkam</li>
                        <li>Cardiologists in Porur</li>
                        <li>Cardiologists in Adyar</li>
                        <li>Cardiologists in Chennai</li><br></br>
                        <li className="text-color cursor-pointer">See more <i className="fa fa-angle-right pe-2" aria-hidden="true"></i></li>
                      </ul>
                    </div>
                  </section>
                }
              </Col>
            </Row>
          }


          {/* {
           doctorsData?.length == 0 && 
           <div className="card empty-wishlist shadow-sm p-4 mb-5">
                        <div className="text-center">
                          <img src="/assets/images/tatlub-img/not_Found.png" className="" />
                          <p className="text-muted text-center">{t('DATA NOT FOUND')}</p>
                        </div>
                      </div>
          } */}
        </Container>
      </section>


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
              {/* <CategoryType /> */}

              <div className="review_card shadow-none doc-form mb-4">
                <FilterCategory setFilters={setFilter} filters={filter} filterCategory={filterBycategory} />
              </div>

              <div className="review_card shadow-none doc-form mb-4 d-none">
                <div className="mb-3 ">
                  <h5 className="fw-bolder">Most searched localities in Chennai</h5>
                </div>
                <ul>
                  <li>Cardiologists in Chennai</li>
                  <li>Cardiologists in T Nagar</li>
                  <li>Cardiologists in Parrys</li>
                  <li>Cardiologists in Anna Nagar </li>
                  <li>Cardiologists in Ashok Nagar </li>
                  <li>Cardiologists in Vada Palani</li>
                  <li>Cardiologists in Kodambakkam</li>
                  <li>Cardiologists in Porur</li>
                  <li>Cardiologists in Adyar</li>
                  <li>Cardiologists in Chennai</li><br></br>
                  <li className="text-color cursor-pointer">See more <i className="fa fa-angle-right pe-2" aria-hidden="true"></i></li>
                </ul>
              </div>

              <div className="review_card shadow-none  doc-form mb-4 d-none">
                <div className="mb-3 ">
                  <h5 className="fw-bolder">Related categories in Chennai</h5>
                </div>
                <ul>
                  <li>Cardiologists   </li>
                  <li>Cardiac Hospitals</li>
                  <li>Eecp Therapy Doctors</li>
                  <li>Echocardiologists</li>
                  <li>Eecp Treatment Centers</li>
                  <li>Cardiologists in Vada Palani</li>
                  <li>Cardiologists in Kodambakkam</li>
                  <li>Cardiologists in Porur</li>
                  <li>Cardiologists in Adyar</li>
                  <li>Cardiologists in Chennai</li><br></br>
                  <li className="text-color cursor-pointer">See more <i className="fa fa-angle-right pe-2" aria-hidden="true"></i></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

    </CommonLayout>
  );
}
