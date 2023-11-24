import React, { useEffect, useState, useContext } from "react";
import CommonLayout from '../../../components/shop/common-layout';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText, Modal, ModalHeader, ModalBody } from "reactstrap";
import Slider from "react-slick";
import { getItemsDetails } from '../../../components/core/shop_requests'
import { useRouter } from "next/router";
// import { useQuery } from 'react-query';
import { postEnquiry } from "../../../components/core/vendor_request";
import { useFormik } from "formik";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import AuthContex from "../../../components/auth/AuthContex";
import { reviewForItems } from "../../../components/core/vendor_request";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import moment from "moment";
import Seo from "../../../seo/seo";
import { useTranslation } from "react-i18next";
import { Sidebar } from 'primereact/sidebar';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';



const PropertyDetail = ({ args }) => {
  const { t } = useTranslation();

  const [customslick, setCustomslick] = useState([])
  const settings = {
    dots: false,
    infinite: true,
    navs: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const { userData } = useContext(AuthContex);

  const customeSlider = React.createRef();
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  const { property_id } = router.query

  const gotoNext = () => {
    customeSlider.current.slickNext()
  }

  const gotoPrev = () => {
    customeSlider.current.slickPrev()
  }

  const initialValues = {
    item_id: "",
    product_id: "",
    user_id: "",
    body: "",
    overall_rating: "",
    image: "",
  };

  const [modal, setModal] = useState(false);
  const toggle = () => !userData ? document.getElementById('openLoginPopup')?.click() : userData?.id == properties?.user_id ? '' : setModal(!modal);
  const [url, setUrl] = useState();
  const [properties, setProperties] = useState()
  const [Loading, setLoading] = useState(false);
  const [revlen, setRevlen] = useState(5);
  const [searchReview, setSearchReview] = useState("");
  const [review, setReview] = useState([]);
  const [isOpen, setIsopen] = useState(false);
  const [rating, setRating] = useState();
  const [reviewImg, setReviewImg] = useState();
  const [PreviewImg, setPReviewImg] = useState();
  const [PropertyType, setPropertyType] = useState()
  const [SqFeet, setSqFeet] = useState()
  const [bedrooms, setBedRooms] = useState()
  const [showContact, setSContact] = useState(true)



  function Type(item) {
    return item?.custom_field_name == 'Property Type';
  }

  function squareFeet(item) {
    return item?.custom_field_name == 'Square Feet';
  }

  function BHK(item) {
    return item?.custom_field_name == 'Select BHK';
  }






  // const usinq = Array.from(new Set(customs))
  // console.log('snshdsgdhdksdhkdjsd',customs?.findLast(Type));


  const [images, setImages] = useState([]);

  useEffect(async () => {
    let searchData = [];

    if (searchReview == "") {
      fetchPropertyDetails();
    }
    if (searchReview) {
      review?.map((data, i) => {
        let start = data?.body.toLowerCase().search(searchReview.toLowerCase());
        if (
          data?.body.toLowerCase().includes(searchReview.toLowerCase(), start)
        ) {
          searchData.push(data);
        }
      });
      setReview(searchData);
    }
  }, [searchReview]);


  const enquiryValue = {
    name: "",
    mobile: "",
    email: "",
    enquiries: "",
    seller_id: "",
    user_id: "",
  };

  const enquirySchema = yup.object().shape({
    name: yup.string().required("Please Enter Your Name"),
    mobile: yup.string().min(7, "Phone number must be at least 7 Digits").required("Please Enter Your Mobile Number"),
    email: yup
      .string()
      .email("Please Enter Valid Email Id")
      .required("Please Enter Your Email Id"),
    enquiries: yup.string(),
    seller_id: yup.string(),
    user_id: yup.string(),
  });

  const handleOpenLogin = () => {
    document.getElementById('openLoginPopup')?.click()
  }

  const EnquiryForm = useFormik({
    initialValues: enquiryValue,
    validationSchema: enquirySchema,
    onSubmit: async (values, { setStatus, setSubmitting, resetForm }) => {
      try {
        if (userData) {
          const user_id =
            JSON.parse(sessionStorage.getItem("data"))?.id ??
            JSON.parse(localStorage.getItem("data"))?.id;

          let body = {
            name: values.name,
            mobile: values.mobile,
            email: values.email,
            enquiries: values.enquiries,
            seller_id: properties?.data?.user_id,
            user_id: user_id,
          };

          // document.getElementById("openloaderModal")?.click();
          const response = await postEnquiry(body);
          // document.getElementById("closeloaderModal")?.click();
          if (response.status == 200) {
            toast.info("ENQURY SENDED", {
              position: "bottom-right",
              autoClose: 2000,
              hideProgressBar: false,
              icon: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          } else {
            toast.error("NOT FOUND", {
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
          resetForm();
        } else {
          document.getElementById('openLoginPopup')?.click()
        }
      } catch (error) {
        alert()
        console.error(error);
        setStatus("dont give proper review details is incorrect");
        setSubmitting(false);
      }
    },
  });


  const reviewSchema = yup.object().shape({
    overall_rating: yup.string(),
    body: yup.string().required("Please Add Your Review"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: reviewSchema,
    onSubmit: async (values, { setStatus, setSubmitting, resetForm }) => {
      // setIsLoading(true)
      // alert()
      try {
        // let seller_id = seller?.id
        let user_id =
          JSON.parse(sessionStorage.getItem("data"))?.id ??
          JSON.parse(localStorage.getItem("data"))?.id;

        const body = {
          item_id: properties?.data?.id ?? property_id,
          // product_id: p_id,
          user_id: user_id,
          overall_rating: rating,
          body: values.body,
          image: reviewImg,
        };
        var formdata = new FormData();

        Object.entries(body).forEach(([key, value]) => {
          formdata.append(key, value);
        });

        const response = await reviewForItems(formdata);
        if (response.status == 200) {
          document.getElementById("closeRevie")?.click();
          toast.info("SUCCESS", {
            position: "bottom-right",
            autoClose: 2000,
            icon: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          fetchPropertyDetails()
        } else {
          toast.error("NOT FOUND", {
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
        resetForm();
      } catch (error) {
        console.error(error);
        setStatus("dont give proper review details is incorrect");
        setSubmitting(false);
        // setIsLoading(true)
      }
    },
  });



  const [modal1, setModal1] = useState(false);
  const toggle1 = () => setModal1(!modal1);

  const [property, setProperty] = useState()

  // const {isLoading,data:properties,error,refetch} = useQuery(
  //   ['properties',property_id],
  //   () => getItemsDetails(property_id)
  // ) 

  const fetchPropertyDetails = () => {
    setLoading(true)
    getItemsDetails(property_id).then(res => {
      setProperties(res)
      setReview(res.data?.reviews)

      const PropertyType = res?.data?.custom_field?.findLast(Type) ?? 'Plots'
      const SqFeet = res?.data?.custom_field?.findLast(squareFeet) ?? '1200sq.ft'
      const Bedrooms = res?.data?.custom_field?.findLast(BHK) ?? '2BHK'
      setPropertyType(PropertyType)
      setSqFeet(SqFeet)
      setBedRooms(Bedrooms)
      setLoading(false)
    }).catch(err => {
      console.error("err", err.message)
      setLoading(false)

    })
  }

  useEffect(() => {
    fetchPropertyDetails()
  }, [property_id])



  const iframeUrl = `https://maps.google.com/maps?q=${properties?.data?.item_lat},${properties?.data?.item_lng}&hl=es;z=14&output=embed`;

  const iframeUrl2 = `https://www.google.com/maps/embed/v1/place?key=AIzaSyCOYU6x7yqbUnNRtBuygEfCX9NgWakZRLw&q=${properties?.data?.item_location_str ?? properties?.data?.item_address}`

  useEffect(() => {
    properties && setImages([{ 'item_image_gallery_name': properties?.data?.item_image_medium }, ...properties?.data?.galleries])
  }, [properties])


  // useEffect(() => {
  //   fetchItemsdetail();
  // }, [])


  return (<>
    <CommonLayout>
      {/* <div className="card d-flex justify-content-center"> */}
      <Sidebar visible={visible} onHide={() => setVisible(false)} fullScreen>
        <h2 className="mb-3">{t("Gallery Images")}</h2>
        <ImageList cols={5} >
          {properties?.data?.galleries?.map((item) => (
            <ImageListItem key={item.img}>
              <img
                srcSet={item?.item_image_gallery_name}
                src={item?.item_image_gallery_name}
                loading="lazy"
                className="rounded-3"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Sidebar>
      {/* </div> */}

      <Seo title={`${properties?.data?.item_title}`} description={`${properties?.data?.item_description}`} />
      <Container>
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
            </div> : properties?.data ?
              <div className="mt-lg-5 mt-3">
                <Row>
                  <Col xl="9">
                    <Container className="px-0">
                      <div className="recommend_theme mb-4 property_d">
                        <div className="d-md-flex justify-content-between "><h4 className="fw-bolder text-capitalize">{t(properties?.data?.item_title)}</h4> <a href=""><h4 className="text-dark fw-bolder">{properties?.data?.item_price != null && 'QAR.' + properties?.data?.item_price}</h4></a> </div>
                        <div className="d-md-flex justify-content-between align-items-center mb-3"><p className="color-gray">
                          <i className="fa fa-map-marker pe-2 theme_color"></i> {properties?.data?.item_location_str ?? properties?.data?.item_address}</p>
                          {
                            showContact ?
                              <div className="d-sm-flex">
                                <Button className="btn  d-flex align-items-center justify-content-center contact-us-pdetail mt-1" onClick={() => setSContact(false)}>
                                  <i class="fa fa-phone fs-5  me-2 mb-0 pb-0" aria-hidden="true"></i>
                                  {t('Show Number')}
                                </Button></div>
                              :
                              <a href={"tel:" + properties?.data?.item_phone ?? properties?.data?.user?.phone}><div className="d-sm-flex">
                                {/* <Button className="btn down-load-purchase me-2 mt-1">Download Brochure</Button> */}
                                <Button className="btn  d-flex align-items-center justify-content-center contact-us-pdetail mt-1">
                                  <i class="fa fa-phone fs-5  me-2 mb-0 pb-0" aria-hidden="true"></i>
                                  {properties?.data?.item_phone ?? properties?.data?.user?.phone ?? 'Call Now'}
                                </Button></div></a>
                          }

                        </div>
                        <Row>
                          <Col lg="7 mb-lg-0 mb-3" >
                            <div className="w-100 h-100 ">
                              <Slider {...settings} ref={customeSlider} className="property-detail-slider rounded">
                                {
                                  images?.length > 0 &&
                                  images?.map((data, index) => (
                                    <div key={index}>
                                      <img className="w-100 rounded-3 h-100 img-fit img-fit2" src={data?.item_image_gallery_name} onError={(e) => (e.currentTarget.src = "/assets/images/tatlub-img/No.jpg")} />
                                    </div>
                                  ))
                                }
                              </Slider>
                              {
                                images?.length > 1 && <div className="d-sm-block d-none">
                                  <div className="slide-left2 d-flex align-items-center" onClick={() => gotoNext()}><img src="/assets/images/tatlub-img/slid-1.png" alt="..." /></div>
                                  <div className="slide-right2 d-flex align-items-center" onClick={() => gotoPrev()}><img src="/assets/images/tatlub-img/slid-2.png" alt="..." /></div>
                                </div>
                              }

                            </div>
                          </Col>
                          <Col>
                            <Row className="h-100">
                              {
                                properties?.data?.galleries?.length > 0 &&
                                properties?.data?.galleries?.slice(0, 3).map((data, index) => (<>
                                  <Col xs="6 mb-3"><img className={`w-100 rounded-3 img-fit slick-active ${properties?.data?.galleries?.length > 2 ? 'h-100' : 'h-50'}`} key={index} src={data?.item_image_gallery_name} onError={(e) => (e.currentTarget.src = "/assets/images/tatlub-img/No.jpg")} /></Col>
                                </>
                                ))
                              }
                              {
                                properties?.data?.galleries?.length > 3 &&
                                <Col xs="6 mb-3"> <img className="w-100 rounded-3 h-100 img-fit slick-list position-relative" src="/assets/images/company-6/property-4.jpg" style={{ filter: "brightness(0.3)" }} />
                                  <h2 className="position-absolute top-50 start-50 text-white cursor-pointer translate-middle" onClick={() => setVisible(true)}>+{properties?.data?.galleries?.length}</h2></Col>
                              }
                              {/* <Col xs="6 mb-3"> <img className="w-100 img-form-icon h-100 img-fit slick-active" src="/assets/images/company-6/property-4.jpg"  onClick={toggle}/></Col>
                          <Col xs="6 mb-3"> <img className="w-100 img-form-icon h-100 img-fit slick-list" src="/assets/images/company-6/property-4.jpg"  onClick={toggle}/></Col>
                          <Col xs="6 mb-3"> <img className="w-100 img-form-icon h-100 img-fit slick-list" src="/assets/images/company-6/property-4.jpg"  onClick={toggle} /></Col>
                          <Col xs="6 mb-3"> <img className="w-100 img-form-icon h-100 img-fit slick-list position-relative" src="/assets/images/company-6/property-4.jpg" style={{filter:"brightness(0.3)"}} />
                          <h2 className="position-absolute top-50 start-50 text-white translate-middle"  onClick={toggle1}>+13</h2></Col> */}
                            </Row>
                          </Col>
                        </Row>
                      </div>

                      {
                        properties?.data?.item_specification?.length > 0 &&
                        <div className="review_card p-4 mb-4 doct-d">
                          {/* <h3 className="fw-bolder mb-lg-4">Overview</h3>
                    <Row>
                      <Col xl="3" md="4" sm="6" xs="12">
                        <div className="detail_pg_se">
                          <img className="me-2 company_property_icon" src="/assets/images/icons-new/11.png" />
                          <div ><h6>Property Type</h6><p>6 Towers - 13 Floors - 495 Units</p></div></div>
                      </Col>
                    </Row> */}

                          <Row>
                            {
                              properties?.data?.item_specification.map((data, index) => (
                                <Col key={index}>
                                  <div className="mb-3 d-flex justify-content-between">
                                    <h4 className="complete_1 text-capitalize">{data?.name ?? "Services"}</h4>
                                  </div>
                                  <ul>
                                    {
                                      data?.values?.split(',')?.map((valu, i) => (<>
                                        <li className="w-100" key={i}><img src="/assets/images/tatlub-img/Icon 4.png" className="btn-img" />{valu}</li>
                                      </>))
                                    }
                                    {/* <li className="w-100"><img src="/assets/images/tatlub-img/Icon 4.png" className="btn-img"/>Traction</li> */}
                                  </ul>
                                </Col>
                              ))
                            }
                          </Row>
                        </div>
                      }

                      {
                        properties?.data?.custom_field?.length > 0 && bedrooms?.item_feature_value && SqFeet?.item_feature_value && PropertyType?.item_feature_value &&
                        <div className="review_card p-4 mb-4 doct-d">
                          <Row>
                            <Col sm="4 mb-sm-0 mb-2"> <div className=" bg_builder_horm"><img className="me-2 company_property_icon" src="/assets/images/icons-new/10.png" /><div ><h6>{bedrooms?.item_feature_value}</h6><p>Building</p></div></div></Col>
                            <Col sm="4 mb-sm-0 mb-2"> <div className=" bg_builder_horm"><img className="me-2 company_property_icon" src="/assets/images/icons-new/11.png" /><div ><h6>{SqFeet?.item_feature_value}</h6><p>Built-Up Area</p></div></div></Col>
                            <Col sm="4 mb-sm-0 mb-2"> <div className=" bg_builder_horm"><img className="me-2 company_property_icon" src="/assets/images/icons-new/12.png" /><div ><h6>{PropertyType?.item_feature_value}</h6><p>Property Type</p></div></div></Col>
                          </Row>
                        </div>
                      }


                      <div className="recommend_theme populr_service mb-4">
                        <h3 className="fw-bolder ">{t('More about')}</h3>
                        <p>{properties?.data?.item_description ?? 'Not Found'}</p>
                        {
                          properties?.data?.galleries?.length > 0 &&
                          <div className="">
                            <h3 className="fw-bolder ">{t('Gallery')}</h3>
                            <Row>
                              {
                                properties?.data?.galleries?.slice(0, 6).map((data, index) => (
                                  <Col xl="2" lg="3" xs="6" sm="4 mb-xl-0 mb-3 px-2" key={index}>
                                    <div className="position-relative">
                                      <img className="img_pdcrt" src={data?.item_image_gallery_name}
                                        onError={(e) => (e.currentTarget.src = "/assets/images/tatlub-img/No.jpg")}
                                      />
                                      <div className="img_hov_pop-service">
                                        {/* <h6>All (28)</h6> */}
                                      </div>
                                    </div>
                                  </Col>
                                ))
                              }

                              {/* <Col xl="2" lg="3" xs="6" sm="4 mb-xl-0 mb-3 px-2">
                          <div className="position-relative">
                            <img className="img_pdcrt" src="/assets/images/product-img-bnd/5.jpg" />
                            <div className="img_hov_pop-service">
                              <h6>Video (5)</h6>
                            </div>
                          </div>
                        </Col> */}
                            </Row>
                          </div>
                        }
                      </div>



                      {/* <div className="recommend_theme populr_service mb-lg-5 mb-4">
                    <div className="write_lwtter_sectoin">
                      <h3 className="fw-bolder ">Write A Review</h3>
                        <Row>
                            <Col md="8">
                                <Row>
                                  <Col sm="6">
                                    <div className="mb-2 mb-md-4">
                                      <h6>property</h6>
                                      <div className="d-flex">
                                          <img className="str_detail_icon" src="/assets/images/company/4.png"/>
                                          <img className="str_detail_icon" src="/assets/images/company/4.png"/>
                                          <img className="str_detail_icon" src="/assets/images/company/44.png"/>
                                          <img className="str_detail_icon" src="/assets/images/company/44.png"/>
                                          <img className="str_detail_icon" src="/assets/images/company/44.png"/>
                                      </div>
                                    </div>
                                    <div className="mb-2 mb-md-4">
                                      <h6>Value For Money</h6>
                                      <div className="d-flex">
                                          <img className="str_detail_icon" src="/assets/images/company/4.png"/>
                                          <img className="str_detail_icon" src="/assets/images/company/4.png"/>
                                          <img className="str_detail_icon" src="/assets/images/company/4.png"/>
                                          <img className="str_detail_icon" src="/assets/images/company/44.png"/>
                                          <img className="str_detail_icon" src="/assets/images/company/44.png"/>
                                      </div>
                                    </div>
                                  </Col>
                                  <Col sm="6 d-flex justify-content-sm-end">
                                    <div className="">
                                        <div className="mb-2 mb-md-4">
                                          <h6>Location</h6>
                                            <div className="d-flex">
                                              <img className="str_detail_icon" src="/assets/images/company/4.png"/>
                                              <img className="str_detail_icon" src="/assets/images/company/4.png"/>
                                              <img className="str_detail_icon" src="/assets/images/company/4.png"/>
                                              <img className="str_detail_icon" src="/assets/images/company/44.png"/>
                                              <img className="str_detail_icon" src="/assets/images/company/44.png"/>
                                            </div>
                                        </div>
                                        <div className="mb-2 mb-md-4">
                                            <h6>Agent Support</h6>
                                            <div className="d-flex">
                                              <img className="str_detail_icon" src="/assets/images/company/4.png"/>
                                              <img className="str_detail_icon" src="/assets/images/company/4.png"/>
                                              <img className="str_detail_icon" src="/assets/images/company/4.png"/>
                                              <img className="str_detail_icon" src="/assets/images/company/44.png"/>
                                              <img className="str_detail_icon" src="/assets/images/company/44.png"/>
                                            </div>
                                        </div>
                                      </div>
                                  </Col>
                                </Row>
                            </Col>
                            <Col sm="4 align-items-center d-flex justify-content-sm-end">
                            <div className="bg-6">

                              <h4>2.75</h4>
                              <h5>Average Rating</h5>

                            </div>
                            </Col>
                        </Row>


                        <Form>
                        <Row>
                          <Col>
                            <FormGroup className="mt-3">
                              <Input type="email" name="email" id="exampleEmail" placeholder="Your Name" />
                            </FormGroup>
                          </Col>
                          <Col>
                            <FormGroup className="mt-3">
                              <Input type="email" name="email" id="exampleEmail" placeholder="Phone Number" />
                            </FormGroup>
                          </Col>
                        </Row>
                        
                      <FormGroup className="mt-md-5 mt-3">
                        <Input type="textarea" name="text" id="exampleText" placeholder="Message" />
                      </FormGroup>             
                      <Button className="btn_submit_company btn mb-lg-5 mb-3 mt-md-4 mt-3">Submit Review</Button>
                  </Form>
                    </div>
                  </div> */}

                      <div className="review_card mt-4 mb-3">
                        <div className="d-flex align-items-center justify-content-between">
                          <h4 className="mb-3 fs-20">
                            {t('Reviews')} & {t('Rating')}
                          </h4>
                          <div className="filer-search-wicon">
                            <div className="search">
                              <span className="fa fa-search"></span>
                              <input
                                type="text"
                                placeholder={t('Search reviews')}
                                onChange={(e) => setSearchReview(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        {review.length > 0 && (
                          <div className="list-group list-group-flush">
                            <p className="custom_ratng_text">
                              {review?.length ?? 0} {t('Users Review')}
                            </p>
                            {/* <div className="d-flex">
                            <div
                              className="btn_filter btn"
                              onClick={() => setReviewlevel()}
                            >
                              {" "}
                              <span>{t("All")}</span>
                            </div>
                            <div
                              className="btn_filter btn"
                              onClick={() => setReviewlevel(1)}
                            >
                              {" "}
                              <span>{t("High to Low")}</span>
                            </div>
                            <div
                              className="btn_filter btn"
                              onClick={() => setReviewlevel(0)}
                            >
                              {" "}
                              <span>{t("Low to High")}</span>
                            </div>
                          </div> */}

                            {review?.slice(0, revlen).map((data, index) => {
                              let day = moment(data?.created_at);
                              let day2 = new Date();
                              let now = moment(day2);
                              let ago = now.diff(day, "days");
                              let fromhour = moment.utc(data?.created_at).local().startOf('seconds').fromNow()
                              dayjs.extend(relativeTime);
                              dayjs.extend(utc);
                              dayjs.extend(timezone);


                              return (
                                <>
                                  <div className="list-group-item pb-2" key={index}>
                                    <Row className="row mt-4">
                                      <div className="img-width_reviw">
                                        <img
                                          className="review-img-"
                                          src={data?.user_image ?? ''}
                                          onError={(e) =>
                                          (e.currentTarget.src =
                                            "/assets/images/tatlub-img/No.jpg")
                                          }
                                        />
                                      </div>
                                      <Col className="right_review">
                                        <div className="d-flex justify-content-between">
                                          <h5 className="text-capitalize">{data?.author_name}</h5>{" "}
                                          <p>
                                            {/* {fromhour != 'Invalid date' ? fromhour : ''} */}
                                            {dayjs.utc(day).tz(dayjs.tz.guess()).fromNow()}
                                          </p>
                                        </div>
                                        <div className="d-flex alidn-items-center ">
                                          <img
                                            className="company_detail_icon me-3"
                                            src="/assets/images/company/4.png"
                                          />
                                          <h6>{data?.rating ?? 1}.0</h6>
                                        </div>
                                        <div>
                                          <p className="complete">{data?.body}</p>
                                        </div>
                                        {
                                          data?.review_image &&
                                          <div className="row justify-content-start">
                                            <div className="col-12" >
                                              <div className="multi_imgP h-100">
                                                <img
                                                  src={data?.review_image}
                                                  className="rounded-3"
                                                  alt="noImage"
                                                  onError={(e) =>
                                                  (e.currentTarget.src =
                                                    "/assets/images/tatlub-img/No.jpg")
                                                  }
                                                ></img>
                                              </div>
                                            </div>
                                          </div>
                                        }
                                      </Col>
                                    </Row>
                                  </div>
                                  {/* <hr></hr> */}
                                </>
                              );
                            })}
                          </div>
                        )}

                        {review.length == 0 && (
                          <div className="d-flex flex-column justify-content-center align-items-center ">
                            <img
                              src="/assets/images/tatlub-img/not_Found.png"
                              className="no_image"
                            />
                            <h3 className="text-center">{t('NO REVIEWS FOUND')}</h3>
                          </div>
                        )}

                        {review.length > revlen && (
                          <div className="text-center">
                            <Button
                              className="btn btn_loadmore mt-3"
                              onClick={() => setRevlen(review + 5)}
                            >
                              {t('Load More')}
                            </Button>
                          </div>
                        )}
                      </div>

                    </Container>
                  </Col>
                  <Col xl="3">
                    <div className="side_contain_product mb-md-4 mb-3">

                      <div className="d-flex align-items-center">
                        <img className="img-pop-builder_logo me-2" src={properties?.data?.user?.user_image} onError={(e) => (e.currentTarget.src = "/assets/images/tatlub-img/No.jpg")} />
                        <div className="">
                          <p className="fw-bolder text-capitalize">{properties?.data?.user?.user_details?.company_name ?? properties?.data?.user?.name}</p>
                          <p className="color-gray"><i className="fa fa-map-marker pe-2 theme_color"></i> {properties?.data?.user?.address ?? properties?.data?.user?.user_details?.address}</p>
                        </div>
                      </div>

                      <hr></hr>
                      <form onSubmit={EnquiryForm.handleSubmit}>
                        <FormGroup className="mb-3">
                          <Label for="exampleName">{t("Name")}</Label>
                          <Input type="text" name="name" className="mb-0" {...EnquiryForm.getFieldProps("name")} id="exampleName" placeholder={t("Enter Your Name")} />
                          {EnquiryForm.touched.name && EnquiryForm.errors.name && (
                            <div className="fv-plugins-message-container">
                              <div className="fv-help-block">
                                <span role="alert" className="text-danger">
                                  {EnquiryForm.errors.name}
                                </span>
                              </div>
                            </div>
                          )}
                        </FormGroup>

                        <FormGroup className="mb-3">
                          <Label for="examplemobile">{t("Phone Number")}</Label>
                          <Input type="text" name="number" className="mb-0" maxLength={15}  {...EnquiryForm.getFieldProps("mobile")} id="examplemobile" placeholder={t("Enter Your Phone Number")} onChange={(e) => EnquiryForm.setFieldValue("mobile", e.target?.value.replace(/[^0-9]/g, "")
                          )
                          } />
                          {EnquiryForm.touched.mobile &&
                            EnquiryForm.errors.mobile && (
                              <div className="fv-plugins-message-container">
                                <div className="fv-help-block">
                                  <span role="alert" className="text-danger">
                                    {EnquiryForm.errors.mobile}
                                  </span>
                                </div>
                              </div>
                            )}
                        </FormGroup>

                        <FormGroup className="mb-3">
                          <Label for="exampleEmail">{t("Email")}</Label>
                          <Input type="text" name="email" className="mb-0"  {...EnquiryForm.getFieldProps("email")} id="exampleEmail" placeholder={t("Enter Your Email Address")} />
                          {EnquiryForm.touched.email &&
                            EnquiryForm.errors.email && (
                              <div className="fv-plugins-message-container">
                                <div className="fv-help-block">
                                  <span role="alert" className="text-danger">
                                    {EnquiryForm.errors.email}
                                  </span>
                                </div>
                              </div>
                            )}
                        </FormGroup>
                        {/* <FormGroup check>
                      <Label className="d-flex align-items-center" check>
                        <Input type="checkbox" />{' '}
                        Allow Other Agents to get in touch
                      </Label>
                      </FormGroup> */}
                        <Button type="submit" className="btn_submit_compannnny btn mb-2 ">{t("SUBMIT")}</Button>
                      </form>
                    </div>
                    <div className="side_contain_product mb-md-4 mb-3">
                      <h4 className="fw-bolder">{t("Location")}</h4>
                      <div className="mapouter"><div className="gmap_canvas">
                        {
                          properties?.data?.item_lat && properties?.data?.item_lng ?
                            <iframe
                              className="w-100"
                              height="250"
                              loading="lazy"
                              src={iframeUrl}
                              frameborder="0"
                              scrolling="no"
                              marginheight="0"
                              marginwidth="0"
                            ></iframe>
                            : properties?.data?.google_map_link ?
                              <iframe
                                className="w-100"
                                height="250"
                                loading="lazy"
                                src={properties?.data?.google_map_link}
                                frameborder="0"
                                scrolling="no"
                                marginheight="0"
                                marginwidth="0"
                              ></iframe> :
                              <iframe
                                className="w-100"
                                height="250"
                                loading="lazy"
                                src={iframeUrl2}
                                frameborder="0"
                                scrolling="no"
                                marginheight="0"
                                marginwidth="0"
                              ></iframe>
                        }
                        {/* <a href="https://2yu.co">2yu</a><br/> */}
                      </div></div>
                      <div className="d-flex align-items-center justify-content-between d-none">
                        <div className="d-flex align-items-center">
                          <img className="me-2 company_detail_icon" src="/assets/images/company/7.png" /> <h5 className="my-2 fw-bolder">{t("Get Directions")}</h5>
                        </div>
                        <div className="d-flex align-items-center">
                          <img className="me-2 company_detail_icon" src="/assets/images/company/copy.png" />
                          <h5 className="my-2 fw-bolder">{t("Copy")}</h5>
                        </div>
                      </div>
                    </div>
                    <div className="reviewrite_company mt-4 mb-xl-0 mb-4">
                      <h3 className="mb-md-4 mb-3">
                        {t('Write a Review')}
                      </h3>
                      <div className="d-flex justify-content-xs-between mt-3">
                        <div
                          className={
                            rating > 0 ? "star-icon-com onStart_color" : "star-icon-com"
                          }
                        // onClick={toggle}
                        // role="button"
                        >
                          <i
                            className="fa fa-star cursor-pointer fs-4"
                            aria-hidden="true"
                            onClick={() => {
                              setRating(1);
                              toggle()
                            }}
                          ></i>
                        </div>
                        <div
                          className={
                            rating > 1 ? "star-icon-com onStart_color" : "star-icon-com"
                          }
                        >
                          <i
                            className="fa fa-star cursor-pointer fs-4"
                            aria-hidden="true"
                            onClick={() => { setRating(2); toggle() }}
                          ></i>
                        </div>
                        <div
                          className={
                            rating > 2 ? "star-icon-com onStart_color" : "star-icon-com"
                          }
                        >
                          <i
                            className="fa fa-star cursor-pointer fs-4"
                            aria-hidden="true"
                            onClick={() => { setRating(3); toggle() }}
                          ></i>
                        </div>
                        <div
                          className={
                            rating > 3 ? "star-icon-com onStart_color" : "star-icon-com"
                          }
                        >
                          <i
                            className="fa fa-star cursor-pointer fs-4"
                            aria-hidden="true"
                            onClick={() => { setRating(4); toggle() }}
                          ></i>
                        </div>
                        <div
                          className={
                            rating > 4 ? "star-icon-com onStart_color" : "star-icon-com"
                          }
                        >
                          <i
                            className="fa fa-star cursor-pointer fs-4"
                            aria-hidden="true"
                            onClick={() => { setRating(5); toggle() }}
                          ></i>
                        </div>
                        {/* <div className="star-icon-com"><img src="/assets/images/tatlub-img/icon-8.png" /></div> */}
                      </div>
                      <Button
                        onClick={toggle}
                        id="closeRevie"
                        className="btn btn-review mt-md-5 mt-4"
                        disabled={userData?.id == properties?.data?.user_id ? true : false}
                      >
                        {t('Write a Review')}
                      </Button>

                      <Modal
                        className="model_contact modal-md modal-dialog-centered"
                        isOpen={modal}
                        toggle={toggle}
                        {...args}
                      >
                        <ModalBody>
                          <div className="popup-review">
                            <div className="mb-3 d-flex justify-content-between align-items-center">
                              <img
                                src="/assets/images/icon/logo.png"
                                className="w-25"
                                onError={(e) =>
                                (e.currentTarget.src =
                                  "/assets/images/tatlub-img/no1.png")
                                }
                              />

                            </div>
                            <div className="">
                              <form onSubmit={formik.handleSubmit}>
                                <h5 className="text-capitalize">{properties?.data?.user?.name}</h5>

                                <p>{properties?.data?.user?.address ?? properties?.data?.user?.user_details?.address}</p>
                                <div className="d-flex justify-content-between align-items-center my-3">
                                  <p className="mb-0">{t('Over All')}</p>{" "}
                                  <div className="d-flex">
                                    <Stack spacing={1}>
                                      <Rating
                                        name="size-large star_rate"
                                        value={rating}
                                        onChange={(e) =>
                                          setRating(e.target.value)
                                        }
                                        defaultValue={1}
                                        size="large"
                                      />
                                    </Stack>
                                  </div>
                                </div>
                                <Label>{t('Add Review')}</Label>
                                <textarea
                                  placeholder={t("Describe Your Experience")}
                                  {...formik.getFieldProps("body")}
                                ></textarea>
                                {formik.touched.body &&
                                  formik.errors.body && (
                                    <div className="fv-plugins-message-container">
                                      <div className="fv-help-block">
                                        <span
                                          role="alert"
                                          className="text-danger"
                                        >
                                          {formik.errors.body}
                                        </span>
                                      </div>
                                    </div>
                                  )}
                                <p>{t('Add Photos')}</p>
                                <div className=" d-flex">
                                  <div className="file file--upload">
                                    <label for="input-file">
                                      <i className="fa fa-camera"></i>
                                    </label>
                                    <input
                                      id="input-file"
                                      type="file"
                                      onChange={(e) => { setReviewImg(e.target.files[0]); setPReviewImg(URL.createObjectURL(e.target.files[0])) }}
                                    />
                                  </div>
                                  {
                                    PreviewImg &&
                                    <div className="">
                                      <img src={PreviewImg} onError={(e) => e.currentTarget.src = "/assets/images/tatlub-img/No.jpg"} className=" mx-2 pre_imd " />
                                    </div>
                                  }
                                </div>
                                <button
                                  className="btn submit_btn"
                                  type="submit"
                                >
                                  {t('Submit')}
                                </button>
                              </form>
                            </div>
                          </div>
                        </ModalBody>
                      </Modal>
                    </div>
                  </Col>
                </Row>


                {/* <Container className="px-0">
              <div className="section-trending mb-4 mt-3">
                <div className="recommend_theme">
                  <div className="d-sm-flex justify-content-between my-3"><h3 className="fw-bolder">Similar Properties In Area</h3> <a href=""><h5 className="text-dark fw-bolder text-end">Veiw All</h5></a> </div>
                  <div className="">
                    <Row>
                      <Col lg="3" sm="6">
                        <div className="bg-form-content mb-3">
                          <div className="w-100 h-100 position-relative image_zoom_estaste">
                            <img className="w-100 img-form-icon h-100 img-fit" src="/assets/images/company-6/property-1.jpg" />
                            <div className="bg_img_con d-none">
                              <i className="fa fa-heart " />
                            </div>
                          </div>

                          <h6 className="theme_color fw-600 mt-3">Villa with Amazing View</h6>
                          <h5 className="fw-600">Rs. 32.1 L-45.0 L</h5>
                          <p><i className="fa fa-map-marker pe-2 theme_color"></i> Anna Nagar</p>
                        </div>
                      </Col>

                      <Col lg="3" sm="6">
                        <div className="bg-form-content mb-3">
                          <div className="w-100 h-100 position-relative ">
                            <img className="w-100 img-form-icon h-100 img-fit" src="/assets/images/company-6/property-1.jpg" />
                            <div className="bg_img_con d-none">
                              <i className="fa fa-heart " />
                            </div>
                          </div>

                          <h6 className="theme_color fw-600 mt-3">Villa with Amazing View</h6>
                          <h5 className="fw-600">Rs. 32.1 L-45.0 L</h5>
                          <p><i className="fa fa-map-marker pe-2 theme_color"></i> Anna Nagar</p>
                        </div>
                      </Col>


                      <Col lg="3" sm="6">
                        <div className="bg-form-content mb-3">
                          <div className="w-100 h-100 position-relative ">
                            <img className="w-100 img-form-icon h-100 img-fit" src="/assets/images/company-6/property-1.jpg" />
                            <div className="bg_img_con d-none">
                              <i className="fa fa-heart " />
                            </div>
                          </div>

                          <h6 className="theme_color fw-600 mt-3">Villa with Amazing View</h6>
                          <h5 className="fw-600">Rs. 32.1 L-45.0 L</h5>
                          <p><i className="fa fa-map-marker pe-2 theme_color"></i> Anna Nagar</p>
                        </div>
                      </Col>


                      <Col lg="3" sm="6">
                        <div className="bg-form-content mb-3">
                          <div className="w-100 h-100 position-relative ">
                            <img className="w-100 img-form-icon h-100 img-fit" src="/assets/images/company-6/property-1.jpg" />
                            <div className="bg_img_con d-none">
                              <i className="fa fa-heart " />
                            </div>
                          </div>

                          <h6 className="theme_color fw-600 mt-3">Villa with Amazing View</h6>
                          <h5 className="fw-600">Rs. 32.1 L-45.0 L</h5>
                          <p><i className="fa fa-map-marker pe-2 theme_color"></i> Anna Nagar</p>
                        </div>
                      </Col>

                    </Row>
                  </div>
                </div>
              </div>
            </Container> */}
              </div> :
              <div className=''>
                <div className="card empty-wishlist shadow-sm p-4 mb-5">
                  <div className="text-center">
                    <img src="/assets/images/tatlub-img/not_Found.png" className="" />
                    <h3 className="text-center">{t("DATA NOT FOUND")}</h3>
                  </div>
                </div>
              </div>
        }

        {/* <Modal className="model_contact modal-xl modal-dialog-centered" isOpen={modal} toggle={toggle} >
          <img className="w-100 img-form-icon h-100 img-fit slick-active" src="/assets/images/company-6/property-4.jpg" onClick={toggle} />
        </Modal> */}

        {/* <Modal className="model_contact modal-xl modal-dialog-centered" isOpen={modal1} toggle={toggle1} >
          <ModalHeader toggle={toggle1}>
            <h4>Villa with Amazon,<p>Anna Nagar</p></h4>
          </ModalHeader>
          <ModalBody>
            <div className="d-flex mb-2 p-3">
              <div className="">
                <button type="button" className="btn btn-popup ">All(17)</button>
              </div>
              <div className="">
                <button type="button" className="btn btn-popup mx-2">Interior(17)</button>
              </div>
              <div className="">
                <button type="button" className="btn btn-popup mx-3">Exterior(17)</button>
              </div>
              <div className="">
                <button type="button" className="btn btn-popup mx-4">Floor Plan(17)</button>
              </div>
            </div>

            <div className="row p-3">
              <div className="col-2 mb-3">
                <img className="w-100 img-form-icon h-100 img-fit slick-active" src="/assets/images/company-6/property-4.jpg" onClick={toggle} />
              </div>
              <div className="col-2 mb-3">
                <img className="w-100 img-form-icon h-100 img-fit slick-active" src="/assets/images/company-6/property-4.jpg" onClick={toggle} />
              </div>
              <div className="col-2 mb-3">
                <img className="w-100 img-form-icon h-100 img-fit slick-active" src="/assets/images/company-6/property-4.jpg" onClick={toggle} />
              </div>
              <div className="col-2 mb-3">
                <img className="w-100 img-form-icon h-100 img-fit slick-active" src="/assets/images/company-6/property-4.jpg" onClick={toggle} />
              </div>
              <div className="col-2 mb-3">
                <img className="w-100 img-form-icon h-100 img-fit slick-active" src="/assets/images/company-6/property-4.jpg" onClick={toggle} />
              </div>
              <div className="col-2 mb-3">
                <img className="w-100 img-form-icon h-100 img-fit slick-active" src="/assets/images/company-6/property-4.jpg" onClick={toggle} />
              </div>
              <div className="col-2 mb-3">
                <img className="w-100 img-form-icon h-100 img-fit slick-active" src="/assets/images/company-6/property-4.jpg" onClick={toggle} />
              </div>
              <div className="col-2 mb-3">
                <img className="w-100 img-form-icon h-100 img-fit slick-active" src="/assets/images/company-6/property-4.jpg" onClick={toggle} />
              </div>
              <div className="col-2 mb-3">
                <img className="w-100 img-form-icon h-100 img-fit slick-active" src="/assets/images/company-6/property-4.jpg" onClick={toggle} />
              </div>
              <div className="col-2 mb-3">
                <img className="w-100 img-form-icon h-100 img-fit slick-active" src="/assets/images/company-6/property-4.jpg" onClick={toggle} />
              </div>
              <div className="col-2 mb-3">
                <img className="w-100 img-form-icon h-100 img-fit slick-active" src="/assets/images/company-6/property-4.jpg" onClick={toggle} />
              </div>
              <div className="col-2 mb-3">
                <img className="w-100 img-form-icon h-100 img-fit slick-active" src="/assets/images/company-6/property-4.jpg" onClick={toggle} />
              </div>
              <div className="col-2 mb-3">
                <img className="w-100 img-form-icon h-100 img-fit slick-active" src="/assets/images/company-6/property-4.jpg" onClick={toggle} />
              </div>
              <div className="col-2 mb-3">
                <img className="w-100 img-form-icon h-100 img-fit slick-active" src="/assets/images/company-6/property-4.jpg" onClick={toggle} />
              </div>
              <div className="col-2 mb-3">
                <img className="w-100 img-form-icon h-100 img-fit slick-active" src="/assets/images/company-6/property-4.jpg" onClick={toggle} />
              </div>
              <div className="col-2 mb-3">
                <img className="w-100 img-form-icon h-100 img-fit slick-active" src="/assets/images/company-6/property-4.jpg" onClick={toggle} />
              </div>

            </div>

          </ModalBody>
        </Modal> */}
      </Container>
    </CommonLayout>
  </>)
}

export default PropertyDetail;