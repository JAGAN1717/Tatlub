import React, { useState, useContext } from "react";
import CommonLayout from "../../components/shop/common-layout";
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText, Modal, ModalHeader, ModalBody } from "reactstrap";
import Slider from "react-slick";
import { Product3, Product6, Slider3, Slider4, Team4, Slider0 } from "../../services/script";
import Link from "next/link";
import { getItemsDetails } from "../../components/core/shop_requests";
import { useFormik } from "formik";
import * as yup from "yup";
// import { useQuery } from 'react-query';
import { postEnquiry } from "../../components/core/vendor_request";
import { useRouter } from "next/router";
import { useEffect } from "react";
import moment from "moment/moment";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { reviewForItems } from "../../components/core/vendor_request";
import AuthContex from "../../components/auth/AuthContex";
import { ToastContainer, toast } from "react-toastify";
import { getTimeSlot } from "../../components/core/realestate_request";
import Seo from "../../seo/seo";
import { useTranslation } from "react-i18next";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';





export default function DoctorDetails({ args }) {
  const { t } = useTranslation();

  const customeSlider = React.createRef();
  const { userData } = useContext(AuthContex);
  const [modal, setModal] = useState(false);
  // const toggle = () => setModal(!modal);
  const [revlen, setRevlen] = useState(5);
  const [slotTime, setSlotTime] = useState([])

  const fetchTimeSlots = () => {
    const id = userData?.id
    getTimeSlot(id).then(res => {
      setSlotTime(res.data)
    }).catch(err => console.error("err", err.message))
  }

  useEffect(() => {
    fetchTimeSlots()
  }, [])



  const router = useRouter()
  const { clinicId } = router.query
  const [Clinic, setClinic] = useState([])
  const [Loading, setLoading] = useState(false);
  const [rating, setRating] = useState();
  const [reviewImg, setReviewImg] = useState();
  const [PreviewImg, setPReviewImg] = useState();
  const [review, setReview] = useState([]);
  const [searchReview, setSearchReview] = useState("");
  const [showContact, setSContact] = useState(true)




  useEffect(async () => {
    let searchData = [];

    if (searchReview == "") {
      fetchDoctersInfo();
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

  const gotoNext = () => {
    customeSlider.current.slickNext()
  }
  const [url, setUrl] = useState();
  const [DoctorDetails, setDoctersDetails] = useState()

  const [openHrs, setOpenHrs] = useState()
  const [closeHrs, setcloseHrs] = useState()

  useEffect(() => {
    if (DoctorDetails?.item_hours?.length > 0) {
      let open = moment(DoctorDetails?.item_hours[0]?.item_hour_open_time, "hh:mm");

      var formatedTime = open.format("hh:mm a");

      setOpenHrs(formatedTime)

      let close = moment(DoctorDetails?.item_hours[0]?.item_hour_close_time, "hh:mm");

      var formatedTime2 = close.format("hh:mm a");

      setcloseHrs(formatedTime2)
    }

  }, [DoctorDetails])



  const toggle = () => !userData ? document.getElementById('openLoginPopup')?.click() : userData?.id == DoctorDetails?.user_id ? '' : setModal(!modal);


  const gotoPrev = () => {
    customeSlider.current.slickPrev()
  }

  const iframeUrl = `https://maps.google.com/maps?q=${DoctorDetails?.item_lat},${DoctorDetails?.item_lng}&hl=es;z=14&output=embed`;

  const iframeUrl2 = `https://www.google.com/maps/embed/v1/place?key=AIzaSyCOYU6x7yqbUnNRtBuygEfCX9NgWakZRLw&q=${DoctorDetails?.item_location_str ?? DoctorDetails?.item_address}`


  // const {isLoading,data:Clinic,error,refetch} = useQuery(
  //   ['Clinic',clinicId],
  //   () => getItemsDetails(clinicId)
  // )

  const fetchDoctersInfo = () => {
    setLoading(true)
    getItemsDetails(clinicId).then(res => {
      setClinic(res)
      setDoctersDetails(res.data);
      setReview(res.data?.reviews)
      setLoading(false)
    }).catch(err => {
      console.error("err", err.message)
      setLoading(false)
    })
  }

  useEffect(() => {
    fetchDoctersInfo()
  }, [clinicId])

  const initialValues = {
    item_id: "",
    product_id: "",
    user_id: "",
    body: "",
    overall_rating: "",
    image: "",
  };

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
          item_id: DoctorDetails.id ??  clinicId,
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
          fetchDoctersInfo()
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
            seller_id: DoctorDetails?.user_id,
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


  // useEffect(()=> {
  //   setDoctersDetails(Clinic?.data)
  // },[Clinic])



  return (
    <CommonLayout title="collection" parent="home">
      <Seo title={`${DoctorDetails?.item_title}`} description={`${DoctorDetails?.item_description}`} />

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
          </div> : DoctorDetails ?
            <section className="d-details mb-3">
              <Container>
                <div className=" pt-0">
                  <Row>
                    <Col lg="12" className=" mb-3 mb-md-4">
                      <div className="review_card ">
                        <Row>
                          <Col xl="2" lg="3" className="mb-2">
                            <div className="profile-image">
                              <img
                                src={DoctorDetails?.item_image_medium}
                                alt=""
                                onError={(e) => (e.currentTarget.src = "/assets/images/tatlub-img/No.jpg")}
                                className="company-logo "
                              />
                            </div>
                          </Col>
                          <Col className="mb-2">
                            <div className="d-md-flex justify-content-between">
                              <div className="fs-vp-pg">
                                <div className="d-flex align-items-center mb-3">
                                  <h4 className="fw-600 mb-0 text-capitalize vendor-profile-title pe-1">
                                    {DoctorDetails?.item_title}{" "}
                                  </h4>
                                  <img
                                    className="me-2 company_detail_icon"
                                    src="/assets/images/company/1.png"
                                  />
                                </div>
                                <div className="d-flex">
                                  <img
                                    className="me-2 mb-3 company_detail_icon"
                                    src="/assets/images/tatlub-img/icon-11.png"
                                  />{" "}
                                  <p className="text-capitalize">{DoctorDetails?.item_address ?? DoctorDetails?.item_location_str}</p>
                                </div>
                                <div className="d-flex align-items-center">
                                  <p className="">
                                    <img
                                      className="me-2 company_detail_icon"
                                      src="/assets/images/tatlub-img/Icon 8.png"
                                    />
                                    <span className="text-dark">{DoctorDetails?.rating ?? 0} {t('Rating')}</span>
                                  </p>
                                  <p className="ms-3 ">
                                    <span className="custom_ratng_text">
                                      {DoctorDetails?.reviews?.length ?? 0} {t('Reviews')}
                                    </span>
                                  </p>
                                </div>
                                <div className="d-flex">
                                  <img
                                    className="me-2 mb-3 company_detail_icon"
                                    src="/assets/images/tatlub-img/Icon 10.png"
                                  />{" "}
                                  <p>
                                    <span className="text-success">
                                      Open 24 Hrs{" "}
                                    </span>{" "}
                                    {DoctorDetails?.item_price && ". Fees:RS." + parseInt(DoctorDetails?.item_price)}
                                  </p>{" "}
                                </div>
                                <div className="d-none justify-content-start align-items-center pq-img">
                                  {
                                    DoctorDetails?.features?.length > 0 &&
                                    DoctorDetails?.features?.filter((e) => e.item_feature_value != "[object Object]" && e.item_feature_value != null).map((valu, i) => (
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
                          </Col>
                          <div className="d-md-flex justify-content-between">
                            <div className="d-flex mt-4">
                              {/* https://wa.me/<number> */}
                              {
                                DoctorDetails.item_social_whatsapp &&
                                <div className="vendor-icon-img mx-1" onClick={() => window.open(`https://wa.me/${DoctorDetails.item_social_whatsapp}`, '_blank')}>
                                  <img src="/assets/images/tatlub-img/s-6.jpg" />
                                </div>
                              }
                              {
                                DoctorDetails.item_social_facebook &&
                                <div className="vendor-icon-img mx-1" onClick={() => window.open(DoctorDetails.item_social_facebook, '_blank')}>
                                  <img src="/assets/images/tatlub-img/s-7.jpg" />
                                </div>
                              }
                              {
                                DoctorDetails.item_social_linkedin &&
                                <div className="vendor-icon-img mx-1" onClick={() => window.open(DoctorDetails.item_social_linkedin, '_blank')}>
                                  <img src="/assets/images/tatlub-img/s-8.jpg" onClick={() => window.open(DoctorDetails.item_social_whatsapp, '_blank')} />
                                </div>
                              }
                              {
                                DoctorDetails.item_social_twitter &&
                                <div className="vendor-icon-img mx-1">
                                  <img src="/assets/images/tatlub-img/s-9.jpg" onClick={() => window.open(DoctorDetails.item_social_twitter, '_blank')} />
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
                                  <Button className="btn d-flex justify-content-center align-items-center contact_suplier_btn me-2 mt-3" onClick={() => setSContact(false)}>
                                    {/* <img src="/assets/images/tatlub-img/call-1.png"  className="btn-img"/> */}
                                    <i class="fa fa-phone me-2 pb-0 fs-20" aria-hidden="true"></i>
                                    {t('show Number')}
                                  </Button>
                                  :
                                  <a href={"tel:" + DoctorDetails?.item_phone ?? DoctorDetails?.data?.user?.phone}>
                                    <Button className="btn d-flex justify-content-center align-items-center contact_suplier_btn me-2 mt-3">
                                      {/* <img src="/assets/images/tatlub-img/call-1.png"  className="btn-img"/> */}
                                      <i class="fa fa-phone me-2 pb-0 fs-20" aria-hidden="true"></i>
                                      {DoctorDetails?.item_phone ?? DoctorDetails?.data?.user?.phone ?? 'Call Now'}
                                    </Button>
                                  </a>
                              }

                              {/* {
                                slotTime?.length > 0 ?  
                                <Link href={{ pathname: '/shop/Booking2' }}>
                                <Button className="btn contact_suplier_btn mt-3">
                                  {t('Appointments List')}
                                </Button>
                              </Link> :
                              <Link href={{ pathname: '/shop/Booking', query: { 'clinicId': DoctorDetails.id } }}>
                                <Button className="btn contact_suplier_btn mt-3">
                                  {t('Book Appointment')}
                                </Button>
                              </Link>
                              } */}

                              <Link href={{ pathname: '/shop/Booking', query: { 'clinicId': DoctorDetails.id } }}>
                                {/* <Button className="btn send_enquery_btn mt-3"> */}
                                <Button className="btn contact_suplier_btn text-truncate mt-3"
                                  disabled={true}
                                // disabled={userData ? DoctorDetails?.user_id == userData?.id : !userData}
                                >
                                  {t('Book Appointment')}
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                </div>
                <Row>
                  <Col lg='9'>
                    <div className="review_card p-4 mb-4 d-none">
                      <div className="mb-4">
                        <h4 className="fs-5">{t('Quick Information')}</h4>
                      </div>
                      <Row>
                        <Col>
                          {
                            DoctorDetails?.founded_by ?
                              <div className="">
                                <h5 className="custom_timing fw-bold text-dark mb-2">{t('Year Of Experience')}</h5>
                                <p className="">{DoctorDetails?.founded_by}</p>
                              </div> :
                              <div className="">
                                <h5 className="custom_timing fw-bold text-dark mb-2">{t('Year Of Experience')}</h5>
                                {/* <p className="">2023</p> */}
                              </div>

                          }
                        </Col>
                        {/* <Col>
                    <div className="">
                      <h5 className="custom_timing mb-2 fw-bold">Mode Of Payment</h5>
                      <p className="me-lg-5 pe-lg-5">
                        Cash,Credit & Debit Card, Amex card
                      </p>
                    </div>
                  </Col> */}
                        <Col>
                          <div className="">
                            <h5 className="custom_timing fw-bold text-dark mb-2">{t('Timing')}</h5>
                            {/* {DoctorDetails?.item_hours
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
                                  <div className="d-sm-flex justify-content-between  ">
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

                            {
                              DoctorDetails?.item_hours?.length > 0 &&
                              <div className="d-flex justify-content-between mx-3 ">
                                <div>
                                  <h5 className="custom_timing fs-5">
                                    {DoctorDetails?.item_hours[0]?.item_hour_day_of_week == 1 &&
                                      "Mon"}{" "}
                                    {DoctorDetails?.item_hours[0]?.item_hour_day_of_week == 2 &&
                                      "Tue"}{" "}
                                    {DoctorDetails?.item_hours[0]?.item_hour_day_of_week == 3 &&
                                      "Wed"}{" "}
                                    {DoctorDetails?.item_hours[0]?.item_hour_day_of_week == 4 &&
                                      "Thu"}{" "}
                                    {DoctorDetails?.item_hours[0]?.item_hour_day_of_week == 5 &&
                                      "Fri"}{" "}
                                    {DoctorDetails?.item_hours[0]?.item_hour_day_of_week == 6 &&
                                      "Sat"}{" "}
                                    {DoctorDetails?.item_hours[0]?.item_hour_day_of_week == 7 &&
                                      "Sun"} -
                                    {DoctorDetails?.item_hours[DoctorDetails?.item_hours?.length - 1]?.item_hour_day_of_week == 1 &&
                                      "Mod"}{" "}
                                    {DoctorDetails?.item_hours[DoctorDetails?.item_hours?.length - 1]?.item_hour_day_of_week == 2 &&
                                      "Tue"}{" "}
                                    {DoctorDetails?.item_hours[DoctorDetails?.item_hours?.length - 1]?.item_hour_day_of_week == 3 &&
                                      "Wed"}{" "}
                                    {DoctorDetails?.item_hours[DoctorDetails?.item_hours?.length - 1]?.item_hour_day_of_week == 4 &&
                                      "Thu"}{" "}
                                    {DoctorDetails?.item_hours[DoctorDetails?.item_hours?.length - 1]?.item_hour_day_of_week == 5 &&
                                      "Fri"}{" "}
                                    {DoctorDetails?.item_hours[DoctorDetails?.item_hours?.length - 1]?.item_hour_day_of_week == 6 &&
                                      "Sat"}{" "}
                                    {DoctorDetails?.item_hours[DoctorDetails?.item_hours?.length - 1]?.item_hour_day_of_week == 7 &&
                                      "Sun"}
                                  </h5>
                                </div>

                                <div>
                                  <h5 className="5">{openHrs ?? "00:00"}- {closeHrs ?? '00:00'} </h5>
                                </div>
                              </div>
                            }

                            {!DoctorDetails?.item_hours ||
                              (DoctorDetails?.item_hours?.length == 0 && (
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
                        </Col>
                      </Row>
                    </div>
                    {
                      DoctorDetails?.item_specification?.length > 0 &&
                      <div className="review_card p-4 mb-4 doct-d">
                        <Row>
                          {
                            DoctorDetails?.item_specification?.map((data, index) => (
                              <Col key={index}>
                                <div className="mb-3 d-flex justify-content-between">
                                  <h4 className="complete_1 fs-5 text-capitalize">{data?.name ?? "Services"}</h4>
                                </div>
                                <ul>
                                  {
                                    data?.values?.split(',')?.map((valu, i) => (<>
                                      <li className="w-100 text-truncate" key={i}><img src="/assets/images/tatlub-img/Icon 4.png" className="btn-img" />{valu}</li>
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
                      DoctorDetails?.features?.length > 0 &&
                      <div className="review_card p-4 mb-4">
                        <div className="mb-4">
                          <h4 className="fs-5">{t('Quick Information')}</h4>
                        </div>

                        <div className="row justify-content-start align-items-center pq-img">
                          {
                            DoctorDetails?.features?.filter((e) => e.item_feature_value != "[object Object]" && e.item_feature_value != null).map((valu, i) => (
                              <div className="px-1 col-md-6 mb-2">
                                <div className='d-flex  align-items-center  listing-tags  mb-2' key={i}>
                                  {/* <img src='/assets/images/tatlub-img/Companies/Icons/_Experience.png' /> */}
                                  <p classname="text-capitalize" ><span className="text-capitalize">{valu?.custom_field?.custom_field_name ?? 'note'}</span> : <span className="text-capitalize"> {valu?.custom_field?.custom_field_name == 'Doctor fee' ? valu?.item_feature_value + t("QAR") : valu?.item_feature_value}</span></p>
                                </div>
                              </div>
                            ))
                          }
                        </div>

                      </div>
                    }

                    <div className="pt-0 mb-4">
                      {
                        DoctorDetails?.galleries?.length > 0 &&
                        <div className="review_card p-4">
                          <div className="">
                            <h4 className="fw-600 fs-5">{t('Image Gallery')}</h4>
                          </div>

                          <div className="mt-3 position-relative">
                            <Slider {...Slider0} ref={customeSlider} className="slide-4 offer-slider product_slider_ ">
                              {
                                DoctorDetails?.galleries?.length > 0 &&
                                DoctorDetails?.galleries?.map((data, index) => (
                                  // <slick-list >
                                  <div className="img-gallery " key={index}>
                                    <img
                                      className="w-100 "
                                      src={data?.item_image_gallery_name}
                                      onError={(e) => (e.currentTarget.src = "/assets/images/tatlub-img/No.jpg")}
                                    />
                                  </div>
                                  // </slick-list>
                                ))
                              }

                              {/* <slick-list>
                    <div className="img-gallery">
                    <img
                        className="img-fluid "
                        src="/assets/images/company/16.jpg"
                      />
                    </div>
                  </slick-list> */}
                            </Slider>
                            {
                              DoctorDetails?.galleries?.length > 4 && <>
                                <div onClick={() => gotoPrev()}><img src="/assets/images/tatlub-img/slid-3.png" className="slide-left" alt="..." /></div>
                                <div onClick={() => gotoNext()}><img src="/assets/images/tatlub-img/slid-4.png" className="slide-right" alt="..." /></div>
                              </>
                            }
                          </div>
                        </div>
                      }
                    </div>

                    {/* <div className="pt-0 mb-4">
                  <div className="review_card ">
                    <div className="mb-3">
                      <h4 className="fw-600 fs-5">Write A Review</h4>
                    </div>

                    <Row>
                        <Col md='4' className="mb-4">
                        <h5 className="fw-bolder">Property</h5>
                        <div className="d-flex mb-4 mt-3">
                        <img className="start-img mx-2" src="/assets/images/tatlub-img/Icon 8.png" />
                        <img className="start-img mx-2" src="/assets/images/tatlub-img/Icon 8.png" />
                        <img className="start-img mx-2" src="/assets/images/tatlub-img/Icon 9.png" />
                        <img className="start-img mx-2" src="/assets/images/tatlub-img/Icon 9.png" />
                        <img className="start-img mx-2" src="/assets/images/tatlub-img/Icon 9.png" />
                        </div>
                        <h5 className="fw-bolder">value For Money   </h5>
                        <div className="d-flex mt-3">
                        <img className="start-img mx-2" src="/assets/images/tatlub-img/Icon 8.png" />
                        <img className="start-img mx-2" src="/assets/images/tatlub-img/Icon 8.png" />
                        <img className="start-img mx-2" src="/assets/images/tatlub-img/Icon 8.png" />
                        <img className="start-img mx-2" src="/assets/images/tatlub-img/Icon 9.png" />
                        <img className="start-img mx-2" src="/assets/images/tatlub-img/Icon 9.png" />
                        </div>
                        </Col>
                        <Col md='4' className="mb-4">
                        <h5 className="fw-bolder">Location</h5>
                        <div className="d-flex mb-4 mt-3">
                        <img className="start-img mx-2" src="/assets/images/tatlub-img/Icon 8.png" />
                        <img className="start-img mx-2" src="/assets/images/tatlub-img/Icon 8.png" />
                        <img className="start-img mx-2" src="/assets/images/tatlub-img/Icon 8.png" />
                        <img className="start-img mx-2" src="/assets/images/tatlub-img/Icon 9.png" />
                        <img className="start-img mx-2" src="/assets/images/tatlub-img/Icon 9.png" />
                        </div>
                        <h5 className="fw-bolder">Agent Support</h5>
                        <div className="d-flex mt-3 mb-5">
                        <img className="start-img mx-2" src="/assets/images/tatlub-img/Icon 8.png" />
                        <img className="start-img mx-2" src="/assets/images/tatlub-img/Icon 8.png" />
                        <img className="start-img mx-2" src="/assets/images/tatlub-img/Icon 8.png" />
                        <img className="start-img mx-2" src="/assets/images/tatlub-img/Icon 9.png" />
                        <img className="start-img mx-2" src="/assets/images/tatlub-img/Icon 9.png" />
                        </div>
                        </Col>
                        <Col lg='4'className="d-flex align-items-center text-center A-rating mb-4 ">
                        <div className="w-100">
                            <h4>2.75</h4>
                            <h5 className="text-muted">Average Rating</h5>
                        </div>
                        </Col>
                    </Row>

                    <form>
                      <div className="row ">
                        <div className="col mb-3">
                          <input
                            type="text"
                            className="form-control border-0"
                            placeholder="Name"
                          />
                        </div>
                        <div className="col mb-3">
                          <input
                            type="text"
                            className="form-control border-0"
                            placeholder="Phone Number"
                          />
                        </div>
                      </div>
                      <div className="mt-3 mb-5">
                        <textarea
                          className="form-control border-0"
                          rows="8"
                          placeholder="Write A Review"
                        ></textarea>
                      </div>
                      <div className="text-stat">
                        <button type="submit" className="btn btn_filter1 w-25">Submit Review</button>
                      </div>
                    </form>
                  </div>
                </div> */}


                    <div className="review_card mt-4 mb-3">
                      <div className="d-flex align-items-center justify-content-between">
                        <h4 className="mb-3 fs-5">
                          {t('Reviews')} & {t('Rating')}
                        </h4>
                        <div className="filer-search-wicon">
                          <div className="search">
                            <span className="fa fa-search"></span>
                            <input
                              type="text"
                              placeholder={t("Search reviews")}
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
                                      <div className="d-flex alidn-items-center mb-3">
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
                            Load More
                          </Button>
                        </div>
                      )}
                    </div>

                  </Col>
                  <Col lg="3">
                    <div className="card border-0 p-3 py-4 shadow-sm  B2C-D mb-4 ">
                      <p className="fs-5 fw-bolder mb-3">{t('Enquire Now')}</p>
                      <form onSubmit={EnquiryForm.handleSubmit}>
                        <div className="mb-4">
                          <input
                            type="text"
                            className="form-control rounded"
                            placeholder={t("Name")}
                            {...EnquiryForm.getFieldProps("name")}
                          />
                          {EnquiryForm.touched.name && EnquiryForm.errors.name && (
                            <div className="fv-plugins-message-container">
                              <div className="fv-help-block">
                                <span role="alert" className="text-danger">
                                  {EnquiryForm.errors.name}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="mb-4">
                          <input
                            type="text"
                            className="form-control rounded"
                            placeholder={t("Mobile Number")}
                            maxLength={15}  {...EnquiryForm.getFieldProps("mobile")}
                            onChange={(e) => EnquiryForm.setFieldValue("mobile", e.target?.value.replace(/[^0-9]/g, ""))}
                          />
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
                        </div>
                        <div className="mb-4">
                          <input
                            type="text"
                            className="form-control rounded"
                            placeholder={t("Email Address")}
                            {...EnquiryForm.getFieldProps("email")}
                          />
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
                        </div>
                        <button type="submit" className="btn btn_filter1 w-100">
                          {t('Send Enquiry')}
                        </button>
                      </form>
                    </div>

                    <div className="card border-0 p-3 py-4 shadow-sm  B2C-D mb-4">
                      {/* <p className="fs-5 fw-bolder">Address</p>
                <h5>
                  No 130, Arcot Road, Virugambakkam, Chennai-600092
                  <h5>(Near Amirtha Madam)</h5>
                </h5>

                <div className="d-flex me-4">
                  <img
                    className="me-2 company_detail_icon"
                    src="/assets/images/company/7.png"
                  />
                  <h5 className="text-color">Get Directions</h5>
                </div> */}
                      {
                        DoctorDetails?.item_lat && DoctorDetails?.item_lng ?
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
                          : DoctorDetails?.google_map_link ?
                            <iframe
                              className="w-100"
                              height="250"
                              loading="lazy"
                              src={DoctorDetails?.google_map_link}
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
                    </div>
                    {/* 
              <div className="review_card p-3">
                <div >
                <p className="fs-5 fw-bolder mb-3">Enquire Now</p>
                </div>
                <div>
                <button type="button" className="btn btn-outline-secondary  mx-1 mb-2">Hospitals</button>
                <button type="button" className="btn btn-outline-secondary me-1 mb-2">Cardiologists</button>
                </div>
              </div> */}
                    <div className="reviewrite_company mt-4  mb-4">
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
                        disabled={userData?.id == DoctorDetails?.user_id ? true : false}
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
                                <h5 className="text-capitalize">{DoctorDetails?.user?.name}</h5>

                                <p>{DoctorDetails?.user?.address ?? DoctorDetails?.user?.user_details?.address}</p>
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
                                <Label>{t("Add Review")}</Label>
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

                    {DoctorDetails?.item_hours?.length > 0 && (
                      <div className="pt-0 b2c-2  mb-xl-0">
                        <div className="review_card p-4">
                          <Row>
                            <Col lg="12" className=" ">
                              <h4 className="fw-bolder mx-3 mb-3 fs-18">{t('Timing')}</h4>
                              {
                                DoctorDetails?.item_hours?.length > 0 &&
                                <div className="d-flex justify-content-between mx-3 ">
                                  <div>
                                    <h5 className="custom_timing fs-5">
                                      {DoctorDetails?.item_hours[0]?.item_hour_day_of_week == 1 &&
                                        "Mon"}{" "}
                                      {DoctorDetails?.item_hours[0]?.item_hour_day_of_week == 2 &&
                                        "Tue"}{" "}
                                      {DoctorDetails?.item_hours[0]?.item_hour_day_of_week == 3 &&
                                        "Wed"}{" "}
                                      {DoctorDetails?.item_hours[0]?.item_hour_day_of_week == 4 &&
                                        "Thu"}{" "}
                                      {DoctorDetails?.item_hours[0]?.item_hour_day_of_week == 5 &&
                                        "Fri"}{" "}
                                      {DoctorDetails?.item_hours[0]?.item_hour_day_of_week == 6 &&
                                        "Sat"}{" "}
                                      {DoctorDetails?.item_hours[0]?.item_hour_day_of_week == 7 &&
                                        "Sun"} -
                                      {DoctorDetails?.item_hours[DoctorDetails?.item_hours?.length - 1]?.item_hour_day_of_week == 1 &&
                                        "Mod"}{" "}
                                      {DoctorDetails?.item_hours[DoctorDetails?.item_hours?.length - 1]?.item_hour_day_of_week == 2 &&
                                        "Tue"}{" "}
                                      {DoctorDetails?.item_hours[DoctorDetails?.item_hours?.length - 1]?.item_hour_day_of_week == 3 &&
                                        "Wed"}{" "}
                                      {DoctorDetails?.item_hours[DoctorDetails?.item_hours?.length - 1]?.item_hour_day_of_week == 4 &&
                                        "Thu"}{" "}
                                      {DoctorDetails?.item_hours[DoctorDetails?.item_hours?.length - 1]?.item_hour_day_of_week == 5 &&
                                        "Fri"}{" "}
                                      {DoctorDetails?.item_hours[DoctorDetails?.item_hours?.length - 1]?.item_hour_day_of_week == 6 &&
                                        "Sat"}{" "}
                                      {DoctorDetails?.item_hours[DoctorDetails?.item_hours?.length - 1]?.item_hour_day_of_week == 7 &&
                                        "Sun"}
                                    </h5>
                                  </div>
                                  <div>
                                    <h5 className="5">{openHrs ?? "00:00"}- {closeHrs ?? '00:00'} </h5>
                                  </div>
                                </div>
                              }

                              {!DoctorDetails?.item_hours ||
                                (DoctorDetails?.item_hours?.length == 0 && (
                                  <div className="d-flex justify-content-between mx-3 ">
                                    <div>
                                      <h5 className="custom_timing fs-5">
                                        Sun - Sat
                                      </h5>
                                      {/* <h5 className="custom_timing">Sat - Sun</h5> */}
                                    </div>

                                    <div>
                                      <h5 className="5">00:00 - 00:00 </h5>
                                      {/* <h5>Closed Closed</h5> */}
                                    </div>
                                  </div>
                                ))}
                            </Col>
                            {/* <Col lg='12' className='mb-3'>
                            <div className="">
                    <h5 className=" fs-18 fw-bolder mb-2">{t('Year Of Experience')}</h5>
                    <p className="">{JobData?.founded_by}</p>
                  </div>
                            </Col> */}
                          </Row>
                        </div>
                      </div>
                    )}


                  </Col>
                </Row>
              </Container>
            </section> :
            <div className="container">
              <div className="card empty-wishlist shadow-sm p-4 mb-3">
                <div className="text-center">
                  <img src="/assets/images/tatlub-img/not_Found.png" className="" />
                  <p className="text-muted text-center">{t('DATA NOT FOUND')}!</p>
                </div>
              </div>
            </div>
      }
    </CommonLayout>
  );
}
