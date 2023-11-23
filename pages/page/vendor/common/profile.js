import React, { useState, useEffect, useContext } from "react";
import Profile from "../../../../public/assets/images/vendor/profile.jpg";
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
import seventeen from "../../../../public/assets/images/logos/17.png";
import FilterPage from "../../../shop/common/filter";
import ProductList from "../../../shop/common/productList";
import { ReactDOM } from "react";
import axios from "axios";
// import { constrainPoint } from "@fullcalendar/core/internal";
import {
  getCategory,
  getSocialmedia,
  getAddToCart
} from "../../../../components/core/fashion_request";
import {
  getSellerProfile,
  reviewForSeller,
  getReview,
  getSellerCtegory,
  postEnquiry,
} from "../../../../components/core/vendor_request";
import { postQuotes } from "../../../../components/core/seller_request";
import { getMyBussiness } from "../../../../components/core/shop_requests";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as yup from "yup";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import AuthContex from "../../../../components/auth/AuthContex";
import itemscontex from "../../../initcontext";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import moment from "moment/moment";
import Seo from "../../../../seo/seo";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';


const ProfilePage = (args) => {
  const { t } = useTranslation();

  const [ToggleState, setToggleState] = useState(1);
  const toggleTab = (index) => {
    setToggleState(index);
  };
  const { setCart } = useContext(itemscontex)
  const router = useRouter();
  const [modal, setModal] = useState(false);
  // const toggle = () => setModal(!modal);
  const [activeTab, setActiveTab] = useState("1");
  const [sidebarView, setSidebarView] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sellerproduct, setsellerproduct] = useState([]);
  const [sellerbrance, setsellerbrance] = useState([]);
  const [seller, setSeller] = useState([]);
  const [vendor, SetVendor] = useState([])
  const [review, setReview] = useState([]);
  const [rating, setRating] = useState();
  const [desc, setDesc] = useState();
  const [reviewImg, setReviewImg] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [reviewlevel, setReviewlevel] = useState(1);
  const [category, setCategory] = useState([]);
  const [soacial, setSocial] = useState([]);
  const [url, setUrl] = useState();
  const [revlen, setRevlen] = useState(5);
  const [productLen, setProductlen] = useState(8);
  // const [lowTohigh, setLowTohigh] = useState(0);
  const [searchReview, setSearchReview] = useState("");
  const [Listings, setListing] = useState([]);
  const [itemsID, setItemsID] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [showContact, setSContact] = useState(true)


  const { userData } = useContext(AuthContex);

  const { id } = router.query;

  // if(typeof seller.user_details === "undefined"){}

  const toggle = () => !userData ? document.getElementById('openLoginPopup')?.click() : userData?.id == id ? '' : setModal(!modal);

  const openCloseSidebar = () => {
    if (sidebarView) {
      setSidebarView(!sidebarView);
    } else {
      setSidebarView(!sidebarView);
    }
  };

  function handleSearch(e) {
    let product = e.target.value.toLowerCase()
    if (product) {
      if (activeTab === "1") {
        const filterData = seller.products.filter(data => data.product_name.toLowerCase().includes(product))
        setSeller((p) => ({ ...p, products: filterData }))
      } else if (activeTab === "2") {
        const filterData = seller.items.filter(data => data.item_title.toLowerCase().includes(product))
        setSeller((p) => ({ ...p, items: filterData }))
      }
    } else {
      setSeller(vendor)
    }
  }



  const cartFun3 = async (data) => {
    if (!userData?.id) {
      document.getElementById('openLoginPopup')?.click();
    }

    let body = {
      "user_id": userData?.id,
      "seller_id": data.user_id,
      "product_id": data.id,
      "price": data.product_price,
      "quantity": 1
    }

    const response = await getAddToCart(body)
    if (response.status == 200) {
      setCart(response)
      // setCart(response)
      // dispatch(
      //   setCart({
      //     ...data,
      //     totalPrice:data?.product_price,
      //     quantity:counters1[index],
      //     itemBasePrice:data?.product_price,
      //     cartId:response.data?.id
      //   })
      // )
      toast.info("Added to cart", {
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
    }
  }



  // var formdata = new FormData()
  // formdata.append('img',reviewImg)
  const openNav = () => {
    var openmyslide = document.getElementById("mySidenav1");
    if (openmyslide) {
      openmyslide.classList.add("open-side");
    }
  };

  const fetchSocialMedia = async () => {
    setIsLoading(true);
    const response = await getSocialmedia();
    setSocial(response.data);
    setIsLoading(false);
  };

  const getActiveClass = (index, className) =>
    ToggleState === index ? className : "";

  const [isOpen, setIsopen] = useState(false);

  const ToggleSidebar = () => {
    isOpen === true ? setIsopen(false) : setIsopen(true);
  };

  const fetchCompanyData = async () => {
    setIsLoading(true);
    const response = await getSellerProfile(id);
    setSeller(response.data);
    SetVendor(response.data)
    setIsLoading(false);
  };

  const fetchCateogry = async () => {
    try {
      setIsLoading(true);
      const response = await getSellerCtegory(id);
      setCategory(response.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchReviewData = async () => {
    // setIsLoading(true)
    const response = await getReview(id, reviewlevel);
    setReview(response.data);
    // setIsLoading(false)
  };

  useEffect(async () => {
    let searchData = [];

    const response = await getReview(id, reviewlevel);

    if (searchReview == "") {
      fetchReviewData();
    }
    if (searchReview) {
      response.data?.map((data, i) => {
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

  const addImage = (img) => {
    let image_as_file = img.target.files[0];
    // var formdata = new FormData();
  };

  const PostReview = async (e) => {
    e.preventDefault();
    let seller_id = seller?.id;
    let user_id =
      JSON.parse(sessionStorage.getItem("data"))?.id ??
      JSON.parse(localStorage.getItem("data"))?.id;

    const body = {
      benificial_id: seller_id,
      user_id: user_id,
      overall_rating: rating,
      body: desc,
      image: reviewImg,
    };
    var formdata = new FormData();

    Object.entries(body).forEach(([key, value]) => {
      formdata.append(key, value);
    });

    const response = await reviewForSeller(formdata);
    if (response.status == 200) {
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
  };

  const reviewSchema = yup.object().shape({
    overall_rating: yup.string(),
    body: yup.string().required("Please Add Your Review"),
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
    enquiries: yup.string().required("Please Enter Your Enquiries "),
    seller_id: yup.string(),
    user_id: yup.string(),
  });

  const EnquiryForm = useFormik({
    initialValues: enquiryValue,
    validationSchema: enquirySchema,
    onSubmit: async (values, { setStatus, setSubmitting, resetForm }) => {
      try {
        let user_id =
          JSON.parse(sessionStorage.getItem("data"))?.id ??
          JSON.parse(localStorage.getItem("data"))?.id;

        let body = {
          name: values.name,
          mobile: values.mobile,
          email: values.email,
          enquiries: values.enquiries,
          seller_id: id,
          user_id: user_id,
        };

        document.getElementById("openloaderModal")?.click();
        const response = await postEnquiry(body);
        document.getElementById("closeloaderModal")?.click();
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
        document.getElementById("closeloaderModal")?.click();
        console.error(error);
        setStatus("dont give proper review details is incorrect");
        setSubmitting(false);
      }
    },
  });

  const initialValues = {
    benificial_id: "",
    user_id: "",
    overall_rating: "",
    body: "",
    image: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: reviewSchema,
    onSubmit: async (values, { setStatus, setSubmitting, resetForm }) => {
      // setIsLoading(true)
      // alert()
      try {
        let seller_id = seller?.id;
        let user_id =
          JSON.parse(sessionStorage.getItem("data"))?.id ??
          JSON.parse(localStorage.getItem("data"))?.id;

        const body = {
          benificial_id: seller_id,
          user_id: user_id,
          overall_rating: rating,
          body: values.body,
          image: reviewImg,
        };
        var formdata = new FormData();

        Object.entries(body).forEach(([key, value]) => {
          formdata.append(key, value);
        });
        const response = await reviewForSeller(formdata);
        if (response.status == 200) {
          document.getElementById("closeRevie")?.click();
          toast.info("SUCCESS", {
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


  const initialValues2 = {
    item_id: "",
    item_lead_name: "",
    item_lead_email: "",
    item_lead_phone: "",
    item_lead_message: "",
  };
  const formValidation = yup.object().shape({
    item_lead_name: yup.string().required("Enter you Name"),
    item_lead_email: yup.string()
      .email("Please Enter Valid Email Id")
      .required("Enter you Email Id"),
    item_lead_phone: yup.string().min(7, "Phone number must be at least 7 Digits").required("Enter your Mobile Number"),
    item_lead_message: yup.string(),
  });


  const formik2 = useFormik({
    initialValues: initialValues2,
    validationSchema: formValidation,
    onSubmit: async (values, { setStatus, setSubmitting, resetForm }) => {
      try {
        const body = {
          item_id: itemsID,
          item_lead_name: values.item_lead_name,
          item_lead_email: values.item_lead_email,
          item_lead_phone: values.item_lead_phone,
          item_lead_message: values.item_lead_message,
        };
        // document.getElementById("openloaderModal")?.click();
        setOpen(true);
        const response = await postQuotes(body);
        setOpen(false);
        // document.getElementById("closeloaderModal")?.click();
        if (response.status == 200) {
          document.getElementById("closeQuotesmodal")?.click();
          toast.info("SAVE SUCCESSFULL", {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            icon: false,
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
      } catch (error) {
        // document.getElementById("closeloaderModal")?.click();
        setOpen(false);
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

      resetForm();
    },
  });

  useEffect(() => {
    id && fetchReviewData();
  }, [reviewlevel, id]);

  useEffect(() => {
    id && fetchCompanyData();
    id && fetchCateogry();
    id && fetchSocialMedia();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert();
  };

  return (
    <>
      <Seo title={`${seller?.name}`} />
      {isLoading ? (
        <div className="loader-wrapper2">
          {url === "Christmas" ? (
            <div id="preloader"></div>
          ) : (
            <div className="loader"></div>
          )}
        </div>
      ) : (
        <div>

          <div
            className="modal fade"
            id="QuateModal"
            tabIndex="-1"
            aria-labelledby="QuateModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="pt-4 px-4">
                  <div className="text-center">
                    {/* <h3>Get Quote</h3> */}
                    <div className="mb-3">
                      <img
                        src="/assets/images/icon/logo.png"
                        className="w-25"
                        onError={(e) =>
                        (e.currentTarget.src =
                          "/assets/images/tatlub-img/no1.png")
                        }
                      />
                    </div>
                    <p className="text-muted">
                      To get please fill out the form below, we will get
                      back to you in 24 hours when you get your
                      request.Thank for you Being
                    </p>
                  </div>
                  <form onSubmit={formik2.handleSubmit}>
                    <div className="row">
                      <div className="mb-3 col-12">
                        <label className="form-lable">First Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder={t("Enter Your Name")}
                          {...formik2.getFieldProps("item_lead_name")}
                        />
                        {formik2.touched.item_lead_name &&
                          formik2.errors.item_lead_name && (
                            <div className="fv-plugins-message-container">
                              <div className="fv-help-block">
                                <span
                                  role="alert"
                                  className="text-danger"
                                >
                                  {formik2.errors.item_lead_name}
                                </span>
                              </div>
                            </div>
                          )}
                      </div>
                      <div className="mb-3 col-12">
                        <label className="form-lable">Email</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder={t("Enter Your Email ID")}
                          {...formik2.getFieldProps("item_lead_email")}
                        />
                        {formik2.touched.item_lead_email &&
                          formik2.errors.item_lead_email && (
                            <div className="fv-plugins-message-container">
                              <div className="fv-help-block">
                                <span
                                  role="alert"
                                  className="text-danger"
                                >
                                  {formik2.errors.item_lead_email}
                                </span>
                              </div>
                            </div>
                          )}
                      </div>
                      <div className="mb-3 col-12">
                        <label className="form-lable">
                          Mobile Number
                        </label>
                        <input
                          type="text"
                          maxLength={15}
                          className="form-control"
                          placeholder={t("Enter Your Mobile Number")}
                          {...formik2.getFieldProps("item_lead_phone")}
                          onChange={(e) =>
                            formik2.setFieldValue(
                              "item_lead_phone",
                              e.target?.value.replace(/[^0-9]/g, "")
                            )
                          }
                        />
                        {formik2.touched.item_lead_phone &&
                          formik2.errors.item_lead_phone && (
                            <div className="fv-plugins-message-container">
                              <div className="fv-help-block">
                                <span
                                  role="alert"
                                  className="text-danger"
                                >
                                  {formik2.errors.item_lead_phone}
                                </span>
                              </div>
                            </div>
                          )}
                      </div>
                      <div className="mb-3 col-12">
                        <label className="form-lable">Message</label>
                        <textarea
                          className="form-control"
                          placeholder={t("How Can We help You?")}
                          rows={3}
                          {...formik2.getFieldProps("item_lead_message")}
                        />
                        {formik2.touched.item_lead_message &&
                          formik2.errors.item_lead_message && (
                            <div className="fv-plugins-message-container">
                              <div className="fv-help-block">
                                <span
                                  role="alert"
                                  className="text-danger"
                                >
                                  {formik2.errors.item_lead_message}
                                </span>
                              </div>
                            </div>
                          )}
                      </div>
                    </div>
                    <div className="modal-footer border-0 d-flex justify-content-center align-items-center">
                      <button
                        type="button"
                        className="btn btn-secondary d-none"
                        id="closeQuotesmodal"
                        data-bs-dismiss="modal"
                      ></button>
                      <button
                        type="submit"
                        className="btn btn-theme rounded w-50"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <section className="vendor-profile pt-0">
            <Container>
              <div className="container-fluid mt-3">
                <div className={`sidebar ${isOpen == true ? "active" : ""}`}>
                  <div className="sd-header">
                    <h4 className="mb-0"></h4>
                    <div className="" onClick={ToggleSidebar}>
                      <i className="fa fa-times"></i>
                    </div>
                  </div>
                  <div className="sd-body">
                    <div className="">
                      {
                        category?.length > 0 &&
                        <div className="category_company pt-0 shadow-none">
                          <h3 className="mb-md-4 mb-3">{t("All Categories")}</h3>
                          <ul className="d-block">
                            {category?.slice(0, 8).map((data, index) => (
                              <li key={index} className="cursor-pointer foot-cat">
                                <img src="/assets/images/tatlub-img/nav.8.png" />
                                <span
                                  className="text-capitalize"
                                  onClick={() =>
                                    router.push({
                                      pathname:`/category/service/${data.category_slug}`,
                                      // query: { Category: data.category_slug, searchList: 'service' },
                                    })
                                  }
                                >
                                  {data.category_name}
                                </span>
                              </li>
                            ))}
                          {/* <li>
                            <a href="#">{t("More")}</a>{" "}
                          </li> */}
                          </ul>
                        </div>
                      }

                      <div className="reviewrite_company p-3 shadow-none  mb-xl-0 mb-4">
                        <h3 className="mb-md-4 mb-3">
                          {t("Write a")} {t("Review")}
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
                                onClick={() => { setRating(2); toggle(); ToggleSidebar() }}
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
                                onClick={() => { setRating(3); toggle(); ToggleSidebar() }}
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
                                onClick={() => { setRating(4); toggle(); ToggleSidebar() }}
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
                                onClick={() => { setRating(5); toggle(); ToggleSidebar() }}
                              ></i>
                            </div>
                          </div>
                        <Button
                          onClick={()=> {toggle(); ToggleSidebar()}}
                          className="btn btn-review mt-md-5 mt-4"
                          disabled={userData?.id == id ? true : false}
                        >
                          {t("Write a")} {t("Review")}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={`sidebar-overlay ${isOpen == true ? "active" : ""
                    }`}
                  onClick={ToggleSidebar}
                ></div>
              </div>

              {/* <div className="navbar mb-2 ms-2 d-xl-none d-block">
                <a href={null} onClick={ToggleSidebar}>
                  <div className="bar-style ">
                    <i
                      className="fa fa-filter text-color fs-25"
                      aria-hidden="true"
                    ></i>
                  </div>
                </a>
              </div> */}
              <a href={null} onClick={() => ToggleSidebar()}>
                <div className="setting-sidebar1 d-xl-none " id="setting-icon1">
                  <div>
                    <i className="fa fa-filter" aria-hidden="true"></i>
                  </div>
                </div>
              </a>
              <Row>
                <Col lg="12" className=" mb-3 mb-md-4">
                  <div className="profile-left">
                    <Row>
                      <Col xl="2" lg="3">
                        <div className="profile-image mb-lg-0 mb-3 pb-3">
                          {/* "/assets/images/company/Logo.jpg" */}
                          <img
                            src={
                              seller?.user_image == null
                                ? ""
                                : seller?.user_image
                            }
                            onError={(e) =>
                            (e.currentTarget.src =
                              "/assets/images/tatlub-img/No.jpg")
                            }
                            alt=""
                            className="company-logo logo_company_custome"
                          />
                        </div>
                      </Col>
                      <Col>
                        <div className="d-md-flex justify-content-between">
                          <div className="fs-vp-pg">
                            <div className="d-flex align-items-center mb-3">
                              <h4 title={seller?.name} className="fw-600 mb-0 fs-20 text-capitalize text-capitalize vendor-profile-title pe-1">
                                {seller?.name}
                              </h4>
                              <img
                                className="me-2 company_detail_icon"
                                src="/assets/images/company/1.png"
                              />
                            </div>
                            {seller?.address && (
                              <div className="d-flex">
                                <img
                                  className="me-2 mb-3 company_detail_icon"
                                  src="/assets/images/tatlub-img/icon-11.png"
                                />
                                {/* <p>{seller?.area ?? 'null' }, {seller?.city ?? 'null'}, {seller?.state ?? 'null'}, {seller?.country ?? 'null'}</p> */}
                                <h6 className="fs-18 text-dark">{seller?.address}</h6>
                              </div>
                            )}
                            <div className="d-flex ">
                              <img
                                className="me-2 mb-3 company_detail_icon"
                                src="/assets/images/company/4.png"
                              />
                              <h6 className="fs-18 text-dark">
                                {seller?.ratings}
                                {" Ratings"}
                                <span className="custom_ratng_text fs-18 ms-3">
                                  {seller?.ratings_count} {" Reviews"}
                                </span>
                              </h6>
                            </div>

                            <div className="d-lg-flex ">
                              {seller?.email && (
                                <div className="d-flex me-4 mb-2">
                                  <img
                                    className="me-2 company_detail_icon"
                                    src="/assets/images/company/5.png"
                                  />
                                  <h6 className="fs-18 text-dark" title={seller?.email}>{seller?.email}</h6>
                                </div>
                              )}
                              {seller?.user_details?.website && (
                                <div className="d-flex me-4 mb-2">
                                  <img
                                    className="me-2 company_detail_icon"
                                    src="/assets/images/company/6.png"
                                  />
                                  <h6 className="fs-18 cursor-pointer foot-cat" onClick={() => window.open('https://' + seller?.user_details?.website, '_blank')}>{seller?.user_details?.website}</h6 >
                                </div>
                              )}
                              <div
                                className="d-flex me-4 mb-2 cursor-pointer"
                                onClick={() =>
                                  window.open(
                                    "https://maps.google.com?q=" +
                                    "13.0827" +
                                    "," +
                                    "80.2707"
                                  )
                                }
                              >
                                <img
                                  className="me-2 company_detail_icon"
                                  src="/assets/images/company/7.png"
                                />
                                <h6 className="cursor-pointer text-dark fs-18 foot-cat">
                                  {t("Get Directions")}
                                </h6>
                              </div>
                            </div>
                          </div>
                          <div className="d-flex profile-share_mobile">
                            {/* <div><div className="like_profile me-2"><img className="icon_ls" src="/assets/images/tatlub-img/icon-2.png" /></div></div> */}
                            <div>
                              {" "}
                              <div
                                title="Share"
                                className="share_profile me-2 cursor-pointer"
                                data-bs-toggle="modal"
                                data-bs-target={"#delete_confirm_popup"}
                              >
                                <img
                                  className="icon_ls"
                                  src="/assets/images/tatlub-img/icon-3.png"
                                />
                              </div>
                            </div>
                          </div>
                          <div
                            className="modal fade"
                            id={"delete_confirm_popup"}
                            aria-hidden="true"
                          >
                            <div className="modal-dialog modal-dialog-centered modal-sm">
                              <div className="modal-content">
                                <div className="modal-header border-0">
                                  <h3>{t("Share With Friends")}</h3>
                                  <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                  ></button>
                                  {/* <div className='vendor-icon-img text-dark' data-bs-dismiss='modal'>
                                    <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
                                    <i className="fa fa-xmark"></i>
                                    </div> */}
                                </div>
                                <div className="modal-body p-3 pb-4 pt-4 ">
                                  <div className="d-flex justify-content-between">
                                    <div
                                      className="text-center"
                                      data-bs-dismiss="modal"
                                      aria-label="Close"
                                    >
                                      <FacebookShareButton
                                        url={window.location.href}
                                      >
                                        <div
                                          className={
                                            "vendor-icon-img mx-1 cursor-pointer text-light d-flex align-items-center justify-content-center Facebook_xl"
                                          }
                                        >
                                          <i className="fa fa-facebook"></i>
                                        </div>
                                        {t("Facebook")}
                                      </FacebookShareButton>
                                    </div>
                                    <div
                                      className="text-center"
                                      data-bs-dismiss="modal"
                                      aria-label="Close"
                                    >
                                      <WhatsappShareButton
                                        url={window.location.href}
                                      >
                                        <div
                                          className={
                                            "vendor-icon-img mx-1 cursor-pointer text-light d-flex align-items-center justify-content-center Whatsapp_xl"
                                          }
                                          onClick={() =>
                                            window.open(
                                              "https://web.whatsapp.com/"
                                            )
                                          }
                                        >
                                          <i className="fa fa-whatsapp"></i>
                                        </div>
                                        {t("Whatsapp")}
                                      </WhatsappShareButton>
                                    </div>

                                    <div
                                      className="text-center position-relative"
                                      data-bs-dismiss="modal"
                                      aria-label="Close"
                                    >
                                      {/* {copied && <span className='position-absolute top-50 start-50 translate-middle'>Copied!</span>} */}
                                      <div
                                        className={
                                          "vendor-icon-img mx-1 cursor-pointer text-light d-flex align-items-center justify-content-center copy_link_xl"
                                        }
                                        onClick={() => {
                                          navigator.clipboard.writeText(
                                            window.location.href
                                          );
                                          setCopied(true);
                                          setTimeout(() => {
                                            setCopied(false);
                                          }, 2000);
                                          toast.info(
                                            "Link copied to clipboard!",
                                            {
                                              position: "bottom-center",
                                              autoClose: 500,
                                              icon: false,
                                              hideProgressBar: true,
                                              closeOnClick: true,
                                              pauseOnHover: true,
                                              draggable: true,
                                              progress: undefined,
                                              theme: "dark",
                                            }
                                          );
                                        }}
                                      >
                                        <i className="fa fa-link"></i>
                                      </div>
                                      {t('Copy Link')}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Col>
                      <div className="d-md-flex justify-content-between">
                        <div className="d-flex mt-3">
                          {/* {soacial?.map((link, i) => (
                            <Link href={link.social_media_link}>
                            <div className="vendor-icon-img mx-1" key={i}><img src={`/assets/images/tatlub-img/social/${link.social_media_name}.jpg`}  onClick={()=>window.open(link.social_media_link)}/></div>
                            <div
                              className={
                                "vendor-icon-img mx-1 cursor-pointer text-light d-flex align-items-center justify-content-center " +
                                link.social_media_name
                              }
                              onClick={() =>
                                window.open(link.social_media_link, '_blank')
                              }
                            >
                              <i className={link.social_media_icon}></i>
                            </div>
                             </Link>
                          ))} */}
                          {/* <div className="vendor-icon-img mx-1"><img src="/assets/images/tatlub-img/s-5.jpg" /></div> /}
                          {/* <div className="vendor-icon-img mx-1"><img src="/assets/images/tatlub-img/s-6.jpg" /></div>
                          <div className="vendor-icon-img mx-1"><img src="/assets/images/tatlub-img/s-7.jpg" /></div>
                          <div className="vendor-icon-img mx-1"><img src="/assets/images/tatlub-img/s-8.jpg" /></div>
                          <div className="vendor-icon-img mx-1"><img src="/assets/images/tatlub-img/s-9.jpg" /></div>
                          <div className="vendor-icon-img mx-1"><img src="/assets/images/tatlub-img/s-5.jpg" /></div> */}
                        </div>
                        <div className="d-sm-flex">
                          {" "}
                          {
                            showContact ?
                              <button 
                              type="button"
                              onClick={()=> setSContact(false)}
                                className="btn send_enquery_btn me-2  mt-3 d-flex align-items-center text-center justify-content-center"
                              >
                                <i class="fa fa-phone fs-4  me-3 mb-0 pb-0" aria-hidden="true"></i>
                                <span className="fs-5">{t("Show Number")}</span>
                              </button> :
                              <a
                                href={"tel:" + seller?.phone}
                                title={seller?.phone}
                                className="btn send_enquery_btn me-2  mt-3 d-flex align-items-center text-center justify-content-center"
                              >
                                <i class="fa fa-phone fs-4  me-3 mb-0 pb-0" aria-hidden="true"></i>
                                <span className="fs-5">{seller?.phone ? seller?.phone : t("Contact Now")}</span>
                              </a>
                          }
                          {
                            !userData ? 
                           <Button
                             className="btn send_enquery_btn mt-3 fs-5"
                            onClick={()=> document.getElementById('openLoginPopup')?.click()}
                          >
                            {t("Send Enquiry")}
                          </Button> :

                          <Button
                            className="btn send_enquery_btn mt-3 fs-5"
                            data-bs-toggle="modal"
                            data-bs-target="#openEnquiryform"
                            disabled={!userData ? true : userData?.id == id ? true : false}
                          >
                            {t("Send Enquiry")}
                          </Button>
                          }
                        </div>
                      </div>
                    </Row>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>

          <section className="section-b-space ratio_asos">
            <div className="collection-wrapper">
              <Container>
                <Row>
                  {/* <FilterPage
                sm="3"
                sidebarView={sidebarView}
                closeSidebar={() => openCloseSidebar(sidebarView)}
               />
               <ProductList
                colClassName="col-xl-3 col-md-6 col-grid-box"
                openSidebar={() => openCloseSidebar(sidebarView)}
               /> */}
                  <Col xl="3" className="widget_company">
                    <div className="">
                      <div className="d-xl-none d-block ">
                        
              {/* <UncontrolledDropdown>
               <DropdownToggle caret className="btn_dropdown"> All Categories</DropdownToggle>
                 <DropdownMenu dark>
                   <DropdownItem header className="category_company shadow-none">
                   <ul className="d-block">
                     <li><img src="/assets/images/tatlub-img/nav.8.png" /> Air Conditioner</li>
                     <li><img src="/assets/images/tatlub-img/nav.8.png" /> Geyser</li>
                     <li><img src="/assets/images/tatlub-img/nav.8.png" /> Electric Fan</li>
                     <li><img src="/assets/images/tatlub-img/nav.8.png" /> Water Dispenser</li>
                     <li><img src="/assets/images/tatlub-img/nav.8.png" /> Mixer</li>
                     <li><img src="/assets/images/tatlub-img/nav.8.png" /> Washing Machine</li>
                     <li><img src="/assets/images/tatlub-img/nav.8.png" /> Grinder</li>
                     <li><img src="/assets/images/tatlub-img/nav.8.png" /> Table Fan</li>
                   </ul>
                   </DropdownItem>
                 </DropdownMenu>
              </UncontrolledDropdown> */}
                      </div>

                      <div className="d-xl-block d-none">
                        {
                          category?.length > 0 &&
                          <div className="category_company d-xl-block d-none">
                            <h3 className="mb-md-4 mb-3">
                              {t("All Categories")}
                            </h3>
                            <ul className="d-block">
                              {category?.slice(0, 8).map((data, index) => (
                                <li
                                  key={index}
                                  className="cursor-pointer foot-cat "
                                >
                                  <img src="/assets/images/tatlub-img/nav.8.png" />
                                  <span
                                    className="one_line fs-5 text-capitalize"
                                    onClick={() =>
                                      router.push({
                                        pathname:`/category/service/${data.category_slug}`,
                                        // query: { Category: data.category_slug, searchList: 'service' },
                                      })
                                    }
                                  >
                                    {data.category_name}
                                  </span>
                                </li>
                              ))}
                              {/* <li><a href="#">{t('More')}</a> </li> */}
                            </ul>
                          </div>
                        }

                        <div className="reviewrite_company mt-4 mb-xl-0 mb-4">
                          <h3 className="mb-md-4 mb-3">
                            {t("Write a")} {t("Review")}
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
                            disabled={userData?.id == id ? true : false}
                          >
                            {t("Write a")} {t("Review")}
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
                                  {/* <h4 className="mb-0 pb-0">{t('Write a')}  {t('Review')}</h4> */}
                                </div>
                                <div className="">
                                  <form onSubmit={formik.handleSubmit}>
                                    <h5 className="text-capitalize">{seller?.name}</h5>
                                    {/* <p>{seller?.city}, {seller?.state}</p> */}
                                    <p>{seller?.user_details?.address}</p>
                                    <div className="d-flex justify-content-between align-items-center my-3">
                                      <p className="mb-0">{t("Over All")}</p>{" "}
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
                                    <p>{t("Add Photos")}</p>
                                    <div className="file file--upload">
                                      <label for="input-file">
                                        <i className="fa fa-camera"></i>
                                      </label>
                                      <input
                                        id="input-file"
                                        type="file"
                                        onChange={(e) =>
                                          setReviewImg(e.target.files[0])
                                        }
                                      />
                                    </div>
                                    <button
                                      className="btn submit_btn"
                                      type="submit"
                                    >
                                      {t("Submit")}
                                    </button>
                                  </form>
                                </div>
                              </div>
                            </ModalBody>
                          </Modal>
                        </div>
                      </div>
                    </div>
                  </Col>

                  <Col>
                    <div className="company-profile-tab ">
                      <div className="d-md-flex justify-content-between align-items-center px-2">
                        <Nav
                          tabs
                          className="nav-material d-md-flex justify-content-between align-items-center"
                        >
                          <NavItem
                            className="nav nav-tabs "
                            id="myTab"
                            role="tablist"
                          >
                            <NavLink
                              className={activeTab === "1" ? "active" : ""}
                              onClick={() => setActiveTab("1")}
                            >
                              <span className="foot-cat">{t("Products")}</span>
                            </NavLink>
                          </NavItem>
                          <NavItem
                            className="nav nav-tabs"
                            id="myTab"
                            role="tablist"
                          >
                            <NavLink
                              className={activeTab === "2" ? "active" : ""}
                              onClick={() => setActiveTab("2")}
                            >
                              <span className="foot-cat">{t("Services")}</span>
                            </NavLink>
                          </NavItem>
                          {
                            seller?.seller_brands?.length > 0 &&
                            <NavItem
                              className="nav nav-tabs"
                              id="myTab"
                              role="tablist"
                            >
                              <NavLink
                                className={activeTab === "3" ? "active" : ""}
                                onClick={() => setActiveTab("3")}
                              >
                                <span className="foot-cat">{t("Brands")}</span>
                              </NavLink>
                            </NavItem>
                          }
                          <NavItem
                            className="nav nav-tabs"
                            id="myTab"
                            role="tablist"
                          >
                            <NavLink
                              className={activeTab === "5" ? "active" : ""}
                              onClick={() => setActiveTab("5")}
                            >
                              <span className="foot-cat">{t("About Us")}</span>
                            </NavLink>
                          </NavItem>
                          <NavItem
                            className="nav nav-tabs"
                            id="myTab"
                            role="tablist"
                          >
                            <NavLink
                              className={activeTab === "6" ? "active" : ""}
                              onClick={() => setActiveTab("6")}
                            >
                              <span className="foot-cat">{t("Branches")}</span>
                            </NavLink>
                          </NavItem>
                          <NavItem
                            className="nav nav-tabs"
                            id="myTab"
                            role="tablist"
                          >
                            <NavLink
                              className={activeTab === "4" ? "active" : ""}
                              onClick={() => setActiveTab("4")}
                            >
                              <span className="foot-cat">{t("Gallery")}</span>
                            </NavLink>
                          </NavItem>

                        </Nav>
                        <div className="filer-search-wicon d-md-block d-none ">
                          <div className="search">
                            <span className="fa fa-search"></span>
                            <input type="text" onChange={handleSearch} placeholder={t("Search In This Store")} />
                          </div>
                        </div>
                      </div>



                      <TabContent
                        activeTab={activeTab}
                        className="nav-material"
                      >
                        <TabPane tabId="1">
                          <div className="">
                            {/* {seller?.products?.length > 0 && (
                              <h5 className="fw-bolder">
                                {t("Popular Products")}
                              </h5>
                            )} */}
                            <Row>
                              {seller?.products &&
                                seller?.products
                                  ?.slice(0, productLen)
                                  .map((data, index) => {
                                    return (
                                      <>
                                        <Col
                                          md="4"
                                          xs="6"
                                          xl="3 px-2 mb-3"
                                          key={index}
                                        >
                                          <div className="card_pop-product d-flex flex-column justify-content-between" title={data?.meta_title}>
                                            <div
                                              className=""
                                              onClick={() =>
                                                router.push({
                                                  pathname:
                                                    "/product-details/view",
                                                  query: {
                                                    product_id: data.id,
                                                  },
                                                })
                                              }
                                            >
                                              {/* <img src="/assets/images/company/12.jpg" /> */}
                                              <img
                                                src={
                                                  data.product_image_medium ==
                                                    null
                                                    ? ""
                                                    : data.product_image_medium
                                                }
                                                className="cursor-pointer object-fit-contain bg-white"
                                                onError={(e) =>
                                                (e.currentTarget.src =
                                                  "/assets/images/tatlub-img/No.jpg")
                                                }
                                              />
                                              <h6 className="text-color text-capitalize fw-bolder mt-2 cursor-pointer">
                                                {data.product_name}
                                              </h6>
                                              <h6>
                                                {data.product_price ? 'QAR: ' + parseInt(data.product_price) : 'Request For Price'}
                                              </h6>
                                              {/* <p>{data.product_slug}</p> */}
                                            </div>
                                            <Button className="btn btn-pop-proucd" onClick={() => cartFun3(data)}>
                                              {t('Add To Cart')}
                                            </Button>
                                          </div>
                                        </Col>
                                      </>
                                    );
                                  })}

                              {!seller?.products?.length > 0 && (
                                <div className="d-flex justify-content-center align-items-center h-100">
                                  <div className="text-center">
                                    <img src="/assets/images/tatlub-img/not_Found.png" className="w-25" />
                                    <p className="text-muted text-center">
                                      {t(' Products Not available')}.
                                    </p>
                                  </div>
                                </div>
                              )}
                            </Row>
                            {
                              productLen == seller?.products?.length ?
                                <div className="text-center">
                                  <Button
                                    className="btn btn_loadmore my-3"
                                    onClick={() => setProductlen(8)}
                                  >
                                    {t("View Less")}
                                  </Button>
                                </div>
                                :
                                seller?.products?.length > 7 && (
                                  <div className="text-center">
                                    <Button
                                      className="btn btn_loadmore my-3"
                                      onClick={() => setProductlen(seller?.products?.length)}
                                    >
                                      {t("Load More")}
                                    </Button>
                                  </div>
                                )}
                          </div>
                        </TabPane>
                        <TabPane tabId="6">
                          {seller?.branch?.length > 0 && (
                            <h5 className="fw-bolder mb-lg-4 mb-3">
                              {t("Our Branchs")}
                            </h5>
                          )}

                          <Row>
                            {seller?.branch?.slice(0, 2).map((data, index) => {
                              return (
                                <Col lg="6 mb-3" key={index}>
                                  <div className="card_branch">
                                    <Row className="mx-wei-custom">
                                      <Col className="custom_col">
                                        <img
                                          className="img_bhgh"
                                          src="/assets/images/tatlub-img/productLogo.jg"
                                          onError={(e) =>
                                          (e.currentTarget.src =
                                            "/assets/images/tatlub-img/No.jpg")
                                          }
                                        />
                                      </Col>
                                      <Col>
                                        <div className="">
                                          <h5 className="fw-bolder">
                                            {seller?.user_details?.company_name}
                                          </h5>
                                          <p>{data.address}</p>
                                          <div className="d-flex">
                                            <img
                                              className="me-2 company_detail_icon"
                                              src="/assets/images/company/4.png"
                                            />
                                            <p>
                                              {seller?.ratings}{" "}
                                              <span className="custom_ratng_text ms-3">
                                                {seller?.ratings_count} {t('Ratings')}
                                              </span>
                                            </p>
                                          </div>
                                          <Button className="btn_loadmore btn py-1 px-4">
                                            {t("View Profile")}
                                          </Button>
                                        </div>
                                      </Col>
                                    </Row>
                                  </div>
                                </Col>
                              );
                            })}

                            {!seller?.branch?.length > 0 && (
                              <h5 className="text-muted">
                                {t('Branches Not available')}
                              </h5>
                            )}
                          </Row>
                        </TabPane>
                        <TabPane tabId='2'>
                          <Row className="">
                            {seller?.items?.length > 0 ?
                              seller?.items?.map((data, index) => {
                                return (
                                  <Col
                                    xl="3"
                                    lg="4"
                                    md="4"
                                    xs="6"
                                    className="mb-4"
                                    key={index}
                                  >
                                    <div className="card d-flex flex-coloum bg-light shadow  px-0 justify-content-between product-list border-0 w-100 h-100">
                                      <div className="p-2">
                                        <div className="overflow-hidden rounded-4 mb-2">
                                          <Link href={{ pathname: `/product-details/view`, query: { item_id: data.id } }} >
                                            <img
                                              src={
                                                data?.item_image_medium
                                              }
                                              className={`card-img-top p-imgS cursor-pointer bg-white`}
                                              onError={(e) =>
                                              (e.currentTarget.src =
                                                "/assets/images/tatlub-img/No.jpg")
                                              }
                                            />
                                          </Link>
                                        </div>
                                        <Link href={{ pathname: `/product-details/view`, query: { item_id: data.id } }} >
                                          <h6
                                            className="card-title text-color fs-16 text-capitalize  fw-bolder cursor-pointer"
                                          >
                                            {t(data?.item_title)}
                                          </h6>
                                        </Link>
                                        {data?.user && (
                                          <div className="d-flex align-items-center">
                                            <img
                                              // src="/assets/images/tatlub-img/productLogo.jpg"
                                              src={data?.user?.user_image ?? "NULL"}
                                              className="logo"
                                              onError={(e) =>
                                              (e.currentTarget.src =
                                                "/assets/images/tatlub-img/No.jpg")
                                              }
                                            />
                                            <Link href={{ pathname: "/page/vendor/vendor-profile", query: { id: data?.user?.id }, }} >
                                              <div
                                                className="card-text ps-1 cursor-pointer foot-cat d-flex align-items-center"
                                              >
                                                {" "}
                                                <span className="fs-7 ">{data?.user?.name}</span>
                                              </div>
                                            </Link>
                                          </div>
                                        )}
                                        <p className="card-text text-capitalize complete_2 fs-5 pt-2 ">
                                          {/* {data.item_address} */}
                                          {data?.item_location_str ?? data?.item_address}
                                        </p>
                                      </div>

                                      <div className="px-2 pb-2">
                                        <a
                                          href="#"
                                          role="button"
                                          className="btn btn_product_list w-100"
                                          onClick={() => setItemsID(data?.id)}
                                          data-bs-toggle="modal"
                                          data-bs-target="#QuateModal"
                                        >
                                          {t('Get Quote')}
                                        </a>
                                      </div>
                                    </div>
                                  </Col>
                                );
                              }) :
                              <div className="d-flex justify-content-center align-items-center h-100">
                                <div className="text-center">
                                  <img src="/assets/images/tatlub-img/not_Found.png" className="w-25" />
                                  <p className="text-muted text-center">
                                    {t('There Have Been No Services Yet')}.
                                  </p>
                                </div>
                              </div>
                            }

                            <div className="text-center my-md-4 py-3 d-none">
                              <button type="button" className="btn_hover text-capitalize p-2 px-4">
                                {t("view More")}
                              </button>
                            </div>
                          </Row>
                        </TabPane>
                        <TabPane tabId="3">
                          <div className="row">
                            {
                              seller?.seller_brands?.map((value, i) => (
                                <div
                                  className="col-xl-2 col-lg-3 col-sm-4 col-6 mb-3"
                                  key={i}
                                  title={value?.name}
                                  onClick={() =>
                                    router.push({
                                      pathname: "/shop/left_sidebar",
                                      query: { brand_id: value.id, searchList: 'product' },
                                    })
                                  }
                                >
                                  <div className="brand-img p-3 text-center">
                                    <div className="c-bg rounded">
                                      <img
                                        src={value?.logo}
                                        // src="/assets/images/tatlub-img/Brands/Gap.jpg"
                                        className="brand-img w-100 cursor-pointer rounded"
                                        onError={(e) =>
                                        (e.currentTarget.src =
                                          "/assets/images/tatlub-img/No.jpg")
                                        }
                                      ></img>
                                    </div>
                                  </div>
                                </div>
                              ))
                            }
                          </div>
                        </TabPane>
                        <TabPane tabId="4">
                          <ul className="tab-list">
                            <li
                              className={`tabs ${getActiveClass(
                                1,
                                "active-tabs"
                              )}`}
                              onClick={() => toggleTab(1)}
                            >
                              <a className="photo_tab img_show me-2">
                                {t("Photos")}{" "}
                                {seller?.user_details?.img?.length &&
                                  "(" + seller?.user_details?.img?.length + ")"}
                              </a>
                            </li>
                            <li
                              className={`tabs ${getActiveClass(
                                2,
                                "active-tabs"
                              )}`}
                              onClick={() => toggleTab(2)}
                            >
                              <a className="photo_tab vedio_show">
                                {t("Videos")}{" "}
                                {seller?.user_details?.videos &&
                                  "(" +
                                  seller?.user_details?.videos?.length +
                                  ")"}
                              </a>
                            </li>
                          </ul>

                          <div className="content-container mt-4">
                            <div
                              className={`content ${getActiveClass(
                                1,
                                "active-content w-100"
                              )}`}
                            >
                              <Row id="img_show" className="w-100">
                                {seller?.user_details?.img.length == 0 ||
                                  (!seller?.user_details?.img && (
                                    <span>{t('Photos not available')}</span>
                                  ))}
                                {seller?.user_details?.img.map(
                                  (imgs, index) => (
                                    <Col
                                      md="3"
                                      sm="4"
                                      xs="6"
                                      lg="2 mb-3 px-2"
                                      key={index}
                                    >
                                      <img
                                        className="img_gallery_company"
                                        src={imgs}
                                        onError={(e) =>
                                        (e.currentTarget.src =
                                          "/assets/images/tatlub-img/No.jpg")
                                        }
                                      />
                                    </Col>
                                  )
                                )}
                              </Row>
                            </div>
                            <div
                              className={`content ${getActiveClass(
                                2,
                                "active-content"
                              )}`}
                            >
                              <Row id="vedio_show" className="w-100">
                                {seller?.user_details?.videos?.length == 0 ||
                                  (!seller?.user_details?.videos && (
                                    <span>Videos not available</span>
                                  ))}
                                {seller?.user_details?.videos?.map(
                                  (video, index) => (
                                    <Col
                                      md="4"
                                      lg="3 mb-3 px-2"
                                      sm="4"
                                      xs="6"
                                      key={index}
                                    >
                                      <div className="card_vedio_section">
                                        <div className="img_gallery_company_icon" onClick={() => window.open(video, '_blank')}>
                                          {/* <img className="img_gallery_company" src={video} /> */}
                                          {/* <video className="img_gallery_company" width="400" controls>
                                          <source className="img_gallery_company"  src={video} type='video/mp4' />
                                          </video> */}
                                          <video
                                            width="400"
                                            loop="loop"
                                            preload={false}
                                            className="img_gallery_company"
                                            src={video}
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
                              </Row>
                            </div>
                          </div>
                        </TabPane>
                        <TabPane tabId='5'>
                          <div className="">
                            <div className="mb-3 ">
                              <h5 className="fw-bolder mb-lg-4 mb-3">
                                {t("Company Information")}
                              </h5>
                              <div className="card-bg_aboutus ">
                                {seller?.user_about ? (
                                  <p>{seller?.user_about}</p>
                                ) : (
                                  <h5>{t('Not Available')}</h5>
                                )}
                              </div>
                            </div>
                            {
                              seller?.seller_specs?.length > 0 &&
                              <div className="mb-3 ">
                                {/* <h5 className="fw-bolder mb-lg-4 mb-3">
                                {t("Specification")}
                              </h5> */}
                                <div className="card-bg_aboutus ">
                                  <Row>
                                    {
                                      seller?.seller_specs.map((data, index) => (
                                        <Col key={index}>
                                          <div className="mb-3 d-flex justify-content-between">
                                            <h4 className="complete_1 text-capitalize fw-bold">{data?.title ?? "Services"}</h4>
                                          </div>
                                          <ul>
                                            {
                                              data?.value?.split(',')?.map((valu, i) => (<>
                                                <li className="w-100" key={i}><img src="/assets/images/tatlub-img/Icon 4.png" className="btn-img" />{valu}</li>
                                              </>))
                                            }
                                          </ul>
                                        </Col>
                                      ))
                                    }
                                  </Row>
                                </div>
                              </div>
                            }
                          </div>
                        </TabPane>
                      </TabContent>
                    </div>

                    <div className="review_card mt-4">
                      <div className="d-flex align-items-center justify-content-between">
                        <h4 className="mb-3 fs-20">
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
                      {review.length > 0 && (
                        <div className="list-group list-group-flush">
                          <p className="custom_ratng_text">
                            {review?.length ?? 0} {t("Users Review")}
                          </p>
                          <div className="d-flex">
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
                          </div>

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
                                        <h5 className="text-capitalize">{data?.author_name ?? "Name Not Found"}</h5>{" "}
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

                      {/* <div className="">
              <Row className="row mt-4">
                <div className="img-width_reviw">
                  <img className="review-img-" src="/assets/images/company/Testi 2.jpg" />
                </div>
                <Col className="right_review">
                  <div className="d-flex justify-content-between">
                    <h5>Benjamin Denny Son</h5> <p>5 Days Ago</p></div>
                  <div className="d-flex alidn-items-center mb-3"><img className="company_detail_icon me-3" src="/assets/images/company/4.png" /><h6>5.0</h6></div>
                  <p>This Was My First Step In My Life....I Love My School Very Much..</p>
                </Col>
              </Row >
            </div>
            <hr></hr> */}

                      {review.length > revlen && (
                        <div className="text-center">
                          <Button
                            className="btn btn_loadmore mt-3"
                            onClick={() => setRevlen(review.length)}
                          >
                            {t("Load More")}
                          </Button>
                        </div>
                      )}
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </section>

          <div
            className="modal fade"
            id="openEnquiryform"
            tabIndex="-1"
            aria-labelledby="openEnquiryformLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered ">
              <div className="modal-content">
                <div className="modal-header border-0">
                  <div className="mb-3">
                    <img
                      src="/assets/images/icon/logo.png"
                      className="w-50"
                      onError={(e) =>
                      (e.currentTarget.src =
                        "/assets/images/tatlub-img/no1.png")
                      }
                    />
                  </div>
                  <h3 className="modal-title" id="openEnquiryformLabel">
                    {t('ENQUIRE FORM')}
                  </h3>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="p-3 py-4 ">
                  {/* <p className="fs-4 fw-bolder mb-3">Enquire Now</p> */}
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
                        {...EnquiryForm.getFieldProps("mobile")}
                        maxLength={15}
                        onChange={(e) =>
                          EnquiryForm.setFieldValue(
                            "mobile",
                            e.target?.value.replace(/[^0-9]/g, "")
                          )
                        }
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
                    <div className="mb-4">
                      <textarea
                        type="text"
                        className="form-control rounded"
                        placeholder={t("Enter your Enquiries")}
                        {...EnquiryForm.getFieldProps("enquiries")}
                      />
                      {EnquiryForm.touched.enquiries &&
                        EnquiryForm.errors.enquiries && (
                          <div className="fv-plugins-message-container">
                            <div className="fv-help-block">
                              <span role="alert" className="text-danger">
                                {EnquiryForm.errors.enquiries}
                              </span>
                            </div>
                          </div>
                        )}
                    </div>
                    <button type="submit" className="btn btn_filter1 w-100">
                      {t("Send Enquiry")}
                    </button>
                  </form>
                </div>
                {/*<div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary">Save changes</button>
                    </div>*/}
              </div>
            </div>
          </div>
        </div>
      )}

      <div>
        <Backdrop
          sx={{ color: '#fff', height: '100vh', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        // onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </>
  );
};

export default ProfilePage;
