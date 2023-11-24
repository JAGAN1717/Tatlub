import React, { useEffect, useState, useContext } from "react";
import CommonLayout from "../../components/shop/common-layout";
import {
  Media,
  Container,
  Row,
  Col,
  Button,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import aboutus from "../../public/assets/images/about/about-us.jpg";
import avtar from "../../public/assets/images/avtar.jpg";
import two from "../../public/assets/images/2.jpg";
import Slider from "react-slick";
import { Slider2, Slider4, Product3 } from "../../services/script";
import team1 from "../../public/assets/images/team/1.jpg";
import team2 from "../../public/assets/images/team/2.jpg";
import team3 from "../../public/assets/images/team/3.jpg";
import team4 from "../../public/assets/images/team/4.jpg";
import ServiceLayout from "../../components/common/Service/service1.js";
import { getAboutus } from '../../components/core/vendor_request'
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import { reviewForItems } from "../../components/core/vendor_request";
import AuthContex from "../../components/auth/AuthContex";
import { getTesimonials, getBordOfDirect } from "../../components/core/seller_request";
import { getCustomerVideo } from "../../components/core/fashion_request";
import { useFormik } from "formik";
import * as yup from "yup";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import moment from "moment";
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import relativeTime from 'dayjs/plugin/relativeTime'
import timezone from 'dayjs/plugin/timezone'


dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

const initialValues = {
  item_id: "",
  product_id: "",
  user_id: "",
  body: "",
  overall_rating: "",
  image: "",
};

const TeamData = [
  {
    img: '/assets/images/team/1.jpg',
    name: "Hileri Keol",
    post: "CEo & Founder At Company",
  },
  {
    img: '/assets/images/team/2.jpg',
    name: "Hileri Keol",
    post: "CEo & Founder At Company",
  },
  {
    img: '/assets/images/team/3.jpg',
    name: "Hileri Keol",
    post: "CEo & Founder At Company",
  },
  {
    img: '/assets/images/team/4.jpg',
    name: "Hileri Keol",
    post: "CEo & Founder At Company",
  },
  {
    img: '/assets/images/team/1.jpg',
    name: "Hileri Keol",
    post: "CEo & Founder At Company",
  },
];

const Team = ({ img, name, post }) => {
  return (
    <div>
      <div>
        <Media src={img} className="img-fluid blur-up lazyload bg-img" alt="" />
      </div>
      <h4>{name}</h4>
      <h6>{post}</h6>
    </div>
  );
};

const customeSlider = React.createRef();

const gotoNext = () => {
  customeSlider.current.slickNext()
}

const gotoPrev = () => {
  customeSlider.current.slickPrev()
}


const TeamDetailData = [
  {
    img: '/assets/images/avtar.jpg',
    name: "mark jenco",
    post: "designer",
    about:
      "you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings.",
  },
  {
    img: '/assets/images/2.jpg',
    name: "mark jenco",
    post: "designer",
    about:
      "you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings.",
  },
  {
    img: '/assets/images/avtar.jpg',
    name: "mark jenco",
    post: "designer",
    about:
      "you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings.",
  },
  {
    img: '/assets/images/avtar.jpg',
    name: "mark jenco",
    post: "designer",
    about:
      "you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings.",
  },
  {
    img: '/assets/images/avtar.jpg',
    name: "mark jenco",
    post: "designer",
    about:
      "you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings.",
  },
  {
    img: '/assets/images/avtar.jpg',
    name: "mark jenco",
    post: "designer",
    about:
      "you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings.",
  },
];

const TeamDetail = ({ img, name, post, about }) => {

  return (
    <div>
      <div className="media">
        <div className="text-center">
          <Media src={img} alt="#" />
          <h5>{name}</h5>
          <h6>{post}</h6>
        </div>
        <div className="media-body">
          <p>{about}</p>
        </div>
      </div>
    </div>
  );
};

const AboutUs = (args) => {

  const [aboutdata, setAboutus] = useState()
  const fetchAboutUs = async () => {
    const responce = await getAboutus()
    setAboutus(responce.data)
  }
  console.log('llllll', aboutdata)
  const [searchReview, setSearchReview] = useState("");

  const { t } = useTranslation();

  const { userData } = useContext(AuthContex);

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [isOpen, setIsopen] = useState(false);
  const [rating, setRating] = useState();
  const [reviewImg, setReviewImg] = useState();
  const [PreviewImg, setPReviewImg] = useState();
  const [tesimonial, setTestimonials] = useState([]);
  const [videoList, setVideoList] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [url, setUrl] = useState();
  const [aboutList, setAboutList] = useState()
  const [bodLoad, setBoadLoad] = useState(5)

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
          // item_id: 0,
          // product_id: 0,
          benificial_id: 0,
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
          setdetail(response)
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
          fetchReviewData();
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



  const fetchTestimonils = async () => {
    try {
      setIsLoading(true);
      const response = await getTesimonials();
      setTestimonials(response?.data);
      setIsLoading(false);
    } catch (error) {
      console.error("error", error.message);
      setIsLoading(false);
    }
  };

  const Fetchbodss = async () => {
    try {
      setIsLoading(true);
      const response = await getBordOfDirect();
      setAboutList(response?.data);
      setIsLoading(false);
    } catch (error) {
      console.error("error", error.message);
      setIsLoading(false);
    }
  }


  const fetchVideoList = async () => {
    try {
      setIsLoading(true)
      const responce = await getCustomerVideo();
      setVideoList(responce.data)
      setIsLoading(false)
    } catch (error) {
      console.error('err', error.message);
      setIsLoading(false)
    }
  }


  useEffect(() => {
    // fetchAboutUs();
    Fetchbodss()
  }, [])

  return (
    <>
      <CommonLayout parent="home" title="About-us">
        {/* // <!-- about section start --> */}
        <section className="about-page section-b-space">
          <Container>
            <Row>
              <Col lg="12">
                <div className="banner-section mb-5">
                  <div className="">
                    <Media
                      // src={aboutus.src}
                      src={aboutList?.setting_page_about_image}
                      className="img-fluid blur-up lazyload w-100 h-100 rounded-3 mb-3 d-none d-sm-block"
                      onError={(e) =>
                      (e.currentTarget.src =
                        "/assets/images/tatlub-img/about.png")
                      }
                      alt=""
                    />
                  </div>
                  <div className="d-flex justify-content-center">
                    <ul className="nav nav-pills " id="pills-tab" role="tablist">
                      <li className="nav-item" role="presentation">
                        <button className="nav-link active text-dark fw-bold " id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true"><span className="foot-cat">Company Overview</span></button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button className="nav-link text-dark fw-bold  " id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false"><span className="foot-cat">Board of Directors</span></button>
                      </li>
                      <li className="nav-item" role="presentation" onClick={() => fetchTestimonils()}>
                        <button className="nav-link text-dark fw-bold " id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false"><span className="foot-cat">Testimonials</span></button>
                      </li>
                      <li className="nav-item" role="presentation" onClick={() => fetchVideoList()}>
                        <button className="nav-link text-dark fw-bold " id="pills-media-tab" data-bs-toggle="pill" data-bs-target="#pills-media" type="button" role="tab" aria-controls="pills-media" aria-selected="false"><span className="foot-cat">Media</span></button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button className="nav-link text-dark fw-bold " id="pills-story-tab" data-bs-toggle="pill" data-bs-target="#pills-story" type="button" role="tab" aria-controls="pills-story" aria-selected="false"><span className="foot-cat">Success Stories</span></button>
                      </li>
                    </ul>
                  </div>
                </div>
              </Col>
              {/* <Col xl='9' lg='8' > */}
              <Col sm='12' >
                {/* <p>{aboutdata?.setting_page_about.replace(/<[^>]+>/g, '')}</p> */}
                <div className="tab-content" id="pills-tabContent">
                  <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                    <div className="card empty-wishlist shadow-sm p-4 mb-4">
                      <div className="">
                        <h3 className="fs-5 text-dark fw-bold">Company Overview</h3>
                      </div>
                      {
                        isLoading &&
                        <div className="loader-wrapper2">
                          {url === "Christmas" ? (
                            <div id="preloader"></div>
                          ) : (
                            <div className="loader"></div>
                          )}
                        </div>
                      }
                      <div dangerouslySetInnerHTML={{ __html: aboutList?.setting_page_about }} />
                    </div>

                    <div className="card empty-wishlist shadow-sm p-4 mb-4">
                      <div className="row">
                        <div className="col-md-4 d-flex justify-content-center ">
                          <div className="text-center">
                            <img src="/assets/images/tatlub-img/about/a-01.svg" className="compage_img" />
                            <div className="">
                              <h4 className="fw-bold fs-5 mb-2 mt-0">{aboutList?.reviews ?? 0}</h4>
                              <h6 className="text-secondary">Review & Ratings</h6>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4 d-flex justify-content-center ">
                          <div className="text-center">
                            <img src="/assets/images/tatlub-img/about/a-02.svg" className="compage_img" />
                            <div className="">
                              <h4 className="fw-bold fs-5 mb-2 mt-0">{aboutList?.listing_count ?? 0}</h4>
                              <h6 className="text-secondary">Listing</h6>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4 d-flex justify-content-center ">
                          <div className="text-center">
                            <img src="/assets/images/tatlub-img/about/a-03.svg" className="compage_img" />
                            <div className="">
                              <h4 className="fw-bold fs-5 mb-2 mt-0">{aboutList?.cities ?? 0}</h4>
                              <h6 className="text-secondary">Cities</h6>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3 d-flex justify-content-center d-none">
                          <div className="text-center">
                            <img src="/assets/images/tatlub-img/about/a-04.svg" className="compage_img" />
                            <div className="">
                              <h4 className="fw-bold fs-5 mb-2 mt-0">538,220</h4>
                              <h6 className="text-secondary">Campanigns</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {
                      aboutList?.board_of_directors?.length > 0 &&
                      <div className="card empty-wishlist shadow-sm p-4 mb-4">

                        <div className="d-flex justify-content-between">
                          <div className="mb-3">
                            <h3 className="fs-5 text-dark fw-bold">Board of Directions</h3>
                          </div>
                          {
                            aboutList?.board_of_directors?.length > 3 &&
                            <div className="d-flex">
                              <div className="slide-arr mx-2 rounded" onClick={() => gotoPrev()}>
                                {/* <img src="/assets/images/tatlub-img/slid-4.png" className="p-2" alt="..." /> */}

                                <i className="fa fa-angle-left" aria-hidden="true"></i>
                              </div>
                              <div className="slide-arr mx-2 rounded" onClick={() => gotoNext()}>
                                {/* <img src="/assets/images/tatlub-img/slid-3.png" className="p-2 " alt="..." /> */}
                                <i className="fa fa-angle-right" aria-hidden="true"></i>
                              </div>
                            </div>
                          }
                        </div>

                        <Slider {...Product3} dots='false' ref={customeSlider} className="slide-4 offer-slider product_slider_ ">
                          {
                            aboutList?.board_of_directors?.map((data, index) => (
                              <slick-list key={index}>
                                <div className="boar_cards w-100 col-4" >
                                  <div className="text-center">
                                    <div className="mb-2 d-flex justify-content-center">
                                      <img className="review-img- me-0" src={data?.image ?? ''}
                                        onError={(e) =>
                                        (e.currentTarget.src =
                                          "/assets/images/tatlub-img/No.jpg")
                                        }
                                      />
                                    </div>
                                    <div className="mb-2">
                                      <h4 className="fs-15 fw-bold complete_1 text-capitalize">{data?.name}</h4>
                                      <h6 className="fw-light fs-14 complete_1">{data?.role}</h6>
                                    </div>
                                    <div className="">
                                      <h6 className="complete_4 fs-14 text-secondary">{data?.content}. </h6>
                                    </div>

                                  </div>

                                </div>
                              </slick-list>
                            ))
                          }

                        </Slider>

                      </div>
                    }


                    <div className="review_card d-none mt-4">
                      <div className="d-flex align-items-center justify-content-between">
                        <h4 className="mb-3 fs-5 mt-0">
                          {t("Reviews")} & {t("Rating")}
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
                      <div className="list-group list-group-flush">
                        <p className="custom_ratng_text mb-2">
                          0 {t("Users Review")}
                        </p>
                        <div className="d-flex">
                          <div
                            className="btn_filter btn"
                          >
                            {" "}
                            <span>{t("All")}</span>
                          </div>
                          <div
                            className="btn_filter btn"
                          >
                            {" "}
                            <span>{t("High to Low")}</span>
                          </div>
                          <div
                            className="btn_filter btn"
                          >
                            {" "}
                            <span>{t("Low to High")}</span>
                          </div>
                        </div>

                        <div className="list-group-item pb-3">
                          <Row className="row mt-4">
                            <div className="img-width_reviw">
                              <img className="review-img-" src="/assets/images/company/Testi 2.jpg" />
                            </div>
                            <Col className="right_review">
                              <div className="d-sm-flex justify-content-between mb-2">
                                <h5>Benjamin Denny Son</h5> <p>5 Days Ago</p></div>
                              <div className="d-flex align-items-center justify-content-sm-start justify-content-center mb-3"><img className="company_detail_icon me-3" src="/assets/images/company/4.png" /><h6 className="mb-0">5.0</h6></div>
                              <p>This Was My First Step In My Life....I Love My School Very Much..</p>
                            </Col>
                          </Row >
                        </div>

                        <div className="list-group-item pb-3">
                          <Row className="row mt-4">
                            <div className="img-width_reviw">
                              <img className="review-img-" src="/assets/images/company/Testi 2.jpg" />
                            </div>
                            <Col className="right_review">
                              <div className="d-sm-flex justify-content-between mb-2">
                                <h5>Benjamin Denny Son</h5> <p>5 Days Ago</p></div>
                              <div className="d-flex align-items-center justify-content-sm-start justify-content-center mb-3"><img className="company_detail_icon me-3" src="/assets/images/company/4.png" /><h6 className="mb-0">5.0</h6></div>
                              <p>This Was My First Step In My Life....I Love My School Very Much..</p>
                            </Col>
                          </Row >
                        </div>

                        <div className="list-group-item pb-3">
                          <Row className="row mt-4">
                            <div className="img-width_reviw">
                              <img className="review-img-" src="/assets/images/company/Testi 2.jpg" />
                            </div>
                            <Col className="right_review">
                              <div className="d-sm-flex justify-content-between mb-2">
                                <h5>Benjamin Denny Son</h5> <p>5 Days Ago</p></div>
                              <div className="d-flex align-items-center justify-content-sm-start justify-content-center mb-3"><img className="company_detail_icon me-3" src="/assets/images/company/4.png" /><h6 className="mb-0">5.0</h6></div>
                              <p>This Was My First Step In My Life....I Love My School Very Much..</p>
                            </Col>
                          </Row >
                        </div>

                      </div>

                      <div className="text-center">
                        <Button
                          className="btn btn_loadmore mt-3"
                        >
                          {t("Load More")}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                    <div className="card empty-wishlist shadow-sm p-4 mb-4">
                      <div className="mb-3">
                        <h3 className="fs-4 text-dark fw-bold">{t("Board of Directors")}</h3>
                      </div>
                      {
                        isLoading &&
                        <div className="loader-wrapper2">
                          {url === "Christmas" ? (
                            <div id="preloader"></div>
                          ) : (
                            <div className="loader"></div>
                          )}
                        </div>
                      }
                      {
                        aboutList?.board_of_directors?.length > 0 ?
                          aboutList?.board_of_directors?.slice(0, bodLoad).map((data, index) => (
                            <div className="About_testCard p-4 mb-4" key={index}>
                              <div className="d-flex justify-content-start align-items-center mb-2">
                                <div className="img-width_reviw">
                                  <img className="review-img-" src={data?.image ?? ''}
                                    onError={(e) =>
                                    (e.currentTarget.src =
                                      "/assets/images/tatlub-img/No.jpg")
                                    }
                                  />
                                </div>
                                <div className="">
                                  <h5 className="fw-bold text-capitalize">{data?.name}</h5>
                                  <h6 className="mb-0 text-secondary">{data?.role}</h6>
                                  {/* <div className="d-flex alidn-items-center"><img className="company_detail_icon me-3" src="/assets/images/company/4.png" /><h6>5.0</h6></div> */}
                                </div>
                              </div>
                              <div className="">
                                <h6 className="text-secondary lh-base complete_3">{data?.content}.</h6>
                              </div>
                            </div>
                          )) :
                          <div className="d-flex flex-column justify-content-center align-items-center ">
                            <img
                              src="/assets/images/tatlub-img/not_Found.png"
                              className="no_image"
                            />
                            <h3 className="text-center text-uppercase">{t("NO Board of Directors FOUND")}</h3>
                          </div>
                      }
                      {
                        aboutList?.board_of_directors?.length > 5 &&
                        <div className="text-center">
                          <Button
                            className="btn btn_loadmore mt-3"
                            type="button"
                            onClick={() => setBoadLoad(aboutList?.board_of_directors?.length)}
                          >
                            {t("Load More")}
                          </Button>
                        </div>
                      }
                    </div>
                  </div>

                  <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                    <div className="card empty-wishlist shadow-sm p-4 mb-4">
                      <div className="mb-3">
                        <h3 className="fs-4 text-dark fw-bold">{t("Customer Testimonials")}</h3>
                      </div>
                      {
                        isLoading &&
                        <div className="loader-wrapper2">
                          {url === "Christmas" ? (
                            <div id="preloader"></div>
                          ) : (
                            <div className="loader"></div>
                          )}
                        </div>
                      }
                      {
                        tesimonial?.length > 0 ?
                          tesimonial.map((data, index) => (
                            <div className="About_testCard p-4 mb-4" key={index}>
                              <div className="d-flex justify-content-start align-items-center mb-2">
                                <div className="img-width_reviw">
                                  <img className="review-img-" src={data?.testimonial_image ?? ''}
                                    onError={(e) =>
                                    (e.currentTarget.src =
                                      "/assets/images/tatlub-img/No.jpg")
                                    }
                                  />
                                </div>
                                <div className="">
                                  <h5 className="fw-bold">{data?.testimonial_name}</h5>
                                  <h6 className="mb-0 text-secondary">{data?.testimonial_company}</h6>
                                  {/* <div className="d-flex alidn-items-center"><img className="company_detail_icon me-3" src="/assets/images/company/4.png" /><h6>5.0</h6></div> */}
                                  <h6 className="text-color">{data?.testimonial_job_title}</h6>
                                </div>
                              </div>
                              <div className="">
                                <h6 className="text-secondary lh-base complete_3">{data?.testimonial_description}</h6>
                              </div>
                            </div>
                          )) :

                          <div className="d-flex flex-column justify-content-center align-items-center ">
                            <img
                              src="/assets/images/tatlub-img/not_Found.png"
                              className="no_image"
                            />
                            <h3 className="text-center text-uppercase">{t("NO tesimonials FOUND")}</h3>
                          </div>
                      }
                    </div>
                  </div>

                  <div className="tab-pane fade" id="pills-media" role="tabpanel" aria-labelledby="pills-media-tab">
                    <div className="card empty-wishlist shadow-sm p-4 mb-4 about_media">
                      <div className="mb-3">
                        <h3 className="fs-4 text-dark fw-bold">{t("Media")}</h3>
                      </div>

                      <Row id="vedio_show" className="w-100">
                        {/* {videoList?.length == 0 ||
                          (!videoList && (
                            <span>{t("Videos not available")}</span>
                          ))} */}
                        {videoList?.map(
                          (video, index) => (
                            <Col
                              md="4"
                              lg="4 mb-3 px-2"
                              sm="4"
                              xl='3'
                              xs="12"
                              key={index}
                            >
                              <div className="card_vedio_section">
                                <div className="img_gallery_company_icon " onClick={() => window.open(video?.video, '_blank')}>
                                  {/* <img className="img_gallery_company" src={video} /> */}
                                  {/* <video className="img_gallery_company" width="400" controls>
                                          <source className="img_gallery_company"  src={video} type='video/mp4' />
                                          </video> */}
                                  <video
                                    width="400"
                                    loop="loop"
                                    preload={false}
                                    className="img_gallery_company"
                                    src={video?.video}
                                    autoPlay={false}
                                    controls={false}
                                  ></video>
                                  <div className="img-bg-projj">
                                    <img
                                      className="icon_click cursor-pointer"
                                      src="/assets/images/tatlub-img/s-5.jpg"
                                    />
                                  </div>
                                  {/* <div className="ratio ratio-16x9">
                                              <iframe src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0" title="YouTube video" allowfullscreen></iframe>
                                              </div> */}
                                </div>
                                {/* <p className="mb-0 mt-2">Rathna Fan House Pvt Ltd</p> */}
                              </div>
                            </Col>
                          )
                        )}

                        {
                          !videoList?.length > 0 &&
                          <div className="d-flex flex-column justify-content-center align-items-center ">
                            <img
                              src="/assets/images/tatlub-img/not_Found.png"
                              className="no_image"
                            />
                            <h3 className="text-center text-uppercase">{t("NO MEDIA FOUND")}</h3>
                          </div>
                        }
                      </Row>
                    </div>
                  </div>

                  <div className="tab-pane fade" id="pills-story" role="tabpanel" aria-labelledby="pills-story-tab">
                    <div className="review_card mt-4">
                      <div className="d-flex align-items-start justify-content-between mb-3">
                        <h4 className="mb-3 fs-4 mt-0 text-dark fw-bold">
                          Success Stories
                        </h4>
                        <div className="filer-search-wicon d-none">
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

                      <div className="list-group list-group-flush ">
                        <div className="d-flex d-none">
                          <div
                            className="btn_filter btn"
                          >
                            {" "}
                            <span>{t("All")}</span>
                          </div>
                          <div
                            className="btn_filter btn"
                          >
                            {" "}
                            <span>{t("Without Videos")}</span>
                          </div>
                          <div
                            className="btn_filter btn"
                          >
                            {" "}
                            <span>{t("With Videos")}</span>
                          </div>
                        </div>

                        {
                          aboutList?.success_stories?.length > 0 ?
                            aboutList?.success_stories?.map((data, index) => {
                              let day = moment(data?.created_at);
                              let fromhour = moment.utc(day).local().startOf('seconds').fromNow()
                              // let fromhour = dayjs().to(dayjs.utc(data?.created_at))

                              return (
                                <div className="list-group-item pb-3" key={index}>
                                  <Row className="row mt-4">
                                    <div className="img-width_reviw">
                                      <img className="review-img-" src={data?.image}
                                        onError={(e) =>
                                        (e.currentTarget.src =
                                          "/assets/images/tatlub-img/No.jpg")
                                        }
                                      />
                                    </div>
                                    <Col className="right_review">
                                      <div className="d-sm-flex justify-content-between mb-2">
                                        <h5 className="text-capitalize">{data?.name}</h5> <p>{fromhour ?? 'Now'}</p></div>
                                      {/* <div className="d-flex alidn-items-center mb-2"><h6 className="text-secondary"><span className="text-color">GVS Sales Pvt Ltd,Mumbai,</span> Car Loan & Second Hand Car Dealer</h6></div> */}
                                      <div className="d-flex alidn-items-center mb-2"><h6 className="text-secondary">{data?.role}</h6></div>
                                      <p className="complete_1">{data?.stories}.</p>
                                    </Col>
                                  </Row >
                                </div>
                              )
                            }) : <div className="d-flex flex-column justify-content-center align-items-center ">
                              <img
                                src="/assets/images/tatlub-img/not_Found.png"
                                className="no_image"
                              />
                              <h3 className="text-center text-uppercase">{t("NO success stories FOUN")}D</h3>
                            </div>
                        }

                        {
                          !aboutList?.success_stories &&
                          <div className="d-flex flex-column justify-content-center align-items-center ">
                            <img
                              src="/assets/images/tatlub-img/not_Found.png"
                              className="no_image"
                            />
                            <h3 className="text-center text-uppercase">{t("NO success stories FOUND")}</h3>
                          </div>
                        }



                        {/* <div className="list-group-item pb-3">
              <Row className="row mt-4">
                <div className="img-width_reviw">
                  <img className="review-img-" src="/assets/images/company/Testi 5.jpg" />
                </div>
                <Col className="right_review">
                  <div className="d-sm-flex justify-content-between mb-2">
                    <h5>Benjamin Denny Son</h5> <p>5 Days Ago</p></div>
                  <div className="d-flex alidn-items-center mb-2"><h6 className="text-secondary"><span className="text-color">GVS Sales Pvt Ltd,Mumbai,</span> Car Loan & Second Hand Car Dealer</h6></div>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </Col>
              </Row >
            </div> */}
                      </div>

                      <div className="text-center d-none">
                        <Button
                          className="btn btn_loadmore mt-3"
                        >
                          {t("Load More")}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  <div>
                    {/* <h2 className="mt-2 text-center">ABOUT US</h2> */}
                    {/* <div dangerouslySetInnerHTML={{ __html: aboutdata?.setting_page_about }} /> */}
                  </div>
                </div>
              </Col>
              <Col xl='3' lg='4' className="d-flex justify-content-center d-none">
                <div className="reviewrite_company mt-4 mb-xl-0 mb-4">
                  <h3 className="mb-md-4 mb-3">
                    {t("Write a Review")}
                  </h3>
                  <div className="d-flex justify-content-xs-between mt-3">
                    <div
                      className={
                        rating > 0 ? "star-icon-com onStart_color" : "star-icon-com"
                      }
                    >
                      <i
                        className="fa fa-star cursor-pointer fs-4"
                        aria-hidden="true"
                        onClick={() => {
                          setRating(1);
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
                        onClick={() => setRating(2)}
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
                        onClick={() => setRating(3)}
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
                        onClick={() => setRating(4)}
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
                    {/* <div className="star-icon-com"><img src="/assets/images/tatlub-img/icon-8.png" /></div> */}
                  </div>
                  <button
                    onClick={toggle}
                    id="closeRevie"
                    className="btn btn-review mt-md-5 mt-4"
                    disabled={userData ? false : true}
                  >
                    {t("Write a Review")}
                  </button>
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
                          {/* <h4 className="mb-0 pb-0">{t('Write a')}  {t('Review')}</h4> */}
                        </div>
                        <div className="">
                          <form onSubmit={formik.handleSubmit}>
                            <div className="d-flex justify-content-between align-items-center my-3">
                              <p className="mb-0">Over All</p>{" "}
                              <div className="d-flex">
                                {/* <div className="star-icon-com me-2"><img src="/assets/images/tatlub-img/icon-8.png" /></div> */}
                                {/* <div className="star-icon-com me-2"><img src="/assets/images/tatlub-img/icon-8.png" /></div>
                                                  <div className="star-icon-com me-2"><img src="/assets/images/tatlub-img/icon-8.png" /></div>
                                                  <div className="star-icon-com me-2"><img src="/assets/images/tatlub-img/icon-8.png" /></div>
                                                  <div className="star-icon-com me-2"><img src="/assets/images/tatlub-img/icon-8.png" /></div> */}
                                <Stack spacing={1}>
                                  <Rating
                                    name="size-large star_rate"
                                    value={rating}
                                    onChange={(e) => setRating(e.target.value)}
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
                            {formik.touched.body && formik.errors.body && (
                              <div className="fv-plugins-message-container">
                                <div className="fv-help-block">
                                  <span role="alert" className="text-danger">
                                    {formik.errors.body}
                                  </span>
                                </div>
                              </div>
                            )}
                            <p>{t("Add Photos")}</p>
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
                            <button className="btn submit_btn" type="submit">
                              {t("Submit")}
                            </button>
                          </form>
                        </div>
                      </div>
                    </ModalBody>
                  </Modal>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </CommonLayout>
    </>
  );
};

export default AboutUs;
