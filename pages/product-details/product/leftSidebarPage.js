import React, { useState, useEffect, useRef, useContext } from "react";
import ProductTab from "../common/product-tab";
import Service from "../common/service";
import NewProduct from "../../shop/common/newProduct";
import Slider from "react-slick";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import ImageZoom from "../common/image-zoom";
import DetailsWithPrice from "../common/detail-price";
import Filter from "../common/filter";
import { Container, Row, Col, Media } from "reactstrap";
import {
  getPRoductDetail,
  getitemsDetail,
  addToCart,
} from "../../../components/core/product_request";
import { postQuotes, GetSellerData } from "../../../components/core/seller_request";
import { useRouter } from "next/router";
import { getSocialmedia, PostClaimBussiness,PostSendOtp } from "../../../components/core/fashion_request";
import { useTranslation } from "react-i18next";
import { Galleria } from "primereact/galleria";
import jsPDF from "jspdf";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import AuthContex from "../../../components/auth/AuthContex";
import itemscontex from "../../initcontext";
import moment from "moment/moment";
import { mainId } from "../../../IDmain";
import Seo from "../../../seo/seo";
import { getMyBussiness } from "../../../components/core/shop_requests";
import Link from "next/link";
import ProductSection from "../common/product_section";

// import html2canvas from 'html2canvas';

const GET_SINGLE_PRODUCTS = gql`
  query product($id: Int!) {
    product(id: $id) {
      id
      title
      description
      type
      brand
      category
      price
      new
      sale
      discount
      stock
      variants {
        id
        sku
        size
        color
        image_id
      }
      images {
        alt
        src
      }
    }
  }
`;

