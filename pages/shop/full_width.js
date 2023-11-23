import React, { useState } from "react";
import CommonLayout from "../../components/shop/common-layout";
// import { withApollo } from '../../helpers/apollo/apollo';
import { Row, Container, Col } from "reactstrap";
import Products from "../../components/common/Collections/Collection12";
import Category from "./common/category";
import { Collapse } from "reactstrap";
import Link from "next/link";

const FullWidth = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleBrand = () => setIsOpen(!isOpen);
  const [isOpen2, setIsOpen2] = useState(false);
  const toggleBrand2 = () => setIsOpen2(!isOpen2);

  return (
    <CommonLayout title="collection" parent="home">
      <Container className="mt-lg-5 mt-3 mb-lg-5 mb-3">
        {/* <Row>
          <Col sm="12">
                        <Products type="metro" col="full" />
                    </Col>
        </Row> */}

        <section id="b2c">
          <Row>
            <Col xl="3" lg='4' className=" d-none d-lg-block">
              <div className="collection-filter-block shadow-sm">
                <div
                  className="collection-mobile-back"
                  onClick={() => closeSidebar()}
                >
                  <span className="filter-back">
                    <i className="fa fa-angle-left" aria-hidden="true"></i> back
                  </span>
                </div>
                <div className="collection-collapse-block  open">
                  <h3
                    className={
                      isOpen ? "collapse-block-title" : "collapse-block-title1"
                    }
                    onClick={toggleBrand}
                  >
                    Filter by Schools
                  </h3>
                  <Collapse isOpen={isOpen}>
                    <div className="collection-collapse-block-content">
                      <div className="collection-brand-filter">
                        <ul className="">
                          <li className="form-check mb-3">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="flexCheckDefault"
                            />
                            <label className="form-check-label fw-bolder">
                              All Options
                            </label>
                          </li>

                          <li className="form-check mb-3">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="flexCheckDefault"
                            />
                            <label className="form-check-label fw-bolder">
                              Tamil
                            </label>
                          </li>

                          <li className="form-check mb-3">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="flexCheckDefault"
                            />
                            <label className="form-check-label fw-bolder">
                              English
                            </label>
                          </li>

                          <li className="form-check mb-3">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="flexCheckDefault"
                            />
                            <label className="form-check-label fw-bolder">
                              Convent Schools
                            </label>
                          </li>

                          <li className="form-check mb-3">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="flexCheckDefault"
                            />
                            <label className="form-check-label fw-bolder">
                              ICSE
                            </label>
                          </li>

                          <li className="form-check mb-3">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="flexCheckDefault"
                            />
                            <label className="form-check-label fw-bolder">
                              Public Schools
                            </label>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </Collapse>
                </div>
              </div>

              <div className="collection-filter-block shadow-sm">
                <div
                  className="collection-mobile-back"
                  onClick={() => closeSidebar()}
                >
                  <span className="filter-back">
                    <i className="fa fa-angle-left" aria-hidden="true"></i> back
                  </span>
                </div>
                <div className="collection-collapse-block  open">
                  <h3
                    className={
                      isOpen2 ? "collapse-block-title" : "collapse-block-title1"
                    }
                    onClick={toggleBrand2}
                  >
                    Localities In Chennai
                  </h3>
                  <Collapse isOpen={isOpen2}>
                    <div className="collection-collapse-block-content">
                      <div className="collection-brand-filter">
                        <ul className="">
                          <li className="form-check mb-3">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="flexCheckDefault"
                            />
                            <label className="form-check-label fw-bolder">
                              Schools In Chennai
                            </label>
                          </li>

                          <li className="form-check mb-3">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="flexCheckDefault"
                            />
                            <label className="form-check-label fw-bolder">
                              Schools In T Nagar
                            </label>
                          </li>

                          <li className="form-check mb-3">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="flexCheckDefault"
                            />
                            <label className="form-check-label fw-bolder">
                              Schools In Anna Nagar
                            </label>
                          </li>

                          <li className="form-check mb-3">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="flexCheckDefault"
                            />
                            <label className="form-check-label fw-bolder">
                              Schools In Ambattur
                            </label>
                          </li>

                          <li className="form-check mb-3">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="flexCheckDefault"
                            />
                            <label className="form-check-label fw-bolder">
                              Schools In Tambaram
                            </label>
                          </li>

                          <li className="form-check mb-3">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="flexCheckDefault"
                            />
                            <label className="form-check-label fw-bolder">
                              Schools In Velacheri
                            </label>
                          </li>
                          <li className="text-color">See More <i className="fa fa-angle-right pe-2" aria-hidden="true"></i></li>
                        </ul>
                      </div>
                    </div>
                  </Collapse>
                </div>
              </div>

              <div>
                <button type="button" className="btn btn_filter1 w-100 py-2">
                  Reset Fitler
                </button>
              </div>
            </Col>

            <Col xl="9" lg='8'>
              <div className="row">
                <div className="col-xl-6 col-12 mb-3">
                  <div className="card p-3 pt-4  border-0 shadow-sm mx-1 B2C product-list">
                    <div className="row mb-3">
                      <div className="col-sm-5 mb-2">
                        <img
                          src="\assets\images\tatlub-img\scl/1.jpg"
                          className="img-fluid position-relative"
                        />
                        <div className="position-absolute text-center ">
                        {/* <i className="fa fa-heart p-1" aria-hidden="true"></i> */}
                        <img src="\assets\images\icon\heart-1.png" className="rounded-0"/>
                        </div>
                      </div>
                      <div className="col-sm-7">
                        <Link href={'/shop/sidebar_popup'}>
                        <h4 className="card-title">
                          Avichi Higher Secondary School Virugambakkam
                        </h4>
                        </Link>
                        <div className="d-flex">
                          <img
                            className="me-2 company_detail_icon"
                            src="/assets/images/company/4.png"
                          />
                          <p className="fs-6 ">
                            4.4{" "}
                            <span className="custom_ratng_text ms-3">
                              2053 Ratings
                            </span>
                          </p>
                        </div>
                        <div className="d-flex">
                          <img
                            className="me-2 company_detail_icon"
                            src="/assets/images/tatlub-img/icon-11.png"
                          />
                        <p className="fw-bolder">Anna Nagar, Chennai</p>
                        </div>
                        <p className="fw-bolder">
                          <span className="text-success">Open</span> Until 5:00
                          pm
                        </p>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between">
                      <button
                        type="button"
                        className="btn btn_filter1 mx-2 w-100"
                      >
                        <img src="/assets/images/tatlub-img/call-2.png"  className="btn-img"/>
                        Call Now
                      </button>
                      <button
                        type="button"
                        className="btn btn_filter1 mx-2 w-100"
                      >
                        Send Enquiry
                      </button>
                    </div>
                  </div>
                </div>

                <div className="col-xl-6 col-12 mb-3">
                  <div className="card p-3 pt-4  border-0 shadow-sm mx-1 B2C product-list">
                    <div className="row mb-3">
                      <div className="col-sm-5 mb-2">
                        <img
                          src="\assets\images\tatlub-img\scl/2.jpg"
                          className="img-fluid position-relative"
                        />
                        <div className="position-absolute text-center">
                        {/* <i className="fa fa-heart" aria-hidden="true"></i> */}
                        <img src="\assets\images\icon\heart-1.png"/>

                        </div>
                      </div>
                      <div className="col-sm-7">
                      <Link href={'/shop/sidebar_popup'}>
                        <h4 className="card-title">
                          Avichi Higher Secondary School Virugambakkam
                        </h4>
                        </Link>
                        <div className="d-flex">
                          <img
                            className="me-2 company_detail_icon"
                            src="/assets/images/company/4.png"
                          />
                          <p className="fs-6 ">
                            4.4{" "}
                            <span className="custom_ratng_text ms-3">
                              2053 Ratings
                            </span>
                          </p>
                        </div>
                        <div className="d-flex">
                          <img
                            className="me-2 company_detail_icon"
                            src="/assets/images/tatlub-img/icon-11.png"
                          />
                        <p className="fw-bolder">Anna Nagar, Chennai</p>
                        </div>
                        <p className="fw-bolder">
                          <span className="text-success">Open</span> Until 5:00
                          pm
                        </p>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between">
                      <button
                        type="button"
                        className="btn btn_filter1 mx-2 w-100"
                      >
                        <img src="/assets/images/tatlub-img/call-2.png"  className="btn-img"/>
                        Call Now
                      </button>
                      <button
                        type="button"
                        className="btn btn_filter1 mx-2 w-100"
                      >
                        Send Enquiry
                      </button>
                    </div>
                  </div>
                </div>

                <div className="col-xl-6 col-12 mb-3">
                  <div className="card p-3 pt-4  border-0 shadow-sm mx-1 B2C product-list">
                    <div className="row mb-3">
                      <div className="col-sm-5 mb-2">
                        <img
                          src="\assets\images\tatlub-img\scl/4.jpg"
                          className="img-fluid position-relative"
                        />
                        <div className="position-absolute text-center">
                        {/* <i className="fa fa-heart" aria-hidden="true"></i> */}
                        <img src="\assets\images\icon\heart-1.png"/>
                        </div>
                      </div>
                      <div className="col-sm-7">
                      <Link href={'/shop/sidebar_popup'}>
                        <h4 className="card-title">
                          Avichi Higher Secondary School Virugambakkam
                        </h4>
                        </Link>
                        <div className="d-flex">
                          <img
                            className="me-2 company_detail_icon"
                            src="/assets/images/company/4.png"
                          />
                          <p className="fs-6 ">
                            4.4{" "}
                            <span className="custom_ratng_text ms-3">
                              2053 Ratings
                            </span>
                          </p>
                        </div>
                        <div className="d-flex">
                          <img
                            className="me-2 company_detail_icon"
                            src="/assets/images/tatlub-img/icon-11.png"
                          />
                        <p className="fw-bolder">Anna Nagar, Chennai</p>
                        </div>
                        <p className="fw-bolder">
                          <span className="text-success">Open</span> Until 5:00
                          pm
                        </p>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between">
                      <button
                        type="button"
                        className="btn btn_filter1 mx-2 w-100"
                      >
                        <img src="/assets/images/tatlub-img/call-2.png"  className="btn-img"/>
                        Call Now
                      </button>
                      <button
                        type="button"
                        className="btn btn_filter1 mx-2 w-100"
                      >
                        Send Enquiry
                      </button>
                    </div>
                  </div>
                </div>

                <div className="col-xl-6 col-12 mb-3">
                  <div className="card p-3 pt-4  border-0 shadow-sm mx-1 B2C product-list">
                    <div className="row mb-3">
                      <div className="col-sm-5 mb-2">
                        <img
                          src="\assets\images\tatlub-img\scl/5.jpg"
                          className="img-fluid position-relative"
                        />
                        <div className="position-absolute text-center">
                        {/* <i className="fa fa-heart" aria-hidden="true"></i> */}
                        <img src="\assets\images\icon\heart-1.png"/>
                        </div>
                      </div>
                      <div className="col-sm-7">
                      <Link href={'/shop/sidebar_popup'}>
                        <h4 className="card-title">
                          Avichi Higher Secondary School Virugambakkam
                        </h4>
                        </Link>
                        <div className="d-flex">
                          <img
                            className="me-2 company_detail_icon"
                            src="/assets/images/company/4.png"
                          />
                          <p className="fs-6 ">
                            4.4{" "}
                            <span className="custom_ratng_text ms-3">
                              2053 Ratings
                            </span>
                          </p>
                        </div>
                        <div className="d-flex">
                          <img
                            className="me-2 company_detail_icon"
                            src="/assets/images/tatlub-img/icon-11.png"
                          />
                        <p className="fw-bolder">Anna Nagar, Chennai</p>
                        </div>
                        <p className="fw-bolder">
                          <span className="text-success">Open</span> Until 5:00
                          pm
                        </p>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between">
                      <button
                        type="button"
                        className="btn btn_filter1 mx-2 w-100"
                      >
                        <img src="/assets/images/tatlub-img/call-2.png"  className="btn-img"/>
                        Call Now
                      </button>
                      <button
                        type="button"
                        className="btn btn_filter1 mx-2 w-100"
                      >
                        Send Enquiry
                      </button>
                    </div>
                  </div>
                </div>

                <div className="col-xl-6 col-12 mb-3">
                  <div className="card p-3 pt-4  border-0 shadow-sm mx-1 B2C product-list">
                    <div className="row mb-3">
                      <div className="col-sm-5 mb-2">
                        <img
                          src="\assets\images\tatlub-img\scl/6.jpg"
                          className="img-fluid position-relative"
                        />
                        <div className="position-absolute text-center">
                        {/* <i className="fa fa-heart" aria-hidden="true"></i> */}
                        <img src="\assets\images\icon\heart-1.png"/>
                        </div>
                      </div>
                      <div className="col-sm-7">
                      <Link href={'/shop/sidebar_popup'}>
                        <h4 className="card-title">
                          Avichi Higher Secondary School Virugambakkam
                        </h4>
                        </Link>
                        <div className="d-flex">
                          <img
                            className="me-2 company_detail_icon"
                            src="/assets/images/company/4.png"
                          />
                          <p className="fs-6 ">
                            4.4{" "}
                            <span className="custom_ratng_text ms-3">
                              2053 Ratings
                            </span>
                          </p>
                        </div>
                        <div className="d-flex">
                          <img
                            className="me-2 company_detail_icon"
                            src="/assets/images/tatlub-img/icon-11.png"
                          />
                        <p className="fw-bolder">Anna Nagar, Chennai</p>
                        </div>
                        <p className="fw-bolder">
                          <span className="text-success">Open</span> Until 5:00
                          pm
                        </p>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between">
                      <button
                        type="button"
                        className="btn btn_filter1 mx-2 w-100"
                      >
                        <img src="/assets/images/tatlub-img/call-2.png"  className="btn-img"/>
                        Call Now
                      </button>
                      <button
                        type="button"
                        className="btn btn_filter1 mx-2 w-100"
                      >
                        Send Enquiry
                      </button>
                    </div>
                  </div>
                </div>

                <div className="col-xl-6 col-12 mb-3">
                  <div className="card p-3 pt-4  border-0 shadow-sm mx-1 B2C product-list">
                    <div className="row mb-3">
                      <div className="col-sm-5 mb-2">
                        <img
                          src="\assets\images\tatlub-img\scl/7.jpg"
                          className="img-fluid position-relative"
                        />
                        <div className="position-absolute text-center">
                        {/* <i className="fa fa-heart" aria-hidden="true"></i> */}
                        <img src="\assets\images\icon\heart-1.png"/>
                        </div>
                      </div>
                      <div className="col-sm-7">
                      <Link href={'/shop/sidebar_popup'}>
                        <h4 className="card-title">
                          Avichi Higher Secondary School Virugambakkam
                        </h4>
                        </Link>
                        <div className="d-flex">
                          <img
                            className="me-2 company_detail_icon"
                            src="/assets/images/company/4.png"
                          />
                          <p className="fs-6 ">
                            4.4{" "}
                            <span className="custom_ratng_text ms-3">
                              2053 Ratings
                            </span>
                          </p>
                        </div>
                        <div className="d-flex">
                          <img
                            className="me-2 company_detail_icon"
                            src="/assets/images/tatlub-img/icon-11.png"
                          />
                        <p className="fw-bolder">Anna Nagar, Chennai</p>
                        </div>
                        <p className="fw-bolder">
                          <span className="text-success">Open</span> Until 5:00
                          pm
                        </p>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between">
                      <button
                        type="button"
                        className="btn btn_filter1 mx-2 w-100"
                      >
                        <img src="/assets/images/tatlub-img/call-2.png"  className="btn-img"/>
                        Call Now
                      </button>
                      <button
                        type="button"
                        className="btn btn_filter1 mx-2 w-100"
                      >
                        Send Enquiry
                      </button>
                    </div>
                  </div>
                </div>

                <div className="col-xl-6 col-12 mb-3">
                  <div className="card p-3 pt-4  border-0 shadow-sm mx-1 B2C product-list">
                    <div className="row mb-3">
                      <div className="col-sm-5 mb-2">
                        <img
                          src="\assets\images\tatlub-img\scl/8.jpg"
                          className="img-fluid position-relative"
                        />
                        <div className="position-absolute text-center">
                        {/* <i className="fa fa-heart" aria-hidden="true"></i> */}
                        <img src="\assets\images\icon\heart-1.png"/>
                        </div>
                      </div>
                      <div className="col-sm-7">
                      <Link href={'/shop/sidebar_popup'}>
                        <h4 className="card-title">
                          Avichi Higher Secondary School Virugambakkam
                        </h4>
                        </Link>
                        <div className="d-flex">
                          <img
                            className="me-2 company_detail_icon"
                            src="/assets/images/company/4.png"
                          />
                          <p className="fs-6 ">
                            4.4{" "}
                            <span className="custom_ratng_text ms-3">
                              2053 Ratings
                            </span>
                          </p>
                        </div>
                        <div className="d-flex">
                          <img
                            className="me-2 company_detail_icon"
                            src="/assets/images/tatlub-img/icon-11.png"
                          />
                        <p className="fw-bolder">Anna Nagar, Chennai</p>
                        </div>
                        <p className="fw-bolder">
                          <span className="text-success">Open</span> Until 5:00
                          pm
                        </p>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between">
                      <button
                        type="button"
                        className="btn btn_filter1 mx-2 w-100"
                      >
                        <img src="/assets/images/tatlub-img/call-2.png"  className="btn-img"/>
                        Call Now
                      </button>
                      <button
                        type="button"
                        className="btn btn_filter1 mx-2 w-100"
                      >
                        Send Enquiry
                      </button>
                    </div>
                  </div>
                </div>

                <div className="col-xl-6 col-12 mb-3">
                  <div className="card p-3 pt-4  border-0 shadow-sm mx-1 B2C product-list">
                    <div className="row mb-3">
                      <div className="col-sm-5 mb-2">
                        <img
                          src="\assets\images\tatlub-img\scl/9.jpg"
                          className="img-fluid position-relative"
                        />
                        <div className="position-absolute text-center">
                        {/* <i className="fa fa-heart" aria-hidden="true"></i> */}
                        <img src="\assets\images\icon\heart-1.png"/>
                        </div>
                      </div>
                      <div className="col-sm-7">
                      <Link href={'/shop/sidebar_popup'}>
                        <h4 className="card-title">
                          Avichi Higher Secondary School Virugambakkam
                        </h4>
                        </Link>
                        <div className="d-flex">
                          <img
                            className="me-2 company_detail_icon"
                            src="/assets/images/company/4.png"
                          />
                          <p className="fs-6 ">
                            4.4{" "}
                            <span className="custom_ratng_text ms-3">
                              2053 Ratings
                            </span>
                          </p>
                        </div>
                        <div className="d-flex">
                          <img
                            className="me-2 company_detail_icon"
                            src="/assets/images/tatlub-img/icon-11.png"
                          />
                        <p className="fw-bolder">Anna Nagar, Chennai</p>
                        </div>
                        <p className="fw-bolder">
                          <span className="text-success">Open</span> Until 5:00
                          pm
                        </p>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between">
                      <button
                        type="button"
                        className="btn btn_filter1 mx-2 w-100"
                      >
                        <img src="/assets/images/tatlub-img/call-2.png"  className="btn-img"/>
                        Call Now
                      </button>
                      <button
                        type="button"
                        className="btn btn_filter1 mx-2 w-100"
                      >
                        Send Enquiry
                      </button>
                    </div>
                  </div>
                </div>

                <div className="col-xl-6 col-12 mb-3">
                  <div className="card p-3 pt-4  border-0 shadow-sm mx-1 B2C product-list">
                    <div className="row mb-3">
                      <div className="col-sm-5 mb-2">
                        <img
                          src="\assets\images\tatlub-img\scl/10.jpg"
                          className="img-fluid position-relative"
                        />
                        <div className="position-absolute text-center">
                        {/* <i className="fa fa-heart" aria-hidden="true"></i> */}
                        <img src="\assets\images\icon\heart-1.png"/>
                        </div>
                      </div>
                      <div className="col-sm-7">
                      <Link href={'/shop/sidebar_popup'}>
                        <h4 className="card-title">
                          Avichi Higher Secondary School Virugambakkam
                        </h4>
                        </Link>
                        <div className="d-flex">
                          <img
                            className="me-2 company_detail_icon"
                            src="/assets/images/company/4.png"
                          />
                          <p className="fs-6 ">
                            4.4{" "}
                            <span className="custom_ratng_text ms-3">
                              2053 Ratings
                            </span>
                          </p>
                        </div>
                        <div className="d-flex">
                          <img
                            className="me-2 company_detail_icon"
                            src="/assets/images/tatlub-img/icon-11.png"
                          />
                        <p className="fw-bolder">Anna Nagar, Chennai</p>
                        </div>
                        <p className="fw-bolder">
                          <span className="text-success">Open</span> Until 5:00
                          pm
                        </p>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between">
                      <button
                        type="button"
                        className="btn btn_filter1 mx-2 w-100"
                      >
                        <img src="/assets/images/tatlub-img/call-2.png"  className="btn-img"/>
                        Call Now
                      </button>
                      <button
                        type="button"
                        className="btn btn_filter1 mx-2 w-100"
                      >
                        Send Enquiry
                      </button>
                    </div>
                  </div>
                </div>

                <div className="text-center my-md-4 py-3">
                  <button type="button" className="btn_hover p-2 px-4">
                    View More 
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </section>
      </Container>
    </CommonLayout>
  );
};

export default FullWidth;
