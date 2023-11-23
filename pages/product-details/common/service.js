import React, { useState, useEffect, useContext } from "react";
import MasterServiceContent from "../../../components/common/Service/MasterServiceConternt";
import {
  svgFreeShipping,
  svgservice,
  svgoffer,
  svgpayment,
} from "../../../services/script";
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
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as yup from "yup";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { reviewForItems } from "../../../components/core/vendor_request";
import { ToastContainer, toast } from "react-toastify";
import AuthContex from "../../../components/auth/AuthContex";
import moment from "moment/moment";

const initialValues = {
  item_id: "",
  product_id: "",
  user_id: "",
  body: "",
  overall_rating: "",
  image: "",
};

const Data = [
  // {
  //   // link: svgFreeShipping,
  //   title: "Indian Exchange & Chemicals Limited",
  //   service: "treva@example.com",
  //   location:"No 143, D.N.S Gandhi Street, Anna Nagar, Chennai - 600092",
  //   webpage:"www.indianexchange.com",
  //   rating:"4.1 Rating",
  //   review:"256 Reviews",
  //   mdetail:"For More Detail",
  //   contact:"Contact Supplier",
  //   vprofile:"View Profile"
  // },
  {
    // link: svgFreeShipping,
    title: "Data Not Found",
    service: "Data Not Found",
    location: "Data Not Found",
    webpage: "Data Not Found",
    rating: "0",
    review: "0",
    mdetail: "For More Detail",
    contact: "Contact Supplier",
    vprofile: "View Profile",
  },
];

