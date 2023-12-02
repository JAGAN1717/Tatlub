import React, { useState, useEffect, useContext } from 'react';
import CommonLayout from '../../../../components/shop/common-layout'
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText, Modal, ModalHeader, ModalBody } from "reactstrap";
import Seo from '../../../../seo/seo'
import CategoryType from '../common/categoryType';
import JobDetail from '../common/JobDetails';
import { getItemsDetails } from "../../../../components/core/shop_requests";
import { useRouter } from 'next/router';
import { setmainId, mainId } from '../../../../IDmain';
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import { useFormik } from "formik";
import * as yup from "yup";
import moment from "moment/moment";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { reviewForItems } from "../../../../components/core/vendor_request";
import AuthContex from "../../../../components/auth/AuthContex";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';



export default function JobDetails({ args }) {
  const { t } = useTranslation();
  const { userData } = useContext(AuthContex);

  const [Loading, setLoading] = useState(false)
  const [JobData, setJobData] = useState()
  const router = useRouter();
  const [url, setUrl] = useState();
  const [rating, setRating] = useState();
  const [reviewImg, setReviewImg] = useState();
  const [PreviewImg, setPReviewImg] = useState();
  const [review, setReview] = useState([]);
  const [searchReview, setSearchReview] = useState("");
  const [revlen, setRevlen] = useState(5);
  const [modal, setModal] = useState(false);
  const toggle = () => !userData ? document.getElementById('openLoginPopup')?.click() : userData?.id == JobData?.user_id ? '' : setModal(!modal);
  const [openHrs, setOpenHrs] = useState()
  const [closeHrs, setcloseHrs] = useState()


  useEffect(() => {
    if (JobData?.item_hours?.length > 0) {
      let open = moment(JobData?.item_hours[0]?.item_hour_open_time, "hh:mm");

      var formatedTime = open.format("hh:mm a");

      setOpenHrs(formatedTime)

      let close = moment(JobData?.item_hours[0]?.item_hour_close_time, "hh:mm");

      var formatedTime2 = close.format("hh:mm a");

      setcloseHrs(formatedTime2)
    }

  }, [JobData])


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


  useEffect(async () => {
    let searchData = [];

    if (searchReview == "") {
      fetchJobDetails();
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

  const { id } = router.query

  const fetchJobDetails = () => {
    setLoading(true)
    let ids = id ?? mainId()
    getItemsDetails(ids).then(res => {
      setJobData(res.data)
      setReview(res.data?.reviews)
      setLoading(false)
    }).catch(err => {
      console.error("err", err.message)
      setLoading(false)
    })
  }


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
          item_id: JobData?.id ?? mainId(),
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
          fetchJobDetails()
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



  useEffect(() => {
    // setJobData(jobs?.data)
    fetchJobDetails()
  }, [id])

  return (
    <CommonLayout parent="home" title="Jobs">
      <Seo title={`${JobData?.item_title}`} description={`${JobData?.item_description}`} />
      <div className='container mt-lg-5 mt-3 mb-lg-5 mb-3'>
        {
          Loading ?
            <div className="my-3 container">
              <div className="loader-wrapper2 rounded-4">
                {url === "Christmas" ? (
                  <div id="preloader"></div>
                ) : (
                  <div className="loader"></div>
                )}
              </div>
            </div> : JobData ?
              <div className='row'>
                <div className='col-lg-9 '>
                  <JobDetail JobData={JobData} />

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
                                      <h5 className='text-capitalize'>{data?.author_name}</h5>{" "}
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
                                    <div >
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
                          {t("Load More")}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-lg-3 d-lg-block d-none">
                  {/* <CategoryType /> */}
                  <div className="reviewrite_company mb-4">
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
                          role="button"
                          onClick={() => { setRating(5); toggle() }}
                        ></i>
                      </div>
                      {/* <div className="star-icon-com"><img src="/assets/images/tatlub-img/icon-8.png" /></div> */}
                    </div>
                    <Button
                      onClick={toggle}
                      id="closeRevie"
                      className="btn btn-review mt-md-5 mt-4"
                      disabled={userData?.id == JobData?.user_id ? true : false}
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
                              <h5 className='text-capitalize'>{JobData?.user?.name}</h5>

                              <p>{JobData?.user?.address}</p>
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

                  {JobData?.item_hours?.length > 0 && (
                    <div className="pt-0 b2c-2  mb-xl-0">
                      <div className="review_card p-4">
                        <Row>
                          <Col lg="12" className=" ">
                            <h4 className="fw-bolder mx-3 mb-3 fs-18">{t('Timing')}</h4>
                            {
                              JobData?.item_hours?.length > 0 &&
                              <div className="d-flex justify-content-between mx-3 ">
                                <div>
                                  <h5 className="custom_timing fs-5">
                                    {JobData?.item_hours[0]?.item_hour_day_of_week == 1 &&
                                      "Mon"}{" "}
                                    {JobData?.item_hours[0]?.item_hour_day_of_week == 2 &&
                                      "Tue"}{" "}
                                    {JobData?.item_hours[0]?.item_hour_day_of_week == 3 &&
                                      "Wed"}{" "}
                                    {JobData?.item_hours[0]?.item_hour_day_of_week == 4 &&
                                      "Thu"}{" "}
                                    {JobData?.item_hours[0]?.item_hour_day_of_week == 5 &&
                                      "Fri"}{" "}
                                    {JobData?.item_hours[0]?.item_hour_day_of_week == 6 &&
                                      "Sat"}{" "}
                                    {JobData?.item_hours[0]?.item_hour_day_of_week == 7 &&
                                      "Sun"} -
                                    {JobData?.item_hours[JobData?.item_hours?.length - 1]?.item_hour_day_of_week == 1 &&
                                      "Mod"}{" "}
                                    {JobData?.item_hours[JobData?.item_hours?.length - 1]?.item_hour_day_of_week == 2 &&
                                      "Tue"}{" "}
                                    {JobData?.item_hours[JobData?.item_hours?.length - 1]?.item_hour_day_of_week == 3 &&
                                      "Wed"}{" "}
                                    {JobData?.item_hours[JobData?.item_hours?.length - 1]?.item_hour_day_of_week == 4 &&
                                      "Thu"}{" "}
                                    {JobData?.item_hours[JobData?.item_hours?.length - 1]?.item_hour_day_of_week == 5 &&
                                      "Fri"}{" "}
                                    {JobData?.item_hours[JobData?.item_hours?.length - 1]?.item_hour_day_of_week == 6 &&
                                      "Sat"}{" "}
                                    {JobData?.item_hours[JobData?.item_hours?.length - 1]?.item_hour_day_of_week == 7 &&
                                      "Sun"}
                                  </h5>
                                </div>
                                <div>
                                  <h5 className="5">{openHrs ?? "00:00"}- {closeHrs ?? '00:00'} </h5>
                                </div>
                              </div>
                            }

                            {!JobData?.item_hours ||
                              (JobData?.item_hours?.length == 0 && (
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

                </div>
              </div> :
              <div className="card empty-wishlist shadow-sm p-4">
                <div className="text-center">
                  <img src="/assets/images/tatlub-img/not_Found.png" className="" />
                  <h3 className="text-center">{t("DATA NOT FOUND")}</h3>
                </div>
              </div>
        }

      </div>


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

              <div className="reviewrite_company shadow-none mt-4 mb-xl-0 mb-4">
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
                      role="button"
                      onClick={() => { setRating(5); toggle() }}
                    ></i>
                  </div>
                  {/* <div className="star-icon-com"><img src="/assets/images/tatlub-img/icon-8.png" /></div> */}
                </div>
                <Button
                  onClick={toggle}
                  id="closeRevie"
                  className="btn btn-review mt-md-5 mt-4"
                  disabled={userData?.id == JobData?.user_id ? true : false}
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
                          <h5 className='text-capitalize'>{JobData?.user?.name}</h5>

                          <p>{JobData?.user?.address}</p>
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
            </div>
          </div>
        </div>
      </div>


    </CommonLayout>
  )
}