const LeftSidebarPage = ({ setRecom }) => {
  const router = useRouter();
  const { t } = useTranslation();
  const { item_id, product_id } = router.query;
  const { userData } = useContext(AuthContex);

  const [quantity, setQuantity] = useState(1);
  const {setCart} = useContext(itemscontex);
  const [mobile,setMobile] = useState(null);
  const [Loading,setLoading] = useState(false)
  const [otp,setOtp] = useState(null);
  const [errmsg,setErrmsg]= useState(null)
  const [catSlite,setCatSlice] = useState(4)


  const initialValues = {
    item_id: "",
    item_lead_name: "",
    item_lead_email: "",
    item_lead_phone: "",
    item_lead_message: "",
  };

  

  const formValidation = Yup.object().shape({
    item_lead_name: Yup.string().required("Enter you Name"),
    item_lead_email: Yup.string()
      .email("Please Enter Valid Email Id")
      .required("Enter you Email Id"),
    item_lead_phone: Yup.string().min(7, "Phone number must be at least 7 Digits").required("Enter your Mobile Number"),
    item_lead_message: Yup.string(),
  });


  const SendOtp = async (e) => {
    e.preventDefault();
    let body = {
      // "user_id":userData?.id,
      // "item_id":item_id,
      // "item_claim_full_name":"test",
      "phone":mobile,
    }
    // if( !(mobile.match('[0-9]{10}')) ){
      if(!mobile){
      // alert('Please provide valid phone number');
      setErrmsg('Please Enter Mobile Number')
     }else if( !(mobile.match('[0-9]{10}')) ){
      setErrmsg('Please Enter Valid Mobile Number')
     } else {
      const responce = await PostSendOtp(body)
      if(responce.status == 200){
        document.getElementById('OpenOTPClaimb')?.click();
        setErrmsg()
      }
     }
  } 

  const ClaimBussiness = async (e) => {
    e.preventDefault();
    let body = {
      "user_id":userData?.id,
      "item_id":item_id,
      "item_claim_full_name":userData?.name,
      "item_claim_phone":mobile,
      "otp":otp
    }
    // if( !(mobile.match('[0-9]{10}')) ){
      if(!otp){
      // alert('Please provide valid phone number');
      setErrmsg('OTP is Required')
     } else {
      const responce = await PostClaimBussiness(body)
      if(responce.status == 200){
        toast.success('Successfull!', {
          position: "top-center",
          autoClose: 300,
          hideProgressBar: true,
          // icon:false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "dark",
          });
        document.getElementById('closeOTPmodelsmodal')?.click();
        setErrmsg();
        setMobile();
        setOtp();
      }else {
        setErrmsg('Please Enter Valid OTP')
      }
     }
  }

  const formik = useFormik({
    initialValues,
    validationSchema: formValidation,
    onSubmit: async (values, { setStatus, setSubmitting, resetForm }) => {
      try {
        const body = {
          item_id: item_id || product_id,
          item_lead_name: values.item_lead_name,
          item_lead_email: values.item_lead_email,
          item_lead_phone: values.item_lead_phone,
          item_lead_message: values.item_lead_message,
        };
        document.getElementById("openloaderModal")?.click();
        const response = await postQuotes(body);
        document.getElementById("closeloaderModal")?.click();
        if (response.status == 200) {
          document.getElementById("closeQuotesmodal")?.click();
          toast.info("SAVE SUCCESSFULL", {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          icon:false,
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
      } catch (error) {
        document.getElementById("closeloaderModal")?.click();
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

  // var { loading, data } = useQuery(GET_SINGLE_PRODUCTS, {
  //   variables: {
  //     id: parseInt(pathId),
  //   },
  // });
  // const { details } = router.query;

  const [state, setState] = useState({ nav1: null, nav2: null });
  const [img, setImg] = useState("pList-7");
  const [productdetail, setdetail] = useState({});
  const [value, setvalue] = useState([]);
  const [photos, setimg] = useState([]);
  const [item, setItem] = useState(null);
  const [data, setData] = useState("");
  const [Sellerdata, setSellerData] = useState("");
  const [Listings, setListing] = useState([]);
  const [soacial, setSocial] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [url, setUrl] = useState();
  const [images, setImages] = useState([]);

// const [openHrs,setOpenHrs] = useState()
// const [closeHrs,setcloseHrs] = useState()
//   useEffect(()=> {
//     if(data?.item_hours?.length > 0){
//       let open = moment( data?.item_hours[0]?.item_hour_open_time, "hh:mm" );

//       var formatedTime = open.format("hh:mm a");

//       setOpenHrs(formatedTime)
  
//       let close = moment(data?.item_hours[0]?.item_hour_close_time,"hh:mm");

//       var formatedTime2 = close.format("hh:mm a");

//       setcloseHrs(formatedTime2)
//     }

//   },[data])

  const itemTemplate = (item) => {
    return (
      <img
        src={item.item_image_gallery_name ?? item.product_image_gallery_name}
        alt={item?.alt}
        className={`img-fluid ${product_id && 'object-fit-contain'} bg-light w-100  cursor-pointer rounded-3`}
        onError={(e) =>
          (e.currentTarget.src = "/assets/images/tatlub-img/No.jpg")
        }
        style={{ width: "100%", display: "block" }}
      />
    );
  };

  const thumbnailTemplate = (item) => {
    return (
      <div className="img-2 px-2">
        <img
          src={item.item_image_gallery_name ?? item?.product_image_gallery_name}
          alt={item?.alt}
          className={`img-fluid cursor-pointer ${product_id && 'object-fit-contain'} border bg-light w-100 rounded-3`}
          onError={(e) =>
            (e.currentTarget.src = "/assets/images/tatlub-img/No.jpg")
          }
          style={{ display: "block" }}
        />
      </div>
    );
  };

  const fetchAddToCart = async () => {
    setLoading(true)
    let body = {
      user_id: userData?.id,
      seller_id: data?.user?.id,
      product_id: product_id,
      price: data?.product_price,
      quantity: quantity,
    };

    if(!userData?.id){
      document.getElementById('openLoginPopup')?.click();
      setLoading(false)
    }

    addToCart(body)
      .then((res) => {
        if(res.status == 200){
          setCart(res)
          setLoading(false)
          toast.info("ADDED TO CART ", {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
          icon:false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      })
      .catch((error) => {
        console.error("err", error.message);
        setLoading(false)
      });
  };


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

    const response = await addToCart(body)
    if (response.status == 200) {
      setCart(response)
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



  const responsiveOptions = [
    {
      breakpoint: "2700px",
      numVisible: 4,
    },
    {
      breakpoint: "991px",
      numVisible: 4,
    },
    {
      breakpoint: "767px",
      numVisible: 3,
    },
    {
      breakpoint: "575px",
      numVisible: 3,
    },
    {
      breakpoint: "430px",
      numVisible: 3,
    },
  ];

  const slider1 = useRef();
  const slider2 = useRef();

  var products = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: true,
    fade: true,
  };
  var productsnav = {
    slidesToShow: 3,
    swipeToSlide: true,
    arrows: false,
    dots: false,
    focusOnSelect: true,
  };

  // useEffect(() => {
  //   setState({
  //     nav1: slider1.current,
  //     nav2: slider2.current,
  //   });
  // }, [data]);

  const { nav1, nav2 } = state;

  const filterClick = () => {
    document.getElementById("filter").style.left = "-15px";
  };

  const changeColorVar = (img_id) => {
    slider2.current.slickGoTo(img_id);
  };

  const fetchproductdetail = async () => {
    try {
      setIsLoading(true);
      let id = product_id ?? mainId();
      const responcedata = await getPRoductDetail(id);
      // setItem(responcedata.data)
      setData(responcedata.data);
      setImages([{'product_image_gallery_name':responcedata.data?.product_image_medium},...responcedata.data?.product_galleries])
      const SellerId = responcedata.data?.user_id
      if(SellerId){
        // const bussiness = await getMyBussiness(SellerId)
        // setListing(bussiness.data)
        const vendor = await GetSellerData(SellerId)
        setSellerData(vendor.data)
      }
      setIsLoading(false);
    } catch (error) {
      console.error("err", error.message);
    }
  };

  const fetchSocialMedia = async () => {
    try {
      setIsLoading(true);
      const response = await getSocialmedia();
      setSocial(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("err", error.message);
    }
  };

  const fetchItemsdetail = async () => {
    try {
      setIsLoading(true);
      let id = item_id ?? mainId();
      const responcedata = await getitemsDetail(id);
      const SellerId = responcedata.data?.user_id
      // setItem(responcedata.data)
      setData(responcedata.data);
      setRecom(responcedata.data?.recommended_products);
      setImages([{'item_image_gallery_name':responcedata.data?.item_image_medium},...responcedata.data?.galleries])
      if(SellerId){
        const vendor = await GetSellerData(SellerId)
        setSellerData(vendor.data)
      }
      setIsLoading(false);
    } catch (error) { 
      console.error("err", error.message);
    }
  };

  // useEffect(()=>{
  //   if(data){
  //             let galery = []
  //             data?.galleries?.map(valu =>{
  //         galery.push({'item_image_gallery_name':data?.item_image_medium,"item_image_gallery_name":valu?.item_image_gallery_name})
  //     } )
  //     console.log("imagesimages",galery)
  //     setImages([{'item_image_gallery_name':data?.item_image_medium},...data?.galleries])
  //   }
  // },[data])

  function generatePDF(data) {
    const doc = new jsPDF();
    doc.text(JSON.stringify(data), 10, 10);
    doc.save("data.pdf");
  }

  function handleDownload() {
    // const jsonData = { name: 'John Doe', age: 30 };
    // generatePDF(data);
    generatePdfAndDownload(data);
  }

  function convertJsonToHtml(jsonData) {
    // Create an HTML string using the JSON data
    const html = `<div>
      <h1>${jsonData?.item_title}</h1>
      <p>${jsonData?.item_description}</p>
      <!-- ...more HTML structure here... -->
    </div>`;

    return html;
  }

  function generatePdfAndDownload(jsonData) {
    const htmlContent = convertJsonToHtml(jsonData);
    const pdf = new jsPDF();
    // html2canvas( document.body).then((canvas) => {
    //   const imgData = canvas.toDataURL('image/png');
    //   pdf.addImage(imgData, 'PNG', 10, 10 );
    // });
    pdf.text(JSON.stringify(jsonData), 10, 10);
    pdf.save("Tatlub_brochure.pdf");
  }

  useEffect(() => {
    item_id && fetchItemsdetail();
    product_id && fetchproductdetail();
    fetchSocialMedia();
  }, [item_id, product_id, productdetail]);
  

  return (
    <>
    <Seo title={`${data?.item_title ?? data?.product_name}`} description={`${data?.item_description ?? data?.product_description}`} />
      {isLoading ? (
        <div className="loader-wrapper2">
          {url === "Christmas" ? (
            <div id="preloader"></div>
          ) : (
            <div className="loader"></div>
          )}
        </div>
      ) : data && (
        <section className="mt-3">
          <div
            className="modal fade"
            id="QuateModal"
            tabIndex="-1"
            aria-labelledby="QuateModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content position-relative ">
                <div className="pt-4 px-4">
                  <div className="text-center">
                    <div className="mb-2">
                      <img
                        src="/assets/images/icon/logo.png"
                        className="w-25"
                      />
                    </div>
                    {/* <h3>Get Quote</h3> */}
                    <p className="text-muted">
                      To get please fill out the form below, we will get back to
                      you in 24 hours when you get your request.Thank for you
                      Being
                    </p>
                  </div>
                  <form onSubmit={formik.handleSubmit}>
                    <div className="row">
                      <div className="mb-3 col-12">
                        <label className="form-lable">{t("First Name")}</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder={t("Enter Your Name")}
                          {...formik.getFieldProps("item_lead_name")}
                        />
                        {formik.touched.item_lead_name &&
                          formik.errors.item_lead_name && (
                            <div className="fv-plugins-message-container">
                              <div className="fv-help-block">
                                <span role="alert" className="text-danger">
                                  {formik.errors.item_lead_name}
                                </span>
                              </div>
                            </div>
                          )}
                      </div>
                      <div className="mb-3 col-12">
                        <label className="form-lable">{t("Email")}</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder={t("Enter Your Email ID")}
                          {...formik.getFieldProps("item_lead_email")}
                        />
                        {formik.touched.item_lead_email &&
                          formik.errors.item_lead_email && (
                            <div className="fv-plugins-message-container">
                              <div className="fv-help-block">
                                <span role="alert" className="text-danger">
                                  {formik.errors.item_lead_email}
                                </span>
                              </div>
                            </div>
                          )}
                      </div>
                      <div className="mb-3 col-12">
                        <label className="form-lable">{t("Mobile Number")}</label>
                        <input
                          type="text"
                          maxLength={15}
                          className="form-control"
                          placeholder={t("Enter Your Mobile Number")}
                          {...formik.getFieldProps("item_lead_phone")}
                          onChange={(e) =>
                            formik.setFieldValue(
                              "item_lead_phone",
                              e.target?.value.replace(/[^0-9]/g, "")
                            )
                          }
                        />
                        {formik.touched.item_lead_phone &&
                          formik.errors.item_lead_phone && (
                            <div className="fv-plugins-message-container">
                              <div className="fv-help-block">
                                <span role="alert" className="text-danger">
                                  {formik.errors.item_lead_phone}
                                </span>
                              </div>
                            </div>
                          )}
                      </div>
                      <div className="mb-3 col-12">
                        <label className="form-lable">{t("Message")}</label>
                        <textarea
                          className="form-control"
                          placeholder={t("How Can We help You?")}
                          rows={3}
                          {...formik.getFieldProps("item_lead_message")}
                        />
                        {formik.touched.item_lead_message &&
                          formik.errors.item_lead_message && (
                            <div className="fv-plugins-message-container">
                              <div className="fv-help-block">
                                <span role="alert" className="text-danger">
                                  {formik.errors.item_lead_message}
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
                        className="btn btn-theme rounded fw-light w-50"
                      >
                        {t("Post Quote")}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>


            <div
            className="modal fade"
            id="ClaimModel"
            tabIndex="-1"
            aria-labelledby="ClaimModelLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content position-relative ">
              <div className="pt-4 px-4">
                  <div className="text-center">
                    <div className="mb-2">
                      <img
                        src="/assets/images/icon/logo.png"
                        className="w-25"
                      />
                    </div>
                    {/* <h3>Get Quote</h3> */}
                    <p className="text-muted">
                    </p>
                  </div>
                  <form  onSubmit={SendOtp}>
                    <div className="row">
                      <div className="mb-3 col-12">
                        <label className="form-lable fs-5 mb-2">{t("Mobile Number")}</label>
                        <input
                          type="text"
                          value={mobile}
                          className="form-control p-2"
                          placeholder={t("Enter Your Mobile Number")}
                          maxLength={15}
                          onChange={(e)=> setMobile(e.target?.value.replace(/[^0-9]/g, ""))}
                        />
                           { errmsg &&
                            <div className="fv-plugins-message-container">
                            <div className="fv-help-block">
                              <span role="alert" className="text-danger">
                                {errmsg}  
                              </span>
                            </div>
                          </div> 
                           }  
                           
                      </div>

                      </div>
                    <div className="modal-footer border-0 d-flex justify-content-center align-items-center">
                      <button
                        type="submit"
                        className="btn btn-theme rounded fw-light w-50 mb-3"
                      >
                       {t("SEND OTP")}
                      </button>
                      <button
                        type="button"
                        className="d-none"
                        id="OpenOTPClaimb"
                        // id="closeQuotesmodal"
                        // data-bs-dismiss="modal"
                        data-bs-target="#ClaimOtpModel" data-bs-toggle="modal"
                      >
                      </button>
                    </div>
                      </form>

                  </div>
              </div>
              </div>
              </div>

          <div
            className="modal fade"
            id="ClaimOtpModel"
            tabIndex="-1"
            aria-labelledby="ClaimOtpModelLabel"
            aria-hidden="true"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content position-relative ">
              <div className="pt-4 px-4">
                  <div className="text-center">
                    <div className="mb-2">
                      <img
                        src="/assets/images/icon/logo.png"
                        className="w-25"
                      />
                    </div>
                    {/* <h3>Get Quote</h3> */}
                    <p className="text-muted">
                    </p>
                  </div>
                  <form onSubmit={ClaimBussiness} >
                    <div className="row">
                      <div className="mb-3 col-12">
                        <label className="form-lable fs-5 mb-2">{t("OTP")}</label>
                        <input
                          type="text"
                          value={otp}
                          className="form-control p-2"
                          placeholder={t("Enter Your OTP")}
                          maxLength={4}
                          onChange={(e)=> setOtp(e.target?.value.replace(/[^0-9]/g, ""))}
                        />
                        { errmsg &&
                            <div className="fv-plugins-message-container">
                            <div className="fv-help-block">
                              <span role="alert" className="text-danger">
                                {errmsg}  
                              </span>
                            </div>
                          </div> 
                           } 
                      </div>

                      </div>
                    <div className="modal-footer border-0 d-flex justify-content-center align-items-center">
                      <button
                        type="submit"
                        className="btn btn-theme rounded fw-light w-50 mb-3"
                      >
                       {t("SUBMIT")}
                      </button>
                      <button
                        type="button"
                        className="d-none"
                        id="closeOTPmodelsmodal"
                        data-bs-dismiss="modal"
                      >
                      </button>
                    </div>
                      </form>

                  </div>
              </div>
              </div>
              </div>

          <div className="collection-wrapper ">
            <Container>
              <Row>
                <Col lg="8" xl="9">
                  <div className="card mb-4 shadow px-md-4 px-3 pt-md-4 pt-3 pb-2 border-0 p-details">
                    {data ? (
                      <div className="row">
                        <div className="col-xl-5 mb-3">
                          <div className="img-1">
                            <Galleria
                              // value={data?.galleries}
                              value={images}
                              responsiveOptions={responsiveOptions}
                              numVisible={7}
                              circular
                              style={{ maxWidth: "800px" }}
                              item={itemTemplate}
                              thumbnail={thumbnailTemplate}
                            />

                            {/* {!data?.galleries?.length > 0 && !data?.product_galleries?.length > 0 && (
                              <img
                                src={
                                  data?.item_image_medium ??
                                  data?.product_image_medium
                                }
                                className="img-fluid w-100 cursor-pointer rounded-3"
                                onError={(e) =>
                                  (e.currentTarget.src =
                                    "/assets/images/tatlub-img/No.jpg")
                                }
                              />
                            )} */}

                          </div>

                          <div className="row mt-3 img-2 d-none">
                            {data?.galleries?.slice(0, 4).map((img, i) => (
                              <div className="col-3 px-2" key={i}>
                                {" "}
                                <img
                                  src={img.item_image_gallery_name}
                                  className="img-fluid cursor-pointer w-100 rounded-3"
                                  onError={(e) =>
                                    (e.currentTarget.src =
                                      "/assets/images/tatlub-img/No.jpg")
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="col-xl-7 d-flex align-items-start flex-column bd-highlight">
                         <div className="w-100">
                          <div className="d-sm-flex justify-content-between">
                          <h3 className="fw-bolder text-capitalize cursor-pointer fs-20 foot-cat three_line" title={data?.item_title ?? data?.product_name}>
                            {data?.item_title ?? data?.product_name}
                          </h3>
                          {  !product_id &&
                                <div className="">
                                    {data?.user?.role_id == 1 ? <button type="button"
                                    disabled={!userData}
                                  data-bs-toggle="modal" data-bs-target="#ClaimModel"
                                  className="btn fw-normal fs-5 btn-theme rounded text-truncate p-2">{t('Claim Business')}</button> 
                                : 
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
                                } 
                                </div>
                               }
                          </div>

                          <div className="d-flex py-3">
                            {item_id && (
                              <h4 
                              title="Ask for price"
                                className="text-color fw-bolder one_line fs-18 cursor-pointer"
                                role="button"
                                data-bs-toggle="modal"
                                data-bs-target="#QuateModal"
                              >
                                {t("Ask for price")}
                              </h4>
                            )}
                            {/* <p className="ps-5 cursor-pointer foot-cat"  onClick={handleDownload}>
                                  <img
                                    src="/assets/images/tatlub-img/s-2.jpg"
                                    className="img-fluid doc-img"
                                  />{" "} 
                                  Brochure
                                </p> */}
                            {product_id && (
                              <h4 className=" fw-bolder one_line text-dark">
                                {t('Price')} : {t("QAR")} {parseInt(quantity * data?.product_price)}
                              </h4>
                            )}
                          </div>
                          {
                            <div className="d-flex justify-content-between mb-2">
                              <h4 className="fw-bolder text-dark fs-18">{t("Description")}</h4>
                              
                            </div>
                          }
                          <p>
                            <span className="complete_3 fs-5 d-none">
                              { data?.item_description ? <>{data?.item_description.slice(0,200)}{data?.item_description?.length > 200 && (
                                 <a
                                  onClick={() => {
                                    document
                                      .getElementById("descopen")
                                      ?.click();
                                    window.scrollTo({
                                      top: 350,
                                      behavior: "smooth",
                                    });
                                  }}
                                  className="text-color cursor-pointer"
                                >
                                 ...{t("Read More")}
                                </a>
                              )}</> :
                                data?.product_description ?  
                                <>{data?.product_description.slice(0,200)}{data?.product_description?.length > 200 && (
                                  <a
                                    onClick={() => {
                                      document
                                        .getElementById("descopen")
                                        ?.click();
                                      window.scrollTo({
                                        top: 350,
                                        behavior: "smooth",
                                      });
                                    }}
                                    className="text-color cursor-pointer"
                                  >
                                    ...{t("Read More")}
                                  </a>
                                )}</>
                               : "No Description Found"}
                            </span> 
                            <span className="complete_3 fs-5 ">
                              { data?.item_description ?? data?.product_description ?? "No Description Found" }
                            </span>
                          </p>

                            {
                              <div className="d-none">
                                <div className="d-flex justify-content-between mt-3">
                                  <h4 className="fw-bolder text-dark fs-18">
                                    {t("Specification")}
                                  </h4>
                                  {/* {JSON.stringify(data?.specification)?.length ? <a className="text-color cursor-pointer" onClick={()=> {document.getElementById('speciopen')?.click();  window.scrollTo({top:300, behavior: 'smooth'})}}>{t('view More')}</a> : ''} */}
                                </div>
                                <p className="complete_3 fs-5">
                                  {!data?.specifications
                                    ? t("No Specifications Found")
                                    :data?.specifications  == 'null' ? t("No Specifications Found") : data?.specifications}
                                </p>
                              </div>
                            }

                            <span className="">
                              {
                              //  data?.all_categories?.slice(0,catSlite).map((category,i)=>(
                                data?.all_categories?.map((category,i)=>(
                                 <span title={category?.category_name} onClick={()=> router.push({
                                  pathname:`/category/service/${category.category_slug}`,
                                //  query: { Category_id: category.category_slug,searchList: 'service' }
                                })} className="text-capitalize cat_Tag mb-2 mx-2" key={i}>{category?.category_name}</span>
                               ))
                              }
                              {/* {
                              data?.all_categories?.length > 4 && data?.all_categories?.length  !=  catSlite &&
                              <span className="text-color  cursor-pointer" onClick={()=> setCatSlice(data?.all_categories?.length)}>View More</span>
                              }
                              {
                               data?.all_categories?.length > 4 && data?.all_categories?.length  == catSlite && 
                              <span className="text-color mx-2 cursor-pointer" onClick={()=> setCatSlice(4)}>View Less</span>
                              } */}
                            </span>

                            {product_id ? 
                            <div>
                              {!data?.specifications
                                    ?""
                                    :data?.specifications  == 'null' ? "" : (<>
                            <div className="d-flex justify-content-between mt-3">
                            <h4 className="fw-bolder text-dark fs-18">
                                {t("Specification")}  
                                </h4> 
                                {JSON.stringify(data?.specification)?.length ? <a className="text-color cursor-pointer text-capitalize" onClick={()=> {document.getElementById('speciopen')?.click();  window.scrollTo({top:300, behavior: 'smooth'})}}>{t('view More')}</a> : ''}
                                
                                {/* {
                                 data?.product_attribute?.length > 3 && 
                                  <a
                                    className="text-color cursor-pointer"
                                    onClick={() => {
                                      document.getElementById("speciopen")?.click();
                                      window.scrollTo({
                                        top: 300,
                                        behavior: "smooth",
                                      });
                                    }}
                                  >
                                    {t("view More")}
                                  </a>
                                } */}
                            </div> 
                                <p className="complete_3 fs-5">
                                  {!data?.specifications
                                    ? ""
                                    : data?.specifications  == 'null' ? "" : data?.specifications}
                                </p>
                                </>)}
                            <ul className="list-group list-group-flush w-100">
                              {
                                data?.product_attribute?.length > 0 ?
                                data?.product_attribute?.slice(0,3).map((value,index) => (
                                  <li className="list-group-item d-flex pb-0 text-truncate" key={index}>
                                    <p className="col text-muted text-capitalize text-truncate ">
                                      {value?.name} 
                                    </p>
                                    <p className="col text-truncate text-capitalize">{value?.value}</p>
                                  </li>
                                )) : " " 
                              } 
              
                              
                              {/* <li className="list-group-item d-flex  pb-0">
                                <p className="col text-muted text-truncate">
                                  RO Capacity (Liter/Hour)
                                </p>
                                <p className="col text-truncate">
                                  0-200 (Liter/Hour)
                                </p>
                              </li> */}
                            </ul>
                            </div> :  
                            <div>
                            <div className="d-flex justify-content-between mt-3">
                            <h4 className="fw-bolder text-dark fs-18">
                                  { data?.item_specification?.length > 0 && t("Specification")}
                                </h4>
                                {
                                 data?.item_specification?.length > 3 && 
                                  <a
                                    className="text-color cursor-pointer text-capitalize"
                                    onClick={() => {
                                      document.getElementById("speciopen")?.click();
                                      window.scrollTo({
                                        top: 300,
                                        behavior: "smooth",
                                      });
                                    }}
                                  >
                                    {t("view More")}
                                  </a>
                                }
                            </div>

                            <ul className="list-group list-group-flush ">
                              {
                                data?.item_specification?.length > 0 ?
                                data?.item_specification?.slice(0,3).map((value,index) => (
                                  <li className="list-group-item d-flex pb-0 text-truncate" key={index}>
                                    <p className="col text-muted text-truncate text-capitalize">
                                      {value?.name}
                                    </p>
                                    <p className="col text-truncate text-capitalize">{value?.values}</p>
                                  </li>
                                )) : 
                                // <span className="text-dark">No Specifications Found</span>
                                ''
                              } 

              
                              
                              {/* <li className="list-group-item d-flex  pb-0">
                                <p className="col text-muted text-truncate">
                                  RO Capacity (Liter/Hour)
                                </p>
                                <p className="col text-truncate">
                                  0-200 (Liter/Hour)
                                </p>
                              </li> */}
                              
                            </ul>
                            </div>
                            }

                          </div>
                           {product_id && (
                            <div className="d-sm-flex mt-auto justify-content-start align-items-center">
                              <div
                                className="qnt  px-3 rounded d-flex justify-content-between mb-2 align-items-center overflow-hidden"
                                style={{ padding: "12px",width:'115px'}}
                              >
                                <button
                                  type="button"
                                  className="border-0 bg-transparent"
                                  onClick={() => {
                                    let val = quantity - 1;
                                    if (val < 1) val = 1;
                                    setQuantity(val);
                                  }}
                                >
                                  -
                                </button>
                                <div className="px-3">{quantity}</div>
                                <button
                                  type="button"
                                  className="border-0 bg-transparent"
                                  onClick={() => {
                                    setQuantity(quantity + 1);
                                  }}
                                >
                                  +
                                </button>
                              </div>
                              <button
                                type="button"
                                className="btn px-5 btn_cart ms-sm-3 mb-2 rounded"
                                onClick={() => fetchAddToCart()}
                                disabled={Loading}
                              >
                                {Loading ? <i class="fa fa-spinner box_1 me-2 fs-5" aria-hidden="true"></i> : 
                                <i
                                  className="fa fa-shopping-cart me-2 fs-5"
                                  aria-hidden="true"
                                ></i>
                                }
                                {t("ADD TO CART")}
                              </button>
                            </div>
                          )}
                               {/* {
                                !product_id &&
                                <div className="d-flex justify-content-end w-100">
                                    {data?.user?.role_id == 1 && <button type="button" 
                                  data-bs-toggle="modal" data-bs-target="#ClaimModel"
                                  className="btn fw-normal fs-5 btn-theme rounded text-truncate p-2">{t('Claim Business')}</button>} 
                                </div>
                               } */}
                        </div>
                      </div>
                    ) : (
                      <div className="d-flex justify-content-center align-items-center">
                        <img
                          src="/assets/images/tatlub-img/not_Found.png"
                          className="no_image"
                        />
                      </div>
                    )}
                  </div>


                  <ProductTab desc={data} seller={Sellerdata} Listings={Listings} addToCart={cartFun3} /> 


                  <ProductSection recom={data?.recommended_products} />
                  
                  <div className="d-none">
                    {item_id && (
                      <div className="pt-0 b2c-2 mb-4">
                        <div className="review_card p-4">
                          <Row>
                            {/* <Col lg="12" className="divider1 mb-3"> */}
                            <Col lg="6" className=" mb-3">
                              <h4 className="fw-bolder mx-3 mb-3 fs-18">{t('Timing')}</h4>
                             {/* 
                              {data?.item_hours
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
                                  const hoursDifference = moment(formatedTime2,'HH:mm a').diff(moment(formatedTime,'HH:mm a'), 'hours');

                                  console.log('dkdgdhgdskhdbsjkdsd',hoursDifference)


                                  return (
                                    <div className="d-flex justify-content-between mx-3 ">
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

                                {/* {
                                  data?.item_hours?.length > 0 && 
                                  <div className="d-flex justify-content-between mx-3 ">
                                    <div>
                                    <h5 className="custom_timing fs-5">
                                        {data?.item_hours[0]?.item_hour_day_of_week == 1 &&
                                            "Mon"}{" "}
                                          {data?.item_hours[0]?.item_hour_day_of_week == 2 &&
                                            "Tue"}{" "}
                                          {data?.item_hours[0]?.item_hour_day_of_week == 3 &&
                                            "Wed"}{" "}
                                          {data?.item_hours[0]?.item_hour_day_of_week == 4 &&
                                            "Thu"}{" "}
                                          {data?.item_hours[0]?.item_hour_day_of_week == 5 &&
                                            "Fri"}{" "}
                                          {data?.item_hours[0]?.item_hour_day_of_week == 6 &&
                                            "Sat"}{" "}
                                          {data?.item_hours[0]?.item_hour_day_of_week == 7 &&
                                            "Sun"} - 
                                           {data?.item_hours[data?.item_hours?.length-1]?.item_hour_day_of_week == 1 &&
                                            "Mod"}{" "}
                                          {data?.item_hours[data?.item_hours?.length-1]?.item_hour_day_of_week == 2 &&
                                            "Tue"}{" "}
                                          {data?.item_hours[data?.item_hours?.length-1]?.item_hour_day_of_week == 3 &&
                                            "Wed"}{" "}
                                          {data?.item_hours[data?.item_hours?.length-1]?.item_hour_day_of_week == 4 &&
                                            "Thu"}{" "}
                                          {data?.item_hours[data?.item_hours?.length-1]?.item_hour_day_of_week == 5 &&
                                            "Fri"}{" "}
                                          {data?.item_hours[data?.item_hours?.length-1]?.item_hour_day_of_week == 6 &&
                                            "Sat"}{" "}
                                          {data?.item_hours[data?.item_hours?.length-1]?.item_hour_day_of_week == 7 &&
                                            "Sun"}
                                      </h5>
                                    </div>

                                    <div>
                                      <h5 className="5">{openHrs ?? "00:00"}- {closeHrs ?? '00:00'} </h5>
                                    </div>
                                  </div>
                                } */}
{/* 
                              {!data?.item_hours ||
                                (data?.item_hours?.length == 0 && (
                                  <div className="d-flex justify-content-between mx-3 ">
                                    <div>
                                      <h5 className="custom_timing fs-5">
                                        Sun - Sat
                                      </h5>
                                    </div>

                                    <div>
                                      <h5 className="5">00:00 - 00:00 </h5>
                                    </div>
                                  </div>
                                ))} */}
                            </Col>

                            <Col lg="6" className="divider2 mb-3 ">
                              <h4 className="fw-bolder mx-3 mb-3 fs-18">
                                {/* {t('Exceptions Hours')} */}
                                {t('Quick Information')}
                              </h4>
                              {/* <div className="d-flex justify-content-between mx-3">
                          <div>
                            <h5 className="custom_timing">Mode Of Payment</h5>
                            <h5 className="custom_timing">Year Of Establishment</h5>
                          </div>

                          <div>
                            <h5>Cash, Cheques, UPI</h5>
                            <h5>1951</h5>
                          </div>
                        </div> */}
                              {
                                data?.founded_by && 
                               <div className="d-flex justify-content-between mx-3">
                                      <div>
                                        <h5 className="custom_timing fs-5">
                                          {t('Year of Establishment')}
                                        </h5>
                                      </div>

                                      <div>
                                        <h5 className="fs-5">
                                          {data?.founded_by}
                                        </h5>
                                      </div>
                                    </div>
                              }

                              {data?.item_hour_exceptions
                                ?.slice(0, 7)
                                .map((res, index) => {
                                  var date = moment(
                                    res?.item_hour_exception_date,
                                    "YYYY-MM-DD"
                                  );
                                  var formatedDate = date.format("DD MMM YYYY");

                                  let open = moment(
                                    res?.item_hour_exception_open_time,
                                    "hh:mm"
                                  );
                                  var formatedTime = open.format("hh:mm a");

                                  let close = moment(
                                    res?.item_hour_exception_close_time,
                                    "hh:mm"
                                  );
                                  var formatedTime2 = close.format("hh:mm a");

                                  return (<>
                                    <div className="d-flex justify-content-between mx-3">
                                      <div>
                                        <h5 className="custom_timing fs-5">
                                          {/* {formatedDate} */}
                                          {t('Exceptions Hours')}
                                        </h5>
                                      </div>

                                      <div>
                                        <h5 className="fs-5">
                                          {/* {formatedTime} - {formatedTime2}{" "} */}
                                          {formatedDate}
                                        </h5>
                                      </div>
                                    </div>
                                  </>
                                  );
                                })}

                              {!data?.item_hour_exceptions ||
                                (data?.item_hour_exceptions?.length == 0 && (
                                  <div className="d-flex justify-content-center mx-3">
                                    <h5 className="custom_timing">
                                      
                                    </h5>
                                  </div>
                                ))}
                            </Col>
                            {/* <Col lg="6" className="divider3">
                              <div className="d-flex justify-content-center align-items-center">
                              <div className="text-center">
                              <h4 className="fw-bolder mx-3 mb-3 fs-18">{t('Year of Establishment')}</h4>
                              <h5 className="custom_timing fs-5">2020</h5>
                              </div>
                              </div>
                            </Col> */}

                            {/* <div className=" p-0 co divider"></div> */}
                          </Row>
                        </div>
                      </div>
                    )}
                  </div>
                </Col>

                {/* <Col xl="3" lg="4" className="collection-filter" id="filter"> */}
                <Col xl="3" lg="4">
                  {/* <Filter /> */}
                  <Service
                    sellerData={data?.user}
                    listingdata={data}
                    soacials={soacial}
                    p_id={product_id && data?.id}
                    item_id={item_id && data?.id}
                    setdetail={setdetail}
                  />
                  {/* <!-- side-bar single product slider start --> */}
                  {/* <NewProduct /> */}
                  {/* <!-- side-bar single product slider end --> */}
                </Col>
              </Row>
            </Container>
          </div>
        </section>
      )}
    </>
);
};

export default LeftSidebarPage;