const Service = (
  { sellerData, soacials, listingdata, p_id, item_id, setdetail },
  args
) => {
  const { t } = useTranslation();

  // console.log("listingdata?.item_lat", listingdata?.item_lat);
  // console.log("listingdata?.item_lng", listingdata?.item_lng);

  const iframeUrl = `https://maps.google.com/maps?q=${listingdata?.item_lat},${listingdata?.item_lng}&hl=es;z=14&output=embed`;

  const iframeUrl2 = `https://www.google.com/maps/embed/v1/place?key=AIzaSyCOYU6x7yqbUnNRtBuygEfCX9NgWakZRLw&q=${listingdata?.item_location_str ?? listingdata?.item_address}`

  const [modal, setModal] = useState(false);
  // const toggle = () => setModal(!modal);

  const [isOpen, setIsopen] = useState(false);
  const [rating, setRating] = useState();
  const [reviewImg, setReviewImg] = useState();
  const [openHrs,setOpenHrs] = useState()
const [closeHrs,setcloseHrs] = useState()

  useEffect(()=> {
    if(listingdata?.item_hours?.length > 0){
      let open = moment( listingdata?.item_hours[0]?.item_hour_open_time, "hh:mm" );

      var formatedTime = open.format("hh:mm a");

      setOpenHrs(formatedTime)
  
      let close = moment(listingdata?.item_hours[0]?.item_hour_close_time,"hh:mm");

      var formatedTime2 = close.format("hh:mm a");

      setcloseHrs(formatedTime2)
    }

  },[listingdata])

  const { userData } = useContext(AuthContex);

  const ToggleSidebar = () => {
    isOpen === true ? setIsopen(false) : setIsopen(true);
  };

  const toggle = () =>  !userData ? document.getElementById('openLoginPopup')?.click() : userData?.id == sellerData?.id ? '' : setModal(!modal);

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
          item_id: item_id ?? '',
          product_id: p_id ?? '',
          user_id: user_id ?? '',
          overall_rating: rating ?? '',
          body: values.body,
          image: reviewImg ?? '',
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


  return (
    <>
      {
        sellerData &&
        <div className="collection-filter-block py-3">
          <div className="product-service">
            {/* {Data.map((data, index) => {
          return (
            <MasterServiceContent
              key={index}
              link={data.link}
              title={data.title}
              location={data.location}
              webpage={data.webpage}
              rating={data.rating}
              review={data.review}
              service={data.service}
              lastChild={data.lastChild}
              mdetail={data.mdetail}
              contact={data.contact}
              vprofile={data.vprofile}
            />
          );
        })} */}

            {sellerData ? (
              <MasterServiceContent
                link={""}
                title={sellerData?.name}
                location={sellerData?.address}
                email={sellerData?.email}
                phone={sellerData?.phone}
                webpage={sellerData?.user_details?.website}
                rating={sellerData?.user_rating ?? 0}
                review={sellerData?.user_rating_count ?? 0}
                id={sellerData?.id}
                img={sellerData?.user_image}
                soacialMedia={soacials}
                nodata={false}
                data={listingdata}
              // service={data.service}
              // lastChild={data.lastChild}
              // mdetail={data.mdetail}
              // contact={data.contact}
              // vprofile={data.vprofile}
              />
            ) : (
              Data.map((data, index) => {
                return (
                  <MasterServiceContent
                    key={index}
                    link={data.link}
                    title={data.title}
                    location={data.location}
                    webpage={data.webpage}
                    rating={data.rating ?? 0}
                    phone={sellerData?.phone}
                    review={data.review ?? 0}
                    service={data.service}
                    lastChild={data.lastChild}
                    mdetail={data.mdetail}
                    contact={data.contact}
                    vprofile={data.vprofile}
                    nodata={true}
                  />
                );
              })
            )}
          </div>
        </div>
      }

      {item_id && (
        <div className="side_contain_product  mt-4 mb-4">
          <h3 className="fw-bold">{t('Location')}</h3>
          <div className="mapouter">
            <div className="gmap_canvas">
              {
                listingdata?.item_lat && listingdata?.item_lng ?
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
                  : listingdata?.google_map_link ?
                    <iframe
                      className="w-100"
                      height="250"
                      loading="lazy"
                      src={listingdata?.google_map_link}
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
          </div>
          <div className="d-flex align-items-center justify-content-between d-none">
            <div className="d-flex align-items-center">
              <img
                className="me-2 company_detail_icon"
                src="/assets/images/company/7.png"
              />{" "}
              <h5 className="my-2 fw-bolder">Get Directions</h5>
            </div>
            <div className="d-flex align-items-center">
              <img
                className="me-2 company_detail_icon"
                src="/assets/images/company/copy.png"
              />
              <h5 className="my-2 fw-bolder cursor-pointer foot-cat">Copy</h5>
            </div>
          </div>
        </div>
      )}

      {sellerData && (
        <div className="reviewrite_company mt-4 mb-4">
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
                onClick={() =>{ setRating(2);  toggle() }}
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
                onClick={() =>{ setRating(3);  toggle() }}
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
                onClick={() =>{ setRating(4);  toggle()}}
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
                onClick={() =>{ setRating(5);  toggle()}}
              ></i>
            </div>
            {/* <div className="star-icon-com"><img src="/assets/images/tatlub-img/icon-8.png" /></div> */}
          </div>
          <button
            onClick={
              toggle
            }
            id="closeRevie"
            className="btn btn-review mt-md-5 mt-4"
            // disabled={userData ? false : true}
            disabled={userData?.id == sellerData?.id ? true : false}
          >
            {t("Write a")} {t("Review")}
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
                    {/* <h5>jhgj</h5>
                                          <p>anna Nager</p> */}
                    {/* <p>{seller?.user_details?.address}</p> */}
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
                    <div className="file file--upload">
                      <label for="input-file">
                        <i className="fa fa-camera"></i>
                      </label>
                      <input
                        id="input-file"
                        type="file"
                        onChange={(e) => setReviewImg(e.target.files[0])}
                      />
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
      )} 

      {item_id && listingdata?.item_hours?.length > 0 && (
                      <div className="pt-0 b2c-2  mb-xl-0">
                        <div className="review_card p-4">
                          <Row>
                            {/* <Col lg="12" className="divider1 mb-3"> */}
                            <Col lg="12" className=" ">
                              <h4 className="fw-bolder mx-3 mb-3 fs-18">{t('Timing')}</h4>
                                {
                                  listingdata?.item_hours?.length > 0 && 
                                  <div className="d-flex justify-content-between mx-3 ">
                                    <div>
                                    <h5 className="custom_timing fs-5">
                                        {listingdata?.item_hours[0]?.item_hour_day_of_week == 1 &&
                                            "Mon"}{" "}
                                          {listingdata?.item_hours[0]?.item_hour_day_of_week == 2 &&
                                            "Tue"}{" "}
                                          {listingdata?.item_hours[0]?.item_hour_day_of_week == 3 &&
                                            "Wed"}{" "}
                                          {listingdata?.item_hours[0]?.item_hour_day_of_week == 4 &&
                                            "Thu"}{" "}
                                          {listingdata?.item_hours[0]?.item_hour_day_of_week == 5 &&
                                            "Fri"}{" "}
                                          {listingdata?.item_hours[0]?.item_hour_day_of_week == 6 &&
                                            "Sat"}{" "}
                                          {listingdata?.item_hours[0]?.item_hour_day_of_week == 7 &&
                                            "Sun"} - 
                                           {listingdata?.item_hours[listingdata?.item_hours?.length-1]?.item_hour_day_of_week == 1 &&
                                            "Mod"}{" "}
                                          {listingdata?.item_hours[listingdata?.item_hours?.length-1]?.item_hour_day_of_week == 2 &&
                                            "Tue"}{" "}
                                          {listingdata?.item_hours[listingdata?.item_hours?.length-1]?.item_hour_day_of_week == 3 &&
                                            "Wed"}{" "}
                                          {listingdata?.item_hours[listingdata?.item_hours?.length-1]?.item_hour_day_of_week == 4 &&
                                            "Thu"}{" "}
                                          {listingdata?.item_hours[listingdata?.item_hours?.length-1]?.item_hour_day_of_week == 5 &&
                                            "Fri"}{" "}
                                          {listingdata?.item_hours[listingdata?.item_hours?.length-1]?.item_hour_day_of_week == 6 &&
                                            "Sat"}{" "}
                                          {listingdata?.item_hours[listingdata?.item_hours?.length-1]?.item_hour_day_of_week == 7 &&
                                            "Sun"}
                                      </h5>
                                    </div>
                                    <div>
                                      <h5 className="5">{openHrs ?? "00:00"}- {closeHrs ?? '00:00'} </h5>
                                    </div>
                                  </div>
                                }

                              {!listingdata?.item_hours ||
                                (listingdata?.item_hours?.length == 0 && (
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
                          </Row>
                        </div>
                      </div>
                    )}


    </>
  );
};

export default Service;
