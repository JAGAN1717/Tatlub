import React, { useState } from 'react';
import CommonLayout from '../../../components/shop/common-layout'
import { Container, Row, Col, Media, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
// import { withApollo } from "../../../helpers/apollo/apollo";
import HeaderEight from "../../../components/headers/header-eight";
import Banner from "./components/Banner";
import TopCollection from "../../../components/common/Collections/Collection1";
import SpecialProducts from "../../../components/common/Collections/TabCollection4";
import Instagram from "../../../components/common/instagram/instagram1";
import Blog from "../../../components/common/Blog/blog1";
import { Product4 } from "../../../services/script";
import ModalComponent from "../../../components/common/Modal";
import Helmet from "react-helmet";
import MasterFooterTwo from "../../../components/footers/common/MasterFooterTwo";
import Select from 'react-select';
import Link from "next/link";
import { getBanner, getProperty, getBuilders } from '../../../components/core/realestate_request'
// import { useQuery } from 'react-query'
import { useRouter } from 'next/router';
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from 'react';
import Seo from '../../../seo/seo';
import { useTranslation } from "react-i18next";
import { Skeleton } from "primereact/skeleton";




const testvts = () => {
  const data1 = [
    {
      value: 1,
      label: "Chennai"
    },
    {
      value: 2,
      label: "Madurai"
    },
    {
      value: 3,
      label: "Tirunelveli"
    },
    {
      value: 4,
      label: "Coimbator"
    },
    {
      value: 5,
      label: "Nazareth"
    },
    {
      value: 6,
      label: "Chennai"
    }
  ];
  const { t } = useTranslation();

  // set value for default selection
  const [selectedValue, setSelectedValue] = useState([]);
  const [url, setUrl] = useState();
  const [searchkey, setSearchKey] = useState(null);
  const [viewMore, setViewMore] = useState(6);
  const router = useRouter()
  const [data, setData] = useState([])
  const [Builders, setBuilders] = useState([])
  const [Loading, setLoading] = useState(false);
  const [properties, setProperties] = useState([])



  // const {isLoading,data,isError, error, refetch } = useQuery(['banner'],
  // () => getBanner())

  // const { data, isError, } = useQuery(
  //   ['banner'],
  //   () => getBanner()
  // )

  const fetchBanners = () => {
    setLoading(true)
    getBanner().then(res => {
      setData(res)
      setLoading(false)
    }).catch(err => {
      console.error("err", err.message)
      setLoading(false)
    })
    // setLoading(false)
  }

  useEffect(() => {
    fetchBanners();
    fetchBuilders();
    fetchProperty()
  }, [])

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchkey) {
      router.push({ pathname: '/layouts/Property', query: { 'searchKey': searchkey } })
    } else {
      // router.push({
      //   pathname: "/NotFound/search",
      //   query: { search: searchkey, city: localStorage.getItem('city') },
      // }); 
      toast.info('Please Enter you want Property !', {
        position: "bottom-right",
        autoClose: 300,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
    }
  }


  // const {isLoading,data:properties,error,refetch} = useQuery(
  //   ['properties'],
  //   () => getProperty()
  // );

  const fetchProperty = () => {
    setLoading(true)
    getProperty().then(res => {
      setProperties(res)
      setLoading(false)
    }).catch(err => {
      console.error("err", err.message)
      setLoading(false)
    })
  }

  // const {data:Builders} = useQuery(
  //   ['Builders'],
  //   () => getBuilders()
  // );

  const fetchBuilders = () => {
    setLoading(true)
    getBuilders().then(res => {
      setBuilders(res)
      setLoading(false)
    }).catch(err => {
      console.error("err", err.message)
      setLoading(false)
    })
    // setLoading(false)
  }




  // handle onChange event of the dropdown
  const handleChange = (e) => {
    setSelectedValue(Array.isArray(e) ? e.map(x => x.value) : []);
  }

  return (<>
    <CommonLayout>
      <Seo title={`Real Estate`} />
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
          </div> : data?.data ?
           <div className="realestate_section my-3">
            <Container>
              <div className="banner_estate mt-3 mb-5" style={{ backgroundImage: `url(${data?.data?.banner_image})` }}>
                <div className="imf_port">
                  {/* <h2 className="col-11 col-lg-10 col-xl-9">Find Your Next <br></br> Home In<span> Tatlub.Com</span></h2> */}
                  {/* <img className="banner_estate_img w-100" src="/assets/images/company-6/1.jpg"></img> */}
                </div>
                {/* <div className="">
              <h3>Find Your Next</h3>
              <h3>Home In <span className="fw-bolder">Tatlub.com</span></h3>
            </div> */}
                <div className="position_serach_content">

                  <div className="">
                    <div className="search_contain d-flex justify-content-center px-2">

                      <Col xl="9" lg="10" >
                        <ul className="d-none">
                          <li className="bg_tab_custome cursor-pointer">{t('Buy')}</li>
                          <li className='cursor-pointer foot-cat'>{t('Rent')}</li>
                          <li className='cursor-pointer foot-cat'>{t('Commerial')}</li>
                          <li className='cursor-pointer foot-cat'>{t('PG/Hostel')}</li>
                        </ul>
                        <div className="search_bg_content">
                          <form onSubmit={handleSearch}>
                            <Row className="align-items-center">
                              <Col xl="9" lg="9" xs="10 pe-0 ps-1">
                                <div className="d-flex align-items-center">
                                  <div className="position_search_relative d-none">
                                    <select className="form-select select_form" aria-label="Default select example">
                                      <option selected>Chennai</option>
                                      <option value="1">Madurai</option>
                                      <option value="2">Coimbator</option>
                                      <option value="3">Nazareth</option>
                                    </select>
                                    <i className="fa fa-angle-down fa_down" aria-hidden="true"></i>
                                  </div>

                                  <input placeholder={t("Search For Locality, Landmark Or Projects")} onChange={(e) => setSearchKey(e.target.value)} className='form-control w-100 border-0 fs-15' type='text' />

                                  {/* <Select
                              className="dropdown w-100"
                              placeholder="Search For Locality, Landmark Or Projects"
                              value={data1.filter(obj => selectedValue.includes(obj.value))} // set selected values
                              options={data1} // set list of the data
                              onChange={handleChange} // assign onChange function
                              isMulti
                              isClearable/> */}
                                </div>
                              </Col>
                              <Col xl="3" lg="3" xs="2">
                                <div className="w-100 d-flex justify-content-lg-end justify-content-center text-lg-start text-center align-items-center">
                                  {/* <img className="search_icon_img me-sm-3 me-1" src="/assets/images/Icons-brand/icon-2.png" /> */}
                                  <a><button type='submit' className="btn_search_hme"><i className="fa fa-search"></i><span> {t('Search')}</span></button></a>
                                </div>
                              </Col>
                            </Row>
                          </form>
                        </div>
                      </Col>

                      {/* {selectedValue && <div style={{ marginTop: 20, lineHeight: '25px' }}>
                    <div><b>Selected Value: </b> {JSON.stringify(selectedValue, null, 2)}</div> 
                    </div>} */}
                    </div>
                  </div>
                </div>
              </div>
            </Container>
            <Container>
              {
                 Builders?.data?.length > 0 &&
              <div className="section-builders mb-4">
                <div className="d-flex justify-content-between my-3"><h3 className="fw-bolder">{t('Popular Builders')}</h3> {  Builders?.data?.length > 7 && <h5 className="foot-cat cursor-pointer text-end fw-bolder" onClick={() => setViewMore(Builders?.data?.length)} >{t('View All')}</h5>} </div>
                <div className="">
                  <Row>
                    {
                      Builders?.data?.slice(0, viewMore).map((value, index) => (
                        <Col md="4" xs="6" lg="2" className='mb-3' key={index}>
                          <Link href={{ pathname: '/page/vendor/vendor-profile', query: { 'id': value?.id } }}>
                            <a> <img className="img-pop-builder h-100" src={value?.user_image} onError={(e) => (e.currentTarget.src = "/assets/images/tatlub-img/No.jpg")} /> </a>
                          </Link>
                        </Col>
                      )) 
                    } 
                    {/* {
                      !Builders?.data &&
                    [...Array(6)].map((key,i)=> (
                      <Col md="4" xs="6" lg="2" className='mb-3' key={i}><Skeleton className="img-pop-builder h-100" /></Col>
                     ))
                    } */}
                    {/* <Col md="4" xs="6" lg="2 mb-3 mb-lg-0">
                  <Link href={'/page/vendor/vendor-profile'}>
                    <a> <img className="img-pop-builder" src="/assets/images/brands_ogo/6.jpg" /> </a>
                  </Link>
                    </Col> */}

                  </Row>
                </div>
              </div>
              }
            </Container>
            <Container>

              {/* {
              Loading ? 
              <div className="my-3">
              <div className="loader-wrapper2">
                {url === "Christmas" ? (
                  <div id="preloader"></div>
                ) : (
                  <div className="loader"></div>
                )}
              </div>
            </div> : */}
              <>
                <div className="section-properties ">
                  <Row>
                    <Col lg="6 mb-3" className='h-100' >
                      {
                        properties?.data?.recommended?.length > 0 &&
                      <div className="recommend_theme h-100">
                        <div className="d-flex justify-content-between my-3"><h3 className="fw-bolder">{t('Recommended Properties')}</h3>
                          {properties?.data?.recommended?.length > 6 && <h5 className="foot-cat cursor-pointer text-capitalize text-end fw-bolder"
                            onClick={() => router.push({ pathname: '/layouts/Property', query: { 'prop': 'Recommended' } })}>{t('view More')}</h5>} </div>
                        <div className="">
                          <Row>
                            {
                              properties?.data?.recommended?.slice(0, 6).map((value, index) => (
                                <Col md="6" xl="6" lg="12 h-100" className='mb-3'  key={index}>
                                  <div className="bg-form-content h-100">
                                    <Row>
                                      <Col xs="4 px-2" xl='5' >
                                        <div className="w-100 h-100 position-relative">
                                          <img className=" img-form-icon cursor-pointer img-fit w-100" src={value?.item_image_medium}
                                            onError={(e) => (e.currentTarget.src = "/assets/images/tatlub-img/No.jpg")}
                                            onClick={() => router.push({ pathname: '/layouts/Propertydetail', query: { 'property_id': value?.id } })}
                                          />
                                          <div className="bg_img_con d-none">
                                            <i className="fa fa-heart " />
                                          </div>
                                        </div>
                                      </Col>
                                      <Col>
                                        <Link href={{ pathname: '/layouts/Propertydetail', query: { 'property_id': value?.id } }}>
                                          <h5 className="foot-cat fs-5 fw-600 complete_1 cursor-pointer text-capitalize">{value?.item_title}</h5>
                                        </Link>
                                        {/* <h5 className="fw-600 text-color">{value?.price && 'QAR. ' + value?.price}</h5> */}
                                        <h5 className="fw-600 text-color">{value?.price == '[object Object]' ? '' : value?.price && 'QAR. ' + value?.price}</h5>
                                        <p className='complete_1'>{value?.item_location_str && <i className="fa fa-map-marker pe-2 theme_color"></i>}{value?.item_location_str ?? value?.item_address}</p>
                                      </Col>
                                    </Row>
                                  </div>
                                </Col>
                              ))
                            }

                            {/* <Col md="6" xl="6" lg="12">
                        <div className="bg-form-content mb-3">
                          <Row>
                            <Col xs="4 px-2">
                              <div className="w-100 h-100 position-relative">
                                <img className="w-100 img-form-icon h-100 img-fit" src="/assets/images/company-6/property-6.jpg" />
                              </div>
                            </Col>
                            <Col>
                              <h6 className="theme_color fw-600 cursor-pointer">Villa with Amazing View</h6>
                              <h5 className="fw-600">Rs. 32.1 L-45.0 L</h5>
                              <p><i className="fa fa-map-marker pe-2 theme_color"></i> Anna Nagar</p>
                            </Col>
                          </Row>
                        </div>
                      </Col> */}


                          </Row>
                        </div>
                      </div>
                      }
                    </Col>

                    <Col lg="6 mb-3">
                      {
                        properties?.data?.Popular?.length > 0 && 
                      <div className="recommend_theme h-100">
                        <div className="d-flex justify-content-between my-3"><h3 className="fw-bolder">{t('Popular Properties')}</h3>
                          {properties?.data?.Popular?.length > 6 && <h5 className="foot-cat cursor-pointer text-capitalize fw-bolder text-end" onClick={() => router.push({ pathname: '/layouts/Property', query: { 'prop': 'Popular' } })}>{t('view More')}</h5>} </div>
                        <div className="">
                          <Row>
                            {
                              properties?.data?.Popular?.slice(0, 6).map((value, index) => (
                                <Col md="6" xl="6" lg="12" className='mb-3' key={index}>
                                  <div className="bg-form-content h-100">
                                    <Row>
                                      <Col xs="4 px-2" xl='5 '>
                                        <div className="w-100 h-100 position-relative">
                                          <img className="img-form-icon cursor-pointer img-fit  w-100" src={value?.item_image_medium}
                                            onError={(e) => (e.currentTarget.src = "/assets/images/tatlub-img/No.jpg")}
                                            onClick={() => router.push({ pathname: '/layouts/Propertydetail', query: { 'property_id': value?.id } })}
                                          />
                                        </div>
                                      </Col>
                                      <Col className='px-0'>
                                        <Link href={{ pathname: '/layouts/Propertydetail', query: { 'property_id': value?.id } }}>
                                          <h5 className="foot-cat fs-5 fw-600 cursor-pointer complete_1 text-capitalize">{value?.item_title}</h5>
                                        </Link>
                                        <h5 className="fw-600 text-color">{value?.price == '[object Object]' ? '' : value?.price && 'QAR. ' + value?.price}</h5>
                                        <p className='complete_1'>{value?.item_location_str && <i className="fa fa-map-marker pe-2 theme_color"></i>}{value?.item_location_str ?? value?.item_address}</p>
                                      </Col>
                                    </Row>
                                  </div>
                                </Col>
                              ))
                            }
                          </Row>
                        </div>
                      </div>
                      }
                    </Col>
                  </Row>

                </div>

                <div className="section-trending mb-4 mt-3">
                  {
                     properties?.data?.trending?.length > 0 &&
                  <div className="recommend_theme h-100">
                    <div className="d-flex justify-content-between my-3"><h3 className="fw-bolder">{t('Trending Properties')}</h3>
                      {properties?.data?.trending?.length > 6 && <h5 className="foot-cat cursor-pointer fw-bolder text-end" onClick={() => router.push({ pathname: '/layouts/Property', query: { 'prop': 'Trending' } })}>{t('View All')}</h5>} </div>
                    <div className="">
                      <Row>
                        {
                          properties?.data?.trending?.slice(0, 4).map((value, index) => (
                            <Col lg="3" sm="6" key={index} className="mb-3">
                              <div className="bg-form-content mb-3 h-100">
                                <div className="w-100  position-relative mb-2">
                                  <img className=" w-100 h-100 rounded-3  cursor-pointer img-fit" src={value?.item_image_medium}
                                    onError={(e) => (e.currentTarget.src = "/assets/images/tatlub-img/No.jpg")}
                                    onClick={() => router.push({ pathname: '/layouts/Propertydetail', query: { 'property_id': value?.id } })}
                                  />
                                </div>
                                <Link href={{ pathname: '/layouts/Propertydetail', query: { 'property_id': value?.id } }}>
                                  <h5 className="foot-cat fs-5 fw-600 cursor-pointer complete_1 text-capitalize">{value?.item_title}</h5>
                                </Link>
                                <h5 className="fw-600 text-color">{value?.price == '[object Object]' ? '' : value?.price && 'QAR. ' + value?.price}</h5>
                                <p className='complete_2'>{value?.item_location_str && <i className="fa fa-map-marker pe-2 theme_color"></i>}{value?.item_location_str ?? value?.item_address}</p>

                              </div>
                            </Col>
                          ))
                        }

                        {/* <Col lg="3" sm="6">
                    <div className="bg-form-content mb-3">
                      <div className="w-100 h-100 position-relative ">
                        <img className="w-100 img-form-icon h-100 img-fit" src="/assets/images/company-6/property-1.jpg" />
   
                      </div>

                      <h6 className="theme_color fw-600 cursor-pointer mt-3">Villa with Amazing View</h6>
                      <h5 className="fw-600">Rs. 32.1 L-45.0 L</h5>
                      <p><i className="fa fa-map-marker pe-2 theme_color"></i> Anna Nagar</p>
                    </div>
                  </Col> */}
                      </Row>
                    </div>
                  </div>
                  }
                </div>
              </>
              {/* } */}
            </Container>




            {/* <Container>
          <div className="pb-3 pt-2">
            <Row className="justify-content-center">
              <Col lg="4" sm="6" xl="25 mb-3">
                <div className="recommend_theme home_contents- h-100 content_short">
                  <div className="img_home_bg"><div className="img_round_bg img_round_bg-home"><img src="/assets/images/Icons-brand/icon-1.png" /></div></div>
                  <div className="text-center">
                    <h6 >Sell your home</h6>
                    <p>We sell your home at the best market price.</p>
                  </div>
                </div>
              </Col>

              <Col lg="4" sm="6" xl="25 mb-3">
                <div className="recommend_theme home_contents- h-100 content_short">
                  <div className="img_home_bg"><div className="img_round_bg img_round_bg-appartment"><img src="/assets/images/Icons-brand/icon-3.png" /></div></div>
                  <div className="text-center">
                    <h6 >Rent Apartment</h6>
                    <p>Choose your dream house for Rent.</p>
                  </div>
                </div>

              </Col>


              <Col lg="4" sm="6" xl="25 mb-3">
                <div className="recommend_theme home_contents- h-100 content_short">
                  <div className="img_home_bg"><div className="img_round_bg img_round_bg-loan"><img src="/assets/images/Icons-brand/icon-4.png" /></div></div>
                  <div className="text-center">
                    <h6 >Home loans</h6>
                    <p>We offer you free consultancy to get a loan.</p>
                  </div>
                </div>

              </Col>

              <Col lg="4" sm="6" xl="25 mb-3">
                <div className="recommend_theme home_contents- h-100 content_short">
                  <div className="img_home_bg"><div className="img_round_bg-services img_round_bg"><img src="/assets/images/Icons-brand/icon5.png" /></div></div>
                  <div className="text-center">
                    <h6 >Legal services</h6>
                    <p>Expert legal help for all related property items.</p>
                  </div>
                </div>

              </Col>

              <Col lg="4" sm="6" xl="25 mb-3">
                <div className="recommend_theme home_contents- h-100 content_short">
                  <div className="img_home_bg"><div className="img_round_bg img_round_bg-hostel"><img src="/assets/images/Icons-brand/icon.png" /></div></div>
                  <div className="text-center">
                    <h6 >PG/Hostel</h6>
                    <p>Expert legal help for all related property items.</p>
                  </div>
                </div>

              </Col>

            </Row>
          </div>
        </Container> */}

            {/* <Container>
          <div className="recommend_theme populr_service mb-lg-5 mb-4">
            <div className="d-flex justify-content-between my-3"><h3 className="fw-bolder">Popular Services Added</h3> <h5 className="foot-cat cursor-pointer text-end fw-bolder">View All</h5></div>
            <div className="">
              <Row className="justify-content-center">
                <Col lg="4" sm="6" xl="25 mb-3 mb-xl-0 col-6" >
                  <div className="position-relative">
                    <img className="img_hov_pop-service-img" src="/assets/images/popular-services/1.jpg" />
                    <div className="img_hov_pop-service">
                      <h3>Home Interiors</h3>
                    </div>
                  </div>
                </Col>

                <Col lg="4" sm="6" xl="25 mb-3 mb-xl-0 col-6">
                  <div className="position-relative">
                    <img className="img_hov_pop-service-img" src="/assets/images/popular-services/2.jpg" />
                    <div className="img_hov_pop-service">
                      <h3>Painting Services</h3>
                    </div>
                  </div>
                </Col>

                <Col lg="4" sm="6" xl="25 mb-3 mb-xl-0 col-6">
                  <div className="position-relative">
                    <img className="img_hov_pop-service-img" src="/assets/images/popular-services/3.jpg" />
                    <div className="img_hov_pop-service">
                      <h3>Architects</h3>
                    </div>
                  </div>
                </Col>

                <Col lg="4" sm="6" xl="25 mb-3 mb-xl-0 col-6">
                  <div className="position-relative">
                    <img className="img_hov_pop-service-img" src="/assets/images/popular-services/4.jpg" />
                    <div className="img_hov_pop-service">
                      <h3>Builders</h3>
                    </div>
                  </div>
                </Col>

                <Col lg="4" sm="6" xl="25 mb-3 mb-xl-0 col-6">
                  <div className="position-relative">
                    <img className="img_hov_pop-service-img" src="/assets/images/popular-services/5.jpg" />
                    <div className="img_hov_pop-service">
                      <h3>Vastu Consultants</h3>
                    </div>
                  </div>
                </Col>


              </Row>
            </div>
          </div>
        </Container> */}

          </div> :  
          <div className='container'>
                                  <div className="card empty-wishlist shadow-sm p-4 mb-5">
                        <div className="text-center">
                          <img src="/assets/images/tatlub-img/not_Found.png" className="" />
                          <h3 className="text-center">{t("DATA NOT FOUND")}</h3>
                        </div>
                      </div>
          </div>
      }
    </CommonLayout>
  </>
  );
};

export default testvts;
// Chennai
// Search For Locality, Landmark Or Projects
// Search