import React, { useContext, useEffect, useState } from "react";
import CommonLayout from "../../components/shop/common-layout";
import { Row, Container, Col, Button } from "reactstrap";
import { getEnquiry } from "../../components/core/vendor_request";
import AuthContex from "../../components/auth/AuthContex";
import moment from "moment/moment";
import { useRouter } from 'next/router';
import { getTimeSlot } from "../../components/core/realestate_request";
import Seo from '../../seo/seo'
import { useTranslation } from "react-i18next";


export default function Enquiry_manage() {
  const { userData } = useContext(AuthContex);
  const router = useRouter();
  const { pathname } = router;
  const [enquries, setEnquires] = useState([]);
  const [bookinglist, setBookingList] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [url, setUrl] = useState();

  const fetchEnquries = async () => {
    setIsLoading(true);
    let id = userData?.id;
    await getEnquiry(id)
      .then((res) => {
        res.status == 200 && setEnquires(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("err", err.message);
        setIsLoading(false);
      });
  };

  const { t } = useTranslation();

  // doctor booking list
  const fetchBookingList = async () => {
    setIsLoading(true);
    let id = userData?.id;
    await getTimeSlot(id)
      .then((res) => {
        res.status == 200 && setBookingList(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("err", err.message);
        setIsLoading(false);
      });
  };



  // let data = moment('2023-06-05 05:43:20',"YYYY-MM-DD HH:mm:ss");
  // var formattedDate = data.format("DD MMM YYYY, hh:mm a");
  // console.log("jhjfghjjk;",formattedDate)

  useEffect(() => {
    fetchEnquries();
    // fetchBookingList();
  }, []);

  return (
    <CommonLayout parent="home" title="Manage Orders">
                <Seo title={`Enquiry And Manage Quotes`} />

      {isLoading ? (
        <div className="container">
        <div className="loader-wrapper2 rounded-4 mt-4 mb-4">
          {url === "Christmas" ? (
            <div id="preloader"></div>
          ) : (
            <div className="loader"></div>
          )}
        </div>
        </div>
      ) : (
        <section className="Mange_Enquiry mb-5 mt-4">
          <Container>
            <div className="card empty-wishlist shadow-sm p-4">
              <div className="d-sm-flex align-items-center justify-content-between">
                <h4 className="fw-bold fs-5">{t("Enquiry And manage Quotes")}</h4>
                <div className="filer-search-wicon d-flex justify-content-end d-none">
                  <div className="search">
                    <span className="fa fa-search"></span>
                    <input placeholder={t("Search In This Store")} />
                  </div>
                </div>
              </div>

              {enquries?.length > 0 ? (
                enquries?.map((data, index) => {
                  var date = moment(data?.created_at, "YYYY-MM-DD HH:mm:ss");
                  var formattedDate = date.format("DD MMM YYYY, hh:mm a");
                  return (
                    <div className="container mb-3" key={index}>
                      <div className="mt-3">
                        <div className="Enquriry_card mb-3">
                          <div className="">
                            <div className="d-sm-flex justify-content-between mb-sm-2 mt-2">
                              <div className="mx-md-3 mx-0 d-flex">
                                <h4>{data?.item_lead_name}</h4>
                                <div className="text-muted_light ps-3">
                                  <h4>{data?.item_lead_email}</h4>
                                </div>
                              </div>
                              <div className="text-muted_light ">
                                <h4>{formattedDate}</h4>
                              </div>
                            </div>
                            {/* <div className="">
                              <i className="fa fa-ellipsis-v fs-5" />
                            </div> */}
                          </div>
                          <div className="d-xl-flex justify-content-between mb-0">
                            <div className="mx-md-3 mx-0 mt-2">
                              <h6 className="fw-normal">
                                {data?.item_lead_message}.
                              </h6>
                            </div>
                            <div className="d-flex justify-content-between">
                              <button
                                type="button"
                                className="btn btn-lead1 complete_1 d-flex justify-content-center align-items-center"
                              >
                                <a
                                  href={"tell:" + data?.item_lead_phone}
                                  className="text-light"
                                >
                                  {" "}
                                  <i
                                    className="fa fa-phone  me-2"
                                    aria-hidden="true"
                                  ></i>{" "}
                                  {data?.item_lead_phone}
                                </a>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center">
                  <img
                    // src="/assets/images/tatlub-img/Enquire.png"
                    src="/assets/images/tatlub-img/not_Found.png"
                    className=""
                  />
                  <p className="text-muted">{t("Enquiry Not Found")}</p>
                </div>
              )}


              {/* {bookinglist?.length > 0 && (
                bookinglist?.map((data, index) => {
                  var date = moment(data?.created_at, "YYYY-MM-DD HH:mm:ss");
              var formattedDate = date.format("DD MMM YYYY, hh:mm a");

              return (
              <div className="container mb-3" key={index}>
                <div className="mt-3">
                  <div className="Enquriry_card mb-3">
                    <div className="">
                      <div className="d-sm-flex justify-content-between mb-sm-2 mt-2">
                        <div className="mx-md-3 mx-0 d-flex">
                          <h4>{data?.patient_name}</h4>
                          <div className="text-muted_light ps-3">
                            <h4>{data?.patient_mobile}</h4>
                          </div>
                        </div>
                        <div className="text-muted_light ">
                          <h4>{formattedDate}</h4>
                        </div>
                      </div>
                    </div>
                    <div className="d-xl-flex justify-content-between mb-0">
                      <div className="mx-md-3 mx-0 mt-2">
                        <h6 className="fw-normal">
                          {data?.nature_of_visit}.
                        </h6>
                      </div>
                      <div className="d-flex justify-content-between">
                        <button
                          type="button"
                          className="btn btn-lead1 d-flex justify-content-center align-items-center"
                        >
                          <a
                            href={"tell:" + data?.mobile}
                            className="text-light"
                          >
                            {" "}
                            <i
                              className="fa fa-phone  me-2"
                              aria-hidden="true"
                            ></i>{" "}
                            {data?.mobile}
                          </a>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              );
                })
              )} */}

            </div>
          </Container>
        </section>
      )}
    </CommonLayout>
  );
}
